import * as tmi from 'tmi.js';

export interface ICommand {
  args: boolean;
  client: tmi.Client;
  command: string;
  description: string;
  usage: string;

  exec(target: string, context: Record<string, string>, msg: string, ...args: string[]): void;
}
