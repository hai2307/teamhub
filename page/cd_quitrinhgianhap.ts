import { expect, type Locator, type Page } from '@playwright/test';

export class cd_quytrinhgianhap {
  readonly page: Page
  readonly caidat:Locator
  readonly caidat_quytrinhgianhap:Locator 
  readonly Dev: Locator
  readonly HR: Locator
  readonly Tester: Locator
  readonly dscongviec: Locator
  readonly STT: Locator
  readonly tencongviec: Locator
  readonly Nguoiphutrach: Locator
  readonly mota: Locator
  readonly chinhsua_popup: Locator
  readonly add_popup: Locator
  readonly datlai_popup: Locator
  readonly luu_popup: Locator
  readonly huy_popup: Locator
  readonly delete_tencongviec_popup1: Locator

  constructor(page: Page) {
    this.page = page;
    this.caidat = page.getByText('Cài đặt', { exact: true })
    this.caidat_quytrinhgianhap = page.getByRole('list').getByRole('link', { name: 'Quy trình gia nhập' })
    this.dscongviec=page.getByRole('button', { name: 'Danh sách công việc chung cho' })
    this.Dev = page.getByRole('button', { name: 'Dev' })
    this.Tester = page.getByRole('button', { name: 'Tester' })
    this.HR = page.getByRole('button', { name: 'HR' })
    this.tencongviec = page.getByLabel('Dev').getByText('Tên công việc')
    this.STT = page.getByLabel('Dev').getByText('STT')
    this.Nguoiphutrach = page.getByLabel('Dev').getByText('Người phụ trách')
    this.chinhsua_popup = page.locator('[class="open-popup-icon"]')
    this.add_popup = page.getByRole('button', { name: 'Thêm' })
    this.mota = page.getByLabel('Dev').getByText('Mô tả')
    this.datlai_popup = page.locator('.cursor-pointer')
    this.luu_popup = page.getByRole('button', { name: 'Lưu' })
    this.huy_popup = page.getByRole('button', { name: 'Hủy' })
    this.delete_tencongviec_popup1 = page.locator('div').filter({ hasText: /^1$/ }).locator('img').first()

  }

  async gotoCaidat_quitrinhgianhap() {
    await this.caidat.click() 
    await this.caidat_quytrinhgianhap.click() 
    await expect(this.Dev).toBeVisible()
  }

  async checklistchucnang() {
    await expect(this.Dev).toBeEnabled()
    await expect(this.Tester).toBeEnabled()
    await expect(this.HR).toBeEnabled()
    await expect(this.Dev).toBeEnabled()
  }
  
  async defaulbandau() {
    await this.Dev.click()
    await expect(this.page.getByLabel('Dev').getByText('Không có dữ liệu')).toBeVisible()
  }

  async checkdata() {
    await expect(this.tencongviec).toBeVisible()
    await expect(this.STT).toBeVisible()
    await expect(this.Nguoiphutrach).toBeVisible()
    await expect(this.mota).toBeVisible()
  }  
  
  async clickbuttonedit() {
    await expect(this.tencongviec).toBeVisible()
    await expect(this.STT).toBeVisible()
    await expect(this.Nguoiphutrach).toBeVisible()
    await expect(this.mota).toBeVisible()
  }


}