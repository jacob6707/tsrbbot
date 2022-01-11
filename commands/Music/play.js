const { Client, Message } = require("discord.js")
const language = require('../../utils/language')

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    inVoice: true,
    description: 'Play a song from YouTube',
    usage: `play <song name or URL>`,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        const {guild} = message;
        const query = args.join(" ");
        if (!query) return message.channel.send(`❌ | ${language(guild, 'ERR_NOSONGSPECIFIED')}`);
        try {
            client.distube.play(message, query);
        } catch(e) {
            message.channel.send(`❌ | ${language(guild, 'ERR_GENERIC')} \`${e}\``)
        }
    }
}