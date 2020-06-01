const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold', 'stop'],
      memberName: 'pause',
      group: 'music',
      description: 'Pauzuje obecną nutkę',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.say('Nie leci żadna nutka!');
    }
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setFooter('Radio Mobilki | Kazik#2642 ')
      .setDescription('**Zapauzowane!** :pause_button:')
      .setFooter("Radio Mobilki | Kazik#2642");
    message.say(videoEmbed);

    message.guild.musicData.songDispatcher.pause();
  }
};
