import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';
import { QTNS_nhanvien } from '../../page/QTNS_nhanvien';
import { clickElement, expectElementToBeVisible } from '../../page/UI_interactions';
const fgYellow = '\x1b[33m';
const fgGreen = '\x1b[32m';
const fgRed = '\x1b[31m';

test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page)
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   Loginhrm.login()
    await   QTNSnhanvien.gotoQTNSnhanvien()
    await   QTNSnhanvien.gotoQTNSthongtinnhanvien()
 
})
test.afterEach(async ({page})=>{
    await   page.pause()
})
test.skip('',  async ({page }) => {
    console.log(`${fgYellow} Hiển thị title quản lý nhân viên `)
    await   expect(page.getByRole('link', { name: 'Quản lý nhân viên' })).toBeVisible()

    console.log(`${fgYellow} Hiển thị button đồng bộ app chấm công  `)
    await   expect(page.getByRole('button', { name: 'EAC' })).toBeVisible()

    console.log(`${fgYellow} Hiển thị button sắp xếp `)
    await   expect(page.locator('#form-filter').getByRole('button').first()).toBeVisible()

    console.log(`${fgYellow} Hiển thị button bộ lộc `)
    await   expect(page.locator('#form-filter').getByRole('button').nth(1)).toBeVisible()

    console.log(`${fgYellow} hiển thị icon tìm kiếm`)
    await   expect(page.locator('div').filter({ hasText: /^Chọn phòng banChọn chức danh$/ }).locator('path').first()).toBeVisible()

    console.log(`${fgYellow} hiển thị placholder : Nhập từ khóa `)
    await   expect(page.getByPlaceholder('Nhập từ khoá')).toBeVisible()

    console.log(`${fgYellow} hiển thị placholder : Chọn phong ban `)
    await   expect(page.getByText('Chọn phòng ban')).toBeVisible()

    console.log(`${fgYellow} hiển thị placholder : Chọn chức danh `)
    // hiển thị placholder : Chọn chức danh 
    // await   expect(page.getByRole('link', { name: 'Quản lý người dùng' })).toBeVisible()
    // await   expect(page.getByRole('link', { name: 'Quản lý người dùng' })).toBeVisible()

})


test.describe('thongtinchung ', () => {
test('thongtinguoidung',  async ({ page }) => {
    await   expectElementToBeVisible(page,'//h3[@class="full-name-info"]')
    await   expectElementToBeVisible(page,'//span[@class="el-tag__content"]')
    await   expect(page.getByText('Mã nhân viên:')).toBeVisible()
    await   expect(page.getByText('Email:')).toBeVisible()
    await   expect(page.getByText('Ngày sinh:')).toBeVisible()
    await   expect(page.getByText('Ngày vào làm:').first()).toBeVisible() 
    await   expect(page.getByText('Số điện thoại:')).toBeVisible()
    await   expect(page.getByText('Giới tính:')).toBeVisible()

})
// hiện thị ảnh và edit ảnh 
test('popup chinh sua thông tin chung QTNS_ND04,QTNS_ND05',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    await   clickElement(page,'.edit-icon-wrapper')
  
})
test('check ho ten ',  async ({ page }) => {
    const   xoa_hoten=page.locator('div').filter({ hasText: /^Họ tên \*Mã nhân viên \*$/ }).getByRole('img')
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()

    console.log(`${fgYellow} hiện thị họ và tên bắt buộc  `)
    await   expect(page.locator('label').filter({ hasText: 'Họ tên *' }).locator('span')).toBeVisible()

    console.log(`${fgYellow} hover chuột vào họ tên xuất hiện dấu sao xóa họ và tên  `)
    await   page.getByPlaceholder('Nhập họ tên người dùng').hover()
    await   expect(xoa_hoten).toBeVisible()

    console.log(`${fgYellow} xuất hiện (plachehoder Nhập họ tên người dùng ) khi click vào dau sao xóa họ tên   `)
    await   xoa_hoten.click()
    await   expect(page.getByText('Họ tên là trường bắt buộc')).toBeVisible()

})
test('ma nhan vien ',  async ({ page }) => {
    const   xoa_manhanvien=page.locator('div').filter({ hasText: /^Họ tên \*Mã nhân viên \*$/ }).getByRole('img')
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} hiện thị mã nhân bắt buộc  `)
    await   expect(page.locator('label').filter({ hasText: 'Mã nhân viên *' }).locator('span')).toBeVisible()
    console.log(`${fgYellow} hover chuột vào họ tên xuất hiện dấu sao xóa Mã nhân viên  `)
    
    await   page.getByPlaceholder('Nhập mã nhân viên').hover()
    await   expect(xoa_manhanvien).toBeVisible()

    console.log(`${fgYellow}xuất hiện (plachehoder Nhập Mã nhân viên người dùng ) khi click vào dau sao xóa họ tên   `)
    await   xoa_manhanvien.click()
    await   expect(page.getByText('mã nhân viên là trường bắt buộc')).toBeVisible()
    // hiển thị mã tài sản là bắt buộc sai text

})
test('email ',  async ({ page }) => {
    const   email_batbuoc=page.locator('label').filter({ hasText: 'Email *' }).locator('span')
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    const   text1=await page.getByText('nqxjshqfd@zeroe.ml').textContent()
    await   QTNSnhanvien.editthongtinnhanvien()
    const   text2 = await page.getByText('nqxjshqfd@zeroe.ml').textContent()
    console.log(`${fgYellow} hiện thị email là bat buộc  `)
    await   expect(email_batbuoc).toBeVisible()
    // await   expect(textemail).to.equal(textemai2); 
    if (text1 === text2) {
        console.log('Hai text giống nhau');
      } else {
        console.log('Hai text khác nhau');
      }

})
test('so dien thoai ',  async ({ page }) => {
    const   xoa_sdt=page.locator('.el-input__suffix-inner > .el-icon > svg')
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} hiện thị số điện thoại trước đó  `)
    await   expect(page.locator('.form-group > .el-input > .el-input__wrapper')).toBeVisible()
    const   text1 = await page.locator('.form-group > .el-input > .el-input__wrapper').textContent()
    console.log(text1)
    const   text2 = await page.getByText('23224119519').textContent()
    console.log(`${fgYellow} hover chuột vào họ tên xuất hiện dấu sao xóa họ và tên `)

    if (text1 === text2) {
        console.log('Hai text giống nhau')
      } else {
        console.log('Hai text khác nhau')
      }
    console.log(`${fgYellow} hover chuột vào xuất hiện dấu sao  `)
    await   page.getByPlaceholder('Nhập mã nhân viên').hover()
    await   expect(xoa_sdt).toBeVisible()
    // check edit sđt thành công 

})
test('phong ban ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()

    console.log(`${fgYellow} Hiển thị plachoder chọn phòng ban  `)
    await expect(page.getByText('Chọn phòng ban')).toBeVisible()
    console.log(`${fgYellow} hiển thị dropdown khi click vào filed `)
    await   page.locator('.el-select__wrapper').first().click()
    await   expect(page.locator('.el-select__wrapper').first()).toHaveText('Phòng ban kiểm thử')

})
test('chucdanh ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} hiện thị trương là bắt buộc  `)
    await expect(page.locator('label').filter({ hasText: 'Chức danh *' }).locator('span')).toBeVisible()

    console.log(`${fgYellow} Hiển thị chức danh đang có nếu ko có hiên thị placholder  `)
    await   expect(page.locator('div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper').first()).toHaveText('Tester')

    console.log(`${fgYellow} hiển thị dropdown khi click vào filed  `)
    await   page.locator('div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper').first().click()
    await   expect(page.getByText('Dev')).toBeVisible()
})
 
test('ngày sinh ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} hiển thị placholder - chọn ngày sinh  `)
    await   expect(page.getByPlaceholder('Chọn ngày sinh')).toBeVisible()

    console.log(`${fgYellow} Hiển thị ngày sinh - hiển thị date time picker khi click vòa ngày ngày sinh `)
    await   page.locator('.el-input__prefix-inner > .el-icon > svg > path').first().click()
    await   expect(page.getByRole('columnheader', { name: 'el.datepicker.weeksFull.wed' })).toBeVisible() 
})
 
test('giới tính ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} Hiển thị giới tính - click vào giới tính hiển thị dropdown gồm nam , nữ , khác  `)
 
    await   page.locator('div:nth-child(5) > div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper').click()
    await   expect(page.locator('div:nth-child(5) > div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper')).toHaveText('Nam')
})
 
 
test('ngày vào làm ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
    console.log(`${fgYellow} Hiển thị date picker định dang format : dd-mm-yyyy  `)
   expect(page.locator('div:nth-child(6) > div > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner > .el-icon > svg').first()).toBeVisible()
}) 
 
 
test('ngày nghỉ việc  ',  async ({ page }) => {
    const   QTNSnhanvien=new QTNS_nhanvien(page)
    await   QTNSnhanvien.editthongtinnhanvien()
 
    console.log(`${fgYellow} Hiển thị date picker định dang format : dd-mm-yyyy  `)
   expect(page.locator('div:nth-child(2) > .form-group > .position-relative > .el-input > .el-input__wrapper > .el-input__prefix > .el-input__prefix-inner > .el-icon > svg > path').first()).toBeVisible()
 }) 

})  

 
test('thong tin hợp đồng  ',  async ({ page }) => {
    
    console.log(`${fgGreen} thong tin hợp đồng`)
    console.log(`${fgYellow} check tính năng Collapse/Expand hoạt đông bình thương đong bình thường  `)
 
    await   expect(page.getByRole('button', { name: 'Thông tin hợp đồng' })).toBeVisible()
    // await   expect(page.locator('div>.el-collapse>i>svg')).toBeVisible()

 })

test.describe('qua trinh lam viec', () => {

test('Quá trình làm việc ',  async ({ page }) => {
    console.log(`${fgGreen} Quá trình làm việc`)
    console.log(`${fgYellow} hiển thị qua trình làm việc  và thêm mới `)
    
    const   themmoi=page.getByRole('button', { name: 'Quá trình làm việc Thêm mới' }).getByRole('button')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })

    console.log(`${fgYellow} thêm mới quá trình làm việc thành công  `)
    await   expect(themmoi).toBeVisible()
    await   themmoi.click()
    await   expect(xacnhan).toBeVisible()
    const   chon_chuc_danh=page.locator('.el-select__selection > div:nth-child(2)').first()
    await   chon_chuc_danh.click()
    await   page.getByRole('option', { name: 'Tester' }).locator('span').click()
    await   xacnhan.click()
    await   expect(page.getByLabel('Quá trình làm việcThêm mới').getByText('Tester')).toBeVisible()

    console.log(`${fgYellow} cập nhật quá trình làm việc  `)
    const   edit_qtlv=page.locator('li').filter({ hasText: 'Tester' }).locator('img')
    await   edit_qtlv.click()
    const   capbac=page.getByText('Chọn cấp bậc')
    await   capbac.click()
    await   page.getByRole('option', { name: 'Cấp bậc' }).locator('span').click()
    await   xacnhan.click()
    await   expect(page.getByText('Cấp bậc').first()).toBeVisible()
    
    console.log(`${fgYellow} delete quá trình làm việc thành công  `)
    const   xoa_qtlv=page.locator('li').filter({ hasText: 'Tester-Cấp bậc 1' }).locator('#Vector')
    await   xoa_qtlv.click()
    await   xacnhan.click()
    await   expect(page.getByText('Xoá quyết định thành công')).toBeVisible()

  }) 
  
test(' popup them moi qua trinh lam viec',  async ({ page }) => {  
    console.log(`${fgGreen} popup them moi qua trinh lam viec`)
    console.log(`${fgYellow}QTNS_ND31-popup thêm mới qua trinh làm viec`)
    
    const   themmoi=page.getByRole('button', { name: 'Quá trình làm việc Thêm mới' }).getByRole('button')
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    await   themmoi.click()

    console.log(`${fgYellow} title them moi qua trinh lam viec`)
    await   expect(page.getByText('thêm mới quyết định')).toBeVisible()
    console.log(`${fgRed} sai title them moi qua trinh lam viec`)

    console.log(`${fgYellow} field nhân sự  bắt buộc `)
    await   expect(page.getByText('Nhân sự *')).toBeVisible()

    console.log(`${fgYellow} field chuc danh hien thi placholder`)
    await   expect(page.getByText('Chọn chức danh mới')).toBeVisible()

    console.log(`${fgYellow} field cap bạc hien thi placholder `)
    await   expect(page.getByText('Chọn cấp bậc')).toBeVisible()

    console.log(`${fgYellow} field ngày bat dau hieu luc hien thi placholder `)
    await   expect(page.getByPlaceholder('Chọn ngày bắt đầu hiệu lực')).toBeVisible()

    console.log(`${fgYellow} field ngày ket thuc hieu luc hien thi placholder `)
    await   expect(page.getByPlaceholder('Chọn ngày kết thúc hiệu lực')).toBeVisible()
    }) 
 
}) 

test('Thong tin ca nhan ',  async ({ page }) => {
    console.log(`${fgGreen} Thong tin ca nhan`)
    console.log(`${fgYellow} hiển thị thông tin cá nhân và  hiển thị icon edit  `)
    
    const   edit_thongtincanhan = page.getByRole('button', { name: 'Thông tin cá nhân' }).getByRole('button')
    await   expect(page.getByRole('button', { name: 'Thông tin cá nhân' })).toBeVisible()
    await   expect(edit_thongtincanhan).toBeVisible()

    console.log(`${fgYellow} khi click vào icon hiển thị popup chỉnh sửa `)
    await   edit_thongtincanhan.click()
    await   expect(page.getByText('Cập nhật thông tin cơ bản')).toBeVisible()

  }) 

test('bang cap chung chi',  async ({ page }) => {
    console.log(`${fgGreen} bang cap chung chi`)
    console.log(`${fgYellow} Hiển thị title bằng cấp chứng chỉ  `)
    
    await   expect(page.getByRole('button', { name: 'Bằng cấp / Chứng chỉ Thêm mới' }) ).toBeVisible()

    console.log(`${fgYellow} Thêm mới bằng cấp chứng chỉ thành công `)
    const   themmoi_bangcap = page.getByRole('button', { name: 'Bằng cấp / Chứng chỉ Thêm mới' }).getByRole('button')
    await   themmoi_bangcap.click()
    const   xacnhanbc=page.getByRole('button', { name: 'Xác nhận' })
    await   expect(xacnhanbc).toBeVisible()
    await   page.getByText('Chọn trình độ đào tạo').click()
    await   page.getByText('Tiến sĩ').click()
    await   xacnhanbc.click()
    await   expect(page.getByText('Thêm trình độ / bằng cấp thà')).toBeVisible()
    const   edit_bc= page.getByLabel('Bằng cấp / Chứng chỉThêm mới').getByRole('button').first()
    const   delete_bc= page.getByLabel('Bằng cấp / Chứng chỉThêm mới').getByRole('button').nth(1)
    await   expect(edit_bc).toBeVisible()
    await   expect(page.getByRole('cell', { name: 'Tiến sĩ' }).locator('div')).toBeVisible()


    console.log(`${fgYellow} sửa bằng  cấp chứng chỉ thành công`)
    await   edit_bc.click()
    await   page.locator('div:nth-child(2) > .form-group > .position-relative > .select-form > .el-select > .el-select__wrapper > .el-select__selection').click()
    await   page.getByRole('option', { name: 'Toán kinh tế' }).locator('span').click()
    await   xacnhanbc.click()
    await   expect(page.getByText('Cập nhật trình độ / bằng cấp')).toBeVisible()
    await   expect(page.getByRole('cell', { name: 'Toán kinh tế' }).locator('span')).toBeVisible()

    console.log(`${fgYellow} xóa  cấp chứng chỉ thành công`)
    await   delete_bc.click()
    await   expect(page.getByText('Xóa trình độ/bằng cấp', { exact: true })).toBeVisible()
    await   xacnhanbc.click() 
    await   expect(page.getByText('Xóa trình độ/bằng cấp thành công', { exact: true })).toBeVisible()

  }) 

test('Thong tin nguoi than',  async ({ page }) => {
    console.log(`${fgGreen} Thông tin người thân`)
    console.log(`${fgYellow} Hiển thị thong tin nguoi than `)
    
    await   expect(page.getByRole('button', { name: 'Thông tin gia đình người thân' })).toBeVisible()

    console.log(`${fgYellow} Thêm mới thong tin nguoi than thành công `)
    const   themmoi_thongtinguoithan = page.getByRole('button', { name: 'Thông tin gia đình người thân' }).getByRole('button')
    await   themmoi_thongtinguoithan.click()
    const   xacnhan=page.getByRole('button', { name: 'Xác nhận' })
    await   expect(xacnhan).toBeVisible()
    await   page.getByPlaceholder('Nhập họ và tên').click()
    await   page.getByPlaceholder('Nhập họ và tên').fill('địa hải')
    await   xacnhan.click()
    await   expect(page.getByText('Thêm người liên hệ / phụ thuộ')).toBeVisible()
    const   edit= page.getByLabel('Thông tin gia đình người thâ').getByRole('button').first()
    const   xoa = page.getByLabel('Thông tin gia đình người thâ').getByRole('button').nth(1)
    await   expect(edit).toBeVisible()
    await   expect(page.getByRole('cell', { name: 'hải' })).toBeVisible()


    console.log(`${fgYellow} sửa thông tin người thân thành công`)
    await   edit.click()
    await   page.getByPlaceholder('Nhập số điện thoại').click()
    await   page.getByPlaceholder('Nhập số điện thoại').fill('0977681199')
    await   xacnhan.click()
    await   expect(page.getByText('Cập nhật người liên hệ / phụ')).toBeVisible()
    await   expect(page.getByRole('cell', { name: '0977681199' }).locator('div').first()).toBeVisible()

    console.log(`${fgYellow} xóa  thông tin người thân thành công`)
    await   xoa.click()
    await   expect(page.getByText('Xoá người liên hệ / phụ thuộc')).toBeVisible()
    await   xacnhan.click() 
    await   expect(page.getByText('Xoá người liên hệ / phụ thuộc thành công', { exact: true })).toBeVisible()


  }) 


test('Thong tin khac ',  async ({ page }) => {
    console.log(`${fgGreen} Thong tin khac`)
    console.log(`${fgYellow} Hiển thị thong tin khac `)
   

    const   edit_thongtinkhac = page.getByRole('button', { name: 'Thông tin khác' }).getByRole('button')
    await   expect(page.getByRole('button', { name: 'Thông tin khác' })).toBeVisible()
    await   expect(edit_thongtinkhac).toBeVisible()

    console.log(`${fgYellow} sua thong tin khac thanh cong `)
    await   edit_thongtinkhac.click()
    await   expect(page.getByPlaceholder('Nhập Google ID')).toBeVisible()
    await   page.getByPlaceholder('Nhập Google ID').clear()
    await   page.getByPlaceholder('Nhập Google ID').fill('123')
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Cập nhật thông tin cá nhân th')).toBeVisible()

  }) 

test('quy trinh gia nhap ',  async ({ page }) => {
    console.log(`${fgGreen} quy trinh gia nhap`)
    console.log(`${fgYellow} Hiển thị quy trinh gia nhap`)
    
    const   edit_quytrinhgianhap = page.getByRole('button', { name: 'Quy trình gia nhập' }).getByRole('button')
    await   expect(page.getByRole('button', { name: 'Quy trình gia nhập' })).toBeVisible()
    await   expect(edit_quytrinhgianhap).toBeVisible()

    console.log(`${fgYellow} sua quy trình gia nhập thanh cong `)
    await   edit_quytrinhgianhap.click()
    await   page.getByRole('button', { name: 'Xác nhận' }).click()
    await   expect(page.getByText('Cập nhật quy trình gia nhập')).toBeVisible()

  }) 