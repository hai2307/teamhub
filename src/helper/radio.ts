import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import { Page } from 'playwright';
import { expect } from '@playwright/test'


const loading = new Loading();

export class Radio {
  async checkedRadioByValue(page: Page, radioValue: string) {
    await page.click(DYNAMIC_ELEMENT.RADIO_LABEL(radioValue));
  }
}
