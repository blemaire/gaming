// Optionally, use fetchUtil to help.
import {injectable} from '../utils/injectable';
import {TwichApi} from './twich-api';

const clientId = 'hrugublpa4p924iw3yy65cu0n8d7my';
const secret = '8zi1u6elk6b5g2p2innlnvuj745b30';

@injectable()
export class TwitchClient {
  constructor(private api: TwichApi) {
  }

  public start(): Promise<void> {
    return this.api.connect();
  }
}
