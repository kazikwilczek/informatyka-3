const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed } = require('discord.js');
const path = require('path');
const { prefix, token } = require('./config.json');
const fs = require('fs');

Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: '190755326637768704' // change this to your Discord user ID
});
client.once('ready', () => {
  console.log(`${client.user.username} działa!`);

  const moment = require("moment");
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    let ii = 0;
    try {
      var pings = setInterval(function () { 
        const index = ++ii;
        console.log(`${timestamp} PING: ${index}`);
        if (index === 10) {
          clearInterval(pings);
          console.log(`${timestamp} PING wyniósł 10ms => następuje reset pingu!`);
          let activities = [`%help`, `Miłego życzę!`, `Zawsze pomocny!`, `Ping: ${index}ms`, `PREFIX: ${prefix}`, `${prefix}discord`], i = 0;
          setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "LISTENING" }), 10000)
        }
      }, 1500);
    } catch (error) {
      console.error(`${timestamp} ERROR: ${error.stack}`);
      message.channel.send("An error occurred.");
    }


});


client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music Command Group'],
    ['gifs', 'Gif Command Group'],
    ['other', 'random types of commands group'],
    ['guild', 'guild related commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));




async function verifyTime3() {
  var d = new Date();

  if ((d.getHours() == 12) && (d.getMinutes() == 30)) {

    try {
      const jsonQuotes = fs.readFileSync(
        'resources/quotes/motivational.json',
        'utf8'
      );
      const quoteArray = JSON.parse(jsonQuotes).quotes;
      const channel = client.channels.cache.get("698339226772701214"); //cytat-dnia || Zaplecze Kazikowskie
      const secondchannel = client.channels.cache.get("682324065742225439"); //spacerniak || PAPAJE Discord z Patrykiem
      const randomQuote =
        quoteArray[Math.floor(Math.random() * quoteArray.length)];

      const quoteEmbed = new MessageEmbed()
        .setTitle('Cytat dnia:')
        .setDescription(
          `**${randomQuote.text}** 
          ~ *${randomQuote.author}*`)
        .setFooter('Radio Mobilki | Kazik#2642 ')
        .setColor('#ff003c');
        return (channel.send(quoteEmbed) && secondchannel.send(quoteEmbed));
    } catch (error) {
      console.error(`${error}`);
    }
    setTimeout(() => {
      verifyTime3();
    }, 61 * 1000);
  } else {
    setTimeout(() => {
      verifyTime3();
    }, 1000);
  }
};


client.login(process.env.token);

setTimeout(() => {
    verifyTime3();
}, 5000);