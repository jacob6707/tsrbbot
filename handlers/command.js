const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Status');

module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let cmd = require(`../commands/${dir}/${file}`);

            if (cmd.name) {
                client.commands.set(cmd.name, cmd);
                table.addRow(file, '✅ Loaded!');
            } else {
                table.addRow(file, '❌ -> Command failed to load, please check your work again!');
                continue;
            }

            if (cmd.aliases && Array.isArray(cmd.aliases))
                cmd.aliases.forEach(alias => {
                    return client.aliases.set(alias, cmd.name);
                });
        }

        console.log(table.toString());
    })
}