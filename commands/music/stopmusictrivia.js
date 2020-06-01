const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class StopMusicTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stop-trivia',
      aliases: [
        'stop-music-trivia',
        'skip-trivia',
        'end-trivia',
        'stop-trivia'
      ],
      memberName: 'stop-trivia',
      group: 'music',
      description: 'Kończuy quiz muzyczny',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT']
    });
  }
  run(message) {
    if (!message.guild.triviaData.isTriviaRunning)
      return message.say('Nie ma żadnegu quizu w tym momencie!');

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.say("Nie ma cię na kanale głosowym!");
    }

    if (!message.guild.triviaData.triviaScore.has(message.author.username)) {
      return message.say(
        'Musisz uczestniczyć w quizie żeby go zakończyć!'
      );
    }

    message.guild.triviaData.triviaQueue.length = 0;
    message.guild.triviaData.wasTriviaEndCalled = true;
    message.guild.triviaData.triviaScore.clear();
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
