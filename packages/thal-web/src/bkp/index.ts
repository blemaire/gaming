// import * as tmi from 'tmi.js';
// import {config} from './config';
// import {App} from './app';
//
// const client = tmi.client(config.config.twitter);
//
// new App(client).start();
//
// client.on('connected', function onConnectedHandler(addr, port) {
//   console.log(`* Connected to ${addr}:${port}`);
// });
//
// client.connect();

import express from 'express';

// @ts-ignore
const PORT = process.env.PORT || 3000;

const app = express();
app.get('/', (req: any, res: any) => res.send('Hello World! from master'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
