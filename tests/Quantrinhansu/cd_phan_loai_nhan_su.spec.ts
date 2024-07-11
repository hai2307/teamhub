import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';

test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page);
    await   Loginhrm.login()
    await   Loginhrm.sidebar_expand()
    const   cd_text=page.getByText('Cài đặt')
    await   expect(cd_text).toBeVisible()
    await   cd_text.click()
    const   cd_plns=page.getByRole('list').getByRole('link', { name: 'Phân loại nhân sự' })
    await   cd_plns.click()
    await   expect(page.getByPlaceholder('Nhập tên loại nhân sự')).toBeVisible()
    const   button_create=page.locator('#form-filter button')
    await   button_create.click()
    await   page.getByPlaceholder('Tên phân loại nhân sự').fill('PHAM hai1@')
    await   page.getByPlaceholder('Thêm mô tả').fill('love')
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('PHAM hai1@')).toBeEnabled()

})
test.afterEach(async ({page})=>{
    await   page.getByRole('row', { name: 'PHAM hai1@' }).locator('img').first().click()
    await   page.getByText('Xác nhận').click()
    await   expect(page.getByRole('heading', { name: 'Xóa thành công' })).toBeVisible()
    await   page.close()
})

test('search, CD_PLNS02->CD_PLNS09', async({page})=>{
    // Kiểm tra trạng thái mặc định
    // Kiểm tra trường Tìm kiếm khi nhập space đầu
    // Kiểm tra trường Tìm kiếm khi nhập chữ hoa, chữ thường
    // Kiểm tra trường Tìm kiếm khi nhập các ký tự đặc biệt
    // Kiểm tra trường Tìm kiếm khi nhập số
    // Kiểm tra danh sách trả về khi trường Tìm kiếm để trống data
    // Kiểm tra danh sách trả về khi Tìm kiếm với Nhân sự sản không tồn tại
    // Kiểm tra danh sách trả về khi Tìm kiếm với Nhân sự tồn tại
        //check placeholder tìm kiếm mặc định
    //check placeholder tìm kiếm 
    const   search=page.getByPlaceholder('Nhập tên loại nhân sự')
    await   expect(search).toBeVisible()
    // check trường tìm kiếm khi nhập spase 
    await   search.fill('  ')
    const   icon_search=page.locator('#form-filter path').first()
    await   icon_search.click()
    await   expect(page.getByText('PHAM hai1@')).toBeVisible()

     // Kiểm tra trường Tìm kiếm khi nhập chữ hoa, chữ thường tim kiếm danh sách đã tồn tại không phân biệt chữ hoa và thường 
    await   search.fill('PHAM')
    await   icon_search.click()
    await   expect(page.getByText('PHAM')).toBeVisible()
    await   search.clear()
    await   search.fill('pham')
    await   icon_search.click()
    await   expect(page.getByText('PHAM')).toBeVisible()
    await   search.clear()
    
    //kiểm tra ki nhập kí tự đặ biệt và danh sách trả về không có dữ liệu
    await   search.fill('#')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
    // kiểm tra khi nhập số vào tìm kiếm 
    await   search.clear()
    await   search.fill('3456789')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
    // Kiểm tra danh sách trả về khi trường Tìm kiếm để trống data
    await   search.clear()
    await   search.fill('')
    await   icon_search.click()
    await   expect(page.getByText('PHAM hai1@')).toBeVisible()
    // Kiểm tra danh sách trả về khi Tìm kiếm với Nhân sự sản không tồn tại
    await   search.clear()
    await   search.fill('W')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
     // Kiểm tra danh sách trả về khi Tìm kiếm với Nhân sự tồn tại
    await   search.clear()
    await   search.fill('PHAM hai1@')
    await   icon_search.click()
    await   expect(page.getByText('PHAM hai1@')).toBeVisible()
})
test('button phan loai nhan su, CD_PLNS10->CD_PLNS10', async({page})=>{
    // hover chuột vào tạo phân loại nhân sự ->Hiển thị text " Tạo phấn loại nhân sự"
    const   button=page.locator('#form-filter button')
    await   button.hover()
    await   expect(page.getByText('Tạo phân loại nhân sự')).toBeEnabled()
    // click vao phan loại nhan sự hiên thị popup phan laoị nhân sự 
    await   button.click()
    await   expect(page.getByRole('button', { name: 'Xác nhận' })).toBeEnabled()
    await   page.getByLabel('el.dialog.close').click()
})

test('cột phân loại nhân sự và cột mô tả , CD_PLNS12,CD_PLNS13,CD_PLNS14', async({page})=>{
    // hiển thị danh danh sách nhân sự 
    await   expect(page.getByText('PHAM hai1@')).toBeEnabled()
    // Hiện thị button sắp xếp trên dưới
    const   sapxep=page.getByRole('cell', { name: 'Phân loại nhân sự' }).locator('i').first()
    await   expect(sapxep).toBeEnabled()
    //hiểm thị  mô tả cho nhân sự 
    await   expect(page.getByText('love')).toBeEnabled()
})
test('Hành động, CD_PLNS15', async({page})=>{
    // kiểm tra hiển thị icon delete 
    await   expect(page.getByRole('row', { name: 'love' }).locator('img').first()).toBeEnabled()
    // Kiểm tra hiển thị icon edit 
    await   expect(page.getByRole('row', { name: 'love' }).locator('img').nth(1)).toBeEnabled()
    // kiểm tra hiển thị text hành động
    await   expect(page.getByText('Hành động')).toBeEnabled()
})

test('icon delete, CD_PLNS16,CD_PLNS17', async({page})=>{
    // kiểm tra hover
    const   xoa=page.getByRole('row', { name: 'love' }).locator('img').first()
    await   page.waitForTimeout(1000)
    await   xoa.hover()
    await   expect(page.getByText('Xóa', { exact: true })).toBeVisible()
    // Kiểm tra khi click vào button xóa
    await   xoa.click()
    await   expect(page.getByText('Hủy')).toBeEnabled()
    await   page.getByLabel('el.messagebox.close').click()
})
test('icon edit, CD_PLNS18,CD_PLNS19', async({page})=>{
    // kiểm tra hover
    const   sua=page.getByRole('row', { name: 'PHAM hai1@ love' }).locator('img').nth(1)
    await   sua.hover()
    await   page.waitForTimeout(1000)
    await   expect(page.getByText('xóa')).toBeEnabled()
    // Kiểm tra khi click vào button xóa
    await   sua.click()
    await   expect(page.getByText('Chỉnh sửa phân loại nhân sự')).toBeEnabled()
    await   page.getByRole('button', { name: 'Hủy' }).click()
})
test('pupup Tạo phân loại nhân sự,title CD_PLNS20->CD_PLNS30', async({page})=>{
    
    const   button =page.locator('#form-filter button')
    const   title=page.locator('.popup-title')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   huy=page.getByRole('button', { name: 'Hủy' })

    // kiểm tra title là  tạo phân loại nhân sự 
    await   button.click()
    await   expect(title).toHaveText('Tạo phân loại nhân sự')

    // kiểm tra mặc định " hiển thị placeholder
    await   expect(ten_plns).toBeEnabled()

    // Kiểm tra trường phân loại nhân sự khi bỏ trống
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường b')).toBeVisible()

    // Kiểm tra trường phân loại nhân sự khi nập toàn space
    await   ten_plns.fill("   ")
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường b')).toBeVisible()

    // Kiểm tra trường phân loại nhân sự khi nập toàn space trước sau và Kiểm tra trường phân loại nhân sự khi nhập 1 ký tự 
    await   ten_plns.fill(" W ")
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('W',{exact:true})).toBeEnabled()
    await   page.getByRole('row', { name: 'W', exact: true }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img')

    // Kiểm tra trường phân loại nhân sự khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   button.click()
    await   ten_plns.fill("Bka@0")
    await   xacnhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('Bka@0',{exact:true})).toBeEnabled()
    await   page.getByRole('row', { name: 'Bka@0'}).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()

    // Kiểm tra trường phân loại nhân sự khi nhập 255 ký tự
    await   button.click() 
    const   kitu_255 = 'h'.repeat(255);
    await   ten_plns.fill(kitu_255)
    await   page.getByPlaceholder('Thêm mô tả').fill('kiki')
    await   xacnhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   page.getByRole('row', { name: 'kiki' }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    // Kiểm tra trườngphân loại nhân sự khi nhập 256 ký tự
    const   kitu_256=kitu_255+"a"
    await   button.click() 
    await   ten_plns.fill(kitu_255)
    await   page.getByPlaceholder('Thêm mô tả').fill('kiki')
    await   xacnhan.click()
    await   page.locator('#notification_9 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(ten_plns).not.toHaveText('a')
    await   page.getByRole('row', { name: 'kiki' }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_10 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    // Kiểm tra trườngphân loại nhân sự khi nhập trùng với phân loại nhân sự trước đó
    await   button.click()
    await   ten_plns.fill("PHAM hai1@")
    await   xacnhan.click()
    await   expect(page.getByText('Tên phân loại nhân sự này đã tồn tại')).toBeVisible()
    await   page.locator('#notification_11 div').filter({ hasText: 'Tên phân loại nhân sự này đã' }).getByRole('img').click()
    await   huy.click()
})


test('pupup Tạo phân loại nhân sự, field mô tả, CD_PLNS20->CD_PLNS30', async({page})=>{
    
    const   button =page.locator('#form-filter button')
    const   title=page.locator('.popup-title')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   huy=page.getByRole('button', { name: 'Hủy' })
    const   mo_ta=page.getByPlaceholder('Thêm mô tả')
 
    await   button.click()
    await   expect(title).toHaveText('Tạo phân loại nhân sự')

    // kiểm tra mặc định " hiển thị placeholder
    await   expect(mo_ta).toBeEnabled()

    // Kiểm tra trường phân loại nhân sự khi bỏ trống
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường b')).toBeVisible()

    // Kiểm tra trường phân loại nhân sự khi nập toàn space
    await   ten_plns.fill("   ")
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường b')).toBeVisible()
    // Kiểm tra trường phân loại nhân sự khi nập toàn space trước sau và Kiểm tra trường phân loại nhân sự khi nhập 1 ký tự 
    await   ten_plns.fill(" W ")
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('W',{exact:true})).toBeEnabled()
    await   page.getByRole('row', { name: 'W', exact: true }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img')

    // Kiểm tra trường phân loại nhân sự khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   button.click()
    await   ten_plns.fill("Bka@0")
    await   xacnhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('Bka@0',{exact:true})).toBeEnabled()
    await   page.getByRole('row', { name: 'Bka@0'}).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()

    // Kiểm tra trường phân loại nhân sự khi nhập 255 ký tự
    await   button.click() 
    const   kitu_255 = 'h'.repeat(2000);
    await   ten_plns.fill(kitu_255)
    await   page.getByPlaceholder('Thêm mô tả').fill('kiki')
    await   xacnhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   page.getByRole('row', { name: 'kiki' }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    // Kiểm tra trườngphân loại nhân sự khi nhập 256 ký tự
    const   kitu_256=kitu_255+"a"
    await   button.click() 
    await   ten_plns.fill(kitu_255)
    await   page.getByPlaceholder('Thêm mô tả').fill('kiki')
    await   xacnhan.click()
    await   page.locator('#notification_9 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   page.getByRole('row', { name: 'kiki' }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_10 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    // Kiểm tra trườngphân loại nhân sự khi nhập trùng với phân loại nhân sự trước đó
    await   button.click()
    await   ten_plns.fill("PHAM hai1@")
    await   xacnhan.click()
    await   expect(page.getByText('Tên phân loại nhân sự này đã tồn tại')).toBeVisible()
    await   page.locator('#notification_11 div').filter({ hasText: 'Tên phân loại nhân sự này đã' }).getByRole('img').click()
    await   huy.click()
})
 
test('button huy CD_PLNS40 CD_PLNS41 CD_PLNS42, popup tạo phân loại nhân sự', async ({page})=>{
    const   button =page.locator('#form-filter button')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   huy=page.getByRole('button', { name: 'Hủy' })

    // Highlight button huy có sự thay đổi màu sắc 
    await   button.click()
    const   color1 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color1")
    })
    await   huy.hover()
    const   color2 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   expect(color1).not.toBe(color2)
    // Close popup Chỉnh sửa mới phân loại nhân sự
    await   huy.click()
    await   expect(button).toBeVisible()
    //Kiểm tra màn hình khi nhập dữ liệu và click vào button Huỷ
    await   button.click()
    await   ten_plns.fill('kaka')
    await   huy.click()
    await   expect(button).toBeEnabled()
})

test('button xac nhan CD_PLNS43 CD_PLNS44 CD_PLNS45, popup tạo phân loại nhân sự', async ({page})=>{
    const   button =page.locator('#form-filter button')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   huy=page.getByRole('button', { name: 'Hủy' })

    // Highlight button huy có sự thay đổi màu sắc - Kiểm tra khi hover vào button xác nhận
    await   button.click()
    const   color1 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color1")
    })
    await   xacnhan.hover()
    const   color2 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   expect(color1).not.toBe(color2)
    // Kiểm tra khi nhập trùng Tên phân loại nhân sự đã có trước đó
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường bắt buộc')).toBeVisible()
    //Kiểm tra khi nhập trùng Tên phân loại nhân sự đã có trước đó
    await   ten_plns.fill('PHAM hai1@')
    await   xacnhan.click()
    await   expect(page.getByText('Tên phân loại nhân sự này đã tồn tại')).toBeEnabled()
    await   huy.click()

})

test('dialog__close CD_PLNS46 CD_PLNS47 , popup tạo phân loại nhân sự', async ({page})=>{
    const   button =page.locator('#form-filter button')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   close=page.getByLabel('el.dialog.close')

    // Kiểm tra màn hình khi chưa nhập dữ liệu và click icon X
    await   button.click()
    await   close.click()
    await   expect(button).toBeVisible()  
    // Kiểm tra màn hình khi nhập dữ liệu và click vào icon X
    await   button.click()
    await   ten_plns.fill('shit')
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).getByRole('img').click()
    await   expect(page.getByText('shit')).toBeVisible()
    await   page.getByRole('row', { name: 'shit' }).locator('img').first().click()
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    
})

test('pupup chỉnh sửa phân loại nhân sự,title CD_PLNS48->CD_PLNS58', async({page})=>{
    
    const   button =page.getByRole('row', { name: 'love' }).locator('img').nth(1)
    const   title=page.locator('.popup-title')
    const   ten_plns=page.getByPlaceholder('Tên phân loại nhân sự')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   bat_buoc_field_PLNS=page.getByText('*',{exact:true})

    // kiểm tra title là  tạo phân loại nhân sự 
    await   button.click()
    await   expect(title).toHaveText('Chỉnh sửa phân loại nhân sự')

    // field Phân loại nhân sự là bắt buộc
    await   expect(bat_buoc_field_PLNS).toBeEnabled()

    //  kiểm tra mặc định " hiển thị tên nhân sự trước đó 
    await   expect(page.getByText('PHAM hai1@')).toBeVisible()

    // Kiểm tra trường phân loại nhân sự khi bỏ trống
    await   page.waitForTimeout(1000)
    await    ten_plns.clear()
    await    xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường bắt buộc')).toBeVisible()
    
    // Kiểm tra trường phân loại nhân sự khi nập toàn space
    await   ten_plns.fill("   ")
    await   xacnhan.click()
    await   expect(page.getByText('Phân loại nhân sự là trường b')).toBeVisible()

    // Kiểm tra trường phân loại nhân sự khi nập toàn space trước sau và Kiểm tra trường phân loại nhân sự khi nhập 1 ký tự 
    await   ten_plns.fill(" W ")
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('W',{exact:true})).toBeEnabled()
    
    // Kiểm tra trường phân loại nhân sự khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   button.click()
    await   page.waitForTimeout(1000)
    await   ten_plns.clear()
    await   ten_plns.fill("Bka@0")
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('love',{exact:true})).toBeEnabled()

    // Kiểm tra trường phân loại nhân sự khi nhập 255 ký tự
    await   button.click() 
    const   kitu_255 = 'h'.repeat(255)
    await   page.waitForTimeout(1000)
    await   ten_plns.clear()
    await   ten_plns.fill(kitu_255)
    await   xacnhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('hhhhhhh')).toBeVisible()
    // Kiểm tra trườngphân loại nhân sự khi nhập 256 ký tự
    const   kitu_256=kitu_255+"a"
    await   button.click() 
    await   page.waitForTimeout(1000)
    await   ten_plns.clear()
    await   ten_plns.fill(kitu_256)
    await   page.getByPlaceholder('Thêm mô tả').fill('kiki')
    await   xacnhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(ten_plns).not.toHaveText('a')
    
    // Kiểm tra trườngphân loại nhân sự khi nhập trùng với phân loại nhân sự trước đó
    await   page.getByRole('row', { name: 'kiki' }).locator('img').nth(1).click()
    await   page.waitForTimeout(1000)
    await   ten_plns.clear()
    await   ten_plns.fill("PHAM hai1@")
    await   page.getByPlaceholder('Thêm mô tả').clear()
    await   page.getByPlaceholder('Thêm mô tả').fill('love')
    await   xacnhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('PHAM hai1@')).toBeVisible()

})


test('pupup chỉnh sửa phân loại nhân sự,field mô tả CD_PLNS59->CD_PLNS67', async({page})=>{
    
    const   edit =page.getByRole('row', { name: 'PHAM hai1@' }).locator('img').nth(1)
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   mo_ta =page.getByPlaceholder('Thêm mô tả')


    //  kiểm tra mặc định " hiển thị placeholder
    await   edit.click()
    await   expect(mo_ta).toBeEnabled()

    // Kiểm tra trường mô tả  khi bỏ trống
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('love')).not.toBeVisible()
    
    // Kiểm tra trường mô tả nhân sự khi nập toàn space
    await   edit.click()
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill("   ")
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()

    // Kiểm tra trường mô tả nhân sự khi nập toàn space trước sau và Kiểm tra trường phân loại nhân sự khi nhập 1 ký tự 
    await   edit.click()
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill(" W ")
    await   xacnhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('W',{exact:true})).toBeVisible()
    
    // Kiểm tra trường mô tả nhân sự khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   edit.click()
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill("Bka@0")
    await   xacnhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('Bka@0',{exact:true})).toBeEnabled()

    // Kiểm tra trường phân loại nhân sự khi nhập 2000 ký tự
    await   edit.click() 
    const   kitu_2000 = 'h'.repeat(2000)
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill(kitu_2000)
    await   xacnhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(page.getByText('hhhhhhhhhhhhhhh')).toBeVisible()

    // Kiểm tra trườngphân loại nhân sự khi nhập 2001 ký tự
    const   kitu2001=kitu_2000+"a"
    await   edit.click() 
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill(kitu2001)
    await   xacnhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(mo_ta).not.toHaveText('a')
    
    // Kiểm tra trườngphân loại nhân sự khi nhập trùng với phân loại nhân sự trước đó
    await   edit.click()
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill("aa")
    await   xacnhan.click()
    await   page.locator('#notification_9 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()

})

test('button huy CD_PLNS68 CD_PLNS69 CD_PLNS70, popup chỉnh sửa phân loại nhân sự', async ({page})=>{
    const   edit =page.getByRole('row', { name: 'PHAM hai1@' }).locator('img').nth(1)
    const   huy=page.getByRole('button', { name: 'Hủy' })
    // Highlight button huy có sự thay đổi màu sắc 
    await   edit.click()
    const   color1 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color1")
    })
    await   huy.hover()
    const   color2 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   expect(color1).not.toBe(color2)
    // Kiểm tra màn hình khi chưa nhập dữ liệu và click button Huỷ
    await   huy.click()
    await   expect(edit).toBeVisible()
    //Kiểm tra màn hình khi nhập dữ liệu và click vào button Huỷ
    await   edit.click()
    await   huy.click()
    await   expect(page.getByText('love')).toBeEnabled()
    await   expect(edit).toBeEnabled()
})

test('button xac nhan CD_PLNS71 CD_PLNS72 CD_PLNS73, popup chỉnh sửa phân loại nhân sự', async ({page})=>{
    const   edit =page.getByRole('row', { name: 'PHAM hai1@' }).locator('img').nth(1)
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   mo_ta =page.getByPlaceholder('Thêm mô tả')

    // Highlight button huy có sự thay đổi màu sắc - Kiểm tra khi hover vào button xác nhận
    await   edit.click()
    const   color1 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color1")
    })
    await   xacnhan.hover()
    const   color2 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   expect(color1).not.toBe(color2)
    // Kiểm tra khi nhập trùng Tên phân loại nhân sự đã có trước đó
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   mo_ta.fill("aa")
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    //Kiểm tra khi nhập trùng Tên phân loại nhân sự đã có trước đó
    await   edit.click()
    await   page.waitForTimeout(1000)
    await   mo_ta.clear()
    await   xacnhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
   
})

test('dialog__close CD_PLNS74 CD_PLNS75 , popup chỉnh sửa phân loại nhân sự', async ({page})=>{
    const   edit =page.getByRole('row', { name: 'PHAM hai1@' }).locator('img').nth(1)
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   dialog__close =page.getByLabel('el.dialog.close')

    // Kiểm tra màn hình khi chưa nhập dữ liệu và click icon X
    await   edit.click()
    await   dialog__close.click()
    await   expect(edit).toBeVisible()  
    // Kiểm tra màn hình khi nhập dữ liệu và click vào icon X
    await   edit.click()
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật phân loại' }).getByRole('img').click()
    await   expect(edit).toBeVisible()   
})
test('Popup xóa phân loại nhân sự ,CD_PLNS76=>CD_PLNS83 ', async ({page})=>{
    const   xoa=page.getByRole('row', { name: 'love' }).locator('img').first()
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    const   huy=page.getByRole('button', { name: 'hủy' })
    const   text_xoa=page.getByText('Bạn có chắc chắn muốn xóa phâ')
    const   title_xoa_phanloainhansu=page.getByText('Xóa phân loại nhân sự', { exact: true })
    const   dialog__close =page.locator('.el-message-box__headerbtn')
    // Kiểm tra title
    await   xoa.click()
    await   expect(title_xoa_phanloainhansu).toBeEnabled()
    // Kiểm tra content 
    await   expect(text_xoa).toBeEnabled()
    // Kiểm tra khi hover button xac nhan 
    const   color1 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color1")
    })
    await   xacnhan.hover()
    const   color2 = xacnhan.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color2")
    })
    await   expect(color1).not.toBe(color2)

    // Kiểm tra khi hover button Hủy
    const   color3 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color3")
    })
    await   huy.hover()
    const   color4 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color4")
    })
    await   expect(color3).not.toBe(color4)

    // Kiểm tra khi click button Hủy
    await   huy.click()
    await   expect(xoa).toBeVisible()
    // Kiểm tra khi click icon Close
    await   xoa.click()
    await   page.waitForTimeout(1000)
    await   dialog__close.click()
    await   expect(xoa).toBeVisible()
    // Xóa phân loai nhân sự nhan sự đã chọn
    await   xoa.click()
    await   xacnhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Xóa thành côngXóa phân loại' }).getByRole('img').click()
    const   button_create=page.locator('#form-filter button')
    await   button_create.click()
    await   page.getByPlaceholder('Tên phân loại nhân sự').fill('PHAM hai1@')
    await   page.getByPlaceholder('Thêm mô tả').fill('love')
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoTạo mới phân loại nh' }).locator('path').click()
    await   expect(page.getByText('PHAM hai1@')).toBeEnabled()


  
})



