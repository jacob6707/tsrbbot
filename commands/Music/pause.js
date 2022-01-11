const { Client, Message } = require("discord.js")
const language = require('../../utils/language')

module.exports = {
    name: 'pause',
    aliases: ['hold'],
    category: 'Music',
    inVoice: true,
    description: 'Pause the song playback.',
    usage: `pause`,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        const {guild} = message
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        if (queue.paused) {
            client.distube.resume(queue);
            return message.channel.send(language(guild, 'RESUME_SONG'));
        }
        client.distube.pause(queue);
        message.channel.send(language(guild, 'PAUSE_SONG'));
    }
}