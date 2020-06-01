const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { yandexAPI } = require('../../config.json');
const ISO6391 = require('iso-639-1');
const fetch = require('node-fetch');

module.exports = class TranslateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'translate',
      memberName: 'translate',
      group: 'other',
      description:
        'Tłumaczy konkretną frazę na dany język (tylko języki wspierane)',
      throttling: {
        usages: 2,
        duration: 12
      },
      args: [
        {
          key: 'targetLang',
          prompt:
            'Na jaki język chciałbyś przetłumaczyć frazę?',
          type: 'string',
          validate: text => text.length < 3000
        }
      ]
    });
  }

  async run(message, { targetLang }) {
    const langCode = ISO6391.getCode(targetLang);
    if (langCode === '')
      return message.channel.send('Wprowadź poprawny język!');

    // text needs to be less than 3000 length

    await message.channel.send(
      `Co chciałbyś przetłumaczyć na język ${targetLang}?`
    );

    try {
      const filter = msg => msg.content.length > 0 && msg.content.length < 3000;
      var response = await message.channel.awaitMessages(filter, {
        max: 1,
        maxProcessed: 1,
        time: 90000,
        errors: ['time']
      });
      var text = response.first().content;
    } catch (e) {
      return message.channel.send('Nic nie wpisałeś?');
    }

    try {
      var res = await fetch(
        // Powered by Yandex.Translate http://translate.yandex.com/
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPI}&text=${encodeURI(
          text
        )}&lang=${langCode}`
      );
      const json = await res.json();
      message.channel.send(embedTranslation(json.text[0]));
    } catch (e) {
      console.error(e);
      return message.say(
        'Coś poszło nie tak...'
      );
    }

    function embedTranslation(text) {
      return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Tłumaczenie')
        .setURL('http://translate.yandex.com/')
        .setDescription(text)
        .setFooter('Radio Mobilki | Kazik#2642 | Collabo: Yandex Translate');
    }
  }
};
