const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Zapętla obecną piosenkę'
    });
  }

  run(message) {
    if (!message.guild.musicData.isPlaying) {
      return message.say('Nie leci żadna piosenka!');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('Nie możesz loopować TRIVI!');
    }
    const videoEmbed = new MessageEmbed()
      .setColor('#e9f931')
      .setDescription(`Utwór **${message.guild.musicData.nowPlaying.title}** został zapętlony! *(RAZ)*`)
      .setFooter("Radio Mobilki | Kazik#2642");
    message.channel.send(videoEmbed);
    message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    return;
  }
};
