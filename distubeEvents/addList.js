const { Client } = require("discord.js");
const { Queue, Playlist } = require("distube");
const language = require('../utils/language');
/**
 * 
 * @param {Client} client
 * @param {Queue} queue 
 * @param {Playlist} list 
 */
module.exports = (client, queue, list) => {
    const guild = client.guilds.cache.get(queue.id)[1];
    queue.textChannel.send(`✅ | ${language(guild, 'ADDED_PLAYLIST')} **${list.name}** \`${list.songs.length} ${language(guild, 'SONGS')}\` ${language(guild, 'TO_QUEUE')}`)
};