import {Message} from 'discord.js';

export const ARGUMENT_LESS_EVENTS = {
  ready: 'onReady',
  message: 'onMessage',
};

export interface OnReady {
  onReady: () => void;
}

export interface OnMessage {
  onMessage: (message: Message) => void
}
