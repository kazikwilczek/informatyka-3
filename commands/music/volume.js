const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Dostosowywuje głośność danej piosenki (w skali procentowej)',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt: 'Jaką głośność nutki ustawić? **Od 1 do 200**',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 200
        }
      ]
    });
  }

  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale głosowym!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie leci teraz żadna nutka!');
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setFooter('Radio Mobilki | Kazik#2642 ')
      .setDescription(`Obecny poziom głośności: **${wantedVolume}%**`);
    message.say(videoEmbed);
  }
};
