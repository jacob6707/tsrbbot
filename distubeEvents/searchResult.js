const { Message, Client, MessageEmbed } = require("discord.js");
const { SearchResult } = require("distube");
const { get_settings } = require('../utils/functions');
const language = require('../utils/language');
/**
 * 
 * @param {Client} client
 * @param {Message} message 
 * @param {SearchResult} result
 */
module.exports = async(client, message, result) => {
    const {guild} = message;
    const settings = await get_settings(guild);
    const color = settings.color;
    let i = 0;
    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(language(guild, 'SEARCH_CHOOSEOPTION'))
    .setFooter(`*${language(guild, 'SEARCH_FOOTER')}*`);
    message.channel.send({embeds: [embed.setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)]});
};