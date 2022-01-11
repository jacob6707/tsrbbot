const language = require('../../utils/language')

module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause', 'r'],
    category: 'Music',
    inVoice: true,
    description: 'Resume playback',
    usage: `resume`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        if (!queue.paused) return message.channel.send(`❌ | ${language(guild, 'ERR_QUEUEPLAYING')}`)
        client.distube.resume(queue)
        message.channel.send(language(guild, 'RESUME_SONG'))
    }
}
