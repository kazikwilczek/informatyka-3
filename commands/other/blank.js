
const { prefix } = require('../../config.json');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class DiscordCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blank',
            aliases: ['blank'],
            group: 'other',
            memberName: 'blank',
            description: 'Wysyła puste pole do skopiowania (w razie nagłej potrzeby 😉)',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    async run(message) {
        if (message.content.startsWith(`${prefix}blank`)) {
            const discordEmbed = new MessageEmbed()
                .setTitle('Ooh, puste pole tak?')
                .setColor('#ffffff')
                .setDescription('Oto twoje puste pole! Po prostu skopiuj wiadomość poniżej:')
                .addField('‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎', '`‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎‎‎‏‏‎ ‎`', false)
                .setFooter('Radio Mobilki | Kazik#2642');
            return message.say(discordEmbed);
        }
    }
};