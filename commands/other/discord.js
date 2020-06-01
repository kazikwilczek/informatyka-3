const { prefix } = require('../../config.json');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class DiscordCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord',
            aliases: ['server', 'server-discord'],
            group: 'other',
            memberName: 'discord',
            description: 'Wysyła pomoc!',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    async run(message) {
        if(message.content.startsWith(`${prefix}discord`|| `${prefix}help`)) {
            const discordEmbed = new MessageEmbed()
            .setTitle('Szukasz pomocy?')
            .setColor('#00a6ff')
            .setDescription('Cześć, zauważyłem, że potrzebujesz pomocy, prawda? Świetnie się składa!')
            .addField('Serwer Discord', '[KLIKNIJ TUTAJ](https://discord.gg/8ABJZPj)', false)
            .addField('Kontakt prywatny', 'Kazik#2642', true)
            .setFooter('Radio Mobilki | Kazik#2642');
            return message.say(discordEmbed);
        }
    }
};