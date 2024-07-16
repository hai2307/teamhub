import { test, expect } from '@playwright/test'
// import { loginpage } from '../../Page/loginpage'
// import {cd_loaihopdong}  from   '../../Page/cd_loaihopdong'
import {RandomString ,Randomint}  from '../../page/UI_interactions';
let     randomtext = RandomString(8)
let     randomtext1 = RandomString(5)
let     hoten = RandomString(5)
let     manhanvien = Randomint(4)
let     loaihopdong = RandomString(6)

test.beforeEach(async({page})=>{
    await   page.goto('https://hh1.hrm.dev-tokyotechlab.com/')
    await   page.locator('[placeholder="Nhập email"]').fill('plkbblwwf@emlhub.com')
    await   page.locator('[placeholder="Nhập mật khẩu"]').fill('Tokyo123@')
    await   page.locator('[class="d-flex align-center base-btn-title"]').click()
    // await   expect(page.locator('[class="choose-language"]')).toBeVisible()
   

})
test.afterEach(async ({page})=>{
    await   page.pause()
})


test.describe('Quanlynhansu', () =>{
    

 test(' Nhan vien' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify nhan vien`)
        await  await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('link', { name: 'Nhân viên', exact: true }).click()
       
        await   page.locator('#form-filter').getByRole('button').nth(3).click()
        await   page.getByPlaceholder('Nhập họ tên người dùng').fill(hoten)
        await   page.getByPlaceholder('Nhập mã nhân viên').fill(manhanvien)
        await   page.getByPlaceholder('Chọn ngày vào làm')
        await   page.getByText('Chọn vai trò').click()
        await   page.getByText('Admin').click()
        await   page.getByPlaceholder('Chọn ngày vào làm').click()
        await   page.locator('div').filter({ hasText: /^5$/ }).first().click()
        await   page.getByText('Xác nhận', {exact:true}).click()

        await   page.locator('span').filter({ hasText: 'Bỏ chọn' }).click()
        await   expect(page.getByText(hoten, {exact:true})).toBeVisible()
        // await   page.locator('div').filter({ hasText:`hahf@gmail.com`}).getByRole('button').first().click()
        await   page.locator('div:nth-child(3) > .profile-widget > .profile-action > .el-button').click()
        await   page.getByText('Xóa người dùng',{exact:true}).first().click()
        await   page.getByText('Xác nhận', {exact:true}).click()
        await   expect(page.getByText('Xóa thành công')).toBeVisible()
    })
    
 test('Verify CRUD loại hợp đồng' , async({page})=>{
    
        console.log(`${'\x1b[33m'} Verify CRUD loại hợp đồng `)
        await  await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
        await   page.getByRole('link', { name: 'Phân loại hợp đồng' }).click()
        const   creta_hopdong=page.locator('#form-filter button')
        await   expect(creta_hopdong).toBeVisible()
        await   creta_hopdong.click()
        const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
        await   expect(xacnhan).toBeVisible()
        await   page.getByPlaceholder('Nhập tên').fill(loaihopdong)
        await   page.getByPlaceholder('Nhập số ngày nghỉ hưởng lương').fill('11')
        await   xacnhan.click()
        // await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo loại hợp đồng th' }).locator('path').click()
        await   expect(page.getByText(loaihopdong)).toBeVisible()
        const   xoa = page.getByRole('row', { name: loaihopdong }).getByRole('button').first()
        await   expect(xoa).toBeVisible()
        await   page.waitForSelector('#form-filter button')
        // sửa hợp đồng 
        // const   edit = page.getByRole('row', { name: loaihopdong }).getByRole('button').nth(1)
        // await   edit.click()
        // await   page.getByPlaceholder('Nhập mô tả của loại hợp đồng').fill(loaihopdong)
        // await   xacnhan.click()
        // await   expect(page.getByText('Cập nhật loại hợp đồng thành công')).toBeVisible()
        //  // xóa hợp đồng 
        // await   xoa.click()
        // await   xacnhan.click()
        // await   expect(page.getByText('Loại hợp đồng đã được xóa')).toBeVisible()
    
        })
         
 test(' hopdong' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify hopdong`)
        await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('link', { name: 'Nhân viên', exact: true }).click()
        await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('link', { name: 'Hợp đồng', exact: true }).click()
        const   creta_hopdong=page.locator('#form-filter').getByRole('button').nth(2)
        await   expect(creta_hopdong).toBeVisible()
        await   creta_hopdong.click()

        const   chonnhanvien=page.locator('.el-col > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').first()
        await   chonnhanvien.click()
        await   page.getByRole('option', { name: 'hai' }).click()

        const   loaihopdong = page.getByText('Chọn loại hợp đồng')
        await   loaihopdong.click()
        // await   page.getByRole('option', { name: `${loaihopdong}` }).click()
        // await   page.getByText(`${loaihopdong}`).click()
        await  page.click('#option_4')

        const   hinhthuchopdong = page.locator('div:nth-child(4) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection')
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
        // const   sua_hopdong = page.getByRole('row', { name: `hai Thử việc ${loaihopdong}` }).getByRole('button').first()
        // await   sua_hopdong.click()
        // const   sodhopdong = page.getByPlaceholder('Nhập số hợp đồng')
        // await   sodhopdong.fill('10')
        // await   xacnhan.click()

        // // xóa hợp đồng
        // const   xoa_hopdong = page.getByRole('row', { name: `hai Thử việc ${loaihopdong}` }).getByRole('button').nth(1)
        // await   xoa_hopdong.click()
        // await   page.getByRole('button', { name: 'Xác nhận' }).click()
        // // await   expect(page.getByText( `hai${loaihopdong}`,{exact:true})).not.toBeVisible()
        
    })
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
test('quy trinh gia nhap' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD quy trinh gia nhap `)
        // them nv HR
        await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
        await   page.getByRole('link', { name: 'Quy trình gia nhập' }).click()
        const   danhsachchung = page.getByRole('button', { name: 'Danh sách công việc chung cho tất cả chức danh' })
        await   expect(danhsachchung).toBeVisible()
        await   danhsachchung.click()
        const   edit_danhsachchung=page.getByRole('button', { name: 'chung' }).locator('.open-popup-icon')
        await   expect(edit_danhsachchung).toBeVisible()
        await   edit_danhsachchung.click()
        const   add_danhsachchung=page.getByRole('button', { name: 'Thêm' })
        await   add_danhsachchung.click()
        await   page.getByPlaceholder('Nhập tên công việc').fill(randomtext)
        await   page.locator('.el-select__selection').click()
        // await   page.getByRole('option', { name: 'test', exact: true }).click() //option_1
        await   page.getByRole('option', { name: 'hai' }).click() 
        const   luu= page.getByRole('button', { name: 'Lưu' })
        await   luu.click()
        await   expect(page.getByText(randomtext)).toBeVisible()
        // sua hr
        await   edit_danhsachchung.click()
        await   page.getByPlaceholder('Nhập mô tả').fill('@hai')
        await   luu.click()
        await   expect(page.getByText('@hai')).toBeVisible()
        
        // xóa hr
        await   edit_danhsachchung.click()
        await   page.locator('.list-wrapper > div:nth-child(5)').click()
        await   luu.click()
        await   expect(page.getByText('@hai')).not.toBeVisible()
    
     
        })
test('quy trinh nghi viec' , async({page})=>{
        console.log(`${'\x1b[33m'} Verify CRUD quy trinh nghi viec `)
            // them nv lap trinh
        await   page.locator('div:nth-child(2) > svg').first().click()
        await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
        await   page.getByRole('link', { name: 'Quy trình nghỉ việc' }).click()
        const   hr = page.getByRole('button', { name: 'Danh sách công việc chung cho tất cả chức danh' })
        await   expect(hr).toBeVisible()
        await   hr.click()
        const   edit_hr=page.getByRole('button', { name: 'Danh sách công việc chung cho tất cả chức danh' }).locator('.open-popup-icon')
        await   expect(edit_hr).toBeVisible()
        await   edit_hr.click()
        const   add_hr=page.getByRole('button', { name: 'Thêm' })
        await   add_hr.click()
        await   page.locator('div').filter({ hasText: /^Tên là trường bắt buộc$/ }).first().getByPlaceholder('Nhập tên công việc').fill(randomtext)
        const   nguoiphutrach=   page.locator('div').filter({ hasText: /^Chọn người phụ tráchNgười phụ trách là trường bắt buộc$/ }).first().locator('.el-select__selection')
        await   nguoiphutrach.click()
        await   page.locator('#option_2').click() 
        const   luu= page.getByRole('button', { name: 'Lưu' })
        await   luu.click()
        await   expect(page.getByText(randomtext)).toBeVisible()
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
        
// test('phong  ban' , async({page})=>{
//         console.log(`${'\x1b[33m'} Verify CRUD phong  ban`)
//                 // them phon ban
//         await   page.locator('.logo-module > div:nth-child(2)').first().click()
//         await   page.getByRole('menubar').locator('div').filter({ hasText: 'Cài đặt' }).click()
//         await   page.getByRole('link', { name: 'Phòng ban' }).click()
//         const   add_phongban=page.locator('.create-icon')
//         await   add_phongban.click()
//         const   maphonban=page.getByPlaceholder('Nhập mã phòng ban')
//         await   maphonban.fill(randomtext1)
//         const   tenphonban =   page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__inner')
//         await   tenphonban.fill(randomtext)
//         await   page.locator('.el-select__selection').click()
//         await   page.getByRole('option', { name: '- thaont' }).locator('span').click()
//         const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
//         await   xacnhan.click()
//         await   expect(page.locator('.el-notification__group')).toBeVisible()
//         await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới phòng ban th' }).getByRole('img').click()
//                  // sua phon ban
//         const   sua=page.locator("div", { hasText: randomtext}).locator('rect').first()
//                 // await  sua.click()
//                 // await   xoa.click()
               
//     })
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
    
test.describe(' quan ly tai san', () => {
    test('Verify CRUD danh muc tai san', async ({ page }) => {

        await   page.locator('div:nth-child(4)').first().click()
    })
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
    