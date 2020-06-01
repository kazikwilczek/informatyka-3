const { Command } = require('discord.js-commando');
const { Client, Discord, MessageEmbed, Collection} = require('discord.js');
module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['says', 'say-s'],
      memberName: 'say',
      group: 'other',
      description: 'Pisze wiadomośc poprzez bota',
      args: [
        {
          key: 'text',
          prompt: 'Co chcesz żeby bot powiedział?',
          type: 'string'
        }
      ]
     });
  }
    
  
  run(message, { text }) {
  
      const heheembed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(text)
        .setTimestamp()
        .setFooter('Radio Mobilki | Kazik#2642 ')
        .setAuthor(message.author.username, message.author.displayAvatarURL);
      if (message.deletable) message.delete();
      return message.channel.send(heheembed);

    
  }
};

