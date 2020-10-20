import dotenv from 'dotenv';

export interface IConfig {
  DISCORD_TOKEN: string;
}

export let config: IConfig;

try {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }

  config = result.parsed as unknown as IConfig;
} catch (e) {
  config = process.env as unknown as IConfig;
}


