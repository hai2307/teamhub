import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';
import { QTNS_nguoidung } from '../../page/QTNS_nguoidung';
import { clickElement, expectElementToBeVisible } from '../../page/UI_interactions';

test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page)
    await   Loginhrm.login()
    await   Loginhrm.sidebar_expand()
    await   page.getByRole('menubar').getByRole('link', { name: 'Quản lý vai trò' }).click()
 
})

test.afterEach(async ({page})=>{
    await   page.pause()
})

test('Title', async ({ page }) => {
    console.log(`${'\x1b[33m'} title quản ly vai trò `)
    expect(page.getByLabel('el.breadcrumb.label').getByRole('link', { name: 'Quản lý vai trò' })).toBeVisible()
  })

test('Danh sách vai trò', async ({ page }) => {
    
    console.log(`${'\x1b[32m'} Danh sách vai trò `)
    console.log(`${'\x1b[33m'} title quản ly vai trò `)
    await   expect(page.getByText('Admin', { exact: true })).toBeVisible()
    await   expect(page.getByText('Member', { exact: true })).toBeVisible()
    await   expect(page.getByText('Supervisor', { exact: true })).toBeVisible()

    console.log(`${'\x1b[32m'}Tìm kiếm danh sách vai trò  `)
    console.log(`${'\x1b[33m'} Hiên thị placholder nhập tên vài trò   `)
    await   expect(page.locator('[placeholder="Nhập tên vai trò"]').first()).toBeVisible()

    console.log(`${'\x1b[33m'} Hiển thị tool tip " thêm vài trò " khi hover vào tạo vài trò  `)
    const   role_create=page.locator('.el-button').first()
    await   role_create.hover()
    await   expect(page.getByText('Thêm vai trò',{exact:true})).toBeVisible()

    console.log(`${'\x1b[33m'} Hiển thị biểu tượng kính lúp tìm kiếm    `)
    const   kinhlup_timkiem = page.locator('.icon-search > path')
    await   expect(kinhlup_timkiem).toBeVisible()

    console.log(`${'\x1b[33m'} vai trò không tồn tại hiển thị kết quả không có dữ liệu `)
    await   page.locator('[placeholder="Nhập tên vai trò"]').first().fill('nobita')
    await   kinhlup_timkiem.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()

  })

test('Tạo / Cập nhật / Xóa vai trò', async ({ page }) => {  
    await   page.locator('.el-button').first().click()
    await   page.locator('.card-details > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner').first().fill("dinhhai")
    await   page.getByRole('button', { name: 'Hồ sơ cá nhân' }).click()
    await   page.locator('label').filter({ hasText: 'Cập nhật thông tin cá nhân c' }).locator('span').nth(1).click()
    await   page.getByRole('button', { name: 'Lưu' }).click()
    await   expect(page.getByText('dinhhai')).toBeVisible()
// cập nhật vai trò 
    await   page.locator('label').filter({ hasText: 'Cập nhật thông tin ngân hàng' }).locator('span').nth(1).click()
    await   page.getByRole('button', { name: 'Lưu' }).click()
    await   expect(page.getByText('Cập nhật vai trò thành công')).toBeVisible()
// test('Xóa vai trò ', async ({ page }) => {  
  await   page.getByText('dinhhai').click()
  await   page.getByRole('button', { name: 'Xóa' }).click()
  await   page.getByRole('button', { name: 'Xác nhận' }).click()
  await   expect(page.getByText('Xóa vai trò thành công')).toBeVisible()
 
})



