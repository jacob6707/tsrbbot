const { Message, Client } = require("discord.js");
const { Queue, Song } = require("distube");
const language = require('../utils/language');
/**
 * 
 * @param {Client} client
 * @param {Queue} queue 
 * @param {Song} song 
 */
module.exports = (client, queue, song) => {
    const guild = client.guilds.cache.get(queue.id);
    queue.textChannel.send(`✅ | ${language(guild, 'ADDED_SONG')} **${song.name}** - \`${song.formattedDuration}\` ${language(guild, 'TO_QUEUE_BY')} ${song.user}`);
};