const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class AnimegifCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'animegif',
      group: 'gifs',
      aliases: ['anime-gif', 'anime-gifs'],
      memberName: 'animegif',
      description:
        'Wpisz nazwę programu anime a ja pokażę Ci GIF adekwatny do tego!',
      throttling: {
        usages: 1,
        duration: 4
      }
    });
  }

  run(message) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=anime&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(e => {
        message.say('Nie udało się znaleźć gifa, przykro mi :C :slight_frown:');
        // console.error(e);
        return;
      });
  }
};
