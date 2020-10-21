import {Message} from 'discord.js';
import {BotCommand} from '../bot/bot-command';
import {OnMessage} from '../bot/events';
import {injectable} from '../utils/injectable';

@injectable()
export class PongCommand extends BotCommand implements OnMessage {
  public onMessage(message: Message): void {
    if (message.content.toLocaleLowerCase() === 'ping') {
      message.reply('pong');
    }
  }
}
