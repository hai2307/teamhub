import { test, expect, chromium } from '@playwright/test'

test('myprofile', async({page})=>{

    await page.goto('https://company-test.org-console.iam-center.teamhub.vn')
    await chromium.launch({ headless: false })
    await expect(page.getByPlaceholder('Your email')).toBeVisible()
    await expect(page.locator('#kc-page-title')).toBeVisible()
    await expect(page.getByRole('button',{name:'Sign In'})).toBeVisible()

    await page.locator('#username').fill('lethily20041988@gmail.com')
    await page.locator('#password').fill('Ab@123456')
    await page.getByRole('button',{name:'Sign In'}).click()
    await expect(page.getByText('Quản lý vai trò')).toBeVisible()

    await page.locator('[role="button"]').click()
    await page.waitForTimeout(1000)
    // const ho_so = page.locator('[class="v-icon notranslate v-theme--light v-icon--size-default"]')
    // await ho_so.click()
    await page.getByText('Quản lý người dùng').click()

    // await page.waitForTimeout(10000)
    const  newuser = page.locator('[class="feature btn-create"]')
    await newuser.click()

    await page.getByPlaceholder('Nhập họ và tên').fill('lylyanna')
    await page.getByPlaceholder('Nhập email').fill('lylyanna@gamil.com')
    await page.getByPlaceholder('Nhập số điện thoại').fill('0977681199')
    //  await page.waitForTimeout(10000)
    const calendar=page.locator('[class="mdi-calendar-blank-outline mdi v-icon notranslate v-theme--light input-icon"]')
    await calendar.click()
    // await page.locator('[class="dp__cell_inner dp__cell_disabled"]').click()
    await page.locator('[class="dp__calendar_item"]').getByText('1',{exact:true}).click()
    // await expect(page.getByText('01-03-2024')).toBeEnabled()
    // await expect(calendar).toHaveValue('01-03-2024')
    // await page.waitForTimeout(10000)
})




   
 

//   const button=page.getByRole('button',{name:'sign In'});
//   await button.click();

//   await expect(page.getByRole('button',{name : 'Hôm nay'})).toBeVisible();

//   // create a locator
//   const getStarted = page.locator('text=Get Started');

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // Click the get started link.
//   await getStarted.click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });