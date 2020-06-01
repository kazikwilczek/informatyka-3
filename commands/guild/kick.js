const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-member', 'throw'],
      memberName: 'kick',
      group: 'guild',
      description: 'Wyrzuca oznaczonego użytkownika',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt: 'Kogo chcesz wyrzucić?',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Dlaczego chcesz wyrzucić tego użytkownika?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToKick, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToKick);
    if (user == undefined)
      return message.channel.send('Spróbuj ponownie z poprawnym użytkownikiem!');
    user
      .kick(reason)
      .then(() => {
        //message.say(`Kicked ${userToKick} reason: ${reason}`)
        const kickEmbed = new MessageEmbed()
          .addField('Wyrzucono:', userToKick)
          .addField('Powód:', reason)
          .setFooter('Radio Mobilki | Kazik#2642 ')
          .setColor('#420626');
        message.channel.send(kickEmbed);
      })
      .catch(e => {
        message.say(
          'Coś poszło nie tak. Nie mogę go zbanować, hmm 🤔.. Może nie mam permisji?'
        );
        return console.error(e);
      });
  }
};
