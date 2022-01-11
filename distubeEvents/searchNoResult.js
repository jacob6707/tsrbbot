const { Message, Client } = require("discord.js");
const language = require('../utils/language');
/**
 * 
 * @param {Client} client
 * @param {Message} message 
 * @param {string} query
 */
module.exports = (client, message, query) => {
    const {guild} = message;
    message.channel.send(`${language(guild, 'ERR_SEARCH_NORESULT')} ${query}!`);
};