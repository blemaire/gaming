import {Injectable} from '@nestjs/common';

@Injectable()
export class EndoWarService {
  getHello(): string {
    return 'from endoWar';
  }
}
