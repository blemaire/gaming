import {BotCommand} from '../bot/bot-command';
import {OnReady} from '../bot/events';
import {injectable} from '../utils/injectable';

@injectable()
export class LoginStatus extends BotCommand implements OnReady {
  public onReady() {
    if (this.client.user) {
      console.log(`Logged in as ${this.client.user.tag}!`);
      this.client.user.setPresence({status: 'online'});
    }
  }
}
