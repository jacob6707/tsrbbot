const language = require('../../utils/language');

module.exports = {
    name: 'filter',
    aliases: ['filters'],
    category: 'Music',
    inVoice: true,
    description: 'Set an audio filter to the music playback',
    usage: `filter [filter/off]`,
    run: async (client, message, args) => {
        const {guild} = message;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${language(guild, 'ERR_NOQUEUE')}`);
        if (args[0] === "off" && queue.filters) client.distube.setFilter(queue, queue.filters)
        else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(queue, args[0])
        else if (args[0]) return message.channel.send(`❌ | ${language(guild, 'ERR_NOFILTER')}`)
        if (queue.filters.length > 0) message.channel.send(`${language(guild, 'CURR_FILTER')} \`${queue.filters || language(guild, 'OFF')}\``)
        else message.channel.send(`${language(guild, 'CURR_FILTER')} \`${language(guild, 'OFF')}\``);
    }
}