import dotenv from 'dotenv';
import {injectable} from './utils/injectable';

@injectable()
export class Config {
  public discordToken: string;

  public twitchToken: string;

  constructor() {
    try {
      const result = dotenv.config();
      if (result.error) {
        throw result.error;
      }

      this.discordToken = (result.parsed as any).DISCORD_TOKEN;
      this.twitchToken = (result.parsed as any).TWITCH_TOKEN;

    } catch (e) {
      this.discordToken = (process.env as any).DISCORD_TOKEN;
      this.twitchToken = (process.env as any).TWITCH_TOKEN;
    }
  }
}
