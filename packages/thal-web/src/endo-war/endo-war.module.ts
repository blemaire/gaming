import {Module} from '@nestjs/common';
import {EndoWarController} from './endo-war.controller';

@Module({
  controllers: [EndoWarController],
})
export class EndoWarModule {
}
