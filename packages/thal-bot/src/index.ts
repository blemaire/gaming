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


const express = require('express')
const app = express()
const port = 80

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
