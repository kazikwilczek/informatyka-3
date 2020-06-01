const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Skipuje do konkretnej piosenki w kolejce',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            'Jaki jest numer piosenki do której chciałbyś skipnąć? **(Musi być większy niż 1!)**',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Wpisz poprawny numer');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale głosowym!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie leci teraz żadna nutka!');
    }

    if (message.guild.musicData.queue < 1)
      return message.say('Nie ma piosenek w kolejce!');

    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
