const { Message, MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const { get_settings } = require("../../utils/functions");
const Guild = require("../../models/guild");
const language = require('../../utils/language');

module.exports = {
    name: 'izmjene',
    category: 'Information',
    description: 'Posalje trenutne izmjene sa TSRB stranice',
    usage: `izmjene [class]`,
    /** @param {...Message} message */
    run: async(client, message, args) => {
        const {guild} = message;
        const settings = await get_settings(guild);
        if (settings.printIzmjene == false) return message.channel.send(language(guild, 'ERR_PRINTDISABLED'));
        var raz = "1.A";
        if (args[0]) raz = args[0];
        else raz = settings ? settings.razred : "1.A";
        const color = settings ? settings.color : config.color;
        const embed = new MessageEmbed()
        .setTitle(`${language(guild, 'IZMJENE_IZMJENE')} (${raz})`)
        .setColor(color);
        izmjene = new Array();
        if (raz.match("[ABCDO]")) { izmjene = client.izmjeneA; embed.setURL('https://tsrb.hr/a-smjena')}
        else if (raz.match("[EFGMN]")) { izmjene = client.izmjeneB; embed.setURL('https://tsrb.hr/b-smjena')}
        else return message.channel.send(language(guild, 'ERR_NOCLASS'));
        for(izmjena of izmjene) {
            if (izmjena[1][0] === raz) {
                var iz = new String("```");
                for(var i in izmjena[1]) {
                    if (i != 0) iz = iz.concat(`${izmjena[2][i].toString().replaceAll(".","").padStart(2," ")}. sat = ` + izmjena[1][i] + "\n");
                }
                iz = iz.concat("```")
                embed.addField(izmjena[0] + "\n" + izmjena[2][0], iz);
            }
        }
        message.channel.send({embeds: [embed]});
    },
};