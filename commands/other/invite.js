const { prefix } = require('../../config.json');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['i', 'zaproszenie'],
            group: 'other',
            memberName: 'invite',
            description: 'Wysyła zaproszenie, przez które można dodać bota na własny serwer!',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    async run(message) {
        if (message.content.startsWith(`${prefix}invite`)) {
            const discordEmbed = new MessageEmbed()
                .setTitle('Zaproszenie')
                .setColor('#ffffff')
                .setDescription('Witam, chcesz dodać mnie na własny serwer? Nic prostszego! Wystarczy że klikniesz w poniższe zaproszenie:')
                .addField('Zaproszenie:', '[KLIKNIJ TUTAJ](https://top.gg/bot/694869698101379154)', false)
                .addField('Kontakt prywatny', 'Kazik#2642', true)
                .setFooter('Radio Mobilki | Kazik#2642');
            return message.say(discordEmbed);
        }
    }
};