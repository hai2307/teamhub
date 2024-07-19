import { test, expect, chromium ,Page } from '@playwright/test';   
import { clickElement, expectElementToBeVisible, Randomint, RandomString } from '../../page/UI_interactions';
import { xacnhan } from './loginhrm';



const  tenloaihopdong = RandomString(6)


export async function addeditdelete_honghop(page: Page) {
     // thêm phân loại hợp đồng 
     await   page.locator('div:nth-child(2) > svg').first().click()
     await   page.locator('//div[@class="el-sub-menu__title"]//span[text()="Cài đặt"]').click()
     await   page.locator('//span[text()="Phân loại hợp đồng"]').first().click()
     await   page.locator('.create-icon') .click()
     await   page.getByPlaceholder('Nhập tên').fill(tenloaihopdong)
     await   page.getByPlaceholder('Nhập số ngày nghỉ hưởng lương').fill('10')
     await   xacnhan(page)
     await   expectElementToBeVisible(page,`//span[text()="${tenloaihopdong}"]`)
     // click vào tạo hợp đồng
     // them hơp dong 
     await   page.locator('div:nth-child(2) > svg').first().click()
     await   page.getByRole('button').nth(2).click()
     await   expectElementToBeVisible(page,'//span[text()="Chọn nhân viên"]')
     await   clickElement(page,'//span[text()="Chọn nhân viên"]')
     await   page.getByRole('option', { name: '- lyly' }).click()
     await   page.locator('.el-row > div:nth-child(3) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
     await   page.getByText(`${tenloaihopdong}`).click()
     await   page.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
     await   page.getByRole('option', { name: 'Chính thức' }).locator('span').click()
     await   page.locator('.el-input__prefix-inner > .el-icon > svg').first().click()
     await   page.getByText('3',{exact: true}).first().click()
     await   page.locator('//input[@placeholder="Nhập đường dẫn tới hợp đồng"]').fill('https://gul.hrm.dev-tokyotechlab.com/')
     await   xacnhan(page) 
     await   page.waitForLoadState()
     // await   expect(page.getByText(`${tenloaihopdong}`)).toBeVisible()
     // sua hop dong 
     await   clickElement(page,'(//div[@class="button-group group-left"]//button[@type="button"][1])[1]')
     await   page.getByPlaceholder('Nhập ghi chú').fill('hai')
     await   xacnhan(page)
     // xoa hop dong 
     await   clickElement(page,'(//div[@class="button-group group-left"]//button[@type="button"][2])[1]')
     await   xacnhan(page)
    }