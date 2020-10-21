import {Client, User} from 'discord.js';
import {inject} from 'inversify';
import {IClient} from '../i-client';
import {injectable} from '../utils/injectable';

@injectable()
export class BotCommand {
  public get user(): User {
    if (!this.client.user) {
      throw new Error('User not loaded');
    }

    return this.client.user;
  }

  constructor(@inject(IClient) protected client: Client) {
    console.log('Loading command', this.constructor.name);
  }
}

