import { test, expect, chromium ,Page } from '@playwright/test';   
import { clickElement, expectElementToBeVisible, Randomint, RandomString } from '../../page/UI_interactions';
import { luu } from '../../src/function_hrm/loginhrm';
// sử dụng 1 tài khảon bất kì 
// await   page.goto('https://gul.org-console.iam-center.dev-tokyotechlab.com/')
// await   page.getByPlaceholder('Nhập email').fill('hubtokyo08@gmail.com')
// await   page.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')


 
const  tenvaitro =RandomString(5)
const  tengnuoidung = RandomString(10)
const  manhanvien = Randomint(4)
const  tenloaihopdong = RandomString(6)
async function xacnhan(page: Page) {
  await   page.getByRole('button', { name: 'Xác nhận' }).click()
  await   page.waitForLoadState()
 
}
async function dangnhaptaovaitro(page: Page) {
  await   page.goto('https://gul.hrm.dev-tokyotechlab.com/')
  await   page.getByPlaceholder('Nhập email').fill('hubtokyo08@gmail.com')
  await   page.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')
  await   page.locator('.v-btn__content').click()
  await   page.waitForLoadState()

}
async function xoavaitro(page: Page) {
  await   page.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][7]').click()
  await   page.getByRole('menubar').getByRole('link', { name: 'Quản lý vai trò' }).click()
  await   page.getByText(`${tenvaitro}`).click()
  await   clickElement(page,'//button[@type="button"]//span[text()="Xóa"]')
  await   clickElement(page,'//button[@type="button"]//span[text()="Xác nhận"]')
  await   expect(page.getByText('Xóa vai trò thành công',{exact: true})).toBeVisible()
}

async function taovaitro(page: Page ,selector_vaitro:string) {
    await   page.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][7]').click()
    const   themvaitro = await page.locator('.el-button').first()
    await   themvaitro.click()
    const   nhaptenvaitro = await page.locator('[placeholder="Nhập tên vai trò"]').nth(1)
    await   page.waitForTimeout(1000)
    await   nhaptenvaitro.fill(`${tenvaitro}`) 
    await   page.waitForTimeout(1000)
    const   hopdong = await page.locator(selector_vaitro)
    await   hopdong.click()
    await   luu(page)
    }
async function taovaitrohopdong(page: Page ,selector_vaitro:string) {
    await   page.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][7]').click()
    const   themvaitro = await page.locator('.el-button').first()
    await   themvaitro.click()
    const   nhaptenvaitro = await page.locator('[placeholder="Nhập tên vai trò"]').nth(1)
    await   page.waitForTimeout(1000)
    await   nhaptenvaitro.fill(`${tenvaitro}`) 
    await   page.waitForTimeout(1000)
    const   hopdong = await page.locator(selector_vaitro)
    await   hopdong.click()
    await   page.locator('(//label[@class="el-checkbox check-all"]//span[@class="el-checkbox__inner"])[17]').click()
    await   page.getByRole('button', { name: 'Lưu' }).click()
    }
async function themvaitrochonahnvien(page: Page){
  await   page.getByRole('button', { name: 'Thông tin khác Chỉnh sửa' }).getByRole('button').click()
  await   page.locator('.el-select__selection > div:nth-child(2)').click()
  await   page.getByText(`${tenvaitro}`).click()
  await   page.getByRole('button', { name: 'Xác nhận' }).click()

}
async function clicknhanvien(page: Page) {
  await page.waitForLoadState();
  await page.waitForSelector('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][2]')
  await page.click('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][2]')
  await page.getByText('Chọn chức danh').click()
  await page.locator('span').filter({ hasText: 'Bỏ chọn' }).click()
  await page.locator('#common-layout').getByRole('link').first().click()
  }
async function dangnhapvaonhanvienvuataovaitro(page: Page){
  await   page.goto('https://org-console.iam-center.dev-tokyotechlab.com/login')
  await   page.getByPlaceholder('Nhập email').fill('lyly@mailinator.com')
  await   page.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')
  await   page.locator('.v-btn__content').click() 
  await   page.waitForLoadState() 
 
}
test('CURL organization console', async ({ page }) => {
    await   page.goto('https://gul.org-console.iam-center.dev-tokyotechlab.com/')
    await   page.getByPlaceholder('Nhập email').fill('hubtokyo08@gmail.com')
    await   page.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')
    await   page.locator('.v-btn__content').click()
    await   page.waitForLoadState()
    // await   page.waitForTimeout(4000)
    await   page.locator('[id="v-list-group--id-Symbol\\(3\\)"] i').nth(1).click()
    await   page.getByRole('link', { name: 'HRM' }).click()
    await   page.getByRole('button').first().click()
    await   page.getByPlaceholder('Nhập tên vai trò').click()
    await   page.getByPlaceholder('Nhập tên vai trò').fill('oh my god')
    await   page.getByLabel('Người dùng', { exact: true }).click()
    await   page.waitForTimeout(4000)
    await   page.getByText('Lưu', { exact: true }).click()
    // await   page.pause()
    
    

})

test('vaitronguoidung', async ({  }) => {
    console.log(`${'\x1b[33m'} role nguoi dung`)
    const browser = await chromium.launch()
    const Context = await browser.newContext()
    const page1 = await Context.newPage()
    const page2 = await Context.newPage()

    await   page1.goto('https://gul.hrm.dev-tokyotechlab.com/')
    await   page1.getByPlaceholder('Nhập email').fill('hubtokyo08@gmail.com')
    await   page1.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')
    await   page1.locator('.v-btn__content').click()
    await   page1.waitForLoadState()

    // await   page1.locator('div:nth-child(8)').first().click()
    await   page1.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][7]').click()
    // await   page1.getByRole('menubar').getByRole('link', { name: 'Quản lý vai trò' }).click()

    const   themvaitro = await page1.locator('.el-button').first()
    await   themvaitro.click()
    const   nhaptenvaitro = await page1.locator('[placeholder="Nhập tên vai trò"]').nth(1)
    await   nhaptenvaitro.fill(`nguoidung-${tenvaitro}`)
    await   page1.waitForTimeout(1000)
    const   nguoidung = await page1.locator('.el-checkbox__inner').nth(1)
    await   nguoidung.click()
    await   page1.getByRole('button', { name: 'Lưu' }).click()
    // await   expect(page1.getByText(tenvaitro)).tobevisible()
    await   page1.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][2]').click()

    await   page1.getByRole('link', { name: 'Nhân viên', exact: true }).click()
   // await   page1.locator('//a[@class="sidebar-item-wrapper padding-0"]//span[text()="Nhân viên"]').click()
    await   page1.locator('span').filter({ hasText: 'Bỏ chọn' }).click()
    await   page1.locator('#common-layout').getByRole('link').first().click()
    await   page1.getByRole('button', { name: 'Thông tin khác Chỉnh sửa' }).getByRole('button').click()
    await   page1.locator('.el-select__selection > div:nth-child(2)').click()
    await   page1.getByText(`nguoidung-${tenvaitro}`).click()
    await   page1.getByRole('button', { name: 'Xác nhận' }).click()

    await   page2.goto('https://org-console.iam-center.dev-tokyotechlab.com/login')
    await   page2.getByPlaceholder('Nhập email').fill('lyly@mailinator.com')
    await   page2.getByPlaceholder('Nhập mật khẩu').fill('Tokyo123@')
    await   page2.locator('.v-btn__content').click() 
    await   page2.waitForLoadState()
    const [newPage] = await Promise.all([
      Context.waitForEvent('page'), // Đợi trang mới mở ra
      page2.locator('i').nth(2).click()
    ]);  
    await   newPage.waitForLoadState()
    await   newPage.locator('div:nth-child(2) > svg').first().click()
    await   newPage.locator('#form-filter').getByRole('button').nth(3).click()
    await   newPage.getByPlaceholder('Nhập họ tên người dùng').fill(tengnuoidung)
    await   newPage.getByPlaceholder('Nhập mã nhân viên').fill(manhanvien)
    await   newPage.getByText('Chọn vai trò').click()
    await   newPage.getByText(`nguoidung-${tenvaitro}`).click()
    await   newPage.getByPlaceholder('Chọn ngày vào làm').click()
    await   newPage.getByText('3',{exact: true}).first().click()
    await   newPage.getByRole('button', { name: 'Xác nhận' }).click()
    await   newPage.waitForLoadState()

    // xóa vai trò vừa tạo 
    await   page1.locator('//div[@class="logo-icon el-tooltip__trigger el-tooltip__trigger"][7]').click()
    await   page1.getByRole('menubar').getByRole('link', { name: 'Quản lý vai trò' }).click()

    await   page1.getByText(`nguoidung-${tenvaitro}`).click()
    // await   page1.click(`:text-is(nguoidung-${tenvaitro})`)
    // await   page1.getByRole('button', { name: 'Xóa' }).click()
    await   clickElement(page1,'//button[@type="button"]//span[text()="Xóa"]')
    await   clickElement(page1,'//button[@type="button"]//span[text()="Xác nhận"]')
    await   expect(page1.getByText('Xóa vai trò thành công',{exact: true})).toBeVisible()
    // await   page2.pause()/

   

  })

test('vaitrohopdong', async ({  }) => {
    console.log(`${'\x1b[33m'} role hopdong`)
    const browser = await chromium.launch()
    const Context = await browser.newContext()
    const page1 = await Context.newPage()
    const page2 = await Context.newPage()
    await   dangnhaptaovaitro(page1)
    await   taovaitrohopdong(page1,'(//label[@class="el-checkbox check-all"]//span[@class="el-checkbox__inner"])[3]')
    await   clicknhanvien(page1)
    await   themvaitrochonahnvien(page1) 
    await   dangnhapvaonhanvienvuataovaitro(page2)
    const [newPage] = await Promise.all([
      Context.waitForEvent('page'), // Đợi trang mới mở ra
      page2.locator('i').nth(2).click()
    ]);  
    newPage.pause()
    await   newPage.waitForLoadState()
    // thêm phân loại hợp đồng 
    await   newPage.locator('div:nth-child(2) > svg').first().click()
    await   newPage.locator('//div[@class="el-sub-menu__title"]//span[text()="Cài đặt"]').click()
    await   newPage.locator('//span[text()="Phân loại hợp đồng"]').first().click()
    await   newPage.locator('.create-icon') .click()
    await   newPage.getByPlaceholder('Nhập tên').fill(tenloaihopdong)
    await   newPage.getByPlaceholder('Nhập số ngày nghỉ hưởng lương').fill('10')
    await   xacnhan(newPage)
    await   expectElementToBeVisible(newPage,`//span[text()="${tenloaihopdong}"]`)
    // click vào tạo hợp đồng
    // them hơp dong 
    await   newPage.locator('div:nth-child(2) > svg').first().click()
    await   newPage.getByRole('button').nth(2).click()
    await   expectElementToBeVisible(newPage,'//span[text()="Chọn nhân viên"]')
    await   clickElement(newPage,'//span[text()="Chọn nhân viên"]')
    await   newPage.getByRole('option', { name: '- lyly' }).click()
    await   newPage.locator('.el-row > div:nth-child(3) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
    await   newPage.getByText(`${tenloaihopdong}`).click()
    await   newPage.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
    await   newPage.getByRole('option', { name: 'Chính thức' }).locator('span').click()
    await   newPage.locator('.el-input__prefix-inner > .el-icon > svg').first().click()
    await   newPage.getByText('3',{exact: true}).first().click()
    await   newPage.locator('//input[@placeholder="Nhập đường dẫn tới hợp đồng"]').fill('https://gul.hrm.dev-tokyotechlab.com/')
    await   xacnhan(newPage) 
    await   newPage.waitForLoadState()
    // await   expect(newPage.getByText(`${tenloaihopdong}`)).toBeVisible()
    // sua hop dong 
    await   clickElement(newPage,'(//div[@class="button-group group-left"]//button[@type="button"][1])[1]')
    await   newPage.getByPlaceholder('Nhập ghi chú').fill('hai')
    await   xacnhan(newPage)
    // xoa hop dong 
    await   clickElement(newPage,'(//div[@class="button-group group-left"]//button[@type="button"][2])[1]')
    await   xacnhan(newPage)
    await   xoavaitro(page1)
    await   page1.pause()

    

   

  })

// test('Danh sách vai trò', async ({ page }) => {
    
//     console.log(`${'\x1b[32m'} Danh sách vai trò `)
//     console.log(`${'\x1b[33m'} title quản ly vai trò `)
//     await   expect(page.getByText('Admin', { exact: true })).toBeVisible()
//     await   expect(page.getByText('Member', { exact: true })).toBeVisible()
//     await   expect(page.getByText('Supervisor', { exact: true })).toBeVisible()

//     console.log(`${'\x1b[32m'}Tìm kiếm danh sách vai trò  `)
//     console.log(`${'\x1b[33m'} Hiên thị placholder nhập tên vài trò   `)
//     await   expect(page.locator('[placeholder="Nhập tên vai trò"]').first()).toBeVisible()

//     console.log(`${'\x1b[33m'} Hiển thị tool tip " thêm vài trò " khi hover vào tạo vài trò  `)
//     const   role_create=page.locator('.el-button').first()
//     await   role_create.hover()
//     await   expect(page.getByText('Thêm vai trò',{exact:true})).toBeVisible()

//     console.log(`${'\x1b[33m'} Hiển thị biểu tượng kính lúp tìm kiếm    `)
//     const   kinhlup_timkiem = page.locator('.icon-search > path')
//     await   expect(kinhlup_timkiem).toBeVisible()

//     console.log(`${'\x1b[33m'} vai trò không tồn tại hiển thị kết quả không có dữ liệu `)
//     await   page.locator('[placeholder="Nhập tên vai trò"]').first().fill('nobita')
//     await   kinhlup_timkiem.click()
//     await   expect(page.getByText('Không có dữ liệu')).toBeVisible()

//   })

// test('Tạo / Cập nhật / Xóa vai trò', async ({ page }) => {  
//     await   page.locator('.el-button').first().click()
//     await   page.locator('.card-details > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner').first().fill("dinhhai")
//     await   page.getByRole('button', { name: 'Hồ sơ cá nhân' }).click()
//     await   page.locator('label').filter({ hasText: 'Cập nhật thông tin cá nhân c' }).locator('span').nth(1).click()
//     await   page.getByRole('button', { name: 'Lưu' }).click()
//     await   expect(page.getByText('dinhhai')).toBeVisible()
// // cập nhật vai trò 
//     await   page.locator('label').filter({ hasText: 'Cập nhật thông tin ngân hàng' }).locator('span').nth(1).click()
//     await   page.getByRole('button', { name: 'Lưu' }).click()
//     await   expect(page.getByText('Cập nhật vai trò thành công')).toBeVisible()
// // test('Xóa vai trò ', async ({ page }) => {  
//   await   page.getByText('dinhhai').click()
//   await   page.getByRole('button', { name: 'Xóa' }).click()
//   await   page.getByRole('button', { name: 'Xác nhận' }).click()
//   await   expect(page.getByText('Xóa vai trò thành công')).toBeVisible()
// })



