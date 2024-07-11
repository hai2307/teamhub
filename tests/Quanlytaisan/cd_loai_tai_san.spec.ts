import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';

test.beforeEach(async({page})=>{
    const Loginhrm = new loginpage(page)
    await Loginhrm.login()
    await   page.locator('div:nth-child(4)').first().click()
    const cd_chuc_danh=page.getByRole('link', { name: 'Loại tài sản' })
    await cd_chuc_danh.click()
    await expect(page.getByText('TÊN LOẠI TÀI SẢN')).toBeVisible()
})
test.afterEach(async ({page})=>{
    await   page.close()
})

test('tim kiem CD_LTS02,CD_LTS03,CD_LTS04,CD_LTS05,CD_LTS06,CD_LTS07,CD_LTS08,CD_LTS09,CD_LTS10,CD_LTS011,CD_LTS12 ' ,  async  ({page})=>{
    //check placeholder tìm kiếm CD_LTS02
    const   search=page.locator('//input[@class="el-input__inner"]')
    await   expect(search).toBeVisible()
    // check trường tìm kiếm khi nhập spase 
    await   search.fill('  ')
    const   icon_search=page.locator('.icon-search').first()
    await   icon_search.click()
    // kiểm tra nhập chữ hoa chữ thường và danh sách loại tài sản tồn tại 
    await   search.fill('BÀN')
    await   icon_search.click()
    await   expect(page.getByText('Bàn')).toBeVisible()
    await   search.clear()
    await   search.fill('bàn')
    await   icon_search.click()
    await   expect(page.getByRole('cell', { name: 'Bàn' }).locator('div')).toBeVisible()
    //kiểm tra ki nhập kí tự đặ biệt và danh sách trả về tên loại tài sản không tồn tại 
    await   search.clear()
    await   search.fill('#@')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
    // kiểm tra khi nhập số vào tìm kiếm 
    await   search.clear()
    await   search.fill('123456789')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
      // kiểm tra khi nhập data rỗng  vào tìm kiếm 
    await   search.clear()
    await   search.fill('')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
      // kiểm tra khi nhập mã tài sản không tồn tại 
    await   search.clear()
    await   search.fill('W')
    await   icon_search.click()
    await   expect(page.getByText('Không có dữ liệu')).toBeVisible()
})



test('checkbox', async({page})=>{
    // kiểm tra check box uncheck 
    const   checkbox=page.getByRole('row', { name: 'Mã loại tài sản Tên loại tài' }).locator('span').nth(1)
    await   checkbox.isChecked()
    await   checkbox.uncheck()
    await   expect(checkbox).toBeTruthy
    
    // check highlight vào checkbox thay đôi màu sắc  
    const   color5 = checkbox.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color3")
    })
    await   checkbox.hover()
    const   color6 = checkbox.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color4")
    })
    await   expect(color5).not.toBe(color6)
    // Kiểm tra khi click chọn chẹckbox
    const   delete_all =page.locator('#common-layout').getByRole('button')
    const   checkbox_g=page.getByRole('row', { name: 'G Ghế Quản lý theo số lượng' }).locator('span').nth(1)
    await   checkbox_g.click()
    await   expect(page.getByText('1 lựa chọn')).toBeVisible()
    await   expect(delete_all).toBeVisible()
    await   checkbox_g.isChecked()
    await   checkbox_g.click()

    // Kiểm tra khi click checkbox trong header
    await   checkbox.click()
    await   expect(delete_all).toBeVisible()
    await   expect(page.getByText('lựa chọn')).toBeVisible()
    await   checkbox.click()  
    // kiểm tra khi click vào nhiều checkbox
    const   checkbox_B=page.getByRole('row', { name: 'B Bàn Quản lý theo mã' }).locator('span').nth(1)
    await   checkbox_B.click()
    await   checkbox_g.click()
    await   expect(page.getByText('2 lựa chọn')).toBeVisible()
    await   expect(delete_all).toBeVisible()

})
test('cột mã sản phẩm CD_LTS28', async ({page})=>{
    // hiển thị danh sách mã loai sản phẩm
    await   expect(page.getByText('G', { exact: true })).toBeVisible()
    await   expect(page.getByText('B', { exact: true })).toBeVisible()
 
})

test('tên loại tài sản CD_LTS29 ', async ({page})=>{
    // hiển thị danh sách tên loại tài sản
    await   expect(page.getByText('Ghế', { exact: true })).toBeVisible()
    await   expect(page.getByText('Bàn', { exact: true })).toBeVisible()
 
})
test('cách quản lý CD_LTS30 ', async ({page})=>{
    // hiển thị danh sách cách quản lý
    await   expect(page.getByRole('cell', { name: 'Quản lý theo số lượng' }).locator('span')).toBeVisible()
    await   expect(page.getByText('Quản lý theo mã').first()).toBeVisible()
 
})
test('icon edit,icon delete CD_LTS31 CD_LTS32 CD_LTS33 CD_LTS34 ', async ({page})=>{
    // hiển thị hien thị text "sửa" khi hover chuột vào sửa
    const   edit=page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').nth(1)
    const   huy=page.getByRole('button', { name: 'Hủy' })
    const   xoa = page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').first()
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
    await   edit.hover()

    await   expect(page.getByText('Sửa')).toBeVisible()
    // hiển thị popup khi click vào sửa
    await   edit.click()
    await   expect(huy).toBeVisible()
    await   expect(xac_nhan).toBeVisible() 
    await   huy.click()
    // hover vào delete xuât hiện xóa 
    await   xoa.hover()

    await   expect(page.locator(':text-is("Xóa")')).toBeVisible()
    // hiển thị popup khi click vào delete
    await   xoa.click()
    await   expect(huy).toBeVisible()
    await   expect(xac_nhan).toBeVisible()
    await   huy.click()
 
})
test('button add CD_LTS35 CD_LTS36 ',async({page})=>{
    const   button_add=page.locator('#form-filter button')
    await   button_add.hover()
    await   expect(page.getByText('Tạo loại tài sản').first()).toBeVisible()  
    await   button_add.click()
    await   expect(page.getByRole('button', { name: 'Hủy' })).toBeVisible()
    await   expect(page.locator('.popup-title')).toBeEnabled()
    
})
// popup thêm mới tài sản 
test('popup thêm mới tài sản button lưu CD_LTS38,CD_LTS39,CD_LTS40,CD_LTS41,CD_LTS42,CD_LTS43,CD_LTS44,CD_LTS45,CD_LTS46',async({page})=>{
const   button_add_ts=page.locator('#form-filter button')
await   button_add_ts.click()
await   expect(page.getByRole('button', { name: 'Hủy' })).toBeVisible()
await   expect(page.locator('.popup-title')).toBeEnabled()    
// kiểm tra khi nhập trùng mã tài sản đã tồn tại trước đó 
const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
const   ghi_chu_LTS=page.getByPlaceholder('Nhập ghi chú')
const   huy=page.getByRole('button', { name: 'Hủy' })
const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
await   ten_LTS.fill('xxxx')
await   ma_LTS.fill('M')
await   xac_nhan.click()
await   page.waitForTimeout(500)
await   expect(page.getByText('Mã loại tài sản đã tồn tại')).toBeEnabled()
// Kiểm tra khi bỏ trống trường Mã loại tài sản
await   ma_LTS.clear()
await   xac_nhan.click()
await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeVisible()
// Kiểm tra khi nhập trùng Tên loại tài sản đã có trước đó
await   ten_LTS.clear()
await   ten_LTS.fill('Bàn')
await   ma_LTS.fill('X')
await   xac_nhan.click()
await   expect(page.getByText('Tên loại tài sản đã tồn tại')).toBeVisible()
// Kiểm tra khi bỏ trống trường Tên loại tài sản 
await   ten_LTS.clear()
await   xac_nhan.click()
await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeVisible()
// Kiểm tra khi chọn Cách quản lý là Quản lý theo mã
const   checkbox_quanlytheosoluong=page.locator('label').filter({ hasText: 'Quản lý theo mã' }).locator('span').nth(1)
const   checkbox_quanlytheoma=page.locator('label').filter({ hasText: 'Quản lý theo số lượng' }).locator('span').nth(1)
await   ten_LTS.clear()
await   ten_LTS.fill('yyy')
await   ma_LTS.clear()
await   ma_LTS.fill('XX')
await   checkbox_quanlytheoma.isChecked()
await   expect(checkbox_quanlytheoma).toBeTruthy()
await   xac_nhan.click()
await   expect(page.getByText('XX')).toBeVisible()

    // delete thông báo mã tài sản đã tồn tại
const   delete_ma_ts_da_tong_tai=page.locator('#notification_2 div').filter({ hasText: 'Thông báoMã loại tài sản đã t' }).getByRole('img')
await   delete_ma_ts_da_tong_tai.click()
await   page.waitForTimeout(1000)
    // xoa tài sản vừa tạo 
const   xoa_ts_new_create=page.getByRole('row', { name: 'XX yyy Quản lý theo mã' }).locator('img').first()
await   xoa_ts_new_create.click()
await   page.getByRole('button', { name: 'Xác nhận' }).click()
await   expect(page.getByText('XX')).not.toBeVisible()
await   expect(page.getByText('Xóa thành công')).toBeEnabled()

// Kiểm tra khi chọn Cách quản lý là Quản lý theo số lương 
await   button_add_ts.click()
await   checkbox_quanlytheosoluong.click()
await   ten_LTS.clear()
await   ten_LTS.fill('yyy')
await   ma_LTS.clear()
await   ma_LTS.fill('XX')
await   checkbox_quanlytheoma.isChecked()
await   expect(checkbox_quanlytheoma).toBeTruthy()
await   xac_nhan.click()
await   page.pause()
await   expect(page.getByText('XX')).toBeVisible()
      // xoa tài sản vừa tạo 
await   page.getByRole('row', { name: 'XX yyy Quản lý theo mã' }).locator('img').first().click()
await   page.getByRole('button', { name: 'Xác nhận' }).click()
await   expect(page.getByText('XX')).not.toBeVisible()
await   expect(page.getByText('Xóa thành công')).toBeEnabled()
await   page.waitForTimeout(2000)
// kiểm tra khi chon cả 2 cách quản lý 
// kiểm tra khi không chọn cách quản lý nào 
// do mặc định là chọn 1 cách quản lý nên chọn cách quản lý này sẽ unckeck cách quản lý kia , nên chỉ chọn đc 1 trong 2 và luôn có 1 check bõ đc chọn
await   button_add_ts.click()
await   expect(checkbox_quanlytheosoluong).toBeEnabled()
await   checkbox_quanlytheosoluong.click()
await   checkbox_quanlytheosoluong.isChecked
await   checkbox_quanlytheoma.uncheck()
})

test('button huy tron popup,CD_LTS46,CD_LTS47,CD_LTS48', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   huy=page.getByRole('button', { name: 'Hủy' })
    // check Highlight thay doi mau sac
    await   button_add_ts.click()
    const   color5 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color5")
    })
    await   huy.hover()
    const   color6 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color6")
    })
    await   expect(color5).not.toBe(color6)
    // check close popup khi click vaof huy
    await   huy.click()
    await   expect(huy).toBeEnabled()
    // close khi click vao huy khi nhập đầy đủ thông tin 
    await   button_add_ts.click()
    await   page.getByPlaceholder('Nhập loại tài sản').fill('xxx')
    await   page.getByPlaceholder('Nhập mã loại tài sản').fill('yyy')
    await   huy.click()
    await   expect(huy).toBeEnabled()

})
test('button huy tron popup,CD_LTS49,CD_LTS50,CD_LTS51,CD_LTS51', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   close=page.getByLabel('el.dialog.close')
    // check click close khi chưa nhập dữ liệu vào popup
    await   button_add_ts.click()
    await   expect(close).toBeVisible()
    await   close.click()
    // check click vào close khi đã nhập dữu liệu
    await   button_add_ts.click()
    await   expect(close).toBeVisible()
    await   page.getByPlaceholder('Nhập loại tài sản').fill('xxx')
    await   page.getByPlaceholder('Nhập mã loại tài sản').fill('yyy')
    await   close.click()
    await   expect(button_add_ts).toBeVisible()
    // close khi click vao outside popup
    const   locato_outside=page.locator('//body[@class="el-popup-parent--hidden"]')
    await   button_add_ts.click()
    await   expect(close).toBeVisible()
    await   locato_outside.click()
    await   expect(close).toBeVisible()
    // close khi click vao outside popup khi n hap du liệu
    await   page.getByPlaceholder('Nhập loại tài sản').fill('xxx')
    await   page.getByPlaceholder('Nhập mã loại tài sản').fill('yyy')
    await   locato_outside.click()
    await   expect(close).toBeVisible()

})

test('ma loai tai san,CD_LTS53,CD_LTS54,CD_LTS55,CD_LTS56,CD_LTS57,CD_LTS58,CD_LTS59,CD_LTS60,CD_LTS61,CD_LTS62', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   close=page.getByLabel('el.dialog.close')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu 
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    // kiểm tra trường mã loại tài sản khi bỏ trông 
    await   ten_LTS.fill('xxx')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường Mã loại tài sản khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   ma_LTS.fill('@1Aa')
    await   xac_nhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    const   xoa_ts_new_create=page.getByRole('row', { name: 'Quản lý theo mã' }).locator('img').first()
    await   xoa_ts_new_create.click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('@1Aa')).not.toBeVisible()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_3 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

    // Kiểm tra trường Mã loại tài sản khi nhập toàn space
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    await   ten_LTS.fill('xxx')
    await   ma_LTS.fill('   ')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường Mã loại tài sản khi nhập space trước/sau
    await   ma_LTS.fill(' 123 ')
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   expect(page.getByText('123')).toBeVisible()
    await   page.getByRole('row', { name: 'xxx Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('123')).not.toBeVisible()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_5 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường Mã loại tài sản khi nhập 1 ký tự 
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    await   ten_LTS.fill('xxx')
    await   ma_LTS.fill('1')
    await   xac_nhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'xxx Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_7 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường Mã loại tài sản khi nhập 255 ký tự
    const   kitu_255= 'x'.repeat(2000);
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    await   ten_LTS.fill('xxx')
    await   ma_LTS.fill(kitu_255)
    await   xac_nhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.waitForTimeout(1000)
    await   expect(page.getByText('xxx', { exact: true })).toBeVisible()
    await   page.getByRole('row', { name: 'Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_9 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường Mã loại tài sản khi nhập 256 ký tự => chỉ nhập đc 255 kí tự 
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    const   text256= kitu_255+"A"
    await   ten_LTS.fill('xxx')
    await   ma_LTS.fill(text256)
    await   xac_nhan.click()
    await   page.locator('#notification_10 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'Quản lý theo mã' }).locator('img').first().click()
    await   xac_nhan.click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_11 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

    // Kiểm tra trường Mã loại tài sản khi nhập trùng với Mã loại tài sản trước đó
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    await   ten_LTS.fill('xxx')
    await   ma_LTS.fill('G')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản đã tồn tại')).toBeVisible()
    await   page.locator('#notification_12 div').filter({ hasText: 'Thông báoMã loại tài sản đã t' }).getByRole('img').click()
 
    // Kiểm tra trường Mã loại tài sản khi nhập Mã loại tài sản đã bị xóa
    await   ma_LTS.clear()
    await   ma_LTS.fill('1')
    await   xac_nhan.click()
    await   page.locator('#notification_13 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_14 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

})
test('ten tai san ,CD_LTS64=>CD_LTS173', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   close=page.getByLabel('el.dialog.close')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu tên tài sản 
    await   button_add_ts.click()
    await   expect(ten_LTS).toBeEnabled()
    // kiểm tra trường mã loại tài sản khi bỏ trông 
    await   ma_LTS.fill('xxx')
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường tên tài sản khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   ten_LTS.fill('@1Aa')
    await   xac_nhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    const   xoa_ts_new_create=page.getByRole('row', { name: 'XXX @1Aa Quản lý theo mã' }).locator('img').first().first()
    await   xoa_ts_new_create.click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('@1Aa')).not.toBeVisible()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_3 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

    // Kiểm tra trường tên tài sản khi nhập toàn space
    await   button_add_ts.click()
    await   expect(ma_LTS).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('   ')
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường tên tài sản khi nhập space trước/sau
    await   ten_LTS.fill(' 123 ')
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   expect(page.getByText('123')).toBeVisible()
    await   page.getByRole('row', { name: 'XXX 123 Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('123')).not.toBeVisible()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_5 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường Mã loại tài sản khi nhập 1 ký tự 
    await   button_add_ts.click()
    await   expect(ten_LTS).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('1')
    await   xac_nhan.click()
    // await   page.locator('#notification_13 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX 1 Quản lý theo mã' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_7 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường tên tài sản khi nhập 255 ký tự
    const   kitu_255= 'x'.repeat(2000);
    await   button_add_ts.click()
    await   expect(ten_LTS).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill(kitu_255)
    await   xac_nhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   expect(page.getByText('XXX', { exact: true })).toBeVisible()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeEnabled()
    await   page.locator('#notification_9 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // Kiểm tra trường tên tài sản khi nhập 256 ký tự => chỉ nhập đc 255 kí tự 
    await   button_add_ts.click()
    await   expect(ten_LTS).toBeEnabled()
    const   text256= kitu_255+"A"
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill(text256)
    await   xac_nhan.click()
    await   page.locator('#notification_10 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   xac_nhan.click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_11 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

    // Kiểm tra trường tên tài sản khi nhập trùng với Mã loại tài sản trước đó
    await   button_add_ts.click()
    await   expect(ten_LTS).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('Bàn')
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản đã tồn tại')).toBeVisible()
    await   page.locator('#notification_12 div').filter({ hasText: 'Thông báoTên loại tài sản đã' }).getByRole('img').click()
 
    // Kiểm tra trường tên loại tài sản khi nhập Mã loại tài sản đã bị xóa
    await   ten_LTS.clear()
    await   ten_LTS.fill('1')
    await   xac_nhan.click()
    await   page.locator('#notification_13 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_14 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

})

test('Ghi chu ,CD_LTS75=>CD_LTS80', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   close=page.getByLabel('el.dialog.close')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   ghi_chu=page.getByPlaceholder('Nhập ghi chú')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu ghi chú
    await   button_add_ts.click()
    await   expect(ghi_chu).toBeEnabled()
    // kiểm tra kho bỏ trông ghi chú  
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('yyy')
    await   xac_nhan.click()
    await   expect(page.getByText('xxx')).toBeEnabled()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_3 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

    // Kiểm tra trường ghi chú khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   button_add_ts.click()
    await   expect(ghi_chu).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('yyy')
    await   ghi_chu.fill('@1Aa')
    await   xac_nhan.click()
    await   expect(page.getByText('xxx')).toBeEnabled()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_5 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // kiểm tra trương ghi chú nhập space
    await   button_add_ts.click()
    await   expect(ghi_chu).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('yyy')
    await   ghi_chu.fill('    ')
    await   xac_nhan.click()
    await   expect(page.getByText('xxx')).toBeEnabled()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_7 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // kiểm tra trương ghi chú nhập space trước sau 
    await   button_add_ts.click()
    await   expect(ghi_chu).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('yyy')
    await   ghi_chu.fill(' ka ')
    await   xac_nhan.click()
    await   expect(page.getByText('xxx')).toBeEnabled()
    await   page.locator('#notification_8 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_9 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()
    // kiểm tra trương ghi chú khi nhập 1 kí tự
    await   button_add_ts.click()
    await   expect(ghi_chu).toBeEnabled()
    await   ma_LTS.fill('xxx')
    await   ten_LTS.fill('yyy')
    await   ghi_chu.fill('1')
    await   xac_nhan.click()
    await   expect(page.getByText('xxx')).toBeEnabled()
    await   page.locator('#notification_10 div').filter({ hasText: 'Thông báoTạo mới loại tài sản' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'XXX' }).locator('img').first().click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Xóa thành công')).toBeVisible()
    await   page.locator('#notification_11 div').filter({ hasText: 'Xóa thành côngXóa loại tài sả' }).getByRole('img').click()

})
test('cach quan ly ,CD_LTS83=>CD_LTS87', async({page})=>{
    const   button_add_ts=page.locator('#form-filter button')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
    const   radio_quanlytheoma=page.locator('label').filter({ hasText: 'Quản lý theo mã' }).locator('span').nth(1)
    // const   isChecked = await   ckeckbox_quanlytheoma.isChecked()
    const   radio_quanlytheosoluong =page.locator('label').filter({ hasText: 'Quản lý theo số lượng' }).locator('span').nth(1)
    // kiểm tra mực định ban đầu 
     // kiểm tra khi chon radio buton chọn theo mã
    await   button_add_ts.click()
    await   expect(radio_quanlytheoma).toBeTruthy()
    await   radio_quanlytheoma.isChecked()
    await   radio_quanlytheosoluong.check()
    // kiểm tra khi bỏ trống => không thể bỏ ctroogns do bắt buộc chọn 1 trong 2 
    await   radio_quanlytheoma.click()
    await   radio_quanlytheoma.isChecked()

    // kiểm tra khi chon radio buton chọn theo số lương 
    await   radio_quanlytheosoluong.click()
    await   radio_quanlytheosoluong.isChecked()
    // kiểm tra khi click chọn cả 2 -> chọn đc 1 cái và ẩn 1 cái 
    await   radio_quanlytheoma.click()
    await   radio_quanlytheoma.isChecked()
    await   radio_quanlytheosoluong.check()
})

//  popup chỉnh sử loại tài sản 
// button lưu chỉnh sử loại tài sản 
test('popup sửa tài sản button lưu CD_LT89=>CD_LTS97',async({page})=>{
    const   button_edit=page.getByRole('row', { name: 'G Ghế Quản lý theo số lượng' }).locator('img').nth(1)
    await   button_edit.click()
    await   expect(page.getByRole('button', { name: 'Hủy' })).toBeVisible()
    await   expect(page.locator('.popup-title')).toBeEnabled()    
    // kiểm tra khi nhập trùng mã tài sản đã tồn tại trước đó 
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   huy=page.getByRole('button', { name: 'Hủy' })
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
    await   ma_LTS.clear()
    await   page.waitForTimeout(1000)
    await   ma_LTS.fill('B')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản đã tồn tại')).toBeEnabled()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoMã loại tài sản đã t' }).getByRole('img').click()

    // Kiểm tra khi bỏ trống trường Mã loại tài sản
    await   ma_LTS.clear()
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeVisible()
    // Kiểm tra khi nhập trùng Tên loại tài sản đã có trước đó
    await   ten_LTS.clear()
    await   ten_LTS.fill('Bàn')
    await   ma_LTS.fill('G')
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản đã tồn tại')).toBeVisible()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoTên loại tài sản đã' }).getByRole('img').click()

    // Kiểm tra khi bỏ trống trường Tên loại tài sản 
    await   ten_LTS.clear()
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeVisible()
    // Kiểm tra khi chọn Cách quản lý là Quản lý theo mã
    await   ten_LTS.fill('Ghế')
    const   radio_quanlytheoma=page.locator('label').filter({ hasText: 'Quản lý theo mã' }).locator('span').nth(1)
    const   radio_quanlytheosoluong=page.locator('label').filter({ hasText: 'Quản lý theo số lượng' }).locator('span').nth(1)
    await   radio_quanlytheoma.click()
    await   radio_quanlytheoma.isChecked()
    await   expect(radio_quanlytheoma).toBeTruthy()
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    await   page.getByRole('row', { name: 'G Ghế Quản lý theo mã' }).locator('img').nth(1).click()
    await   radio_quanlytheosoluong.click()
    await   xac_nhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    
    // Kiểm tra khi chọn Cách quản lý là Quản lý theo số lương 
    await   button_edit.click()
    await   radio_quanlytheosoluong.isChecked()
    await   expect(radio_quanlytheosoluong).toBeTruthy()
    // kiểm tra khi bỏ trông các trường 
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   ma_LTS.clear()
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt')).toBeVisible()

    //kiểm tra nhập  tất cả các trường hợp lệ 
    await   ten_LTS.fill('Ghế')
    await   ma_LTS.fill('G')
    await   xac_nhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()

})

test('buton huy chinh sua ,CD_LTS99,CD_LTS100,CD_LTS101', async({page})=>{
    // Kiểm tra khi hover vào button Hủy
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   huy=page.getByRole('button', { name: 'Hủy' })
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
    const   button_edit=page.getByRole('row', { name: 'G Ghế Quản lý theo số lượng' }).locator('img').nth(1)
    await   button_edit.click()
    const   color7 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color7")
    })
    await   huy.hover()
    const   color8 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color8")
    })
    await   expect(color7).not.toBe(color8)
    // check close popup khi click vaof huy
    await   huy.click()
    await   expect(huy).toBeEnabled()
    // close khi click vao huy khi nhập đầy đủ thông tin 
    await   button_edit.click()
    await   huy.click()
    await   expect(huy).not.toBeVisible()
    await   expect(button_edit).toBeVisible()
    
})
test('icon close ,CD_LTS102,CD_LTS103,CD_LTS104,CD_LTS105', async({page})=>{
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   close=page.getByLabel('el.dialog.close')
    const   button_edit=page.getByRole('row', { name: 'G Ghế Quản lý theo số lượng' }).locator('img').nth(1)  
    // Kiểm tra màn hình khi chưa nhập dữ liệu và click icon X
    await   button_edit.click()
    await   ten_LTS.clear()
    await   ma_LTS.clear()
    await   close.click()
    await   expect(close).not.toBeVisible() 
    // Kiểm tra màn hình khi nhập dữ liệu và click vào icon X
    await   button_edit.click()
    await   close.click()
    await   expect(close).not.toBeVisible() 
    await   expect(button_edit).toBeVisible()
 
})

test('ma loai tai san popup edit,CD_LTS106=>CD_LTS115', async({page})=>{
    const   button_edit=page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').nth(1)
    const   close=page.getByLabel('el.dialog.close')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu 
    await   button_edit.click()
    await   expect(ten_LTS).toBeVisible()
    await   expect(ma_LTS).toBeEnabled()
    // kiểm tra trường mã loại tài sản khi bỏ trông 
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường Mã loại tài sản khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   ma_LTS.fill('@1AA')
    await   xac_nhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('@1AA')).toBeVisible()
    await   button_edit.click()
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill('G')
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('@1Aa')).not.toBeVisible()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()

    // Kiểm tra trường Mã loại tài sản khi nhập toàn space
    await   button_edit.click()
    await   expect(ma_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill('   ')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường Mã loại tài sản khi nhập space trước/sau
    await   ma_LTS.fill(' G ')
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('Ghế')).toBeVisible()
    await   expect(page.getByText('G', { exact: true })).toBeEnabled()
  
    // Kiểm tra trường Mã loại tài sản khi nhập 1 ký tự 
    await   button_edit.click()
    await   expect(ma_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill('1')
    await   xac_nhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('1', { exact: true })).toBeEnabled()
     
    // Kiểm tra trường Mã loại tài sản khi nhập 255 ký tự
    const   kitu_255= 'x'.repeat(255);
    await   page.getByRole('row', { name: 'Ghế Quản lý theo số lượng' }).locator('img').nth(1).click()
    await   expect(ma_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill(kitu_255)
    await   xac_nhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click() 
    // Kiểm tra trường Mã loại tài sản khi nhập 256 ký tự => chỉ nhập đc 255 kí tự 
    await   button_edit.click()
    await   expect(ma_LTS).toBeEnabled()
    const   text256= kitu_255+"A"
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill(text256)
    await   xac_nhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()    

    // Kiểm tra trường Mã loại tài sản khi nhập trùng với Mã loại tài sản trước đó
    await   button_edit.click()
    await   expect(ma_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill('B')
    await   xac_nhan.click()
    await   expect(page.getByText('Mã loại tài sản đã tồn tại')).toBeVisible()
    
 
    // Kiểm tra trường Mã loại tài sản khi nhập Mã loại tài sản đã bị xóa
    await   page.waitForTimeout(1000)
    await   ma_LTS.clear()
    await   ma_LTS.fill('G')
    await   xac_nhan.click()
    await   expect(page.getByText('G', { exact: true })).toBeEnabled()   
})

test('tên loại tài sản popup edit,CD_LTS117=>CD_LTS126', async({page})=>{
    const   button_edit=page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').nth(1)
    const   close=page.getByLabel('el.dialog.close')
    const   ma_LTS=page.getByPlaceholder('Nhập mã loại tài sản')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu 
    await   button_edit.click()
    await   expect(ten_LTS).toBeVisible()
    await   expect(ma_LTS).toBeEnabled()
    // kiểm tra trường tên loại tài sản khi bỏ trông 
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường tên loại tài sản khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   ten_LTS.fill('@1Aa')
    await   xac_nhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('@1Aa')).toBeVisible()
    
    // Kiểm tra trường Mã loại tài sản khi nhập toàn space
    await   button_edit.click()
    await   expect(ten_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   ten_LTS.fill('   ')
    await   xac_nhan.click()
    await   expect(page.getByText('Tên loại tài sản là trường bắt buộc')).toBeEnabled()

    // Kiểm tra trường tên loại tài sản khi nhập space trước/sau
    await   ten_LTS.fill(' Ghế ')
    await   xac_nhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('Ghế')).toBeVisible()
 
    // Kiểm tra trường tên loại tài sản khi nhập 1 ký tự 
    await   button_edit.click()
    await   expect(ten_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   ten_LTS.fill('1')
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    await   expect(page.getByText('1', { exact: true })).toBeEnabled()
       
    // Kiểm tra trường tên loại tài sản khi nhập 255 ký tự
    const   kitu_255= 'x'.repeat(255);
    await   button_edit.click()
    await   expect(ten_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   ten_LTS.fill(kitu_255)
    await   xac_nhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    // await   expect(page.getByText('0123456789')).toBeVisible()
    
    // Kiểm tra trường tên loại tài sản khi nhập 256 ký tự => chỉ nhập đc 255 kí tự 
    await   button_edit.click()
    await   expect(ten_LTS).toBeEnabled()
    const   text256= kitu_255+"A"
    await   ten_LTS.clear()
    await   ten_LTS.fill(text256)
    await   xac_nhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).locator('path').click()
    // await   expect(page.getByText('0123456789A')).not.toBeVisible()
    
    // Kiểm tra trường tên loại tài sản khi nhập trùng với Mã loại tài sản trước đó
    await   button_edit.click()
    await   expect(ten_LTS).toBeEnabled()
    await   page.waitForTimeout(1000)
    await   ten_LTS.clear()
    await   ten_LTS.fill('Bàn')
    await   xac_nhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoTên loại tài sản đã' }).getByRole('img').click()
    await   expect(page.getByText('Tên loại tài sản đã tồn tại')).toBeVisible()
    
    // Kiểm tra trường tên loại tài sản khi nhập Mã loại tài sản đã bị xóa
    await   ten_LTS.clear()
    await   ten_LTS.fill('Ghế')
    await   xac_nhan.click()
    await   expect(page.getByText('Ghế', { exact: true })).toBeEnabled()   

})


test('Ghi chú popup edit,CD_LTS128=>CD_LTS135', async({page})=>{
    const   button_edit=page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').nth(1)
    const   ghi_chu=page.getByPlaceholder('Nhập ghi chú')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    // kiểm tra mặc định ban đầu ghi chú
    await   button_edit.click()
    await   expect(ten_LTS).toBeVisible()
    await   expect(page.getByPlaceholder('Nhập ghi chú')).toBeVisible()
    await   expect(page.getByText('Ghi chú',{exact:true})).toBeVisible()
    await   page.waitForTimeout(1000)
    await   ghi_chu.clear()
    // kiểm tra trường ghi chú khi bỏ trông vân edit thành công 
    await   xac_nhan.click()
    await   page.locator('#notification_2 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    await   expect(page.getByText('Ghế', { exact: true })).toBeEnabled()     
    // Kiểm tra trường ghi chú khi nhập chữ hoa, chữ thường, chữ số, ký tự đặc biệt
    await   button_edit.click()
    await   ghi_chu.clear()
    await   ghi_chu.fill('Hai@')
    await   xac_nhan.click()
    await   page.locator('#notification_3 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    
    // Kiểm tra trường ghi chú  khi nhập toàn space
    await   button_edit.click()
    await   ghi_chu.clear()
    await   ghi_chu.fill('   ')
    await   xac_nhan.click()
    await   page.locator('#notification_4 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
   
    // // Kiểm tra trường ghi chú  khi nhập space trước/sau
    await   button_edit.click()
    await   ghi_chu.clear()
    await   ghi_chu.fill(' 123  ')
    await   xac_nhan.click()
    await   page.locator('#notification_5 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()

    // // Kiểm tra trường ghi chú  khi nhập 1 ký tự 
    await   button_edit.click()
    await   ghi_chu.clear()
    await   ghi_chu.fill('2')
    await   xac_nhan.click()
    await   page.locator('#notification_6 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
       
    // Kiểm tra trường ghi chú khi nhập 2000 ký tự
    const   longString = 'x'.repeat(2000) // Tạo một chuỗi có 2000 ký tự 'x'
    // console.log(longString.length)
    await   button_edit.click()
    await   page.waitForTimeout(1000)
    await   ghi_chu.clear()
    await   ghi_chu.fill(longString)
    await   xac_nhan.click()
    await   page.locator('#notification_7 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    
    // Kiểm tra trường ghi chú  khi nhập 256 ký tự => chỉ nhập đc 255 kí tự 
    const   text256= longString+"A"
    await   button_edit.click()
    await   page.waitForTimeout(1000)
    await   ghi_chu.clear()
    await   ghi_chu.fill(text256)
    await   xac_nhan.click()
    await   page.locator('#notification_8 div').filter({ hasText: 'Thông báoCập nhật loại tài sả' }).getByRole('img').click()
    await   button_edit.click()
    await   page.waitForTimeout(1000)
    await   ghi_chu.clear()
})

test('cach quan ly popup edit ,CD_LTS137=>CD_LTS141', async({page})=>{
    const   button_edit=page.getByRole('row', { name: 'Quản lý theo số lượng' }).locator('img').nth(1)
    const   ghi_chu=page.getByPlaceholder('Nhập ghi chú')
    const   ten_LTS=page.getByPlaceholder('Nhập loại tài sản')
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })

    const   radio_quanlytheoma=page.locator('label').filter({ hasText: 'Quản lý theo mã' }).locator('span').nth(1)
    // const   isChecked = await   ckeckbox_quanlytheoma.isChecked()
    const   radio_quanlytheosoluong =page.locator('label').filter({ hasText: 'Quản lý theo số lượng' }).locator('span').nth(1)
    // kiểm tra mực định ban đầu 
     // kiểm tra khi chon radio buton chọn theo mã
    await   button_edit.click()
    await   expect(radio_quanlytheoma).toBeTruthy()
    await   radio_quanlytheoma.isChecked()
    await   radio_quanlytheosoluong.check()
    // kiểm tra khi bỏ trống => không thể bỏ ctroogns do bắt buộc chọn 1 trong 2 
    await   radio_quanlytheoma.click()
    await   radio_quanlytheoma.isChecked()

    // kiểm tra khi chon radio buton chọn theo số lương 
    await   radio_quanlytheosoluong.click()
    await   radio_quanlytheosoluong.isChecked()
    // kiểm tra khi click chọn cả 2 -> chọn đc 1 cái và ẩn 1 cái 
    await   radio_quanlytheoma.click()
    await   radio_quanlytheoma.isChecked()
    await   radio_quanlytheosoluong.check()
})
test('popup xóa loại tài sản ,CD_LTS142=>CD_LTS150', async({page})=>{
    const   xoa=page.getByRole('row', { name: 'G Ghế Quản lý theo số lượng' }).locator('img').first()
    const   title_xoaloaitaisan=page.getByText('Xóa loại tài sản', { exact: true })
    const   content=page.getByText('Bạn có chắc chắn muốn xóa loạ')
    const   huy=page.getByRole('button', { name: 'Hủy' })
    const   xac_nhan=page.getByRole('button', { name: 'Xác nhận' })
    const   close=page.getByLabel('el.messagebox.close')
    // Kiểm tra title
    await   xoa.click()
    await   expect(title_xoaloaitaisan).toBeEnabled()
    // Kiểm tra content 
    await   expect(content).toBeVisible()

    // button huy , hover chuột thay dổi màu sác ,,và click vào huy clóe popup
    const   color9 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color9")
    })
    await   huy.hover()
    const   color10 = huy.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color10")
    })
    await   expect(color10).not.toBe(color9)
    await   huy.click()
    await   expect(huy).not.toBeVisible()
  
    // button huy , hover chuột thay dổi màu sác ,,và click vào huy clóe popup
    await   xoa.click()
    const   color11 = close.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color11")
    })
    await   close.hover()
    const   color12 = close.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color12")
    })
    await   expect(color11).not.toBe(color12)
    await   close.click()
    await   expect(close).not.toBeVisible()
  // button huy , hover chuột thay dổi màu sác ,,và click vào huy clóe popup
  await   xoa.click()
  const   color13 = xac_nhan.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("color13")
  })
  await   xac_nhan.hover()
  const   color14 = xac_nhan.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("color14")
  })
  await   expect(color13).not.toBe(color14)
  await   xac_nhan.click()
  await   expect(xac_nhan).not.toBeVisible()

})
























