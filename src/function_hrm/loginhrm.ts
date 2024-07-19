import { test, expect, chromium ,Page } from '@playwright/test';   
import { expectElementToBeVisible } from '../../page/UI_interactions';

export async function dangnhaphrm(page: Page, url: string ,email: string , password: string) {
    await   page.goto(url)
    await   page.waitForLoadState()
    await   page.getByPlaceholder('Nhập email').fill(email)
    await   page.getByPlaceholder('Nhập mật khẩu').fill(password)
    await   page.locator('.v-btn__content').click()
    await   expectElementToBeVisible(page,'[class="logo-wrapper"]') 
  }

export async function xacnhan(page: Page) {
  await   page.getByRole('button', { name: 'Xác nhận' }).click()
  await   page.waitForLoadState()
  }
export async function luu(page: Page) {
  await   page.getByRole('button', { name: 'Lưu' }).click()
  await   page.waitForLoadState()
  }
export async function huy(page: Page) {
  await   page.getByRole('button', { name: 'Hủy' }).click()
  await   page.waitForLoadState()
  }