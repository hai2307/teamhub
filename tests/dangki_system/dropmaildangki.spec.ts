import { test, expect, chromium ,Page } from '@playwright/test';   
import axios from 'axios';
import {RandomString ,Randomint}  from '../../page/UI_interactions';
import { clickButton } from '../../page/UI_interactions';
// vài trang này đk tk : https://org-console.iam-center.dev-tokyotechlab.com/register
// vào trang https://dropmail.me/en/  tạo email

// sau đó vào trang https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization ,đk với tk adim
// và kích hoạt tk 
// sau đó vào mail kich -> tọa mk mới thành công 
// sau đó quay lại mail _ -> click vào link đnag nhập
// sau đó vào nhân viên và xem tk đã đang kí thành công 
// sau đó vào trang dev admin https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization kích haotj tk 
// sau đó quay lại trnag hrm ,,https://kali.hrm.dev-tokyotechlab.com/user vừa tạo tạo vai trò 
// await   page4.goto(`https://${randomString3}.hrm.dev-tokyotechlab.com/user`)
// sau đó  https://krixi.org-console.iam-center.dev-tokyotechlab.com/user  tạo người dùng mới 




const randomString = RandomString(5)
const randomString3 = RandomString(3)
const  randomhoten= RandomString(6)
const ramdommanguoidung = Randomint(5)

test("dropmail", async ({ }) => {
    test.setTimeout(400000)
    const browser = await chromium.launch()
    const Context = await browser.newContext()

    const page1 = await Context.newPage()
    const page2 = await Context.newPage()
    const page3 = await Context.newPage()

    await   page1.goto('https://dropmail.me/en')
    await   page1.waitForTimeout(2000)
    const   tenmail = await page1.locator('[class="address"]').textContent()
    console.log(`${tenmail}`)

    await page2.goto('https://org-console.iam-center.dev-tokyotechlab.com/register')
    await  page2.waitForLoadState()
    await expect(page2.locator('.register-form-title')).toBeVisible()

    const   chondichvu = await page2.locator('div:nth-child(5) > .mdi-chevron-down').first()
    await   chondichvu.click()

    const   dv_hrm = await page2.getByRole('listbox').getByText('hrm')
    await   dv_hrm.click()

    // const   dv_lms = await page2.getByRole('listbox').getByText('lms')
    // await   dv_lms.click()

    const   email = await page2.locator('#input-12')
    await   email.click()
    await   email.fill(`${tenmail}`)

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

    const   dangky = await page2.locator('//button[@type="button"]')
    await   dangky.click()

    const   dkthanhcong =await page2.getByRole('heading', { name: 'Đăng ký tài khoản thành công' }).click()
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
    
    const [newPage] = await Promise.all([
        Context.waitForEvent('page'), // Đợi trang mới mở ra
        page1.getByRole('link', { name: 'https://u36390207.ct.sendgrid.net/ls/click?upn=u001.2499SU3ZZNqC0Hh0TLF5XZ4dbr1' }).click()
      ]);

     // đổi mật khẩu 
    const nhapmatkhau = await newPage.locator('[placeholder="Nhập mật khẩu"]')
    await nhapmatkhau.fill('Ab@123456')
    const nhapmatkhau2 = await newPage.locator('[placeholder="Xác nhận mật khẩu mới"]')
    await nhapmatkhau2.fill('Ab@123456')
    const taomatkhau2 = await newPage.locator('[class="v-btn__content"]')
    await taomatkhau2.click()
    const loginButton = newPage.locator(':test-is("Đăng nhập")');
    // Kiểm tra xem nút đăng nhập có tồn tại không
    if (await loginButton.count() > 0) {
        // Nếu nút tồn tại, click vào nút đăng nhập
        await loginButton.click();
        console.log('Clicked on the login button.');
    } else {
        // Nếu nút không tồn tại, bỏ qua
        console.log('Login button does not exist.');
    }


    // dang nhap 
    await  newPage.waitForLoadState()
    await  newPage.waitForTimeout(6000)
    await  newPage.getByPlaceholder('Nhập email').fill(`${tenmail}`)
    await  newPage.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
    await  newPage.getByRole('button', { name: 'Đăng nhập' }).click()
    await  newPage.getByText('Truy cập').first().click()
    // await  expect(newPage.getByRole('img', { name: 'coming soon' })).toBeVisible()
// tạo người dung trên iam 
// const [new1Page] = await Promise.all([
//     Context.waitForEvent('page'), // Đợi trang mới mở ra
//     page1.getByRole('link', { name: `https://${randomString3}.org-console.iam-center.dev-tokyotechlab.com` }).click()

//   ]);
//   // tạo vai trò trên iam 
//     await  new1Page.waitForLoadState()
//     await  new1Page.getByRole('link', { name: 'Quản lý Vai trò' }).click()
//     await  new1Page.getByRole('link', { name: 'HRM' }).click()
//     await  new1Page.getByRole('button').click()
//     await  new1Page.getByPlaceholder('Nhập tên vai trò').fill('admin')
//     await  new1Page.getByLabel('Tất cả quyền').click()
//     await  new1Page.getByText('Lưu', { exact: true }).click()

// //   tạo người dùng trên iam 
//     await  new1Page.waitForLoadState()
//     await  new1Page.getByRole('link', { name: 'Quản lý người dùng' }).click()
//     await  new1Page.locator('.wrapper-feature > div:nth-child(3) > .v-icon').click()
//     await  new1Page.getByRole('button', { name: 'Thêm người dùng' }).click()
//     await  new1Page.getByLabel('Quản trị hệ thống').click()
//     await  new1Page.getByLabel('Cho phép đăng nhập').click()
//     await  new1Page.getByPlaceholder('Nhập họ và tên').fill(randomhoten)
//     await  new1Page.getByPlaceholder('Nhập email').fill(`${tenmail}`)
//     await  new1Page.getByPlaceholder('Nhập mã người dùng').fill(ramdommanguoidung)
//     await  new1Page.getByText('Lưu').click()


    // // xóa tk vừa đăng kí
    await  page3.locator('div', { hasText: `${randomString}` }).getByRole('button').first().click()
    await  page3.getByText('Dừng hoạt động').click()
    await  page3.getByText( `${randomString}` ).click()
    await  page3.getByText('Vô hiệu hóa', { exact: true }).click()
    await  page3.getByText('Xóa doanh nghiệp', { exact: true }).click()
    // await  page3.locator('button').filter({hasText: 'Lưu'}).click()
    await   page3.getByText('Lưu').click()

    await  page1.pause()

})
