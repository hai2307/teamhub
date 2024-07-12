import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import * as dotenv from 'dotenv';
// import * as expect from 'expect';
import { expect } from '@playwright/test'
import { Page } from 'playwright';

dotenv.config();

export class Common {
  async checkDisplayedLogo(page: Page) {
    await page.isEnabled(DYNAMIC_ELEMENT.LOGO);
  }

  async checkDisplayedItem(page: Page, itemName) {
    await page.isEnabled(DYNAMIC_ELEMENT.OPTION(itemName));
  }

  async checkOptionHover(page: Page, item1, item2) {
    await page.hover(DYNAMIC_ELEMENT.OPTION(item2));
    await page.isEnabled(DYNAMIC_ELEMENT.OPTION_HOVER(item1));
  }

  async checkDisplayedImage(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.IMAGE(text));
  }

  async checkDisplayedTextPopup(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.CONTENT_POPUP(title));
  }

  async verifyUrlItem(page: Page, endPoint, text) {
    await Promise.all([page.waitForNavigation(), page.click(DYNAMIC_ELEMENT.OPTION(text))]);
    expect(page.url()).toContain(endPoint);
    await page?.goto('https://ttlab-academy:ttlAb2@22@academy.dev-tokyotechlab.com/');
  }

  async clickItemToNavigation(page: Page, text) {
    await Promise.all([page.waitForNavigation(), page.click(DYNAMIC_ELEMENT.OPTION(text))]);
  }

  async clickOptionToNavigation(page: Page, text1, text2) {
    await page.hover(DYNAMIC_ELEMENT.OPTION(text2));
    await Promise.all([page.waitForNavigation(), page.click(DYNAMIC_ELEMENT.OPTION_HOVER(text1))]);
  }

  async verifyUrl(page: Page, endPoint) {
    expect(page.url()).toContain(endPoint);
    await page?.goto('https://ttlab-academy:ttlAb2@22@academy.dev-tokyotechlab.com/');
  }

  async checkDisplayedText(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.CONTENT_BANNER(title));
  }

  async checkDisplayedTextForm(page: Page, text1, text2) {
    await page.isEnabled(DYNAMIC_ELEMENT.CONTENT_FORM(text2, text1));
  }

  async checkDisplayedLabelForm(page: Page, text1, text2) {
    await page.isEnabled(DYNAMIC_ELEMENT.LABEL_FORM(text2, text1));
  }

  async checkDisplayedPlaceholderForm(page: Page, text1, text2) {
    await page.isEnabled(DYNAMIC_ELEMENT.PLACEHOLDER_FORM(text2, text1));
  }

  async checkDisplayedButtonForm(page: Page, text1, text2) {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_FORM(text2, text1));
  }

  async clickIconItem(page: Page, text1, text2) {
    await page.click(DYNAMIC_ELEMENT.ICON_PLUS(text2, text1));
  }

  async checkContentBody(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.BODY_CONTENT(text));
  }

  async clickMoreInfor(page: Page, text) {
    await page.click(DYNAMIC_ELEMENT.BODY_CONTENT(text));
  }

  async checkHref(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.HREF(text));
  }

  async checkTitleVideo(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.TITLE_VIDEO(text));
  }

  async checkThumbnail(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.THUMBNAIL(text));
  }

  async checkTextFeedback(page: Page, text) {
    await page.isEnabled(DYNAMIC_ELEMENT.TEXT_FEEDBACK(text));
  }

  async checkTextareaForm(page: Page, text1, text2) {
    await page.isEnabled(DYNAMIC_ELEMENT.TEXT_AREA_FORM(text2, text1));
  }
}
