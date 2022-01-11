const { Message, Client, Permissions } = require("discord.js");
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');
const puppeteer = require("puppeteer");
const fs = require("fs");
const https = require('https');

function endsWithAny(suffixes, string) {
    for (let suffix of suffixes) {
        if(string.endsWith(suffix))
            return true;
    }
    return false;
}

module.exports = {
    name: 'pdf',
    category: 'Conversion',
    description: 'Pretvori datoteku u PDF (datoteka se šalje kao attachment)',
    usage: `pdf <file attachment>`,
    /** @param {...Client} client
     * @param {...Message} message
     * @param {...String[]} args */
    run: async(client, message, args) => {
        const {guild, attachments} = message;
        const settings = await get_settings(guild);
        const supportedFormats = [ 'docx' ];
        if (attachments.size === 0) return message.channel.send(language(guild, 'ERR_NOATTACH')).then(m => {setTimeout(() => m.delete(), 10000)});
        if (attachments.size === 1) {
            console.log(attachments.first());
            if (endsWithAny(supportedFormats, attachments.first()?.name)) {
                const url = attachments.first()?.url;
                if (url.startsWith("https://")) {
                    const origPath = `../../pdfs/${Date.now()}.docx`;
                    const convPath = `../../pdfs/${Date.now()}.pdf`;
                    const origFile = fs.createWriteStream(origPath);
                    const request = https.get(url, function(response) {
                        response.pipe(origFile);
                        origFile.on('finish', function() {
                            origFile.close();
                        });
                    }).on('error', function(err) {
                        fs.unlink(dest);
                        console.error(err);
                    });
                }
            } else return message.channel.send('lmao ne').then(m => {setTimeout(() => m.delete(), 10000)});
        }
        /*if(!args[0]) return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 10000)});
        if (args[0]?.match(/<#\d{18}>$/) && client.channels.cache.get(args[0].replace(/\D/g,'')) && args.length === 1) {
            var id = args[0].replace(/\D/g,'');
            await settings.updateOne({
                broadcastChannelId: id
            });
            return message.channel.send(`${language(guild, 'CHANNEL_SET')} <#${id}>`);
        } else if(args.length > 1) {
            return message.channel.send(language(guild, 'ERR_ONEARG')).then(m => {setTimeout(() => m.delete(), 10000)});
        } else {
            return message.channel.send(`${language(guild, 'ERR_NOCHANNEL')} ${args[0]}`).then(m => {setTimeout(() => m.delete(), 10000)});
        }*/
    },
};