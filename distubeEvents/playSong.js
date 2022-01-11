const { Message, MessageEmbed, Client } = require("discord.js");
const { Queue, Song } = require("distube");
const { get_settings } = require("../utils/functions");
const language = require('../utils/language');
const status = (queue,guild) => `${language(guild, 'VOLUME')} \`${queue.volume}%\` | ${language(guild, 'FILTER')} \`${queue.filter || language(guild,'OFF')}\` | ${language(guild,'LOOP')} \`${queue.repeatMode ? queue.repeatMode === 2 ? language(guild, 'ALL_QUEUE') : language(guild, 'THIS_SONG') : language(guild,'OFF')}\` | ${language(guild,'AUTOPLAY')} \`${queue.autoplay ? language(guild, 'ON') : language(guild, 'OFF')}\``

/**
 * 
 * @param {Client} client
 * @param {Queue} queue 
 * @param {Song} song 
 */
module.exports = async(client, queue, song) => {
    const guild = client.guilds.cache.get(queue.id)
    const settings = await get_settings(queue.textChannel.guild);
    const color = settings.color;
    const thumbnail = song.thumbnail;
    const songName = song.name;
    const url = song.url;
    const queueStatus = status(queue, guild);
    const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor('✅ | Playing')
    .setThumbnail(`${thumbnail}`)
    .setTitle(`${songName}`)
    .setURL(`${url}`)
    .setDescription(`\`[0:00 / ${song.formattedDuration}]\`\n\n[${queueStatus}]\n\n${language(guild, 'REQ_BY')} ${song.user}`);
    queue.textChannel.send({embeds: [embed]});
};