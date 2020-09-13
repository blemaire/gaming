import {Module} from '@nestjs/common';
import {EndoWarModule} from './endo-war/endo-war.module';

@Module({
  imports: [EndoWarModule],
})
export class AppModule {}
