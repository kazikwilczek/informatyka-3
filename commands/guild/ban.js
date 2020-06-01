const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'guild',
      description: 'Banuje oznaczonego użytkownika',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Oznacz użytkownika którego chcesz zbanować!',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Czemu chcesz go zbanować? [powód]',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToBan);
    if (user == undefined)
      return message.channel.send('Spróbuj ponownie z poprawnym użytkownikiem!');
    user
      .ban(reason)
      .then(() => {
        const banEmbed = new MessageEmbed()
          .addField('Zbanowano:', userToBan)
          .addField('Powód', reason)
          .setColor('#420626')
          .setFooter('Radio Mobilki | Kazik#2642 ');
        message.channel.send(banEmbed);
      })
      .catch(e => {
        message.say(
          'Coś poszło nie tak. Nie mogę go zbanować, hmm 🤔.. Może nie mam permisji?'
        );
        return console.error(e);
      });
  }
};
