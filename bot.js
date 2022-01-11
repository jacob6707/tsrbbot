const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');
client.distube = new DisTube(client, { searchSongs: 5, emitNewSongOnly: true, leaveOnFinish: true, plugins: [new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
    },
})]});
client.categories = fs.readdirSync('./commands/');
client.izmjeneA = [];
client.izmjeneB = [];

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

fs.readdir('./distubeEvents/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./distubeEvents/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded DisTube event '${evtName}'`);
        client.distube.on(evtName, evt.bind(null, client));
    });
});

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
});

client.mongoose.init();
client.login(process.env.TOKEN);