const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 's'],
      memberName: 'skip',
      group: 'music',
      description: 'Przwija do następnej piosenki',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie leci żadna nutka!');
    }
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setFooter('Radio Mobilki | Kazik#2642 ')
      .setDescription('**Skipnięte!** ⏭')
      message.say(videoEmbed);
    message.guild.musicData.songDispatcher.end();
  }
};
