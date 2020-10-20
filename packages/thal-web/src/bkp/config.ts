// @ts-ignore
import getJsonConfig from 'get-json-config';

const scopes = ['twitter'];
const configDir = './';
const env = process.env.NODE_ENV;

// getJsonConfig(scopes, { env, configDir })
//     .then(config => {
//         // ...your code
//     })

// sync
export const config = getJsonConfig.sync(scopes, {env, configDir});