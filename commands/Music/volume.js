const language = require('../../utils/language')

module.exports = {
    name: 'volume',
    aliases: ['v', 'set-vol', 'set-volume'],
    category: 'Music',
    inVoice: true,
    description: 'Set playback volume.',
    usage: `volume <vol>`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`❌ | ${language(guild, 'ERR_NAN')}`)
        client.distube.setVolume(queue, volume)
        message.channel.send(`✅ | ${language(guild, 'VOLUME_SET')} \`${volume}\``)
    }
}