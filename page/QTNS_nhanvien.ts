import { expect, type Locator, type Page } from '@playwright/test';
import { expectElementToBeVisible } from './UI_interactions';
import { loginpage } from './loginpage';

export class QTNS_nhanvien {
  readonly page: Page
  readonly QTNS:Locator
  readonly QTNS_nguoidung:Locator 
  readonly filed_nhaptukhoa: Locator
  readonly filed_chonphongban: Locator
  readonly filed_chonchucdanh: Locator
  readonly boloc: Locator
  readonly chontheosapsep: Locator
  readonly nguoidunghaotdong: Locator
  readonly chonnguoidung: Locator
  readonly avata: Locator
  readonly avata_active: Locator
// màn thông tin nguoi dung
  readonly thongtinhopdong: Locator
  readonly edit_thongtinchung: Locator
  readonly title_thongtinnguoidung: Locator
  readonly fullname: Locator
  readonly danghoatdong: Locator
  readonly manhanvien: Locator
  readonly email: Locator
  readonly ngaysinh: Locator
  readonly ngayvaolam: Locator
  readonly sodienthoai: Locator
  readonly gioitinh: Locator
  readonly  xacnhan: Locator
  readonly  search_nhap_tu_khoa: Locator
  readonly  kinhlup_timkiem: Locator

  constructor(page: Page) {
    this.page = page
    this.QTNS = page.locator('.logo-module > div:nth-child(2)')
    this.QTNS_nguoidung = page.getByRole('link', { name: 'Nhân viên', exact: true })
    this.filed_nhaptukhoa = page.getByPlaceholder('Nhập từ khoá')
    this.nguoidunghaotdong = page.locator('.user-status icon-status-active')
    this.avata = page.locator('#common-layout').getByRole('link')
    this.search_nhap_tu_khoa = page.getByPlaceholder('Nhập từ khoá')
    this.kinhlup_timkiem= page.locator('div').filter({ hasText: /^Chọn phòng banChọn chức danh$/ }).getByRole('img').first()
    this.avata_active = page.locator('.user-status icon-status-active>.avatar').first()
    // thong tin chung 
    this.thongtinhopdong = page.getByRole('button', { name: 'Thông tin hợp đồng' })
    this.edit_thongtinchung=page.locator('.el-button').first()
    this.title_thongtinnguoidung=page.getByRole('link', { name: 'Thông tin người dùng' })
    this.fullname=page.locator('//h3[@class="full-name-info"]')
    this.danghoatdong=page.locator('//span[@class="el-tag__content"]')
    this.manhanvien=page.getByText('Mã nhân viên:')
    this.email=page.getByText('Email:')
    this.ngaysinh=page.getByText('Ngày sinh:')
    this.ngayvaolam=page.getByText('Ngày vào làm:').first()
    this.sodienthoai=page.getByText('Số điện thoại:')
    this.gioitinh=page.getByText('Giới tính:')

    // popup sửa thông tin 
    this.xacnhan = page.locator('.save-btn')


  }

  async gotoQTNSnhanvien (){
    await this.QTNS.click() 
    await this.QTNS_nguoidung.click() 
    await expect(this.nguoidunghaotdong).toBeEnabled
  } 
   async editthongtinnhanvien (){
    await this.edit_thongtinchung.click() 
    await expect(this.xacnhan).toBeEnabled
  }

  async gotoQTNSthongtinnhanvien (){
    await this.search_nhap_tu_khoa.click()
    await this.search_nhap_tu_khoa.fill('thaont')
    await this.kinhlup_timkiem.click()
    await this.avata.click()
    expect(this.title_thongtinnguoidung).toBeVisible()
  }
  async checkhienthithongtinchung (){
    expect(this.fullname).toBeVisible()
    expect(this.danghoatdong).toBeVisible()
    expect(this.manhanvien).toBeVisible()
    expect(this.email).toBeVisible()
    expect(this.ngayvaolam).toBeVisible()
    expect(this.ngaysinh).toBeVisible()
    expect(this.sodienthoai).toBeVisible()
  }
  async gotopopupeditthongtinchung (){
    await this.edit_thongtinchung.click()
  }
 

}