import {Client, Message} from 'discord.js';
import {injectable as inversifyInjecatble} from 'inversify';
import {IClient} from '../i-client';
import {container} from './inversify.config';

export interface __Command {
  __TOKEN: string;
  __CMD_PREFIX: string;
}

export function injectable(prefix?: string) {
  return function (target: any) {
    inversifyInjecatble()(target);
    container.bind(target).to(target).inSingletonScope();
    target.prototype.__TOKEN = target;
    target.prototype.__CMD_PREFIX = prefix;
  };
}

export function On(command: string) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    container.get<Client>(IClient).on(command, (...args) => {
      const instance = container.get((target as __Command).__TOKEN);
      descriptor.value.apply(instance, ...args);
    });
  };
}

export function Command(command: string) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    container.get<Client>(IClient).on('message', (message: Message) => {
      const commandPrefix = (target as __Command).__CMD_PREFIX;
      const regex = new RegExp(`^${commandPrefix}${command}`);

      if (regex.test(message.content)) {
        const instance = container.get((target as __Command).__TOKEN);
        descriptor.value && descriptor.value.apply(instance, [message]);
      }
    });
  };
}
