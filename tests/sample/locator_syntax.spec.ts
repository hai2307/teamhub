import { test, expect } from '@playwright/test';
//  cho gia tri 1 bien vao fill
// const   tenmail = await page.locator('[class="address"]').textContent()
//     console.log(`${tenmail}`)
//     await   email.fill(`${tenmail}`)

//  locating element in playwright 

//  property 
// css
// xpath 
// lacator single element 

// - link/button 
// + await page.locator('locator').click()
// + await page.click('locator');

//- inputbox 
// + await page.locator('locator').fill('value')
// + await page.locator('locator').type('value')
// + await page.fill('locator','value')
// + await page.type('locator','value')

// locator munltiple web elements
// - const elements = await page.$$(locator)

// Built -in in locator.


// page.getByRole() to by explicit and implicit accessility attributes
// page.getBYText() to locator by texxt content
// page.getByLabel() to locator a form control by associated label's text.
// page.getByPlacehoder()  to locator an input by placehoder.
// page.getByAltText()  to locator an element . usally image , by its text alternative.
// page.getBytitle()   to locator an element by its title attibute.
// Page.getByTestid  to locator an element based on its data-testid attribute 

test('locator syntax',async({page})=>{
    await page.goto('https://tims.dev-tokyotechlab.com');
    //by tage name 
    await page.locator('input').click()

    //by id 
    page.locator('#email')

    // by class value
    page.locator('.inputSizeSmall')

    // by actribute 
    page.locator('[placeholder="Your email"]')

    // by class value full
    page.locator('[class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart css-162edyi"]')

    // combine different selectors
    page.locator('input[placeholder="Your email"][autocomplete]')

    // by xpath (not recommended)
    page.locator('//input[@id="email"]')

    // by parial text match
    page.locator(':text("New")')
    //by exact text match
    page.locator(':test-is("New user")')
  
// xpath ánh xạ qua các lớp 
    const   ten_LTS=page.locator('.input-setting-asset > .form-group > .position-relative > .el-input > .el-input__wrapper').first()

// xpath kết hợp giữa locator và web element 
    await   expect(page.locator('[class="position-relative w-100"]').getByText('TTL0021 - Lee')).toBeVisible()
// Locate in Shadow DOM
await page.locator('x-details', { hasText: 'Details' }).click();
//Filtering Locators
await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();
// Filter by not having text
// 5 in-stock items
await expect(page.getByRole('listitem').filter({ hasNotText: 'Out of stock' })).toHaveCount(5);
// Filter by child/descendant
await page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: 'Product 2' }) })
    .getByRole('button', { name: 'Add to cart' })
    .click();
  // khẳng định nó là duy nhất
await expect(page
      .getByRole('listitem')
      .filter({ has: page.getByRole('heading', { name: 'Product 2' }) }))
      .toHaveCount(1);
// Locator operators 
    const saveButton = page.getByRole('button', { name: 'Save' });
// ...
  const dialog = page.getByTestId('settings-dialog');
  await dialog.locator(saveButton).click();

// Matching two locators simultaneously
const button = page.getByRole('button').and(page.getByTitle('Subscribe'));


// Matching only visible elements
await page.locator('button').locator('visible=true').click();

// Count items in a list
await expect(page.getByRole('listitem')).toHaveCount(3);

// Assert all text in a list
await expect(page
  .getByRole('listitem'))
  .toHaveText(['apple', 'banana', 'orange']);

  // Get by nth item
  const banana = await page.getByRole('listitem').nth(1);

  // Chaining filters
  const rowLocator = page.getByRole('listitem');

  await rowLocator
    .filter({ hasText: 'Mary' })
    .filter({ has: page.getByRole('button', { name: 'Say goodbye' }) })
    .screenshot({ path: 'screenshot.png' });

// ################ kiểm tra không hiển thị ###########################
// Kiểm tra yếu tố có selector là '#non-existent-element' không hiển thị
await expect(page.locator('#non-existent-element')).not.toBeVisible()

// Kiểm tra input có selector là '#input-element' không có giá trị là 'example'
await expect(page.locator('#input-element')).not.toHaveValue('example');

// Kiểm tra nút có selector là '#submit-button' không được bật
await expect(page.locator('#submit-button')).not.toBeEnabled();

// Giả sử bạn muốn kiểm tra một biến hoặc một biểu thức nào đó có giá trị sai
let variable = null;
expect(variable).toBeFalsy();

// lấy text của locater 
// console.log(await variable.textContent());

});

// Một số kỹ thuật XPath thường dùng
// Dưới đây là một số kỹ thuật và cú pháp XPath hữu ích trong việc tìm kiếm các phần tử web:

//   //: Chọn nút hiện tại.
//   Tên thẻ: Tên thẻ của nút cụ thể.
//   @: Chọn thuộc tính.
//   Thuộc tính: Tên thuộc tính của nút.
//   Giá trị: Giá trị của thuộc tính.

//   Chọn phần tử theo id
//  *[@id="elementId"]

// Chọn phần tử dựa trên thuộc tính khác
//input[@name="username"]

// Chọn phần tử theo class
//*[@class="elementClass"]

// Chọn phần tử con thứ N
//ul/li[3]

// Chọn phần tử chứa văn bản cụ thể


//div[text()="Example Text"]

// Chọn phần tử chứa một đoạn văn bản
//div[contains(text(), "Example")]
//*[contains(@name,'btn')]

// Chọn phần tử dựa trên vị trí tương đối
//div[text()="Example"]/following-sibling::*[1]
//ul/li[2]/button

// Xác định theo phần tử cha
//form[@class='login-form']//input

// Xác định theo nhiều điều kiện:
//a[text()='Đăng ký' and @class='blog']
//input[@type='submit' and @name='btnLogin']
//div[@class="example" and contains(text(), "Example Text")]

// ######  XPath Axis Methods #############
// ancestor: Chọn tất cả các phần tử tổ tiên của phần tử hiện tại.
// //div[@id='currentElementId']/ancestor::*

// ancestor-or-self: Chọn tất cả các phần tử tổ tiên của phần tử hiện tại và chính phần tử đó.
// //div[@id='currentElementId']/ancestor-or-self::*

// child: Chọn tất cả các phần tử con trực tiếp của phần tử hiện tại.
// //div[@id='parentElementId']/child::*

// descendant: Chọn tất cả các phần tử con (không chỉ trực tiếp mà bao gồm cả các con cháu) của phần tử hiện tại.
// //div[@id='parentElementId']/descendant::*

// descendant-or-self: Chọn tất cả các phần tử con của phần tử hiện tại và chính phần tử đó.
// //div[@id='parentElementId']/descendant-or-self::*

// following: Chọn tất cả các phần tử nằm sau phần tử hiện tại trong cùng cấp của cây DOM.
// //div[@id='currentElementId']/following::*

// following-sibling: Chọn tất cả các phần tử anh em nằm sau phần tử hiện tại.
// //div[@id='currentElementId']/following-sibling::*

// preceding: Chọn tất cả các phần tử nằm trước phần tử hiện tại trong cùng cấp của cây DOM.
// //div[@id='currentElementId']/preceding::*

// preceding-sibling: Chọn tất cả các phần tử anh em nằm trước phần tử hiện tại.
// //div[@id='currentElementId']/preceding-sibling::*

// parent: Chọn phần tử cha của phần tử hiện tại.
// //div[@id='currentElementId']/parent::*

// self: Chọn chính phần tử hiện tại.
// //div[@id='currentElementId']/self::*
