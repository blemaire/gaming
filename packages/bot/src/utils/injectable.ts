import {Client, Message} from 'discord.js';
import {injectable as inversifyInjectable} from 'inversify';
import {IClient} from '../i-client';
import {container} from './inversify.config';

export interface __Command {
  __CMD_PREFIX: string;
}

export function injectable() {
  return function (target: any) {
    inversifyInjectable()(target);
    container.bind(target).to(target).inSingletonScope();
  };
}

export function injectableByName(prefix?: string) {
  return function (target: any) {
    inversifyInjectable()(target);
    container.bind(target.name).to(target).inSingletonScope();
    target.__CMD_PREFIX = prefix;
  };
}

export function On(command: string) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    container.get<Client>(IClient).on(command, (...args) => {
      const instance = container.get(target.constructor.name);
      descriptor.value.apply(instance, ...args);
    });
  };
}

export function Command(command: string) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    container.get<Client>(IClient).on('message', (message: Message) => {
      const commandPrefix = (target.constructor as any).__CMD_PREFIX;
      const regex = new RegExp(`^${commandPrefix}${command}`);

      if (regex.test(message.content)) {
        const instance = container.get(target.constructor.name);
        descriptor.value && descriptor.value.apply(instance, [message]);
      }
    });
  };
}
