import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Browser, launch} from 'puppeteer';
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
  getHello(): Observable<TextResponseDto> {
    return new Observable((observer: Observer<TextResponseDto>) => {
      launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
      .then((browser: Browser) => {
        browser.newPage().then(page => {
          page.goto('https://www.leetchi.com/c/endo-war').then(_page => {
            page.evaluate(() =>
                [
                  document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent,
                  document.querySelector('.col-sidebar .status__column.delay')?.textContent,
                  document.querySelector('.col-sidebar .status__column.contribution')?.textContent
                ]
            )
            .then(parts => {
              observer.next({
                text: parts
                .map(part =>
                  part
                  .replace(/(\r\n|\n|\r)/gm, ' ')
                  .trim()
                  .replace(/\s+/g, ' ')
                )
                .join('. ')
              });
              observer.complete();

              return browser.close();
            });
          });
        });
      });
    });
  }
}
