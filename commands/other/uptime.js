const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'uptime',
      aliases: ['alive', 'up'],
      memberName: 'uptime',
      group: 'other',
      description: "Pokazuje czas jaki bot jest online"
    });
  }
  run(message) {
    var seconds = parseInt((this.client.uptime / 1000) % 60),
      minutes = parseInt((this.client.uptime / (1000 * 60)) % 60),
      hours = parseInt((this.client.uptime / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const uptimeEmbed = new MessageEmbed()
    .setColor('#ffffff')
    .setFooter('Radio Mobilki | Kazik#2642')
    .setDescription(`📈 Jestem online **${hours}** godzin, **${minutes}** minut i **${seconds}** sekund! 📈`)
    return message.say(uptimeEmbed);
  }
};
