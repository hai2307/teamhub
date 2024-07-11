import { test, expect } from '@playwright/test'
import { closeSync } from 'fs'

test.beforeEach( async({page})=>{
    await   page.goto('http://172.16.1.140:5005/')
    const   user = page.locator('#username')
    const   Pass= page.locator('#password')
    const   login=page.locator('#kc-login')
    await   user.fill('chom1@mail.com')
    await   Pass.fill('Lyly1234@')
    await   login.click()
    const   logo=page.locator('[class="logo-image"]')
    await   expect(logo).toBeVisible()

})
test('profile ', async({page})=>{
    const   ho_so=page.locator('[class="profile-img"]')
    await   ho_so.click()
    const   doi_mat_khau = page.locator(':text("Đổi mật khẩu")')
    await   doi_mat_khau.click()
// check new password
    // Check name of this field - displayed filed name : đổi mật khẩu 
    await   expect(page.locator(':text("Đặt mật khẩu")')).toBeVisible()

    // Check placeholder of this field -Displayed placeholder: Enter Password
    const   nhap_mk = page.getByPlaceholder('Nhập mật khẩu')
    await expect(nhap_mk).toBeVisible()
    // Check Password when input less than 8 characters
    await   nhap_mk.fill('123456')
    const   noti_pass_erro=page.locator('[class="invalid-feedback text-start d-block"]')
    await   expect(noti_pass_erro).toContainText('Mật khẩu phải có ít nhất  8 ký tự')
    // Check password when input value is more than max allowed characters
    await   nhap_mk.fill('')
    await   expect(noti_pass_erro).toContainText('Mật khẩu phải có ít nhất  8 ký tự')
    //Check password when input valid value (following the password pattern, correct regex)
// check confirm Passwork 
    // Check confirm password when input is incorrect-Show message: 'The confirm password field is invalid'
    await   nhap_mk.fill('Ly123456@')
    const   xac_nhan_mk = page.locator('[placeholder="Nhập lại mật khẩu"]')   
    await   xac_nhan_mk.fill('Ly123458989')
    await   expect(noti_pass_erro).toHaveText('Mật khẩu xác nhận không hợp lệ')
    //Check confirm password when input value is empty/blank
    await   xac_nhan_mk.clear()
    await   xac_nhan_mk.fill('')
    await   expect(noti_pass_erro).toBeVisible()
    //Check confirm password when input value is under min allowed characters -Show message:'The password must be at least 6 characters'
    await   xac_nhan_mk.fill('12345')

    await   expect(noti_pass_erro).toHaveText('Mật khẩu xác nhận phải có ít nhất  8 ký tự')

    await   nhap_mk.clear()
    await   xac_nhan_mk.clear()
    await   nhap_mk.fill('Lyly1234@1')  
    await   xac_nhan_mk.fill('Lyly1234@1')   
    // await   page.locator(':text("Xác nhận")').click()
    // await   expect(page.locator('[class="el-notification__content"]')).toHaveText('Đặt mật khẩu người dùng thành công')
 test.afterEach(  async({page})=>{

    await closeSync
 })






} )