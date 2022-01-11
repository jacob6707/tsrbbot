const language = require('../../utils/language')

module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    category: 'Music',
    inVoice: true,
    description: 'Stop playback of queue.',
    usage: `stop`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        client.distube.stop(queue)
        message.channel.send(`✅ | ${language(guild, 'STOPPED')}`)
    }
}