const { Command } = require('discord.js-commando');

module.exports = class ResetCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            aliases: ['reset-bot', 'bot-reset'],
            description: 'RESETUJE BOTA',
            group: 'guild',
            memberName: 'reset',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES']
        });
    }

    run(message) {
        switch (message.content.toUpperCase()) {
            case '%reset':
                resetBot(message.channel);
                break;

        }
    }
};



function resetBot(channels) {
    const restartEmbed = new Discord.RichEmbed();
    restartEmbed.addField('**Cykliczna konserwacja Papaja**', 'Cykliczna konserwacja bota <@688758377253568528> **właśnie się zaczyna!**', true);
    restartEmbed.setColor(kolory.cream);
    restartEmbed.setFooter('Papaj v2.0 | Kazik#2642', client.user.displayAvatarURL);
    client.channels.get('692397972431831041').send(restartEmbed)
        .then(msg => client.destroy())
        .then(() => client.login(TOKEN));
    const porestarcieEmbed = new Discord.RichEmbed();
    porestarcieEmbed.addField('**Cykliczna konserwacja Papaja**', 'Cykliczna konserwacja bota <@688758377253568528> **powiodła się!**', true);
    porestarcieEmbed.setColor(kolory.green);
    porestarcieEmbed.setFooter('Papaj v2.0 | Kazik#2642', client.user.displayAvatarURL);
    client.channels.get('692397972431831041').send(porestarcieEmbed);
};