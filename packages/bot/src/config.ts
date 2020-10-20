import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

export interface IConfig {
  DISCORD_TOKEN: string;
}

export const config: IConfig = result.parsed as unknown as IConfig;
