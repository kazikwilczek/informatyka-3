const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class FortuneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fortune',
      aliases: ['fortune-cookie'],
      group: 'other',
      memberName: 'fortune',
      description: 'Wyświetla poradę',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }

  async run(message) {
    try {
      const res = await fetch('http://yerkee.com/api/fortune');
      const json = await res.json();
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter('Radio Mobilki | Kazik#2642 ')
        .setTitle('Ciasteczko Fortuny')
        .setDescription(json.fortune);
      return message.say(embed);
    } catch (e) {
      message.say('Nie mogę wyświetlić ciasteczka :confused: ');
      return console.error(e);
    }
  }
};
