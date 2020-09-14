import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Browser, launch, Page} from 'puppeteer';
import {Observable, Observer} from 'rxjs';
import {TextResponseDto} from '../common/text-response';
import {EndoWarService} from './endo-war.service';

@ApiTags('endo-war')
@Controller('endo-war')
export class EndoWarController {
  constructor(private readonly endoWarService: EndoWarService) {
  }

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
              'Campagne Endo-War: ' + document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent,
              document.querySelector('.col-sidebar .status__column.contribution')?.textContent,
              'Derniers participants: ' + Array.from(document.querySelectorAll('.fdr-contributor-name')).slice(0, 5).map(element => element.textContent.split(' ').shift()).join(', '),
              // document.querySelector('.col-sidebar .status__column.delay')?.textContent,
              'https://www.leetchi.com/c/endo-war',
            ]
          )
          .then(parts => {
            observer.next({
              text: parts
                .map(this.sanitiseText)
                .join('. ')
            });
            observer.complete();

            return browser.close();
          });
      });
    });
  }

  private openCampaign(): Promise<{ page: Page, browser: Browser }> {
    return launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
      .then((browser: Browser) => {
        return browser.newPage().then(page => {
          return page.goto('https://www.leetchi.com/c/endo-war').then(() => ({page, browser}));
        });
      });
  }

  private sanitiseText(text: string): string {
    return text.replace(/(\r\n|\n|\r)/gm, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }
}
