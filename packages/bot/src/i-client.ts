import {Client as DiscordClient} from 'discord.js';
import {container} from './utils/inversify.config';

export const IClient = Symbol.for('Client');

container.bind<DiscordClient>(IClient).toConstantValue(new DiscordClient());
