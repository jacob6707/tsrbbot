const { Client, TextChannel } = require("discord.js");
const language = require('../utils/language');

/**
 * 
 * @param {Client} client
 * @param {TextChannel} channel 
 * @param {Error} err
 */
module.exports = (client, channel, err) => {
    const {guild} = channel;
    channel.send(`❌ | ${language(guild, 'DIST_ERROR_OCCURED')} ${err}`);
    console.log(err);
};