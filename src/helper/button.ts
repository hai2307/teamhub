import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import { Page } from 'playwright';

const loading = new Loading();

export class Button {
  async clickButton(page: Page, buttonName: string) {
    await page.click(DYNAMIC_ELEMENT.BUTTON_NAME(buttonName));
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }

  async checkDisplayedButton(page: Page, text: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_NAME(text));
  }

  async checkEnableButton(page: Page, text: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_NAME(text));
  }

  async checkDisplayedButtonPopup(page: Page, text1: string, text2: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_POPUP(text2, text1));
  }

  async checkEnableButtonPopup(page: Page, text1: string, text2: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_POPUP(text2, text1));
  }
}
