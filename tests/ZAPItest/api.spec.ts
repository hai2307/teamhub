import { request } from "https";

const { test, expect} = require('@playwright/test');
import  tags from '../../test-data/tags.json'




test.beforeEach(async ({page})=> {
  await page.route('https://conduit-api.bondaracademy.com/api/tags', async route =>{

    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })

  await page.goto("https://conduit.bondaracademy.com/");
})

test('has title 3', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});


test("get user", async ({request})  =>{
    const response= await request.get('https://reqres.in/api/users?page=2')
    console.log (await response.json())
    expect(response.status()).toBe(200)

})

// let data={"name":"pavan","job":"trainer" }

// test("create user post", async ({request})  =>{ 
  // const namehjhj = [
  //   { name: 'John Doe' },
  //   { name: '' },
  //   { name: ' 46554 ' },
  //   { name: '@###' },
  //   { name: 'hjhjaa' },
  //   { name: 'kaka12#A' },
  //   { name: '12121212122121212' },
  //   // ... thêm dữ liệu
  // ];


test("post api", async ({request})  =>{
    const postDataList = [
    { name: 'John Doe' },
    { name: '' },
    { name: ' 46554 ' },
    { name: '@###' },
    { name: 'hjhjaa' },
    { name: 'kaka12#A' },
    { name: '12121212122121212' },
    // ... thêm dữ liệu
  ];


    const item = {
      "firstname": "John",
      "lastname": "Britt Bat",
      "totalprice": 121,
      "depositpaid": true,
      "bookingdates": {
          "checkin": "2023-06-01",
          "checkout": "2023-06-15"
      },
      "additionalneeds": "Breakfast"
  }
  for (const postData of postDataList) {
    const url='https://reqres.in/api/users';
    
    const Headers={"Accept":"application/json"}
    
    const response= await request.post(url,
                        { 
                            data:JSON.stringify({postData,item}), 
                            headers:Headers

                        })
    console.log(await response.json())
    expect(response.status()).toBe(201)

    var res=await response.json()
  }
 })

test("update api", async ({request})  =>{
    
    const response= await request.put('https://reqres.in/api/users/+userid',
                        { 
                            data:{"name":"kuma","job":"engineer" },
                            headers:{"Accept":"application/json"}

                        });
                        console.log(await response.json())
                        expect(response.status()).toBe(200)
                    
})

test("delete", async ({request})  =>{
    const   response= await request.delete('https://reqres.in/api/users/+userid')
    expect(response.status()).toBe(204)

})


