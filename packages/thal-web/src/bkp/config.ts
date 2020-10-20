// @ts-ignore
import getJsonConfig from 'get-json-config';

const scopes = ['twitter'];
const configDir = './';
const env = process.env.NODE_ENV;

export const config = getJsonConfig.sync(scopes, {env, configDir});
