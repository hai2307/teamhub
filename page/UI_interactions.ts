import { Frame, Page,expect } from '@playwright/test';
import { DYNAMIC_ELEMENT } from '../src/support/dynamicElement';

export async function clickButton(page: Page, buttonName: string) {
   await page.waitForLoadState();
   await page.waitForSelector(DYNAMIC_ELEMENT.BUTTON_NAME(buttonName));
   await page.click(DYNAMIC_ELEMENT.BUTTON_NAME(buttonName));
   await page.waitForSelector(DYNAMIC_ELEMENT.LOADING, { state: 'hidden' });
}

export function RandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}
export function Randomint(length: number) {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}
// Hàm Để Nhấp Chuột Vào Một Phần Tử
export async function clickElement(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.click(selector);
}


/////////// các hàm sử lý ui components////////////////////////

// Input Fields
export async function enterText(page: Page, selector: string, text: string): Promise<void> {
  const inputField = await page.waitForSelector(selector);
  await inputField.fill(text);
}
// Radio Buttons

export async function selectRadioButton(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.check(selector);
}

// Checkboxes

export async function checkCheckbox(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.check(selector);
}

export async function uncheckCheckbox(page: Page, selector: string): Promise<void> {
  await page.uncheck(selector);
}
// Lists and Dropdowns
export async function selectDropdownValue(page: Page, selector: string, value: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.selectOption(selector, value);
}

// Tooltips
export async function hoverToSeeTooltip(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.hover(selector);
  
}

// Dialog Boxes
export async function handleDialog(page: Page, action: 'accept' | 'dismiss', text?: string): Promise<void> {
  page.once('dialog', async dialog => {
    if (text) {
      await dialog.accept(text);
    } else if (action === 'accept') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}
// Web Tables
export async function getTableCellText(page: Page, selector: string, rowIndex: number, colIndex: number): Promise<string> {
  const cellSelector = `${selector} tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`;
  return await page.textContent(cellSelector) ?? '';
}
// Date Picker
export async function selectDate(page: Page, selector: string, date: string): Promise<void> {
  await page.fill(selector, date); // Assuming date picker is an input field
}
// Sliders
export async function setSliderValue(page: Page, selector: string, value: number): Promise<void> {
  const slider = await page.$(selector);
  const boundingBox = await slider?.boundingBox();
  if (boundingBox) {
    const x = boundingBox.x + (boundingBox.width * value) / 100;
    const y = boundingBox.y + boundingBox.height / 2;
    await page.mouse.click(x, y);
  }
}

// Drag & Drop with iframe

export async function dragAndDrop(page: Page, iframeSelector: string, sourceSelector: string, targetSelector: string): Promise<void> {
  const frame:any = await page.frame({ url: iframeSelector });
  const source = await frame.$(sourceSelector);
  const target = await frame.$(targetSelector);

  if (source && target) {
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    if (sourceBox && targetBox) {
      await frame.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
      await frame.mouse.down();
      await frame.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
      await frame.mouse.up();
    }
  }
}

export async function dragDrop(page: Page, originSelector: string, destinationSelector: string) {
  const originElement = await page.waitForSelector(originSelector);
  const destinationElement = await page.waitForSelector(destinationSelector);

  await originElement.hover();
  await page.mouse.down();
  const box = (await destinationElement.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await destinationElement.hover();
  await page.mouse.up();
}
///////////######## Các Hàm Expect trong Playwright  ######/////////////////

// Kiểm tra văn bản của phần tử
export async function expectElementText(page: Page, selector: string, expectedText: string): Promise<void> {
  await page.waitForSelector(selector)
  const element = await page.locator(selector);
  await expect(element).toHaveText(expectedText);
}
// Kiểm tra phần tử có tồn tại
export async function expectElementToExist(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  const element = await page.locator(selector);
  await expect(element).toHaveCount(1);
}
// Kiểm tra phần tử có hiển thị
export async function expectElementToBeVisible(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  const element = await page.locator(selector);
  await expect(element).toBeVisible();
}
// Kiểm tra phần tử có hiển thị đầy đủ
export async function expectElementToBeEnabled(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  const element = await page.locator(selector);
  await expect(element).toBeEnabled();
}
// Kiểm tra thuộc tính của phần tử
export async function expectElementAttribute(page: Page, selector: string, attribute: string, expectedValue: string): Promise<void> {
  await page.waitForSelector(selector);
  const element = await page.locator(selector);
  await expect(element).toHaveAttribute(attribute, expectedValue);
}

// Kiểm tra URL

export async function expectURLToBe(page: Page, expectedURL: string): Promise<void> {
  await expect(page).toHaveURL(expectedURL);
}
// Kiểm tra tiêu đề trang
export async function expectTitleToBe(page: Page, expectedTitle: string): Promise<void> {
  await expect(page).toHaveTitle(expectedTitle);
}
// Kiểm tra giá trị của input

export async function expectInputValue(page: Page, selector: string, expectedValue: string): Promise<void> {
  await page.waitForSelector(selector);
  const input = await page.locator(selector);
  await expect(input).toHaveValue(expectedValue);
}
// Kiểm tra checkbox có được chọn

export async function expectCheckboxToBeChecked(page: Page, selector: string, checked: boolean): Promise<void> {
  await page.waitForSelector(selector);
  const checkbox = await page.locator(selector);
  await expect(checkbox).toBeChecked({ checked });
}
// Kiểm tra số lượng phần tử
export async function expectNumberOfElements(page: Page, selector: string, expectedCount: number): Promise<void> {
  await page.waitForSelector(selector);
  const elements = await page.locator(selector);
  await expect(elements).toHaveCount(expectedCount);
}


/////////// các hàm wait ///////////////////////////////////////////
// Hàm Để Chờ Đợi Một Phần Tử Được Tải xuất hiện 
export async function waitForElement(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
}
// Chờ một phần tử biến mất (waitForSelector với hidden option)
export async function waitForElementHidden(page: Page, selector: string, timeout: number = 30000): Promise<void> {
  await page.waitForSelector(selector, { state: 'hidden', timeout });
}

// Chờ một URL cụ thể tải xong (waitForURL)
export async function waitForURL(page: Page, url: string, timeout: number = 30000): Promise<void> {
  await page.waitForURL(url, { timeout });
}

// Chờ tải xong trạng thái trang (waitForLoadState) or trang load xong 
export async function waitForLoadState(page: Page, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', timeout: number = 30000){
  await page.waitForLoadState(state, { timeout });
}

// // Chờ một phần tử có một văn bản cụ thể (waitForFunction)
// export async function waitForText(page: Page, selector: string, text: string , timeout: number = 30000){
//   await page.waitForFunction(
//     (selector, text) => {
//       const element = document.querySelector(selector);
//       return element && element.textContent.includes(text);
//     },
//     selector,
//     text,
//     { timeout }
//   );
// }
// Chờ một giá trị cụ thể trong một thuộc tính của phần tử 

// export async function waitForAttribute(page: Page, selector: string, attribute: string, value: string, timeout: number = 30000) {
//   await page.waitForFunction(
//     (selector, attribute, value) => {
//       const element = document.querySelector(selector);
//       return element && element.getAttribute(attribute) === value;
//     },
//     selector,
//     attribute,
//     value,
//     { timeout }
//   );
// }

