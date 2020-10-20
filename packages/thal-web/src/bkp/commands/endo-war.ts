// import puppeteer from 'puppeteer';
import * as tmi from 'tmi.js';
import {ICommand} from './abstract';

export class EndoWarCommand implements ICommand {
  public args = false;

  public command = 'endoWar';

  public description = 'Montre le status de la campagne EndoWar';

  public usage = 'endoWar';

  constructor(public client: tmi.Client) {
  }

  public async exec(target: string, context: Record<string, string>, msg: string, ...args: string[]): Promise<void> {
    this.client.say(target, `Test command`);
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    //
    // page.on('domcontentloaded', async () => {
    //   const amount = await page.evaluate(() => document.querySelector('.col-sidebar .panel-heading .panel-title')?.textContent);
    //   const status = await page.evaluate(() => document.querySelector('.col-sidebar .status__column.delay')?.textContent);
    //   const contributions = await page.evaluate(() => document.querySelector('.col-sidebar .status__column.contribution')?.textContent);
    //   this.client.say(target, `${amount}. ${status}. ${contributions}`);
    // });
    //
    // await page.goto('https://www.leetchi.com/c/endo-war');
    // await browser.close();
  }
}
