import {Module} from '@nestjs/common';
import {EndoWarController} from './endo-war.controller';
import {EndoWarService} from './endo-war.service';

@Module({
  controllers: [EndoWarController],
  providers: [EndoWarService]
})
export class EndoWarModule {
}
