const { MessageActionRow } = require("discord.js");
const language = require('../../utils/language')

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    inVoice: true,
    description: 'View current play queue',
    usage: `queue`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        const q = queue.songs.map((song, i) => `${i === 0 ? language(guild,'QUEUE_PLAYING') : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n");
        message.channel.send(`📄 | **${language(guild, 'QUEUE')}**\n${q}`);
    }
}
