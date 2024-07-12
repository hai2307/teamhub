import { test, expect } from '@playwright/test'
// import { loginpage } from '../../Page/loginpage'
// import {cd_loaihopdong}  from   '../../Page/cd_loaihopdong'


test.beforeEach(async({page})=>{
    await   page.goto('https://hh1.org-console.iam-center.dev-tokyotechlab.com/')
    await   page.locator('[placeholder="Nhập email"]').fill('plkbblwwf@emlhub.com')
    await   page.locator('[placeholder="Nhập mật khẩu"]').fill('Tokyo123@')
    await   page.locator('[class="d-flex align-center base-btn-title"]').click()
    // await   expect(page.locator('[class="choose-language"]')).toBeVisible()
   

})
test.afterEach(async ({page})=>{
    await   page.pause()
})

 test('hethong' , async({page})=>{
    // await   page.pause()
    await   page.getByRole('button', { name: 'Truy cập' }).click()
   

    
 });