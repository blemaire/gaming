import {Message} from 'discord.js';
import {BotCommand} from '../bot/bot-command';
import {Command, injectable} from '../utils/injectable';

@injectable('!')
export class PongCommand extends BotCommand {
  @Command('ping')
  public onMessage(message: Message): void {
    message.reply('pong');
  }
}
