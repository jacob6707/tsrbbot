const cron = require('node-cron');
const func = require('../utils/functions');
const config = require('../config.json');
const { Client } = require('discord.js');
const { loadLanguages } = require('../utils/language');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    const result = await loadLanguages(client);
    console.log(result);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'dnd',
        activities: [{
            name: 'Masa Kohut',
            type: 'LISTENING'
        }]
    });
    func.get_izmjene(client,config.aSmjena);
    cron.schedule('0 * 6-23 * * *', () => {
        func.get_izmjene(client,config.aSmjena);
    });
};