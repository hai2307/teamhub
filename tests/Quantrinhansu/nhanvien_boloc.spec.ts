import { test, expect } from '@playwright/test';
import { loginpage } from '../../page/loginpage';


test.beforeEach(async({page})=>{
    const Loginhrm = new loginpage(page)
    await Loginhrm.login()
    await   page.locator('div:nth-child(2) > svg').first().click()
    await   page.locator('#form-filter').getByRole('button').first().click()
    await   expect(page.getByRole('banner')).toBeVisible()
})

test.afterEach(async ({page})=>{
    await   page.pause()
})



test('field ten , ma nhan vien , email , so dien thoai ' , async({page})=>{

    console.log(`${'\x1b[33m'} tìm va in ra so ban ghi voi ten  `)
    const   ten_manv_email_sdt = await page.getByPlaceholder('Nhập tên, mã nhân viên, email')
    await   expect(ten_manv_email_sdt).toBeVisible()
    await   ten_manv_email_sdt.fill('test')
    
    const   apdung = await page.locator('//div[@class="el-drawer__footer"]//button[@class="el-button el-button--primary el-button--default apply-button"]/span')
    await   expect(apdung).toBeVisible()
    await   apdung.click()
    await   page.waitForTimeout(1000)

    const   tongbanghi = await page.locator('//p[@class="total-item m-0"]')
    await   tongbanghi.textContent()
    const   sobanghi = await tongbanghi.textContent()
    console.log('số bản ghi'+ sobanghi)

    console.log(`${'\x1b[33m'} tìm  voi so dien thoai `)
    await   page.locator('#form-filter').getByRole('button').first().click()
    await   expect(ten_manv_email_sdt).toBeVisible()
    await   ten_manv_email_sdt.fill('1232345432')  
    await   apdung.click()
    await   expect(page.locator('#common-layout').getByText('1232345432')).toBeVisible()

    console.log(`${'\x1b[33m'} tìm  voi email `)
    await   page.locator('#form-filter').getByRole('button').first().click()
    await   expect(ten_manv_email_sdt).toBeVisible()
    await   ten_manv_email_sdt.fill('test02@gmail.com')  
    await   apdung.click()
    await   expect(page.locator('#common-layout').getByText('test02@gmail.com')).toBeVisible()

    console.log(`${'\x1b[33m'} tìm theo ma nhan vien `)
    await   page.locator('#form-filter').getByRole('button').first().click()
    await   expect(ten_manv_email_sdt).toBeVisible()
    await   ten_manv_email_sdt.fill('0090')  
    await   apdung.click()
    await   expect(page.locator('#common-layout').getByText('thaont@tokyotechlab.com')).toBeVisible()
   
   

})

test('field phong ban ' , async({page})=>{

    console.log(`${'\x1b[33m'} tìm va in ra so ban ghi field phong ban `)
    const   phong_ban = await page.locator('.form-padding > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
    await   expect(phong_ban).toBeVisible()
    await   phong_ban.click()
    await   page.getByRole('option', { name: 'Phòng ban 1' }).locator('span').click()
    await   page.locator('//div[@class="el-drawer__footer"]//button[@class="el-button el-button--primary el-button--default apply-button"]/span').click()
    await   expect(page.locator('#common-layout').getByText('Phòng ban').first()).toBeVisible()
    
  
})

test('field chuc danh ' , async({page})=>{

    console.log(`${'\x1b[33m'} tìm thoe chuc danh`)
    const   chuc_danh = await page.getByLabel('Tiêu chí lọc').getByText('Chọn chức danh')
    await   expect(chuc_danh).toBeVisible()
    await   chuc_danh.click()
    await   page.getByRole('option', { name: 'Tester' }).locator('span').click()
    await   page.locator('//div[@class="el-drawer__footer"]//button[@class="el-button el-button--primary el-button--default apply-button"]/span').click()
    await   expect(page.locator('#common-layout').getByText('Tester').first()).toBeVisible()
    
  
})

test('field hinh thuc hop dong ' , async({page})=>{

    console.log(`${'\x1b[33m'} tim kiem theo email va hinh thuc`)
    await   page.getByPlaceholder('Nhập tên, mã nhân viên, email').fill('test02@gmail.com')
    const   hinhthuchopdong = await page.getByLabel('Tiêu chí lọc').getByText('Chọn hình thức hợp đồng')
    await   expect(hinhthuchopdong).toBeVisible()
    await   hinhthuchopdong.click()
    await   page.getByRole('option', { name: 'Chính thức' }).locator('span').click()
    await   page.locator('//div[@class="el-drawer__footer"]//button[@class="el-button el-button--primary el-button--default apply-button"]/span').click()
    await   expect(page.locator('#common-layout').getByText('Không có dữ liệu')).toBeVisible()
    
  
})

test('field trang thai hoat dong ' , async({page})=>{

    console.log(`${'\x1b[33m'} tim kim theo trang  hoat dong`)
    await   page.getByPlaceholder('Nhập tên, mã nhân viên, email').fill('test02@gmail.com')
    await   page.locator('//div[@class="el-drawer__footer"]//button[@class="el-button el-button--primary el-button--default apply-button"]/span').click()
    await   expect(page.locator('#common-layout').getByText('test02@gmail.com')).toBeVisible()
    
  
})