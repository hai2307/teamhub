import { test, expect, chromium ,Page } from '@playwright/test';   
import axios from 'axios';
import {RandomString}  from '../../page/UI_interactions';
// vài trang này đk tk : https://org-console.iam-center.dev-tokyotechlab.com/register
// vào trang https://dropmail.me/en/  tạo email

// sau đó vào trang https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization ,đk với tk adim
// và kích hoạt tk 
// sau đó vào mail kich -> tọa mk mới thành công 
// sau đó quay lại mail _ -> click vào link đnag nhập
// sau đó vào nhân viên và xem tk đã đang kí thành công 
// sau đó vào trang dev admin https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization kích haotj tk 
// sau đó quay lại trnag hrm ,,https://kali.hrm.dev-tokyotechlab.com/user vừa tạo tạo vai trò 
// sau đó  https://krixi.org-console.iam-center.dev-tokyotechlab.com/user  tạo người dùng mới 




const randomString = RandomString(5)
const randomString3 = RandomString(3)
// const randommail = RandomString(4)

test("mail10minut", async ({ }) => {
    test.setTimeout(400000)
    const browser = await chromium.launch()
    const Context = await browser.newContext()

    const page1 = await Context.newPage()
    const page2 = await Context.newPage()
    const page3 = await Context.newPage()

    await page1.goto('https://10minutemail.net/')
    await page1.waitForLoadState()
    await page1.waitForSelector('.fc-dialog-overlay')
    await page1.locator('//button[@class="fc-button fc-cta-consent fc-primary-button"]//p[@class="fc-button-label"]').click()
    const   tenmail = await   page1.locator('.mailtext').textContent()
    console.log(`${tenmail}`)
    await   page1.getByRole('button', { name: 'Copy to clipboard' }).click()
    

    await page2.goto('https://org-console.iam-center.dev-tokyotechlab.com/register')
    await expect(page2.locator('.register-form-title')).toBeVisible()

    const   chondichvu = await page2.locator('div:nth-child(5) > .mdi-chevron-down').first()
    await   chondichvu.click()

    const   dv_hrm = await page2.getByRole('listbox').getByText('hrm')
    await   dv_hrm.click()

    // const   dv_lms = await page2.getByRole('listbox').getByText('lms')
    // await   dv_lms.click()

    const   email = await page2.locator('#input-12')
    await   email.click()
    await page2.keyboard.down('Control');
    await page2.keyboard.press('KeyV'); // Paste
    // await page2.keyboard.up('Control');
    await   page2.waitForTimeout(1000);
 
    // await   email.fill(`${tenmail}`)


    const   tendoanhnghiep = await page2.locator('#input-6')
    await   tendoanhnghiep.fill(randomString)

    const   tenmien= await page2.locator('#input-8')
    await   tenmien.fill(randomString3)

    const   nguoidaidien = await page2.locator('#input-10')
    await   nguoidaidien.fill('hai')

    const   sdt = await page2.locator('#input-14')
    await   sdt.fill('0977681123')

    const   toidongy = await page2.getByLabel('Tôi đồng ý với các điều khoản')
    await   toidongy.click()

    // const   dangky = await page2.locator('[class="d-flex align-center"]')
    const   dangky = await page2.locator('//button[@type="button"]')
    await   dangky.click()

    // const   dkthanhcong =await page2.getByRole('heading', { name: 'Đăng ký tài khoản thành công' })
    // await   expect(dkthanhcong).toBeVisible()
   
    await page3.goto('https://admin-console.iam-center.dev-tokyotechlab.com/')
    await expect(page3.locator('[class="logo"]')).toBeVisible()
    await page3.locator('//input[@name="password"]').fill('Ab@123456')
    await page3.locator('//input[@name="email"]').fill('admin@tokyotechlab.com')
    await page3.locator('//button[@type="button"]').click()
    await page3.locator('a').filter({ hasText: 'Danh sách doanh nghiệp' }).click()
    await page3.locator('//input[@placeholder="Tìm kiếm"]').fill(randomString)
    await page3.getByRole('button', { name: 'Tìm kiếm' }).click()
    await page3.getByRole('button', { name: 'Chờ phê duyệt' }).first().click()
    await page3.getByText('Kích hoạt').click()

    
    await   page1.waitForTimeout(5000)  
    const  thongbaokichhoat = page1.getByRole('link', { name: '[TeamHub] Thông báo về việc kích hoạt' })
    // await expect(thongbaokichhoat).toBeVisible()
    await   thongbaokichhoat.click()
    await   page1.keyboard.press('Enter')

    
    const [newPage] = await Promise.all([
        Context.waitForEvent('page'), // Đợi trang mới mở ra
        page1.getByRole('link', { name: 'Kích hoạt' }).first().click()
        // page1.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: 'Kích hoạt' }).click()
      ]);

     // đổi mật khẩu 
    const nhapmatkhau = await newPage.locator('[placeholder="Nhập mật khẩu"]')
    await nhapmatkhau.fill('Ab@123456')
    const nhapmatkhau2 = await newPage.locator('[placeholder="Xác nhận mật khẩu mới"]')
    await nhapmatkhau2.fill('Ab@123456')
    const taomatkhau2 = await newPage.locator('[class="v-btn__content"]')
    await taomatkhau2.click()

    // dang nhap 
    await  newPage.waitForLoadState()
    await  newPage.waitForTimeout(2000)
    await  newPage.getByPlaceholder('Nhập email').click()
    await  newPage.keyboard.down('Control');
    await  newPage.keyboard.press('KeyV'); // Pas
    await  newPage.waitForTimeout(2000)
    await  newPage.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
    await  newPage.waitForTimeout(2000)
    await  newPage.getByRole('button', { name: 'Đăng nhập' }).click()
    await  newPage.getByText('Truy cập').first().click()
    // await  expect(newPage.getByRole('img', { name: 'coming soon' })).toBeVisible()
    await page1.pause()


})
