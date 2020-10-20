import Discord from 'discord.js';
import {config} from './config';

const client = new Discord.Client();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({status: 'online'});
  }
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(config.DISCORD_TOKEN);
