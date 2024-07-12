import { test, expect } from '@playwright/test'
// import { loginpage } from '../../Page/loginpage'
// import {cd_loaihopdong}  from   '../../Page/cd_loaihopdong'


test.beforeEach(async({page})=>{
    await   page.goto('https://krixi.hrm.dev-tokyotechlab.com/')
    await   page.locator('[placeholder="Nhập email"]').fill('hubtokyo08@gmail.com')
    await   page.locator('[placeholder="Nhập mật khẩu"]').fill('Tokyo123@')
    await   page.locator('[class="d-flex align-center"]').click()
    await   expect(page.locator('[class="logo-wrapper"]')).toBeVisible()
    await   page.locator('div:nth-child(5)').first().click()
    await   page.getByRole('link', { name: 'Hồ sơ ứng viên', exact: true }).nth(1).click()
    

})
test.afterEach(async ({page})=>{
    await   page.pause()
})

 test('hoso' , async({page})=>{
    await   expect(page.locator('.create-icon')).toBeVisible()

    // hiển thị palchoder họ tên 
    await   expect(page.getByPlaceholder('Nhập tên, email, số điện thoại')).toBeVisible()
    // hiển thị palchoder nhu cầu tuyển dụng
    await   expect(page.locator('#form-filter').getByText('Nhu cầu tuyển dụng')).toBeVisible()
    await   expect(page.getByText('Vị trí tuyển dụng')).toBeVisible()
    


    
 });