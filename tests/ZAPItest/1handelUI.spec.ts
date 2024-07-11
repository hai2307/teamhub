import { test, expect } from '@playwright/test';

test(' Verify CRUD nhu cau tuyen dung' , async({page})=>{
    console.log(`${'\x1b[33m'} Verify CRUD  ho so ung vien`)
    const   quanlytuyendung = page.locator('div:nth-child(5)').first()
    await   quanlytuyendung.click()
    await   page.getByRole('link', { name: 'Hồ sơ ứng viên', exact: true }).click()
    await   page.getByRole('button').nth(2).click()

    // datepicker   
    const   calenderinputfield = page.getByPlaceholder('DD/MM/YYYY')
    await   calenderinputfield.click()
    let     date = new Date()
    date.setDate(date.getDate() + 7)
    const   expectDate = date.getDate().toString()
    const   expectMonthShort = date.toLocaleDateString('EN-VN',{month:'short'})
    const   expectMonthLong = date.toLocaleDateString('EN-VN',{month:'long'})
    const   expectedYear = date.getFullYear()
    const   dateToAssert = `${expectMonthShort} ${expectDate},${expectedYear}`

    let     calendarMonthandYear = await page.locator('').textContent()
    const   expectMonthandYear = `${expectMonthLong} ${expectedYear}`
    while(!calendarMonthandYear?.includes(expectMonthandYear)){
        await   page.locator('').click()
        calendarMonthandYear = await page.locator('').textContent()
    }

    
    await   page.locator('[class="el-picker-panel__content"]').locator('div').filter({ hasText: expectDate }).first().click()
    // await   expect(page.locator('.form-group>.position-relative>.el-input>.el-input__wrapper').getByText(expectDate)).toBeVisible()
    const   textcalendar = await calenderinputfield.textContent()
    console.log(textcalendar)
    await   expect(calenderinputfield).toHaveText(dateToAssert)
})
