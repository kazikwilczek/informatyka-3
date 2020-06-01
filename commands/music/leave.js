const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end', 'dc'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Opuszcza kanał głosowy'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie jesteś na kanale głosowym!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nie leci żadna piosenka!');
    }
    if (!message.guild.musicData.queue)
      return message.say('Nie ma żadnej piosence w kolejce!');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  }
};
