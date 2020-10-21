import {Client} from 'discord.js';
import {inject, interfaces} from 'inversify';
import {Config} from '../config';
import {IClient} from '../i-client';
import {injectable} from '../utils/injectable';
import {container} from '../utils/inversify.config';
import {BotCommand} from './bot-command';
import {ARGUMENT_LESS_EVENTS} from './events';

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
      const command = container.get(name as interfaces.ServiceIdentifier<any>);

      Object.entries(ARGUMENT_LESS_EVENTS).forEach(([event, method]) => {
        if (typeof command[method] === 'function') {
          this.client.on(event, command[method].bind(command));
        }
      });
    });

    return this.client.login(this.config.token);
  }
}
