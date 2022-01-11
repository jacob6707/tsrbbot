const language = require('../../utils/language')

module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
    category: 'Music',
    inVoice: true,
    description: 'Set playback to repeat.',
    usage: `repeat <off/song/queue>`,
    run: async (client, message, args) => {
        const {guild} = message;
        if (args.length < 1) return message.channel.send(`❌ | ${language(guild, 'ERR_NOREPEATARG')}`);
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        if (mode === null) return message.channel.send(`❌ | ${language(guild, 'ERR_INVALIDREPEATMODE')}`);
        mode = client.distube.setRepeatMode(queue, mode);
        mode = mode ? mode === 2 ? language(guild, 'REPEAT_QUEUE') : language(guild, 'REPEAT_SONG') : language(guild, 'OFF');
        message.channel.send(`🔁 | ${language(guild, 'SET_REPEAT_MODE')} \`${mode}\``);
    }
}