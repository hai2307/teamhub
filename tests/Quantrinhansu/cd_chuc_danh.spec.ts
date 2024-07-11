import { test, expect } from '@playwright/test'

test.beforeEach(async({page})=>{
    await   page.goto('https://company-test.ttloffice.com')
    await   page.getByPlaceholder('Your email').fill('lethily20041988@gmail.com')
    await   page.getByPlaceholder('Your password').fill('Ab@123456')
    const   sing_in = page.getByRole('button', { name: 'Sign In' })
    await   sing_in.click()
    await   page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img').click()
    // await   expect(page.getByText('Thông báo')).not.toBeVisible()
    const   expand_dashboard= page.locator('.sidebar-minimizer')
    await   expand_dashboard.click()
    const   cd_text=page.getByText('Cài đặt')
    await   expect(cd_text).toBeVisible()
    await   cd_text.click()
    const   cd_chuc_danh=page.getByRole('link', { name: 'Chức danh' })
    await   cd_chuc_danh.click()
    await   expect(page.getByText('Tên chức danh')).toBeVisible()
})
test.afterEach(async ({page})=>{
    await   page.pause()
})
test('checkbox', async({page})=>{
    // kiểm tra check box uncheck 
    const   checkbox=page.locator('div').filter({ hasText: /^Thứ tựTên chức danhHành động$/ }).locator('span').nth(1)
    await   checkbox.isChecked()
    await   checkbox.uncheck()
    await   expect(checkbox).toBeTruthy
    
    // check highlight vào checkbox thay đôi màu sắc
    
    const   color3 = checkbox.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color3")
    })
    await   checkbox.hover()
    const   color4 = checkbox.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color4")
    })
    await   expect(color3).not.toBe(color4)

    // kiểm tra click vào checkbox 
    await   checkbox.click()
    await   expect(page.locator('#common-layout').getByRole('button')).toBeVisible()
    
})

test('kiểm tra cột thứ tự', async({page})=>{
    await   expect(page.locator('div').filter({ hasText: /^1$/ })).toBeVisible()
    await   expect(page.getByText('Thứ tự')).toBeVisible()
})

test('kiểm tra cột Tên chức danh', async({page})=>{
    await   expect(page.getByText('Dev')).toBeVisible()
    await   expect(page.getByText('Tên chức danh')).toBeVisible()
})

test('Icon Edit', async({page})=>{
    const   edit=page.locator('div').filter({ hasText: /^41Dev$/ }).locator('img').nth(1)

    await   expect(edit).toBeVisible()
    await   edit.click()
    await   expect(page.locator('rect').first()).toBeVisible()
    await   expect(page.locator('rect').nth(1)).toBeVisible()
    await   page.locator('rect').first().click()

})

test('Button Thêm', async({page})=>{
    const   add_button  = page.getByRole('button')
    await   expect(add_button).toBeVisible()
    await   add_button.click()
    await   expect(page.getByRole('button', { name: 'Xác nhận' })).toBeVisible()
    await   page.getByRole('button', { name: 'Hủy' }).click()
})

test('Icon Delete', async({page})=>{
    const   delete_icon  = page.locator('div').filter({ hasText: /^41Dev$/ }).locator('img').first()
    await   expect(delete_icon).toBeVisible()
    await   delete_icon.click()
    await   expect(page.getByRole('button', { name: 'Xác nhận' })).toBeVisible()
    await   page.getByRole('button', { name: 'Hủy' }).click()
})

test('popup xóa chúc danh CĐ_CD59 CĐ_CD60 CĐ_CD61 CĐ_CD62  ', async({page})=>{  
    // Hiển thị title : ' Xóa chức danh '
    const   delete_icon  = page.locator('div').filter({ hasText: /^41Dev$/ }).locator('img').first()
    await   delete_icon.click()
    await   expect(page.getByText('Xóa chức danh', { exact: true })).toBeVisible()
    // Hiển thị content ' Bạn có chắc chắn muốn xóa chức danh đã chọn không ? 
    await   expect(page.getByText('Bạn có chắc chắn muốn xóa chứ')).toBeVisible()
    // xóa chức danh được assgign cho người dùng 
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Có chức danh đang được sử dụng')).toBeVisible()
    // Close popup xóa khi click vào button huy 
    await   delete_icon.click()
    await   page.getByRole('button', { name: 'Hủy' }).click()
    await   expect(page.getByText('Xóa chức danh', { exact: true })).not.toBeVisible()
    // Icon Close : Close popup Xóa thành công
    await   delete_icon.click()
    await   page.getByLabel('el.messagebox.close').click()
    await   expect(page.getByText('Xóa chức danh', { exact: true })).not.toBeVisible()

})

test('Popup Thêm mới chức danh' , async({page})=>{ 
// kiểm tra button xác nhận    
    // crate chức danh 
    const   creta_chuc_danh=page.getByRole('button')
    const   text_tao_moi_chuc_danh=page.getByText('Tạo mới chức danh')
    const   bat_buoc_ten_chuc_danh=page.getByText('*')
    const   nhap_ten_chuc_danh=page.getByPlaceholder('Nhập tên chức danh')
    const   khung_nhap_ten_ten_chuc_danh=page.locator('.el-input__wrapper')
    const   huy_cd_chudanh=page.getByRole('button', { name: 'Hủy' })
    const   xac_nhan_cd_chudanh=page.getByRole('button', { name: 'Xác nhận' })
    // kiểm tra khi bỏ trống trường tên chức danh 
    await   page.waitForTimeout(1000)
    await   creta_chuc_danh.click()
    await   xac_nhan_cd_chudanh.click()
    await   expect(page.getByText('Tên chức danh là trường bắt')).toBeVisible()
    // kiểm tra nhập trung tên các chwucs danh đã có trước đó 
    await   nhap_ten_chuc_danh.fill('Dev')
    await   xac_nhan_cd_chudanh.click()
    await   expect(page.getByText('Chức danh đã tồn tại')).toBeVisible()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoChức danh đã tồn tại' }).getByRole('img').click()
    // await   expect(page.getByText('Chức danh đã tồn tại')).toBeDisabled()

    //kiếm  tra khi nhập hợp lệ tất cả các trường 
    await   nhap_ten_chuc_danh.clear()
    await   nhap_ten_chuc_danh.fill('Tokyo')
    await   xac_nhan_cd_chudanh.click()
    await   expect(page.getByText('Tokyo')).toBeVisible()
    await   page.waitForTimeout(1000)
    // await   page.locator('div').filter({ hasText: /^Tokyo$/ }).locator('img').first().click()
    // await   page.getByRole('button', { name: 'Xác nhận' })
    // await   expect(page.getByText('Tokyo')).toBeDisabled()
    
    
// Kiểm tra button hủy?\ 
    await   creta_chuc_danh.click()
    await   huy_cd_chudanh.click()
    await   expect(page.getByText('Hành động')).toBeVisible()
    // kiểm tra màn hình khi nhập dự liệu và ấn hủy 
    await   page.waitForTimeout(2000)
    await   creta_chuc_danh.click()
    await   nhap_ten_chuc_danh.fill('Tokyo23')
    await   huy_cd_chudanh.click()
    await   expect(page.getByText('Dev')).toBeVisible()
    await   expect(page.getByText('Tokyo23')).not.toBeVisible()

})


// test('delete all chuc danh', async({page})=>{
//     await   page.locator('div').filter({ hasText: /^Thứ tựTên chức danhHành động$/ }).locator('span').nth(1).click()
//     await   page.locator('#common-layout').getByRole('button').click()
//     await   page.getByRole('button', { name: 'Xác nhận' }).click()
//     var   creta_chuc_danh=page.getByRole('button')
//     const   cd_All_checkbox=page.locator('div').filter({ hasText: /^Thứ tựTên chức danhHành động$/ }).locator('span').nth(1)
//     const   cd_thu_tu = page.getByText('Thứ tự')
//     const   cd_ten_chuc_danh = page.getByText('Tên chức danh')
//     const   cd_hanh_dong = page.getByText('Hành động')
//     const   cd_checkbox_2 = page.locator('label').filter({ hasText: '1' }).locator('span').nth(1)
//     // crate chức danh 
//     const   text_tao_moi_chuc_danh=page.getByText('Tạo mới chức danh')
//     const   bat_buoc_ten_chuc_danh=page.getByText('*')
//     const   nhap_ten_chuc_danh=page.getByPlaceholder('Nhập tên chức danh')
//     const   khung_nhap_ten_ten_chuc_danh=page.locator('.el-input__wrapper')
//     const   huy_cd_chudanh=page.getByRole('button', { name: 'Hủy' })
//     const   xac_nhan_cd_chudanh=page.getByRole('button', { name: 'Xác nhận' })
//     //input text tạo chứ danh 
//     await   creta_chuc_danh.click()
//     await   nhap_ten_chuc_danh.fill('Tokyo')
//     await   xac_nhan_cd_chudanh.click()
//     await   expect(page.getByText('Tokyo')).toBeVisible()
//     //delete chuc danh 
//     // await   page.locator('//img[@src="/assets/delete_icon-0a598c4d.svg]').click()
//     // // await   page.locator('div').filter({ hasText: /^134Tokyo$/ }).locator('img').first().click()
//     // await   page.getByRole('button', { name: 'Xác nhận' })
//     // await   expect(page.getByText('Tokyo')).not.toBeVisible()
//     // // src="/assets/delete_icon-0a598c4d.svg"
// })

  

    


