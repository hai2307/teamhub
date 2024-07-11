import { test, expect } from '@playwright/test'
import { beforeEach } from 'node:test'

test('dashboard' , async({page})=>{
    await   page.goto('https://company-test.ttloffice.com/timekeeping')
    await   page.getByPlaceholder('Your email').fill('lethily20041988@gmail.com')
    await   page.getByPlaceholder('Your password').fill('Ab@123456')
    const   sing_in = page.getByRole('button', { name: 'Sign In' })
    await   sing_in.click()
    //CLick vao expland dashboard 
    await   expect(page.getByText('Thông báo')).not.toBeVisible()
    const   expand_dashboard= page.locator('.sidebar-minimizer')
    await   expand_dashboard.click()

    // quản trị nhân sự 
    const   QT_nhan_su =page.getByText('Quản trị nhân sự')
    await   expect(QT_nhan_su).toBeVisible()
    const   color = QT_nhan_su.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color")
    })
    await   QT_nhan_su.hover()
    const   color2 = QT_nhan_su.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   page.waitForTimeout(1000)
    await   expect(color).not.toBe(color2)
    await   QT_nhan_su.click()
                  // hiển thị tính năng của quản trị nhân sự  
    const   QTNS_nguong_dung=page.getByRole('link', { name: 'Người dùng' })
    await   expect(QTNS_nguong_dung).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Hợp đồng' })).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Lịch làm việc' })).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Thủ tục gia nhập' })).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Thủ tục nghỉ việc' })).toBeVisible()
    // check  có sự thay đổi màu sắc khi khi hover chuột vào tính nawg quan trị nhân sự 
    const   color3 = QTNS_nguong_dung.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color3")
    })
    await   QTNS_nguong_dung.hover()
    const   color4 = QTNS_nguong_dung.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color4")
    })
    await   expect(color3).not.toBe(color4)
    
    // hiện thị màn hinh tính nang tương ứng khi click() vao tính năng của quản trị nhân sự
    await   QTNS_nguong_dung.click()
    await   expect(page.getByRole('link', { name: 'Quản lý người dùng' })).toBeVisible()
    await   expect(page.getByPlaceholder('Tìm kiếm', { exact: true })).toBeVisible()
    await   QT_nhan_su.click()

// quản lý chấm công 
    const   QL_cham_cong =page.getByRole('menubar').getByText('Quản lý chấm công')
    await   QL_cham_cong.click()
    await   expect(page.getByRole('link', { name: 'Chấm công', exact: true })).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Xin nghỉ' })).toBeVisible()
    await   expect(page.getByRole('link', { name: 'Làm thêm' })).toBeVisible()
    await   expect(QL_cham_cong).toBeVisible()   
    await   QL_cham_cong.click()
       

    const   Ql_tuyen_dung =page.locator('div').filter({ hasText: /^Quản lý tuyển dụng$/ })
    await   expect(Ql_tuyen_dung).toBeVisible()

    const   Ql_tai_san =page.locator('div').filter({ hasText: /^Quản lý tài sản$/ })
    await   expect(Ql_tai_san).toBeVisible()

    const   Ql_vai_tro =page.getByRole('link', { name: 'Quản lý vai trò' })
    await   expect(Ql_vai_tro).toBeVisible()

    const   Ql_quy_dinh =page.getByRole('link', { name: 'Quản lý quy định' })
    await   expect(Ql_quy_dinh).toBeVisible()

    const   bao_cao =page.getByText('Báo cáo', { exact: true })
    await   expect(bao_cao).toBeVisible()

    const   cai_dat =page.locator('div').filter({ hasText: /^Cài đặt$/ })
    await   expect(cai_dat).toBeVisible()

    const   huong_dan_SD =page.getByRole('link', { name: 'Hướng dẫn sử dụng' })
    await   expect(huong_dan_SD).toBeVisible()
   
})