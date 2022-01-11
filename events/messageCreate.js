const mongoose = require('mongoose');
const Guild = require('../models/guild');
const { Client, Message } = require('discord.js');
const config = require('../config.json');
const { get_settings } = require('../utils/functions');
const language = require('../utils/language');
/**
 * 
 * @param {...Client} client 
 * @param {...Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
    const {guild} = message;
    if (!guild) return;
    const settings = await get_settings(guild);
    if (settings == null) return;
    try {
        if (settings.broadcastChannelId == "0") {
            await settings.updateOne({
                broadcastChannelId: message.channelId.toString()
            });
        }    
    } catch(err) {
        console.error(err);
    }

    if (message.author.bot) return;

    const prefix = settings ? settings.prefix : config.prefix;


    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command?.inVoice && !message.member.voice.channel) return message.channel.send(`❌ | ${language(guild, 'ERR_NOVOICE')}`);

    if (command)
        command.run(client, message, args);
};