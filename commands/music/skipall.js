const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Przewija wszystkie piosenki w kolejce',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Nie ma cię na kanale!');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Nic nie leci!');
    }
    if (!message.guild.musicData.queue)
      return message.say('Nie ma żadnych piosenek w kolejce!');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0; // clear queue
    return;
  }
};
