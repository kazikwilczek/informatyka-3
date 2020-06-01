const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
const youtube = new Youtube(youtubeAPI);

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['p', 'add'],
      memberName: 'play',
      group: 'music',
      description: 'Puszcza daną muzykę niż playlistę z YouTube',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'query',
          prompt: 'Jakiej piosenki bądź playlisty chciałbyś posłuchać?',
          type: 'string',
          validate: function(query) {
            return query.length > 0 && query.length < 200;
          }
        }
      ]
    });
  }

  async run(message, { query }) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.say('Nie jesteś na kanale głosowym!');

    if (message.guild.triviaData.isTriviaRunning == true) {
      return message.say('Trwa quiz muzyczny! Poczekaj aż się zakończy!');
    }

    if (
      // if the user entered a youtube playlist url
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      const playlist = await youtube.getPlaylist(query).catch(function() {
        return message.say('Playlista jest prywatna bądź nie istnieje!');
      });
      // remove the 10 if you removed the queue limit conditions below
      const videosObj = await playlist.getVideos(10).catch(function() {
        return message.say(
          'Z którąś nutą z playlisty jest problem!'
        );
      });
      for (let i = 0; i < videosObj.length; i++) {
        const video = await videosObj[i].fetch();
        // this can be uncommented if you choose to limit the queue
        // if (message.guild.musicData.queue.length < 10) {
        //
        message.guild.musicData.queue.push(
          this.constructSongObj(video, voiceChannel)
        );
        // } else {
        //   return message.say(
        //     `I can't play the full playlist because there will be more than 10 songs in queue`
        //   );
        // }
      }
      if (message.guild.musicData.isPlaying == false) {
        message.guild.musicData.isPlaying = true;
        return this.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        return message.say(
          `Playlista - :musical_note:  ${playlist.title} :musical_note: została dodana do kolejki!`
        );
      }
    }

    // This if statement checks if the user entered a youtube url, it can be any kind of youtube url
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      query = query
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      const id = query[2].split(/[^0-9a-z_\-]/i)[0];
      const video = await youtube.getVideoByID(id).catch(function() {
        return message.say(
          'Wystąpił problem z jedną nutą z playlisty!'
        );
      });
      
      message.guild.musicData.queue.push(
        this.constructSongObj(video, voiceChannel)
      );
      if (
        message.guild.musicData.isPlaying == false ||
        typeof message.guild.musicData.isPlaying == 'undefined'
      ) {
        message.guild.musicData.isPlaying = true;
        return this.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        const kolejkaEmbed = new MessageEmbed()
          .setDescription(`Utwór **${video.title}** został dodany do kolejki!`)
          .setFooter('Radio Mobilki | Kazik#2642')
          .setColor('#e9f931');
        return message.say(kolejkaEmbed);
      }
    }

    // if user provided a song/video name
    const videos = await youtube.searchVideos(query, 5).catch(function() {
      return message.say(
        'Wystąpił problem z szukaniem nutki :('
      );
    });
    if (videos.length < 5) {
      return message.say(
        `Miałem problem z szukaniem tego, czego chcesz. Postaraj się być konkretniejszy!`
      );
    }
    const vidNameArr = [];
    for (let i = 0; i < videos.length; i++) {
      vidNameArr.push(`${i + 1}: ${videos[i].title}`);
    }
    vidNameArr.push('exit');
    const embed = new MessageEmbed()
      .setColor('#e9f931')
      .setTitle('Wybierz nutkę wpisując numer od 1 do 5')
      .setFooter('Snajper BETA | Kazik#2642 ')
      .addField('Nutka nr 1', vidNameArr[0])
      .addField('Nutka nr 2', vidNameArr[1])
      .addField('Nutka nr 3', vidNameArr[2])
      .addField('Nutka nr 4', vidNameArr[3])
      .addField('Nutka nr 5', vidNameArr[4])
      .addField('Exit', 'exit')
      .setFooter('Radio Mobilki | Kazik#2642');
    var songEmbed = await message.channel.send({ embed });
    var that = this;
    message.channel
      .awaitMessages(
        function(msg) {
          return (msg.content > 0 && msg.content < 6) || msg.content === 'exit';
        },
        {
          max: 1,
          time: 60000,
          errors: ['time']
        }
      )
      .then(function(response) {
        const videoIndex = parseInt(response.first().content);
        if (response.first().content === 'exit') return songEmbed.delete();
        youtube
          .getVideoByID(videos[videoIndex - 1].id)
          .then(function(video) {

            message.guild.musicData.queue.push(
              that.constructSongObj(video, voiceChannel)
            );
            if (message.guild.musicData.isPlaying == false) {
              message.guild.musicData.isPlaying = true;
              if (songEmbed) {
                songEmbed.delete();
              }
              that.playSong(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
              if (songEmbed) {
                songEmbed.delete();
              }
              const returnEmbed = new MessageEmbed()
              .setFooter('Radio Mobilki | Kazik#2642')
              .setDescription(`Utwór **${video.title}** został dodany do kolejki!`)
              .setColor('#e9f931');
              return message.say(returnEmbed);
            }
          })
          .catch(function() {
            if (songEmbed) {
              songEmbed.delete();
            }
            return message.say(
              'Wystąpił problem z pobraniem ID Youtube-API podczas przetwarzania utworu! **POWAŻNY BŁĄD** zgłoś do <@190755326637768704>!!!'
            );
          });
      })
      .catch(function() {
        if (songEmbed) {
          songEmbed.delete();
        }
        return message.say(
          'Spróbuj ponownie wybrać numer od **1** do **5**!'
        );
      });
  }
  playSong(queue, message) {
    const classThis = this; // use classThis instead of 'this' because of lexical scope below
    queue[0].voiceChannel
      .join()
      .then(function(connection) {
        const dispatcher = connection
          .play(
            ytdl(queue[0].url, {
              quality: 'highestaudio',
              highWaterMark: 1024 * 1024 * 10
            })
          )
          .on('start', function() {
            message.guild.musicData.songDispatcher = dispatcher;
            dispatcher.setVolume(message.guild.musicData.volume);
            const videoEmbed = new MessageEmbed()
              .setThumbnail(queue[0].thumbnail)
              .setColor('#e9f931')
              .setFooter('Radio Mobilki | Kazik#2642 ')
              .addField('W trakcie grania:', queue[0].title)
              .addField('Długość nutki:', queue[0].duration);
            if (queue[1]) videoEmbed.addField('Następna piosenka:', queue[1].title);
            message.say(videoEmbed);
            message.guild.musicData.nowPlaying = queue[0];
            return queue.shift();
          })
          .on('finish', function() {
            if (queue.length >= 1) {
              return classThis.playSong(queue, message);
            } else {
              message.guild.musicData.isPlaying = false;
              message.guild.musicData.nowPlaying = null;
              message.guild.musicData.songDispatcher = null;
              return message.guild.me.voice.channel.leave();
            }
          })
          .on('error', function(e) {
            message.say('Nie można zagrać nutki!');
            console.error(e);
            message.guild.musicData.queue.length = 0;
            message.guild.musicData.isPlaying = false;
            message.guild.musicData.nowPlaying = null;
            message.guild.musicData.songDispatcher = null;
            return message.guild.me.voice.channel.leave();
          });
      })
      .catch(function(e) {
        console.error(e);
        return message.guild.me.voice.channel.leave();
      });
  }
  constructSongObj(video, voiceChannel) {
    let duration = this.formatDuration(video.duration);
    if (duration == '00:00') duration = 'Live Stream';
    return {
      url: `https://www.youtube.com/watch?v=${video.raw.id}`,
      title: video.title,
      duration,
      thumbnail: video.thumbnails.high.url,
      voiceChannel
    };
  }
  // prettier-ignore
  formatDuration(durationObj) {
    const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      (durationObj.seconds < 10)
        ? ('0' + durationObj.seconds)
        : (durationObj.seconds
        ? durationObj.seconds
        : '00')
    }`;
    return duration;
  }
};
