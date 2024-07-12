import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import * as dotenv from 'dotenv';
import { expect } from '@playwright/test'
import { Page } from 'playwright';

dotenv.config();
export class Table {
  async headerDisplay(page: Page, title: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.TABLE_HEADER(title));
  }

  async headerHidden(page: Page, title: string) {
    await page.isHidden(DYNAMIC_ELEMENT.TABLE_HEADER(title));
  }

  async getNumberOfHeaderTable(page: Page, title: string) {
    await page.waitForSelector(DYNAMIC_ELEMENT.TABLE_TH);
    const headers = await page.$$(DYNAMIC_ELEMENT.TABLE_TH);
    let indexNumber = 0;
    for (const header of headers) {
      ++indexNumber;
      const headerTitle = (await header.innerText()) || '';
      if (headerTitle.trim() === title) {
        break;
      }
    }
    return indexNumber;
  }

  async getDynamicElementTableTDIndexByHeader(page, title: string) {
    const indexNumber = await this.getNumberOfHeaderTable(page, title);
    return DYNAMIC_ELEMENT.TABLE_TD_INDEX(indexNumber);
  }

  async headerDisplayContainIcons(page: Page, title: string, icons: string[]) {
    await page.isEnabled(DYNAMIC_ELEMENT.TABLE_HEADER(title));
    const indexNumber = await this.getNumberOfHeaderTable(page, title);
    await Promise.all(
      icons.map(
        async (icon) => await page.isEnabled(DYNAMIC_ELEMENT.TABLE_ICON(indexNumber, icon)),
      ),
    );
  }

  async headerNotDisplayIcon(page: Page, title: string, icon: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.TABLE_HEADER(title));
    const indexNumber = await this.getNumberOfHeaderTable(page, title);
    const isNotDisplayIcon = await page.isHidden(DYNAMIC_ELEMENT.TABLE_ICON(indexNumber, icon));
    expect(isNotDisplayIcon).toEqual(true);
  }

  async checkResultTable(page: Page, resultValue: string) {
    await page.waitForTimeout(+process.env);
    const checkTableVisible = await page.isVisible(DYNAMIC_ELEMENT.TABLE_TH);
    if (checkTableVisible) {
      await page.isEnabled(DYNAMIC_ELEMENT.TABLE_TBODY_RESULT(resultValue));
    } else {
      await page.isEnabled(DYNAMIC_ELEMENT.TABLE_NO_RESULT(resultValue));
    }
  }

  async checkResultHiddenTable(page: Page, resultValue: string) {
    await page.waitForTimeout(+process.env);
    const isHidden = await page.isHidden(DYNAMIC_ELEMENT.TABLE_TBODY_RESULT(resultValue));
    expect(isHidden).toEqual(true);
  }

  async clickIconByColumnHeaderTable(page: Page, icon: string, header: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.TABLE_HEADER(header));
    const indexNumber = await this.getNumberOfHeaderTable(page, header);
    await page.click(DYNAMIC_ELEMENT.TABLE_ICON(indexNumber, icon));
    await page.waitForLoadState();
  }

  async getTbodyRowNumberTable(page: Page) {
    const tbodyRows = await page.$$(DYNAMIC_ELEMENT.TABLE_TBODY_TR);
    return tbodyRows ? tbodyRows.length : 0;
  }

  async checkTbodyRowNumberTable(page: Page, countNumber: number) {
    const tbodyRowNumber = await this.getTbodyRowNumberTable(page);
    expect(tbodyRowNumber).toEqual(countNumber);
  }
}
