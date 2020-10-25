import {Client} from 'discord.js';
import {inject, interfaces} from 'inversify';
import {Config} from '../config';
import {IClient} from '../i-client';
import {injectable} from '../utils/injectable';
import {container} from '../utils/inversify.config';
import {BotCommand} from './bot-command';

@injectable()
export class Bot {
  private commands: {[T: string]: interfaces.ServiceIdentifier<BotCommand>} | null = null;

  constructor(@inject(IClient) private client: Client, private config: Config) {
    console.log('bot boot');
  }

  public setCommands(commands: any) {
    this.commands = commands;
  }

  public start(): Promise<string> {
    Object.values(this.commands || {}).forEach(name => {
      // The commands self configure, we just need to inject them from the container.
      container.get(name as interfaces.ServiceIdentifier<any>);
    });

    return this.client.login(this.config.token);
  }
}
