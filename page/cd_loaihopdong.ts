import { expect, type Locator, type Page } from '@playwright/test';

export class cd_loaihopdong {
  readonly page: Page
  readonly caidat:Locator
  readonly caidat_lhd:Locator
  readonly search: Locator
  readonly search_icon: Locator
  readonly button_create: Locator
  readonly title_lhd: Locator
  readonly checkbox: Locator
  readonly tenloaihopdong: Locator
  readonly mota: Locator
  readonly sothanghethan: Locator
  readonly ngaynghihuongluonghangthang: Locator
  readonly nguoiphutrach: Locator
  readonly hanhdong: Locator
  readonly edit_lhd: Locator
  readonly delete_lhd: Locator

  constructor(page: Page) {
    this.page = page;
    this.caidat = page.getByText('Cài đặt', { exact: true })
    this.caidat_lhd = page.getByRole('list').getByRole('link', { name: 'Loại hợp đồng' })
    this.search = page.locator('[placeholder="Nhập loại hợp đồng"]')
    this.search_icon = page.locator('#form-filter svg')
    this.button_create = page.locator('#form-filter button')
    this.title_lhd = page.locator('.el-breadcrumb__inner')
    this.checkbox = page.locator('[class="el-checkbox__inner"]')
    this.tenloaihopdong = page.getByText('Tên loại hợp đồng')
    this.mota = page.getByText('Mô tả')
    this.sothanghethan = page.getByText('Số tháng hết hạn')
    this.ngaynghihuongluonghangthang = page.getByText('Ngày nghỉ hưởng lương hàng th')
    this.nguoiphutrach = page.getByText('Người phụ trách')
    this.hanhdong = page.getByText('Hành động')

  }

  async Searchinputtext(text: string) {
    await this.search.fill(text)
  }
  
  async Searchtest() {
    // kiem tra hien thi placehodlder
    await  expect(this.search).toHaveText('Nhập loại hợp đồng')
    // // kiem tra tim kiem khi nhap space 
    // await  this.search.fill(textspacedaucuoi)
    // kiểm tra nhập text rồi clear 
    await  this.search.fill('text')
    await  this.search.clear()

  }

//   async login(userser, password) {
//     await this.userser.fill(userser)
//     await this.password.fill(password)
//     await this.button.click()
//     await this.close_tb.click()
//     await expect(this.logo).toBeVisible();
//   }

  async gotoCaidat_lhd() {
    await this.caidat.click() 
    await this.caidat_lhd.click() 
    await expect(this.title_lhd).toBeVisible()


  }

}