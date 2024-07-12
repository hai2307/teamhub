import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import { expect ,Page } from '@playwright/test'
import * as dotenv from 'dotenv';

dotenv.config();

export class Popup {
  async checkDisplayedLabelPopup(page: Page, text1: string, text2: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.LABEL_POPUP(text2, text1));
  }

  async checkDisplayedTextareaPopup(page: Page, text1: string, text2: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.TEXT_AREA_POPUP(text2, text1));
  }

  async checkDisplayedPlaceholderPopup(page: Page, text1: string, text2: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.PLACEHOLDER_POPUP(text2, text1));
  }

  async checkDisplayedPopupByTitle(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.POPUP_TITLE(title));
  }
  async checkHiddenPopupByTitle(page: Page, title) {
    await page.isHidden(DYNAMIC_ELEMENT.POPUP_TITLE(title));
  }
  async checkPopupMessage(page: Page, message: string) {
    const popupMessage = await page.innerText(DYNAMIC_ELEMENT.POPUP_MESSAGE_ERROR);
    expect(popupMessage.trim()).toEqual(message);
  }

  async checkPopupAlertMessage(page: Page, message: string) {
    await page.waitForTimeout(+process.env);
    await page.waitForSelector(DYNAMIC_ELEMENT.POPUP_ALERT);
    const popupAlertMessage = await page.innerText(DYNAMIC_ELEMENT.POPUP_ALERT);
    expect(popupAlertMessage.trim()).toEqual(message);
  }

  async checkDisplayedTitle(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.HOTEL_NAME(title));
  }
}
