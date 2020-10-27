import Axios from 'axios-observable';
import {Config} from '../config';
import {injectable} from '../utils/injectable';

@injectable()
export class TwichApi {
  private axios: Axios;

  constructor(private config: Config) {
    this.axios = Axios.create({baseURL: 'https://id.twitch.tv/'});
  }

  public connect(): Promise<any> {
    return new Promise<any>(resolve => {
      this.axios.post('oauth2/token', null, {
        params: {
          client_id: 'hrugublpa4p924iw3yy65cu0n8d7my',
          client_secret: '8zi1u6elk6b5g2p2innlnvuj745b30',
          grant_type: 'client_credentials',
        },
      }).subscribe(response => {
        if (response.status === 200) {
          console.log('[Success] - Connected to Twitch API');
          // TODO tokens have 60 days expiry we should refresh the token after that delay.
          return resolve();
        }

        console.error('[Error] - Could not connect to Twitch API');
      });
    });
  }
}
