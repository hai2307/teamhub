import { test,expect, type Locator, type Page } from '@playwright/test';
// import { test, expect } from '@playwright/test';

export class Role {
  readonly page: Page
  readonly quanlyvaitro:Locator
  constructor(page: Page) {
    this.page = page
    this.quanlyvaitro = page.getByRole('menubar').getByRole('link', { name: 'Quản lý vai trò' })
    


  }
  async gotoquanlyvaitro (){
    await this.quanlyvaitro.click() 
  }

}