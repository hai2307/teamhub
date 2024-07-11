import { test, expect } from '@playwright/test';


test.beforeEach(async({page})=>{
    // mt  https://krixi.hrm.dev-tokyotechlab.com/user/contract
    await   page.goto('https://krixi.hrm.dev-tokyotechlab.com/')
    await   page.locator('#input-3').fill('hubtokyo08@gmail.com')
    await   page.locator('#input-5').fill('Tokyo123@')
    await   page.locator('.v-btn__content').click()
    await   page.waitForSelector('.logo-wrapper')
    await   expect(page.locator('.logo-wrapper')).toBeVisible()
    
})

test.afterEach(async ({page})=>{
    await   page.pause()
})


test('hopdong', async ({ page }) => {
    const   quanlynhansu= await page.locator('.logo-module > div:nth-child(2)')
    await   quanlynhansu.click()
    const   hopdong= page.getByRole('link', { name: 'Hợp đồng', exact: true })
    await   hopdong.click()

    const  taohopdong= await page.getByRole('button').nth(2)
    await   expect(taohopdong).toBeVisible()
    await   taohopdong.click()

    const   nhanvien= await page.locator('.el-col > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
    await   nhanvien.click()
    await   page.getByRole('option', { name: 'tulen' }).locator('span').click()

    const   loaihopdong= await page.locator('.el-col >.form-group >.position-relative >.select-form >.el-select >.el-select__wrapper >.el-select__selection').nth(1)
    await   loaihopdong.click()
    await   page.getByRole('option', { name: 'hợp đồng chính' }).locator('span').click()
    await  page.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
    await  page.getByRole('option', { name: 'Chính thức' }).locator('span').click()

    const   ngayketthuc= await page.locator('.el-col >.form-group >.position-relative >.el-input >.el-input__wrapper >.el-input__prefix >.el-input__prefix-inner').last()
    await   ngayketthuc.click()

    const   ngaybatdau= await page.locator('.el-col >.form-group >.position-relative >.el-input >.el-input__wrapper >.el-input__prefix >.el-input__prefix-inner').first()
    await   ngaybatdau.click()
    await   page.getByRole('gridcell', { name: '31' }).locator('span').click()

    const   duongdan = page.getByPlaceholder('Nhập đường dẫn tới hợp đồng')
    await   duongdan.fill('https://krixi.hrm.dev-tokyotechlab.com/contract/123')
    
    await   page.locator('[class="el-button el-button--primary save-btn button-primary"]').click()

     await   page.getByRole('row', { name: 'tulen' }).getByRole('button').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()

    await   page.getByRole('row', { name: 'tulen' }).getByRole('button').nth(1).click()

    await   page.getByRole('button', { name: 'Xác nhận' }).click()

    await   expect(page.getByText('Xóa hợp đồng thành công')).toBeVisible()
  })