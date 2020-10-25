import {Message} from 'discord.js';
import {BotCommand} from '../bot/bot-command';
import {Command, injectableByName} from '../utils/injectable';

@injectableByName('!')
export class PongCommand extends BotCommand {
  @Command('ping')
  public onMessage(message: Message): void {
    message.reply('pong');
  }
}
