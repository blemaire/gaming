import dotenv from 'dotenv';
import {injectable} from './utils/injectable';

@injectable()
export class Config {
  public token: string;

  constructor() {
    try {
      const result = dotenv.config();
      if (result.error) {
        throw result.error;
      }

      this.token = (result.parsed as any).DISCORD_TOKEN;
    } catch (e) {
      this.token = (process.env as any).DISCORD_TOKEN;
    }
  }
}
