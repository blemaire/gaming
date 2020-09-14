import {ApiProperty} from '@nestjs/swagger';

export class TextResponseDto {
  @ApiProperty()
  text: string;
}
