import { test, expect } from '@playwright/test' 

test('timekeeping ', async({page})=>{
    await   page.goto('https://company-test.ttloffice.com/timekeeping')
    await   page.getByPlaceholder('Your email').fill('lethily20041988@gmail.com')
    await   page.getByPlaceholder('Your password').fill('Ab@123456')
    const   sing_in = page.getByRole('button', { name: 'Sign In' })
    await   sing_in.click()

    await   expect(page.getByText('Thông báo')).not.toBeVisible()
    await   page.waitForTimeout(4000)
    // download file thành coôg
    const   download_file = page.getByRole('button').first()
    await   expect(download_file).toBeVisible()
    await   download_file.hover()
    await   expect(page.getByText('Tải file chấm công')).toBeVisible()
    // await   download_file.click()
// kiểm tra nút seach và hoạt động của biểu tượng tìm kiếm 
    const   icon_search=page.locator('.icon-search > path')
    const   text_search=page.getByPlaceholder('Nhập tên nhân viên')
    await   expect(text_search).toBeVisible()
    //hiển thị kính lúp ở biểu tưởng tìm kiếm 
    await   expect(icon_search).toBeVisible()
    // ckeck placholder of filed là tìm kiếm 
    await   expect(page.getByPlaceholder('Nhập tên nhân viên')).toBeVisible()

// wiew time keeping by week 
    // check hiển thị button tuần 
    const   tuan_button=page.getByText('Tuần')
    await   expect(tuan_button).toBeVisible()
    //check vao click hôm nay khi đang ở button tuần 
    await   tuan_button.click()
    const   homnay_button=page.getByText('Hôm nay')

    // show bảng châm công nhân viên -
    await   expect(page.getByText('Lee 19')).toBeVisible()

// wiew timekeeping by month
    // hiện thị butoon tháng
    const   thang_button=page.getByText('Tháng', { exact: true })
    await   expect(thang_button).toBeVisible()
    //check vao click hôm nay khi đang ở button thang
    await   thang_button.click()
    // show bảng châm công nhân viên - hiện tại không có dữ liệu
    await   expect(page.getByText('Lee 19')).toBeVisible()
// create chấm công 
    // create tạo chấm công 
    // const   create_cham_cong=page.locator('//button[@class="el-button el-button--primary el-button--default button-primary icon-button el-tooltip__trigger el-tooltip__trigger"]')
    const   create= page.getByRole('button').nth(1)
    await   create.click()
    const   xac_nhan_popup=page.getByRole('button', { name:'Xác nhận'})
    await   expect(xac_nhan_popup).toBeVisible()
    const   huy_popup=page.getByRole('button', { name: 'Hủy' })
    await   expect(huy_popup).toBeVisible()
 
    // cac field truyền vào là bắt buộc 
    const   nhan_vien_required_field=page.locator('label').filter({ hasText: 'Nhân viên *' }).locator('span')
    const   ngay_required_field=page.locator('label').filter({ hasText: 'Ngày *' }).locator('span')
    const   gio_ra_required_field=page.locator('label').filter({ hasText: 'Giờ vào *' }).locator('span')
    const   gio_vao_required_field=page.locator('label').filter({ hasText: 'Giờ ra *' }).locator('span')

    await   expect(nhan_vien_required_field).toBeVisible()
    await   expect(ngay_required_field).toBeVisible()
    await   expect(gio_ra_required_field).toBeVisible()
    await   expect(gio_vao_required_field).toBeVisible()
    // check tên của trường nhân viên chứa placholder 
    const   nhan_vien_field=page.getByPlaceholder('Chọn nhân viên')
    await   expect(nhan_vien_field).toBeVisible()
    // check value của dropdown    
    await   nhan_vien_field.click()
    const   ten_dropdown=page.locator('#option_21').getByText('Lee')
    await   expect(ten_dropdown).toBeVisible()
    await   ten_dropdown.click()
    // // check hiển thị value of dropdown
    // const   o_nhanv_vien=page.locator('.select-trigger > .el-input > .el-input__wrapper')
    // await   expect(o_nhanv_vien).toHaveText('Lee 19')




    // đóng tạo chấm công 
    const   close_create_cham_cong=page.getByLabel('el.dialog.close')
    await   close_create_cham_cong.click()
})