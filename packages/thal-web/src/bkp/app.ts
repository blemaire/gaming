import * as tmi from 'tmi.js';
import * as commands from './commands';
import {ICommand} from './commands';

export class App {
  private commands = new Map<string, ICommand>();

  constructor(private client: tmi.Client) {
    this.loadCommands();
  }

  public start() {
    this.client.on('message', (target, context, message, self) => {
      const [command, ...args] = message.trim().split(/ /);

      if (self) {
        return;
      }

      if (!this.commands.has(command)) {
        return;
      }

      (this.commands.get(command) as ICommand).exec(target, context, message, ...args);
    });
  }

  private loadCommands() {
    for (let command of Object.values(commands)) {
      const currentCommand = new command(this.client);
      this.commands.set(`!${currentCommand.command}`, currentCommand);
    }
  }
}
