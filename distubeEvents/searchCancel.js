const { Message, Client } = require("discord.js");
const { SearchResult } = require("distube");
const language = require('../utils/language');
/**
 * 
 * @param {Client} client
 * @param {Message} message 
 * @param {string} query
 */
module.exports = (client, message, query) => {
    const {guild} = message;
    message.channel.send(`❌ | ${language(guild, 'ERR_SEARCH_CANCELLED')}`);
};