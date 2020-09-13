import {Controller, Get} from '@nestjs/common';
import {Observable, Observer} from 'rxjs';
import * as puppeteer from 'puppeteer';
import {EndoWarService} from './endo-war.service';

@Controller('endo-war')
export class EndoWarController {
  constructor(private readonly endoWarService: EndoWarService) {
  }

  @Get('status')
  getHello(): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      puppeteer.launch()
        .then(browser => {
          browser.newPage()
            .then(page => {
              page.goto('https://www.leetchi.com/c/endo-war').then(_page => {
                Promise.all([
                  page.evaluate(() => document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent),
                  page.evaluate(() => document.querySelector('.col-sidebar .status__column.delay')?.textContent),
                  page.evaluate(() => document.querySelector('.col-sidebar .status__column.contribution')?.textContent),
                ]).then(parts => {
                  observer.next(parts.map(part => part.replace(/(\r\n|\n|\r)/gm, ' ').trim().replace(/\s+/g, ' ')).join('. '));
                  observer.complete();
                  return browser.close();
                });
              });
            });
        });
    });
  }
}
