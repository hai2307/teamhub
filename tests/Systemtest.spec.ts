import { test, expect } from '@playwright/test';
import { loginpage } from '../page/loginpage';
import {enterText,selectRadioButton,checkCheckbox,uncheckCheckbox,selectDropdownValue,hoverToSeeTooltip,
    handleDialog,
    getTableCellText,
    selectDate,
    setSliderValue,
    dragDrop,
    clickElement,
    expectElementToBeVisible
  } from '../page/UI_interactions';
import { create } from 'domain';

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
let     randomtext = generateRandomString(8)
let     randomtext1 = generateRandomString(5)

test.beforeEach(async({page})=>{
    // mt dev  for hrm test
    // await   page.goto('https://uyentest3.hrm.dev-tokyotechlab.com')
    // await   page.getByPlaceholder('Nhập email').fill('nyrhqgeeg@emltmp.com')
    // await   page.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
    // await   page.locator('.v-btn__content').waitFor();
    // await   page.locator('.v-btn__content').click()
    // await   page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img').click()

    // mt  stg https://test01.hrm.stg.dev-tokyotechlab.com/user
     await   page.goto('https://test01.hrm.stg.dev-tokyotechlab.com/')
    await   page.locator('#email').fill('thaont@tokyotechlab.com')
    await   page.locator('#password').fill('Ttlab@1234')
    await   page.locator('#kc-login').click()
    await   page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img').click()
    // mt company
    // await   page.goto('https://company-test.ttloffice.com/')
    // await   page.getByPlaceholder('your email').fill('lethily20041988@gmail.com')
    // await   page.getByPlaceholder('your password').fill('Ab@123456')
    // await   page.locator('#kc-form-buttons').waitFor();
    // await   page.locator('#kc-form-buttons').click()
    // await   page.locator('#notification_1 div').filter({ hasText: 'Thông báoĐăng nhập thành công' }).getByRole('img').click()


})

test.afterEach(async ({page})=>{
    await   page.pause()
})


test.describe(' quan ly nhan su', () => {

    test(' Verify quan ly hop dong' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify quan ly hop dong`)
        await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('link', { name: 'Hợp đồng', exact: true }).click()
        const   creta_hopdong=page.locator('#form-filter').getByRole('button').nth(2)
        await   expect(creta_hopdong).toBeVisible()
        await   creta_hopdong.click()

        const   chonnhanvien=page.locator('.el-col > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
        await   chonnhanvien.click()
        await   page.getByRole('option', { name: '- thaont' }).click()

        const   loaihopdong = page.getByText('Chọn loại hợp đồng')
        await   loaihopdong.click()
        await   page.getByRole('option', { name: 'Hợp đồng TTS' }).click()

        const   hinhthuchopdong = page.locator('div:nth-child(5) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   hinhthuchopdong.click()
        await   page.getByRole('option', { name: 'Thử việc' }).click()

        const   ngaybatdau = page.locator('.el-input__prefix-inner > .el-icon > svg').first()
        await   ngaybatdau.click()
        await   page.locator('div').filter({ hasText: /^7$/ }).first().click()

        const   thongtinhopdong = page.getByPlaceholder('Nhập đường dẫn tới hợp đồng')
        await   thongtinhopdong.fill('https://test01.hrm.stg.dev-tokyotechlab.com/')

        const   xacnhan = page.locator('//button[@class="el-button el-button--primary save-btn button-primary"]')
        await   xacnhan.click()

        // await   expect(page.getByText('Thử việc	',{exact: true})).toBeVisible()
        // sua hop dong 
        const   sua_hopdong = page.getByRole('row', { name: '0090 - thaont Thử việc Hợp đồ' }).getByRole('button').first()
        await   sua_hopdong.click()
        const   sodhopdong = page.getByPlaceholder('Nhập số hợp đồng')
        await   sodhopdong.fill('10')
        await   xacnhan.click()

        // xóa hợp đồng
        const   xoa_hopdong = page.getByRole('row', { name: '0090 - thaont Thử việc Hợp đồ' }).getByRole('button').nth(1)
        await   xoa_hopdong.click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
        await   expect(page.getByText('0090 - thaont',{exact:true})).not.toBeVisible()
       
    })

// Setting system test 
    test(' Verify CRUD Chức danh' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD Chức danh`)
    await   page.locator('div:nth-child(2) > svg').first().click()
    await   page.getByRole('menuitem', { name: 'Cài đặt' }).getByRole('img').click()
    await   page.getByRole('link', { name: 'Chức danh' }).click()
    const   creta_chucdanh=page.getByRole('button')
    await   expect(creta_chucdanh).toBeVisible()
    await   creta_chucdanh.click()
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })

    await   expect(xacnhan).toBeVisible()
    await   page.getByPlaceholder('Nhập tên chức danh').fill(randomtext)
    await   xacnhan.click()
    await   expect(page.getByText(randomtext)).toBeVisible()

    // sua chuc danh vua tao  
    await   page.locator('div',{hasText: randomtext})
    // const   edit= page.locator('//div[@class="list-wrapper d-flex flex-row w-100"][5]').locator('rect').nth(1)
    // await   expect(edit).toBeVisible()
    // // const   tenchucdanh= page.locator('//input[@class="el-input__inner"]')
    // await   edit.click()
    // await   tenchucdanh.clear()

    
    // const   xoa_chucdanh = page.locator('div').filter({ hasText: randomtext }).locator('rect').first()
    // await   expect(xoa_chucdanh).toBeVisible()
    // await  page.locator('div').filter({ hasText: randomtext }).locator('rect').first().click()
    

    })

    test('Verify CRUD loại hợp đồng' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD loại hợp đồng `)
    await   page.locator('div:nth-child(2) > svg').click()
    await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
    await   page.getByRole('link', { name: 'Phân loại hợp đồng' }).click()
    const   creta_hopdong=page.locator('#form-filter button')
    await   expect(creta_hopdong).toBeVisible()
    await   creta_hopdong.click()
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    await   expect(xacnhan).toBeVisible()
    await   page.getByPlaceholder('Nhập tên').fill(randomtext)
    await   page.getByPlaceholder('Nhập số ngày nghỉ hưởng lương').fill('11')
    await   xacnhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo loại hợp đồng th' }).locator('path').click()
    await   expect(page.getByText(randomtext)).toBeVisible()
    const   xoa = page.getByRole('row', { name: randomtext }).getByRole('button').first()
    await   expect(xoa).toBeVisible()
    await   page.waitForSelector('#form-filter button')
    // sửa hợp đồng 
    const   edit = page.getByRole('row', { name: randomtext }).getByRole('button').nth(1)
    await   edit.click()
    await   page.getByPlaceholder('Nhập mô tả của loại hợp đồng').fill(randomtext)
    await   xacnhan.click()
    await   expect(page.getByText('Cập nhật loại hợp đồng thành công')).toBeVisible()
     // xóa hợp đồng 
    await   xoa.click()
    await   xacnhan.click()
    await   expect(page.getByText('Loại hợp đồng đã được xóa')).toBeVisible()

    })

    test('quy trinh gia nhap' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD quy trinh gia nhap `)
    // them nv HR
    await   page.locator('div:nth-child(2) > svg').click()
    await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
    await   page.getByRole('link', { name: 'Quy trình gia nhập' }).click()
    const   hr = page.getByRole('button', { name: 'HR' })
    await   expect(hr).toBeVisible()
    await   hr.click()
    const   edit_hr=page.getByRole('button', { name: 'HR' }).locator('.open-popup-icon')
    await   expect(edit_hr).toBeVisible()
    await   edit_hr.click()
    const   add_hr=page.getByRole('button', { name: 'Thêm' })
    await   add_hr.click()
    await   page.getByPlaceholder('Nhập tên công việc').fill(randomtext)
    await   page.locator('.el-select__selection').click()
    // await   page.getByRole('option', { name: 'test', exact: true }).click() //option_1
    await   page.locator('//div//ul//li[@id="option_3"]').click() 
    const   luu= page.getByRole('button', { name: 'Lưu' })
    await   luu.click()
    await   expect(page.getByText(randomtext)).toBeVisible()
    // sua hr
    await   edit_hr.click()
    await   page.getByPlaceholder('Nhập mô tả').fill('@hai')
    await   luu.click()
    await   expect(page.getByText('@hai')).toBeVisible()
    
    // xóa hr
    await   edit_hr.click()
    await   page.locator('.list-wrapper > div:nth-child(5)').click()
    await   luu.click()
    await   expect(page.getByText('@hai')).not.toBeVisible()

 
    })

    test('quy trinh nghi viec' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD quy trinh nghi viec `)
    // them nv lap trinh
    await   page.locator('div:nth-child(2) > svg').click()
    await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
    await   page.getByRole('link', { name: 'Quy trình nghỉ việc' }).click()
    const   hr = page.getByRole('button', { name: 'HR' })
    await   expect(hr).toBeVisible()
    await   hr.click()
    const   edit_hr=page.getByRole('button', { name: 'HR' }).locator('.open-popup-icon')
    await   expect(edit_hr).toBeVisible()
    await   edit_hr.click()
    const   add_hr=page.getByRole('button', { name: 'Thêm' })
    await   add_hr.click()
    await   page.locator('div').filter({ hasText: /^Tên là trường bắt buộc$/ }).first().getByPlaceholder('Nhập tên công việc').fill(randomtext)
    const   nguoiphutrach=   page.locator('div').filter({ hasText: /^Chọn người phụ tráchNgười phụ trách là trường bắt buộc$/ }).first().locator('.el-select__selection')
    await   nguoiphutrach.click()
    await   page.getByRole('option', { name: 'Test 01', exact: true }).locator('span').click() 
    const   luu= page.getByRole('button', { name: 'Lưu' })
    await   luu.click()
    await   expect(page.getByText(randomtext)).toBeVisible()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoCập nhật công việc' }).getByRole('img').click()
    // sua hr
    // await   edit_hr.click()
    // await   page.locator('div').filter({ hasText: randomtext }).first().getByPlaceholder('Nhập mô tả').fill('@hai')
    // await   luu.click()
    // await   expect(page.getByText('kokokkooo' ,{exact:true})).toBeVisible()
    // await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật công việc' }).getByRole('img').click()
    
    // // xóa hr
    // await   edit_hr.click()
    // await   page.locator('div').filter({ hasText: randomtext }).locator('img').first().click()
    // await   luu.click()
    // await   expect(page.getByText(randomtext)).not.toBeVisible()

 
    })

   test('phong  ban' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD phong  ban`)
    // them phon ban
    await   page.locator('.logo-module > div:nth-child(2)').click()
    await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
    await   page.getByRole('link', { name: 'Phòng ban' }).click()
    const   add_phongban=page.locator('.create-icon')
    await   add_phongban.click()
    const   maphonban=page.getByPlaceholder('Nhập mã phòng ban')
    await   maphonban.fill(randomtext1)
    const   tenphonban =   page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
    await   tenphonban.fill(randomtext)
    await   page.locator('.el-select__selection').click()
    await   page.getByRole('option', { name: '- thaont' }).locator('span').click()
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    await   xacnhan.click()
    await   expect(page.locator('.el-notification__group')).toBeVisible()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới phòng ban th' }).getByRole('img').click()
     // sua phon ban
    const   sua=page.locator("div", { hasText: randomtext}).locator('rect').first()
    // await  sua.click()
    // await   xoa.click()
   
    })
})

test.describe(' quan ly cham cong', () => {
test(' Verify CRUD Quy đinh cham cong' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD Quy đinh cham cong`)
    console.log(`${'\x1b[33m'} Verify CRUD Quy đinh cham cong so gio nghi phep`)
    await   page.locator('div:nth-child(3) > svg').click()
    await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
    await   page.getByRole('link', { name: 'Quy định chấm công' }).click()
    const   creta=page.getByRole('button').first()
    await   expect(creta).toBeVisible()
    await   creta.click()
    const   xacnhan=page.locator('.el-dialog__footer>.dialog-footer>.save-btn')
    const   chonnhanvien=page.getByText('Chọn nhân viên')
    const   songaynghicuanamnay= page.getByPlaceholder('Nhập giờ nghỉ phép còn lại của năm nay')
    await   songaynghicuanamnay.fill('12')
    await   page.getByPlaceholder('Nhập giờ nghỉ phép còn lại của năm trước').fill('12')
    await   chonnhanvien.click()
    const   chontatca = page.getByRole('tooltip', { name: 'Chọn tất cả' }).locator('label')
    await   expect(chontatca).toBeVisible()
    await   chontatca.click()
    await   page.getByRole('banner').click()
    // await   page.getByRole('option', { name: 'Uyen' }).locator('span').click()
    await   xacnhan.click()
    await   expect(xacnhan).not.toBeVisible
    await   expect(page.getByRole('heading', { name: 'Thông báo' })).toBeVisible()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoCập nhật số giờ ngh' }).locator('path').click()
    // sủa số h nghỉ phép
    await   page.getByRole('row', { name: 'ĐỖ VĂN ĐẠT' }).locator('rect').click()
    await   songaynghicuanamnay.clear()
    await   songaynghicuanamnay.fill('5')
    await   xacnhan.click()
    await   expect(page.getByRole('heading', { name: 'Thông báo' })).toBeVisible()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật số giờ ngh' }).getByRole('img').click()

    // ca làm việc 
    console.log(`${'\x1b[33m'} Verify CRUD Quy đinh cham cong  ca lam viec `)
    await   page.getByRole('tab', { name: 'Ca làm việc' }).click()
    await   creta.click()
    const   lichlamviec=page.locator('.col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper >.el-input__inner')
    await   expect(lichlamviec).toBeVisible()
    await   lichlamviec.fill(randomtext)
    await   page.locator('.el-input__prefix-inner > .el-icon > svg > path').first().click()
    await   page.getByText('7', { exact: true }).nth(1).click()
    const   ngayketthuc = page.locator('div:nth-child(4) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner')
    await   ngayketthuc.click()
    await   page.getByRole('gridcell', { name: '14' }).locator('span').click()
    const   giobatdau=page.locator('.col-md-4 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner').first()
    await   giobatdau.click()
    const   gioketthuc=page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner')
    await   gioketthuc.click()
    await   page.locator('.el-time-panel > .el-time-panel__content > .el-time-spinner > .el-scrollbar > .el-scrollbar__wrap > .el-scrollbar__view > .el-time-spinner__item').getByText('10').first().click()
    const   ngayapdung = page.getByText('Chọn ngày áp dụng')
    await   ngayapdung.click()
    await   page.getByRole('option', { name: 'Thứ 2' }).locator('span').click()
    await   xacnhan.click()
    // xóa ca làm việc 
    await   page.getByRole('row', { name: randomtext }).locator('span').nth(1).click()
    await   page.getByRole('button').nth(1).click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()

    // Quy định đi muộn về sớm
    console.log(`${'\x1b[33m'} Verify CRUD Quy định đi muộn về sớm `)
    await   page.getByRole('tab', { name: 'Quy định đi muộn/về sớm' }).click()
    await   creta.click()
    
    
})
})

// Quản lý tài sản
// 1. Verify CRUD tài sản
// 2. Verify CRUD yêu cầu tài sản
// 3. Verify CRUD phân loại tài sản
test.describe(' quan ly tai san', () => {
    test('Verify CRUD phân loại tài sản', async ({ page }) => {
        const   quanlytaisan= await page.locator('div:nth-child(4)').first()
        await   quanlytaisan.click()
        const   pltaisan= page.locator('.popper-menu').getByRole('link', { name: 'Phân loại tài sản', exact: true })
        await   pltaisan.click()
        const   pltaotaisan = page.locator('#form-filter button')
        await   pltaotaisan.click()
        const   pltentaisan = page.locator('.input-setting-asset > .form-group > .position-relative > .el-input > .el-input__wrapper >.el-input__inner').first()
        const   plmaloaitaisan = page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper>.el-input__inner')
        const   plxacnhan = page.locator('.dialog-footer>.save-btn')
        await   pltentaisan.fill(randomtext)
        await   plmaloaitaisan.fill(randomtext)
        await   plxacnhan.click()
        await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).locator('path').click()
        // sua phan laoi tai san 
        await   page.getByRole('row', { name: randomtext }).locator('rect').nth(1).click()
        await   page.locator('.el-textarea__inner').fill(randomtext)
        await   plxacnhan.click()
        // xoa plts 
        await   page.getByRole('row', { name: randomtext }).locator('rect').first().click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
      })

      test('Verify CRUD yêu cầu tài sản', async ({ page }) => {
        console.log(`${'\x1b[33m'} Verify CRUD yêu cầu tài sản`)
        const   quanlytaisan= await page.locator('div:nth-child(4)').first()
        await   quanlytaisan.click()

        const   yctaisan= page.locator('.popper-menu').getByRole('link', { name: 'Yêu cầu tài sản', exact: true })
        await   yctaisan.click()

        const   yctaotaisan = page.locator('#form-filter button')
        await   yctaotaisan.click()

        const   yctentaisan = page.locator('.col-md-6 > .form-group > .position-relative > .el-input > .el-input__wrapper>.el-input__inner')
        await   yctentaisan.fill(randomtext)

        const   ycmaloaitaisan = page.getByText('Chọn loại tài sản')
        await   ycmaloaitaisan.click()
        await   page.getByRole('option', { name: 'Tài sản 1' }).locator('span').click() 

        const   ycsoluong = page.getByPlaceholder('Nhập số lượng yêu cầu')
        await   ycsoluong.fill('1')
  
        const  nguoiduyet = page.getByText('Chọn người duyệt')
        await   nguoiduyet.click()
        await   page.getByRole('tooltip', { name: 'Chọn tất cả' }).locator('label').click()

        const   ycxacnhan = page.locator('.dialog-footer>.save-btn')
        await   ycxacnhan.click()
        // await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).locator('path').click()
        // // sua phan laoi tai san 
        // await   page.getByRole('row', { name: randomtext }).locator('rect').nth(1).click()
        // await   page.locator('.el-textarea__inner').fill(randomtext)
        // await   ycxacnhan.click()
        // // xoa plts 
        // await   page.getByRole('row', { name: randomtext }).locator('rect').first().click()
        // await   page.getByRole('button', { name: 'Xác nhận' }).click()
      });
    test('Verify CRUD tài sản', async ({ page }) => {
        console.log(`${'\x1b[33m'} Verify CRUD tài sản`)
        const   quanlytaisan= await page.locator('div:nth-child(4)').first()
        await   quanlytaisan.click()
        // tạo phân loại 
        const   pltaisan= page.locator('.popper-menu').getByRole('link', { name: 'Phân loại tài sản', exact: true })
        await   pltaisan.click()
        const   taopltaotaisan = page.locator('#form-filter button')
        await   taopltaotaisan.click()
        const   pltentaisan = page.locator('.input-setting-asset > .form-group > .position-relative > .el-input > .el-input__wrapper >.el-input__inner').first()
        const   plmaloaitaisan = page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper>.el-input__inner')
        const   plxacnhan = page.locator('.dialog-footer>.save-btn')
        await   pltentaisan.fill(randomtext)
        await   plmaloaitaisan.fill(randomtext1)
        await   plxacnhan.click()
        await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).locator('path').click()
        await   expect(page.getByText(randomtext)).toBeVisible()

        await   quanlytaisan.click()
        const   taisan= page.getByRole('link', { name: 'Tài sản', exact: true })
        await   taisan.click()
        const   taotaisan=page.locator('.create-button')
        await   taotaisan.click()
        const   xacnhan = page.getByRole('button', { name: 'Xác nhận' })
        await   expect(xacnhan).toBeVisible()
        const   mataisan=page.locator('.col-md-6 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner').first()
        await   mataisan.fill(randomtext)
        const   tentaisan=page.locator('div:nth-child(3) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner').first()
        await   tentaisan.fill(randomtext)
        await   page.locator('.col-md-6 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection > div:nth-child(2)').first().click()
        const   loaitaisan = page.getByRole('option', { name: randomtext }).locator('span')
        await   loaitaisan.click()

        const   nguoiquanly= page.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection > div:nth-child(2)').first()
        await   nguoiquanly.click()
        await   page.getByRole('option', { name: '- thaont' }).locator('span').click()

        const   ngaymua=page.locator('.col-md-6 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner').first()
        await   ngaymua.click()
        await   page.getByRole('gridcell', { name: '12' }).locator('span').click()

        const   giakhauhao = page.getByPlaceholder('Nhập giá trị tính khẩu hao')
        await   giakhauhao.fill('1500')

        const   thoigiankhauhao = page.getByPlaceholder('Nhập thời gian khấu hao')
        await   thoigiankhauhao.fill('1')

        const   giatrikhauhao = page.getByPlaceholder('Nhập giá trị khẩu hao')
        await   giatrikhauhao.fill('10')

        const   ngaykhauhao=page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper').first()
        await   ngaykhauhao.click()
        await   page.getByRole('gridcell', { name: '13' }).locator('span').click()

        const   thoigianbaohanh = page.getByPlaceholder('Nhập thời gian bảo hành')
        await   thoigianbaohanh.fill('10')

        const   nguoicapphat = page.locator('div:nth-child(7) > div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper')
        await   nguoicapphat.click()
        await   page.getByRole('option', { name: ' thaont' }).locator('span').click()

        const   ngaycapphat = page.locator('div:nth-child(7) > div:nth-child(3) > .form-group > .position-relative > .el-input > .el-input__wrapper')
        await   ngaycapphat.click()
        await   page.getByRole('gridcell', { name: '13' }).locator('span').waitFor()
        await   page.getByRole('gridcell', { name: '13' }).locator('span').click()

        const   nhanvien = page.locator('.col-md-12 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper')
        await   nhanvien.click()
        await   page.getByRole('option', { name: ' thaont' }).locator('span').click()
        await   xacnhan.click()


        // thu hồi tài sản 
        // await   page.locator('td:nth-child(17) > .cell').first().click()
        // await   page.getByRole('menuitem',{name: 'Thu hồi'} ).click()



    });
  
    
  });

test.describe('quan ly tuyen dung' , ()=>{
    // nhu cau tuyen dung => ho so ung vien => lịch hẹn
    
    test(' Verify CRUD nhu cau tuyen dung' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD  ho so ung vien`)
        const  quanlytuyendung = page.locator('div:nth-child(5)').first()
        await   quanlytuyendung.click()
        await   page.getByRole('link', { name: 'Nhu cầu tuyển dụng', exact: true }).click()
        await   page.getByRole('button').nth(1).click()
        const   tennhucau = await page.getByPlaceholder('Nhập nhu cầu tuyển dụng')
        await   tennhucau.click()
        await   tennhucau.fill(randomtext)

        const   vitrituyendung = page.getByText('Chọn vị trí tuyển dụng')
        await   vitrituyendung.click()
        await   page.getByRole('option', { name: 'CEO' }).click()

        const   soluong1 = await   page.locator('.number-ranger-container > div > .el-input__wrapper>.el-input__inner').first()
        const   soluong2 = await    page.locator('.number-ranger-container > div > .el-input__wrapper>.el-input__inner').nth(1)
        await   soluong1.click()
        await   soluong1.fill('01')
        await   soluong2.click()
        await   soluong2.fill('09')

        const   lydo = await page.getByPlaceholder('Nhập lý do')
        await   lydo.click()
        await   lydo.fill('Lý do tuyển dụng 1')

        await   page.getByRole('button', { name: 'Lưu' }).click()
        await   expect(page.getByText('Tạo mới nhu cầu tuyển dụng thành công')).toBeVisible()
        await   expect(page.getByRole('link', { name: randomtext})).toBeVisible()
        await   page.getByRole('row', { name: randomtext }).getByRole('button').click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click() 
        await   expect(page.getByText('Xoá nhu cầu tuyển dụng thành công')).toBeVisible()
    })



    test(' Verify CRUD ho so ung vien' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD  ho so ung vien`)
        const  quanlytuyendung = page.locator('div:nth-child(5)').first()
        await   quanlytuyendung.click()
        await   page.getByRole('link', { name: 'Hồ sơ ứng viên', exact: true }).click()
        await   page.getByRole('button').nth(2).click()
        
        // datepicker   
        const   calenderinputfield = page.getByPlaceholder('DD/MM/YYYY')
        await   calenderinputfield.click()
        let     date = new Date()
        date.setDate(date.getDate() + 0)
        const   expectDate = date.getDate().toString()
        const   expectMonthShort = date.toLocaleDateString('VN-US',{month:'short'})
        const   expectMonthLong = date.toLocaleDateString('EN-VN',{month:'long'})
        const   expectedYear = date.getFullYear()
        const   dateToAssert = `${expectMonthShort} ${expectDate},${expectedYear}`
    
        await   page.locator('[class="el-picker-panel__content"]').locator('div').filter({ hasText: expectDate }).first().click()
        
        const   nhucautuyendung = page.locator('.col-md-4 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection > div:nth-child(2)').first()
        await   nhucautuyendung.click()

    })


    test(' Verify CRUD lich hen' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD lich hen`)
        const   quanlytuyendung = page.locator('div:nth-child(5)').first()
        await   quanlytuyendung.click()
        await   page.getByRole('link', { name: 'Lịch hẹn', exact: true }).click()
        await   page.getByRole('button').nth(3).click()

        // const ungvien = page.getByText('Chọn ứng viên')
        // await   ungvien.click()
        // await   page.getByRole('option', { name: 'Uyen' }).click()
        
        const   chonloailich = page.getByText('Chọn loại lịch')
        await   chonloailich.click()
        await   page.getByRole('option', { name: 'Phỏng vấn trực tuyến' }).locator('span').click()

        const   ngayhen = page.getByPlaceholder('DD/MM/YYYY')
        await   ngayhen.click()
        await   page.getByRole('gridcell', { name: '13' }).locator('span').waitFor()
        await   page.getByRole('gridcell', { name: '13' }).locator('span').click()
       
        const   nguoithamgia = page.getByText('Chọn người tham gia')
        await   nguoithamgia.click()
        await   page.getByRole('tooltip', { name: 'Chọn tất cả' }).locator('label').click()

        const   thoigian = page.locator('div').filter({ hasText: /^⇀$/ }).getByRole('img')
        await   thoigian.click()

        const   phongphongvan = page.getByPlaceholder('Nhập tên phòng phỏng vấn')
        await   phongphongvan.click()
        await   phongphongvan.fill(randomtext)


        // const   xacnhan = page.getByText('Xác nhận')
        // await   xacnhan.click()
     
    })

})

test.describe('Danh gia nhan su' , ()=>{

    // tao tieu chí => tạo mẫu dánh => tạo phiếu 
    test(' Verify CRUD  Tạo tiêu chí đánh giá' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD  Tạo tiêu chí đánh giá`)
        const   danhgiaNS = page.locator('div:nth-child(6) > svg')
        await   danhgiaNS.click()
        const   caidatNS = await page.getByRole('menubar').locator('div').filter({hasText:'Cài đặt'})
        await   caidatNS.click()
        const   tieuchi = await page.getByRole('link', { name: 'Tiêu chí đánh giá' })
        await   tieuchi.click()
        const   taomaudanhgia = await page.locator('.create-icon')
        await   taomaudanhgia.click()
        const   tentieuchi = await page.locator('.col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
        await   tentieuchi.fill(randomtext1)
        const   nhomtieuchi = await  page.locator('.el-select__selection').first()
        await   nhomtieuchi.click()
        await   page.locator('.add-options-button').click()
        const   nhomtieuchidanhgia=   page.locator('#option-0 > .row > .col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper >.el-input__inner')
        await   nhomtieuchidanhgia.fill(randomtext)
        const   xacnhan = page.locator('.dialog-footer >.save-btn ').first()
        await   xacnhan.click()
        await   nhomtieuchi.click()
        await   page.locator('span').filter({hasText:randomtext}).click()
        const   kieudanhgia = page.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   kieudanhgia.click()
        await   page.locator('#option_grading_level').click()
        const   tenmucdo = page.locator('.col-md-11 > .form-group > .position-relative > .el-input > .el-input__wrapper>.el-input__inner')
        await   tenmucdo.fill(randomtext)
        await   xacnhan.click()
        await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoThêm tiêu chí thành' }).locator('path').click()
        await   expect(page.getByRole('cell', { name: randomtext1 }).locator('div')).toBeVisible()

        // sua tieu chi 
        const   sua = page.getByRole('button').nth(2)
        await   sua.click()
        const   mota = page.locator('[class="el-textarea__inner"]')
        await   mota.fill(randomtext)
        await   xacnhan.click()
        // await   expect(page.getByRole('cell', { name: randomtext }).locator('div')).toBeVisible()


       
        await   danhgiaNS.click()
        await   caidatNS.click()
        const   maudanhgia = await page.getByRole('link', { name: 'Mẫu đánh giá' })
        await   maudanhgia.click()
        await   page.locator('#form-filter button').click()
        const   tenmaudanhgia = await page.locator('.col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
        await   tenmaudanhgia.fill(randomtext1)
        const   tieuchidanhgia = await  page.locator('.col-md-12 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   tieuchidanhgia.click()
        await   page.locator('//div/ul/li[@class="el-select-dropdown__item is-hovering"][1]').click()
        const   luu = page.getByRole('button', { name: 'Lưu' })
        await   luu.click()
    })

    test(' Verify CRUD mau danh gia' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD Verify CRUD mau danh gia`)
        const   danhgiaNS = page.locator('div:nth-child(6) > svg')
        await   danhgiaNS.click()
        const   caidatNS = await page.getByRole('menubar').locator('div').filter({hasText:'Cài đặt'})
        await   caidatNS.click()
        const   maudanhgia = await page.getByRole('link', { name: 'Mẫu đánh giá' })
        await   maudanhgia.click()
        const   taomaudanhgia = await page.locator('.create-icon')
        await   taomaudanhgia.click()
        const   tenmaudanhgia = await page.locator('.col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
        await   tenmaudanhgia.fill('randomtext1')
        const   tieuchidanhgia = await  page.locator('.col-md-12 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   tieuchidanhgia.click()
        await   page.getByRole('option', { name: randomtext1, exact: true }).click()
        const   luu = page.locator('[.class="el-button el-button--primary save-btn button-primary"]')
        await   luu.click()
    })

    test(' Verify CRUD phieu danh gia ' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify phieu danh gia`)
        const   danhgiaNS = page.locator('div:nth-child(6) > svg')
        await   danhgiaNS.click()
        const   phieudanhgiaNS = await page.getByRole('link', { name: 'Phiếu đánh giá', exact: true })
        await   phieudanhgiaNS.click()
        const   taophieudanhgiaNS = await page.locator('.create-icon')
        await   taophieudanhgiaNS.click()
        const   kikiudanhgiaNS = await page.locator('.el-select__selection').first()
        await   kikiudanhgiaNS.click()
        const   optionkidanhgia = await page.getByRole('option', { name: 'Năm', exact: true })
        await   optionkidanhgia.click()

        const   chonnam = await   page.locator('div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
        await   chonnam.click()
        await   page.getByRole('option', { name: 'Năm 2023'}).click()

        const   nguoidanhgia = await page.locator('.col-12 > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   nguoidanhgia.click()
        await   page.getByRole('option', { name: 'Uyen' , exact:true }).click()

        const   tenphieudanhgia = await page.locator('.col-md-12 > .form-group > .position-relative > .el-input > .el-input__wrapper')
        await   tenphieudanhgia.fill('hehe')
        await   page.getByRole('option', { name: 'Uyen' , exact:true }).click()

    })

})

test.describe('Quan ly cong viec' , ()=>{

    // đang bị lỗi chưa fix được
    // tao tieu chí => tạo mẫu dánh => tạo phiếu 
    test(' Verify CRUD danh sách công việc  ' , async({page})=>{
        console.log(`${'\x1b[33m'}  Verify CRUD danh sách công việc `)
        const   danhsachcv = page.locator('div:nth-child(7) > svg')
        await   danhsachcv.click()
        const   sidebar = page.locator('.sidebar-minimizer')
        await   sidebar.click()
        const   danhsachcongviec = await page.getByRole('menubar').getByRole('link', { name: 'Danh sách công việc' })
        await   danhsachcongviec.click()
        const   taocongviec = await page.locator('#form-filter').getByRole('button').nth(2)
        await   taocongviec.click() 

        const   tencongviec = await page.getByPlaceholder('Nhập tên công việc')
        await   tencongviec.fill(randomtext)

        const   phongban = await page.locator('.row > div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
        await   phongban.click()
        await   page.getByRole('option', { name: 'Phòng ban 1' }).click()

        const   ngaybatdau = page.locator('.el-input__prefix-inner > .el-icon > svg > path').first()
        await   ngaybatdau.click()
        await   page.locator('div').filter({ hasText: /^1$/ }).first().click()

        const   ngayketthuc = page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
        await   ngayketthuc.click()
        await   page.getByRole('gridcell', { name: '25' }).locator('span').click()

        const   lydothaydoithoigian = page.getByPlaceholder('Nhập lý do')
        await   lydothaydoithoigian.click()
        await   lydothaydoithoigian.fill(randomtext1)

        const   nguoiquanly = await page.locator('div:nth-child(5) > div > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
        await   nguoiquanly.click()
        await   page.getByRole('option', { name: 'thaont' }).click()

        const   nguoithuchien = page.locator('div:nth-child(5) > div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
        await   nguoithuchien.click()
        await   page.getByRole('option', { name: 'thaont' }).locator('span').click()

        const   xacnhan = page.locator('//span//button[@class="el-button el-button--primary save-btn button-primary"]')
        await   xacnhan.click()

        await   expect(page.getByRole('cell', { name: randomtext }).locator('div')).toBeVisible()

        // sua danh sach cong viec 

        const   sua = await page.getByRole('row', { name: randomtext }).getByRole('button').nth(2)
        await   sua.click()

        const   mota = await page.locator('//textarea[@class="el-textarea__inner"]')
        await   mota.click()
        await   mota.fill(randomtext1)

        await  xacnhan.click()
        await   expect(page.getByText('Cập nhập công việc thành công ', {exact:true})).toBeVisible()

        // delete danh sach cong viec
        const   xoa = await page.getByRole('row', { name: randomtext }).getByRole('button').nth(3)
        await   xoa.click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
        await   expect(page.getByText('Xóa công việc thành công ', {exact:true})).toBeVisible()


    })

    test(' Verify CRUD dau muc cong viec   ' , async({page})=>{
        console.log(`${'\x1b[33m'}   Verify CRUD dau muc cong viec  `)
        const   danhsachcv = page.locator('div:nth-child(7) > svg')
        await   danhsachcv.click()
        const   sidebar = page.locator('.sidebar-minimizer')
        await   sidebar.click()
        const   dautuhcongviec = await page.getByRole('menubar').getByRole('link', { name: 'Đầu mục công việc' })
        await   dautuhcongviec.click()
        // them danh muc cong viec
        const   taodautucv = await page.locator('#form-filter button')
        await   taodautucv.click() 
        const   tendaumuccongviec = await page.locator('//div[@class="popup-content"]//input[@class="el-input__inner"]')
        await   tendaumuccongviec.fill(randomtext)
        const   phongban = page.locator('//div[@class="col-md-6"]//div[@class="el-select__selected-item el-select__placeholder is-transparent"]')
        await   phongban.click()
        await   page.locator('//div[@class="el-select-dropdown select-options"]//div/ul/li[@class="el-select-dropdown__item"][1]').click()
        const   xacnhan = page.locator('//span/button[@class="el-button el-button--primary save-btn button-primary"]')
        await   xacnhan.click()
        // sua danh muc cong viec
        const   suadanhmuccongviech = page.getByRole('row', { name: randomtext }).locator('rect').nth(1)
        await   suadanhmuccongviech.click()
        const   mota = page.locator('.el-textarea__inner')
        await   mota.fill('hehe')
        // xoa danh muc cong viec
        await   xacnhan.click()
        const   xoa = page.getByRole('row', { name: randomtext }).locator('rect').first()
        await   xoa.click()
        await   page.locator('//button[@class="el-button el-button--primary el-button--danger"]/span').click()

    })

   

})


test.describe('He thong' , ()=>{

    test('  Verify CRUD dia chi gui mail  ' , async({page})=>{
        console.log(`${'\x1b[33m'}   Verify CRUD dia chi gui mail  `)
        const hethong = page.locator('div:nth-child(8)').first()
        await hethong.click()
        const   sidebar = page.locator('.sidebar-minimizer')
        await   sidebar.click()
        const   cdhethong = await page.locator('//div[@class="sidebar-container"]//div[@class="el-sub-menu__title"]')
        await   cdhethong.click()
        const   diachiguimail = await page.getByRole('link', { name: 'Địa chỉ email gửi' })
        await   diachiguimail.click()
        const   taodiachiguimail = await page.locator('#form-filter button')
        await   taodiachiguimail.click()
        await  expect(page.getByRole('banner')).toBeVisible()
        const   tenhopthu  = await page.locator('//div[@class="popup-content"]//input[@class="el-input__inner"]')
        await   tenhopthu.fill(randomtext)
        const   email = page.locator('.el-select__selection').first()
        await   email.click()
        const   emailchon= page.locator('//div[@class="el-scrollbar"]//li[@class="el-select-dropdown__item"][1]')
        await   emailchon.click()
        const   xacnhan = page.locator('//span/button[@class="el-button el-button--primary save-btn button-primary"]')
        await   xacnhan.click()
        await   expect(page.getByRole('cell', { name: randomtext }).locator('div')).toBeVisible()
    })
    // test('  Verify CRUD quan ly via tro  ' , async({page})=>{
    //     console.log(`${'\x1b[33m'}   Verify CRUD quan ly via tro `)
    // đang lỗi chưa làm được
        
   
    test('  Verify CRUD quan ly quy dinh  ' , async({page})=>{
        console.log(`${'\x1b[33m'}   Verify CRUD quan ly quy dinh`)
        const hethong = page.locator('div:nth-child(8)').first()
        await hethong.click()
        const   sidebar = page.locator('.sidebar-minimizer')
        await   sidebar.click()
        // them quan ly qui dinh
        const   quanlyqydinh = await page.getByRole('link', { name: 'Quản lý quy định' })
        await   quanlyqydinh.click()
        await   page.locator('#form-filter button').click()
        const   ten_qydinh = await page.locator('//div[@class="el-dialog__body"]//input[@placeholder="Nhập tên quy định"]')
        await   ten_qydinh.fill(randomtext)
        const   quydinh= page.getByPlaceholder('Nhập đường dẫn tới quy định')
        await   quydinh.fill('https://test01.tims.dev-tokyotechlab.com/')
        const   doituongapdung = page.locator('.el-select__selection')
        await   doituongapdung.click()
        await   page.locator('//div[@class="el-scrollbar"]//li[@class="el-select-dropdown__item"][1]').click()
        const   ngayapdung = page.locator('.el-input__prefix-inner > .el-icon > svg > path').first()
        await   ngayapdung.click()
        await   page.getByRole('gridcell', { name: '10' }).locator('div').click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
        await   expect(page.getByText(randomtext)).toBeVisible()
          // sua quan ly qui dinh
        const   sua = page.getByRole('row', { name: randomtext }).locator('rect').nth(1)
        await   sua.click()
        await   page.getByPlaceholder('Nhập mô tả').fill('hehe')
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
        await   expect(page.getByText('hehe')).toBeVisible()   
        // xoa quản lý quy dinh
        await   page.getByRole('row', { name: randomtext}).locator('rect').first().click()
        await   page.getByRole('button', { name: 'Xác nhận' }).click()
        await   expect(page.getByText(randomtext)).not.toBeVisible()


    })

    test('  Verify CRUD thong bao  ' , async({page})=>{
        console.log(`${'\x1b[33m'}    Verify CRUD thong bao `)
        
    })
    test('  Verify CRUD danh sach mau mail  ' , async({page})=>{
        console.log(`${'\x1b[33m'}   Verify CRUD quan ly via tro `)
        
        
    })
})