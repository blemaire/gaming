import 'reflect-metadata';
import {Bot} from './bot/bot';
import * as commands from './commands';
import {container} from './utils/inversify.config';

let bot = container.get<Bot>(Bot);

bot.setCommands(commands);
bot.start();
