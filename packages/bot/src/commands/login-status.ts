import {BotCommand} from '../bot/bot-command';
import {injectableByName, On} from '../utils/injectable';

@injectableByName()
export class LoginStatus extends BotCommand {
  @On('ready')
  public onReady() {
    if (this.client.user) {
      console.log(`Logged in as ${this.client.user.tag}!`);
      this.client.user.setPresence({status: 'online'});
    }
  }
}
