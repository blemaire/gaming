import {BotCommand} from '../bot/bot-command';
import {injectable, On} from '../utils/injectable';

@injectable()
export class LoginStatus extends BotCommand {
  @On('ready')
  public onReady() {
    if (this.client.user) {
      console.log(`Logged in as ${this.client.user.tag}!`);
      this.client.user.setPresence({status: 'online'});
    }
  }
}
