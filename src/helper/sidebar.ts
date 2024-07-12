import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
// import * as expect from 'expect';
import { expect } from '@playwright/test'
import * as dotenv from 'dotenv';
import { Page } from 'playwright';

dotenv.config();
export class Sidebar {
  getPageURL(url: string) {
    return `${process.env.APP_URL as string}/${url}` as string;
  }

  async getPageTile(page: Page) {
    const pageTitle = await page.innerText(DYNAMIC_ELEMENT.PAGE_TITLE);
    return pageTitle;
  }

  async clickSidebarToItemTitle(page: Page, title: string) {
    const sidebarItems = await page.$$(DYNAMIC_ELEMENT.SIDEBAR_ITEMS);
    for (const sidebarItem of sidebarItems) {
      const isEnabled = await sidebarItem.isEnabled();
      if (isEnabled) {
        const sidebarItemTitle = await sidebarItem.innerText();
        if (sidebarItemTitle === title) {
          await sidebarItem.click();
          await page.waitForLoadState();
        }
      }
    }
  }

  async checkTitlePage(page: Page, pageTitle: string) {
    const currentPageTitle = await this.getPageTile(page);
    expect(pageTitle).toEqual(currentPageTitle);
  }

  async checkTitlePageAndURL(page: Page, pageTitle: string, url: string) {
    const currentPageTitle = await this.getPageTile(page);
    const sidebarItemUrl = this.getPageURL(url);
    await page.waitForURL(sidebarItemUrl);
    expect(pageTitle).toEqual(currentPageTitle);
    expect(page.url()).toEqual(sidebarItemUrl);
  }
}
