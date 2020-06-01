const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Wznawia piosenkę po jej zapauzowaniu',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale głosowym!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('Nie leci teraz żadna nutka!');
    }
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setFooter('Radio Mobilki | Kazik#2642 ')
      .setDescription('**Piosenka wznowiona** ⏯!');
      message.say(videoEmbed);

    message.guild.musicData.songDispatcher.resume();
  }
};
