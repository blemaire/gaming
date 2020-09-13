import * as tmi from 'tmi.js';
import {config} from './config';
import {App} from './app';

const client = tmi.client(config.config.twitter);

new App(client).start();

client.on('connected', function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
});

client.connect();
