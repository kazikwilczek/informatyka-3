const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Usuwa konkretną piosenkę z kolejki',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt: 'Podaj numer piosenki który chciałbyś usunąć z kolejki:',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Wpisz poprawny numer piosenki');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale głosowym!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie leci teraz żadna nutka!');
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setFooter('Radio Mobilki | Kazik#2642 ')
      .setDescription(`Usunięto piosenkę o numerze ${songNumber} z kolejki`);
    return message.say(videoEmbed);
  }
};
