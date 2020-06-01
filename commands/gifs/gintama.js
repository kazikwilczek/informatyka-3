// const fetch = require("node-fetch");
// const { tenorAPI } = require("../config.json");
const fs = require('fs');
const { Command } = require('discord.js-commando');

module.exports = class GintamaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gintama',
      group: 'gifs',
      memberName: 'gintama',
      description: 'Gintama GIF!',
      throttling: {
        usages: 2,
        duration: 8
      }
    });
  }

  run(message) {
    try {
      const linkArray = fs
        .readFileSync('resources/gifs/gintamalinks.txt', 'utf8')
        .split('\n');
      const link = linkArray[Math.floor(Math.random() * linkArray.length)];
      return message.say(link);

    
    } catch (e) {
      message.say('Nie udało się znaleźć GIFa! :slight_frown:');
      return console.error(e);
    }
  }
};
