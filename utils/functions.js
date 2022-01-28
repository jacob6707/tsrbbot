const {Client, Message, MessageEmbed} = require('discord.js');
const axios = require('axios');
const tabletojson = require('tabletojson').Tabletojson;
const { compile } = require('html-to-text');
const Guild = require('../models/guild');
const config = require('../config.json');
const convert = compile({ wordwrap: 130 });
const mongoose = require('mongoose');
const languageSchema = require('../models/language-schema');
const language = require('./language');

/**
 * 
 * @param {Client} client 
 */
async function get_izmjene(client) {
	const oldArrA = client.izmjeneA.slice();
	const oldArrB = client.izmjeneB.slice();
    client.izmjeneA = await axios.get(config.aSmjena).then(response => parse_izmjene(client.izmjeneA,response));
	client.izmjeneB = await axios.get(config.bSmjena).then(response => parse_izmjene(client.izmjeneB,response));
	if (!arrayEquals(oldArrA,client.izmjeneA) && oldArrA.length > 0) bcIzmjene(client, "A", oldArrA);
	if (!arrayEquals(oldArrB,client.izmjeneB) && oldArrB.length > 0) bcIzmjene(client, "B", oldArrB);
}

/**
 * 
 * @param {Client} client 
 * @returns 
 */
function bcIzmjene(client, smjena, oldArr) {
	console.log(`Array ${smjena} changed`);
	client.guilds.cache.each(async _guild => {
		try {
			const settings = await get_settings(_guild);
			if (!settings) return;
			if (settings.broadcastChannelId == "0") return;
			if (settings.printIzmjene == false) return;
			const cid = settings.broadcastChannelId;
			const raz = settings.razred.toString() || "1.A";
			const color = settings ? settings.color : config.color;
			if (raz.match("[ABCDO]") && smjena == "B") return;
			if (raz.match("[EFGMN]") && smjena == "A") return;
			client.channels.fetch(cid).then(channel => {
				var print = false;
				const {guild} = channel;
				const embed = new MessageEmbed()
				.setTitle(`${language(guild, 'IZMJENE_IZMJENE')} (${raz})`)
				.setColor(color);
				var izmjene = new Array();
				if (raz.match("[ABCDO]") && smjena == "A") { izmjene = client.izmjeneA; embed.setURL('https://tsrb.hr/a-smjena')}
				else if (raz.match("[EFGMN]") && smjena == "B") { izmjene = client.izmjeneB; embed.setURL('https://tsrb.hr/b-smjena')}
				else return;
				for(const [index, izmjena] of izmjene.entries()) {
					if (izmjena[1][0] === raz) {
						if (!arrayEquals(izmjena, oldArr[index])) print = true;
						var iz = new String("```");
						for(var i in izmjena[1]) {
							if (i != 0) iz = iz.concat(`${izmjena[2][i].toString().replaceAll(".","").padStart(2," ")}. sat = ` + izmjena[1][i] + "\n");
						}
						iz = iz.concat("```")
						embed.addField(izmjena[0] + "\n" + izmjena[2][0], iz);
					}
				}
				if (print) channel.send({embeds: [embed]});
			})
			.catch(console.error);
		} catch (err) {
			console.log('Could not send message to ' + _guild.name + '.' + ` ${err}`);
		}
	});
}

/**
 * 
 * @param {Array} izmjene 
 * @param {string} response 
 */
function parse_izmjene(izmjene,response) {
	const converted = tabletojson.convert(response.data);
	const txt = convert(response.data).split(/\r?\n/);
	var arr = new Array();
	for(const t of txt) {
		if (t.includes('IZMJENE U RASPOREDU')) arr.push(t);
	}
	var i=0;
	var newArr = [];
	for(const table of converted) {
		for (const col of table) {
			if (col[0].match("^([1-4]\.[A-Z])$")) {
				newArr.push([arr[i], col, table[0]]);
			}
		}
		if (table[0][0].toUpperCase().includes('PODNE')) i++;
	}
	return newArr;
}

function arrayEquals(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}

async function get_settings(_guild) {
	const settings = await Guild.findOne({
		guildID: _guild.id
	}, (err,guild) => {
		if (err) console.error(err)
		if (!guild) {
			const newGuild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: _guild.id,
				guildName: _guild.name,
				prefix: config.prefix,
				color: config.color,
				razred: "2.A",
				broadcastChannelId: "0"
			})
	
			newGuild.save()
			.then(result => console.log(result))
			.catch(err => console.error(err));
			return newGuild;
		}
	});
	return settings;
}

async function get_lang(_guild) {
	const lang = await languageSchema.findOne({
		_id: _guild.id
	}, (err,lang) => {
		if (err) console.error(err);
		if (!lang) {
			const newLang = new languageSchema({
				_id: _guild.id,
				language: "english"
			});
			newLang.save()
			.then(result => console.log(result))
			.catch(err => console.error(err));
			return newLang;
		}
	});
	return lang;
}

module.exports = { get_izmjene, arrayEquals, get_settings, get_lang };