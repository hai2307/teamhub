import { test, expect } from '@playwright/test';
import { loginpage } from '../../page/loginpage';
import {enterText,selectRadioButton,checkCheckbox,uncheckCheckbox,selectDropdownValue,hoverToSeeTooltip,
  handleDialog,
  getTableCellText,
  selectDate,
  setSliderValue,
  dragDrop,
  clickElement,
  expectElementToBeVisible
} from '../../page/UI_interactions';
const email_login_locato = '#username'
// login theo POM  
test('login cd', async ({ page }) => {
  const Loginhrm = new loginpage(page)
  await Loginhrm.login()
  await Loginhrm.sidebar.click()
})
// login trực tiếp 
test('login 11cd', async ({ page }) => {
  await   page.goto('https://uyentest3.hrm.dev-tokyotechlab.com')
  await   page.getByPlaceholder('Nhập email').fill('nyrhqgeeg@emltmp.com')
  await   page.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
  await   page.locator('.v-btn__content').click()

})
// Login thoe function viết sẵn 
test('loginuicomponents',async({page})=>{
  await   page.goto('https://company-test.ttloffice.com')
  await enterText(page, email_login_locato, 'lethily20041988@gmail.com')
  await enterText(page, '#password', 'Ab@123456')
  await clickElement(page,'#kc-login')
  await expectElementToBeVisible(page,'[class="logo-wrapper"]')
})

