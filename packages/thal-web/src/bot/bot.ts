import {Client} from 'discord.js';
import {inject, interfaces} from 'inversify';
import {BotCommand} from './bot-command';
import {Config} from './config';
import {IClient} from './i-client';
import {injectable} from './utils/injectable';
import {container} from './utils/inversify.config';

@injectable()
export class Bot {
  private commands: {[T: string]: interfaces.ServiceIdentifier<BotCommand>} | null = null;

  constructor(@inject(IClient) private client: Client, private config: Config) {
  }

  public setCommands(commands: any) {
    this.commands = commands;
  }

  public start(): Promise<string> {
    const bootSequence: Promise<void>[] = [];
    Object.entries(this.commands || {}).forEach(([key, command]) => {
      // The commands self configure, we just need to inject them from the container.
      const commandInstance = container.get(key) as BotCommand;

      if (commandInstance.start && typeof commandInstance.start === 'function') {
        bootSequence.push(commandInstance.start());
      }
    });

    return Promise.all(bootSequence).then(() => {
      return this.client.login(this.config.discordToken);
    });
  }
}
