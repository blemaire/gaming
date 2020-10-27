import {Client} from 'discord.js';
import {inject} from 'inversify';
import {BotCommand} from '../bot-command';
import {IClient} from '../i-client';
import {TwitchClient} from '../twitch/twitch-client';
import {injectableByName, On} from '../utils/injectable';

@injectableByName()
export class LiveTwitchChannels extends BotCommand {
  constructor(@inject(IClient) client: Client, private twich: TwitchClient) {
    super(client);
  }

  @On('ready')
  public onReady() {

  }

  public start(): Promise<void> {
    return this.twich.start();
  }
}
