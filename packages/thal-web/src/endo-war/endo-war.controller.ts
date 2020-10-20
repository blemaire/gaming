import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Browser, launch, Page} from 'puppeteer';
import {Observable, Observer} from 'rxjs';
import {TextResponseDto} from '../common/text-response';

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
    return new Observable((observer: Observer<TextResponseDto>) => {
      this.openCampaign().then(({page, browser}) => {
        page.evaluate(() =>
          [
            document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent,
            document.querySelector('.col-sidebar .status__column.contribution')?.textContent,
            'Derniers participants: ' + Array.from(document.querySelectorAll('.fdr-contributor-name')).slice(0, 10).map(element => element.textContent.split(' ').shift()).join(', '),
            // document.querySelector('.col-sidebar .status__column.delay')?.textContent,
            'https://www.leetchi.com/c/endo-war',
          ],
        )
        .then((parts: string[]) => {
          let [total] = parts[0].split('€');

          if (ADDITIONAL_AMOUNT) {
            total = (Number.parseInt(total.replace(/\s/g, ''), 10) + ADDITIONAL_AMOUNT).toString();
          }

          if (ADDITIONAL_PARTICIPANTS_COUNT) {
            let [count, rest] = parts[1].trim().replace(/\n/g, ' ').split(' ');
            count = (Number.parseInt(count) + ADDITIONAL_PARTICIPANTS_COUNT).toString();
            parts[1] = [count, rest].join(' ');
          }

          parts[0] = `Campagne Endo-War: ${total} € collectés`;

          observer.next({
            text: parts
            .map(EndoWarController.sanitiseText)
            .join('. '),
          });
          observer.complete();

          return browser.close();
        });
      });
    });
  }

  private openCampaign(): Promise<{page: Page, browser: Browser}> {
    return launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    .then((browser: Browser) => {
      return browser.newPage().then(page => {
        return page.goto('https://www.leetchi.com/c/endo-war').then(() => ({page, browser}));
      });
    });
  }

  private static sanitiseText(text: string): string {
    return text.replace(/(\r\n|\n|\r)/gm, ' ')
    .trim()
    .replace(/\s+/g, ' ');
  }
}
