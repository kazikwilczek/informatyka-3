const { Command } = require('discord.js-commando');

module.exports = class RandomNumberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'random',
      aliases: ['random-number', 'number-between'],
      memberName: 'random',
      group: 'other',
      description: 'Generuje randomowy numer',
      args: [
        {
          key: 'min',
          prompt: 'Jaki jest **minimalny** numer?',
          type: 'integer'
        },
        {
          key: 'max',
          prompt: 'Jaki jest **maksymalny** numer?',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { min, max }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return message.say(Math.floor(Math.random() * (max - min + 1)) + min);
  }
};
