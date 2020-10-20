import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {JSDOM} from 'jsdom';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TextResponseDto} from '../common/text-response';
import {api} from './backend';

const ADDITIONAL_AMOUNT: number = Number.parseFloat(process.env.ADDITIONAL_AMOUNT) || 0;
const ADDITIONAL_PARTICIPANTS_COUNT: number = Number.parseFloat(process.env.ADDITIONAL_PARTICIPANTS_COUNT) || 0;

@ApiTags('endo-war')
@Controller('endo-war')
export class EndoWarController {
  @ApiResponse({
    status: 200,
    description: 'A summary of the Endo-War money-pool campaign progress',
    type: TextResponseDto,
  })
  @Get('status')
  public getStatus(): Observable<TextResponseDto> {
    return api.get('').pipe(
      map(response => {
        const document = new JSDOM(response.data).window.document;
        return [
          document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent,
          document.querySelector('.col-sidebar .status__column.contribution')?.textContent,
          'https://www.leetchi.com/c/endo-war',
        ].filter(text => text && text.length)
        .map(EndoWarController.sanitiseText);
      }),
      map((parts: string[]) => {
        let [total] = parts[0].split('€');

        if (ADDITIONAL_AMOUNT) {
          total = (Number.parseInt(total, 10) + ADDITIONAL_AMOUNT).toString();
        }

        parts[0] = `Campagne Endo-War: ${total} € collectés`;

        return {
          text: parts
          .map(EndoWarController.sanitiseText)
          .join('. '),
        };
      }),
    );
  }

  private static sanitiseText(text: string): string {
    return text ? text.replace(/(\r\n|\n|\r)/gm, ' ') : ''
    .trim()
    .replace(/\s+/g, ' ');
  }
}
