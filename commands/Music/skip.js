const language = require('../../utils/language')

module.exports = {
    name: 'skip',
    category: 'Music',
    inVoice: true,
    description: 'Skip song.',
    usage: `skip`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        if (queue.songs.length < 2) return message.channel.send(`❌ | ${language(guild, 'ERR_SKIPLAST')}`);
        try {
            client.distube.skip(queue)
            message.channel.send(`✅ | ${language(guild, 'SKIPPED')}`)
        } catch (e) {
            message.channel.send(`❌ | ${language(guild, 'ERR_SKIPLAST')}`)
            console.log(e);
        }
    }
}