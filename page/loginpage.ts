import { test,expect, type Locator, type Page } from '@playwright/test';
// import { test, expect } from '@playwright/test';
export class loginpage {
  readonly page: Page
  readonly userser: Locator
  readonly password: Locator
  readonly button: Locator
  readonly title: Locator
  readonly logo: Locator
  readonly close_tb: Locator
  readonly sidebar: Locator
  // mt dev 
  readonly userser_dev: Locator
  readonly password_dev: Locator
  readonly button_dev: Locator
  readonly title_dev: Locator
  // readonly waitpageurl : any
  // mt stg 
  readonly userser_stg: Locator
  readonly password_stg: Locator
  readonly button_stg: Locator
  readonly title_stg: Locator

  constructor(page:Page) {
    this.page = page;
    this.userser = page.locator('#username')
    this.password = page.locator('#password')
    this.button = page.locator('#kc-form-buttons')
    this.title = page.locator('#kc-page-title')
    this.logo = page.locator('[class="logo-wrapper"]')
    this.close_tb = page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img')
    this.sidebar=page.locator('.sidebar-minimizer')
    // this.waitpageurl= page.waitForURL('https://company-test.ttloffice.com/')
    this.userser_dev = page.locator('[placeholder="Nhập email"]')
    this.password_dev = page.locator('[placeholder="Nhập mật khẩu"]')
    this.button_dev = page.locator('.v-btn__content')
    this.title_dev = page.locator('.logo')
    //stg_test
    this.userser_stg = page.locator('[placeholder="Your email"]')
    this.password_stg = page.locator('[placeholder="Your password"]')
    this.button_stg = page.locator('#kc-form-buttons')
    this.title_stg = page.locator('.logo-wrapper')
  }

  // async gotoUrl() {
  //   await   this.page.goto('https://company-test.ttloffice.com/')
  //   await   expect(this.title).toBeEnabled()
  // }
// // ################################################ https://company-test.ttloffice.com/timekeeping
//   async login() {
//     await   this.page.goto('https://company-test.ttloffice.com/')
//     await   expect(this.title).toBeEnabled()
//     await this.userser.fill('lethily20041988@gmail.com')
//     await this.password.fill('Ab@123456')
//     await this.button.click()
//     await this.close_tb.click()
//     await expect(this.logo).toBeVisible()
//   }
// ################################################ môi trường dev : https://thuy.hrm.dev-tokyotechlab.com/timekeeping
  // async login() {
  //   await   this.page.goto('https://thuy.hrm.dev-tokyotechlab.com/')
  //   await   expect(this.title_dev).toBeEnabled()
  //   await   this.userser_dev.fill('thuyntt@tokyotechlab.com')
  //   await   this.password_dev.fill('Ab@123456')
  //   await   this.button_dev.click()
  //   await   this.close_tb.click()
  //   await   expect(this.logo).toBeVisible()
  // }
  // ################################################ môi trường test : 
  async login() {
    await   this.page.goto('https://test01.hrm.stg.dev-tokyotechlab.com')
    await   expect(this.title).toBeEnabled()
    await   this.userser_stg.fill('thaont@tokyotechlab.com')
    await   this.password_stg.fill('Ttlab@1234')
    await   this.button_stg.dblclick()
    // await   this.close_tb.click()
    await expect(this.title_stg).toBeVisible()
  }

  async sidebar_expand() {
    await this.sidebar.click() 
  }
  async waitForselector(selector:string) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }
  async waitForURL(URL:any) {
    await this.page.waitForURL(URL);
  }

}

