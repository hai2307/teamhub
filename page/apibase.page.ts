import { test, expect, APIRequestContext,request } from '@playwright/test';


const BASE_URL = 'https://api.ttloffice.com/api'; // Thay thế bằng URL thực tế của API
const LOGIN_ENDPOINT = '/login';
const OTHER_API_ENDPOINT = '/other-api';

test.describe('API Tests with Playwright', () => {
  let authToken: string;

  test('POST /login to get token', async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}${LOGIN_ENDPOINT}`, {
      data: {
        username: 'your-username', // Thay thế bằng tên người dùng thực tế
        password: 'your-password'  // Thay thế bằng mật khẩu thực tế
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Kiểm tra mã trạng thái HTTP
    expect(loginResponse.status()).toBe(200);

    // Lấy token từ phản hồi
    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty('token');
    authToken = loginData.token;

    console.log('Login Token:', authToken);
  });

  test('POST /other-api with token', async ({ request }) => {
    const otherApiResponse = await request.post(`${BASE_URL}${OTHER_API_ENDPOINT}`, {
      data: {
        key1: 'value1',
        key2: 'value2',
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    // Kiểm tra mã trạng thái HTTP
    expect(otherApiResponse.status()).toBe(200);

    // Kiểm tra nội dung phản hồi
    const responseData = await otherApiResponse.json();
    expect(responseData).toHaveProperty('expectedKey'); // Thay thế expectedKey bằng khóa thực tế mà bạn mong đợi

    console.log('Response from other API:', responseData);
  });
});




// Hàm để tạo chuỗi ngẫu nhiên
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}

let randomString = generateRandomString(5);
let randomString1 = generateRandomString(10);
let statusResponse: number
let callResponse: any
let name: any
let baseUrl = 'https://api.ttloffice.com/api/v1/setting/contract-type'
let Headers={"Accept":"application/json",
                        "tnid":"company-test",
                        "ptoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJsZXRoaWx5MjAwNDE5ODhAZ21haWwuY29tIiwiZW1haWwiOiJsZXRoaWx5MjAwNDE5ODhAZ21haWwuY29tIiwic2xhY2tJZCI6bnVsbCwiZ29vZ2xlVXNlcklkIjpudWxsLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoic3VwZXJ2aXNvciIsImRlc2NyaXB0aW9uIjoiVGhpcyBpcyBkZXNjcmlwdGlvbiBvZiBzdXBlcnZpc29yIHJvbGUhIiwicGVybWlzc2lvbnMiOlt7ImlkIjo0MiwiYWN0aW9uIjp7ImNvbnRlbnQiOiJjcmVhdGUifSwicmVzb3VyY2UiOnsiY29udGVudCI6InJlcXVlc3RfYXNzZXQifX1dfSwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MTYxNzM3MTIsImV4cCI6MTcxNjc3ODUxMn0.T9BI6bZP4SvlMzdvSw6ivTpkJcbKpb90VO9NtAqYu10",
                        "authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwQjVKbmEwM3B6UWxyU0VDbExhZDRZdDRDN2xScHZmcnFhX3VpeUdVQmJrIn0.eyJleHAiOjE3MTY3NzczMTMsImlhdCI6MTcxNjE3MzcxMSwiYXV0aF90aW1lIjoxNzE2MTcyNTEzLCJqdGkiOiI4ZWZmMGZjNS03YjllLTRkOWUtYWY3Yi0wZDFlMWZiYmM0ZWQiLCJpc3MiOiJodHRwczovL2lhbS1jZW50ZXIudGVhbWh1Yi52bi9yZWFsbXMvdG9reW90ZWNobGFiIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImVhODFmZjhjLTA1YjEtNDM0Yy1hMDNmLTUyMmFmNWM3ZTU1MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYi1hcHAiLCJub25jZSI6IjY5NzU2ZTMyLTg0MWUtNDJkMC04Njg3LTFkNTNlOTI0MzAzYSIsInNlc3Npb25fc3RhdGUiOiIzY2M3Y2M1NS1jNDhmLTQ2MWUtOTYwOS1jMGQ1NGRhZWFhMzUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXRva3lvdGVjaGxhYiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiIzY2M3Y2M1NS1jNDhmLTQ2MWUtOTYwOS1jMGQ1NGRhZWFhMzUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoibGV0aGlseTIwMDQxOTg4QGdtYWlsLmNvbSIsImVtYWlsIjoibGV0aGlseTIwMDQxOTg4QGdtYWlsLmNvbSJ9.ZhAi0FBDIheejTeM6MdMIqadw89A77iu2HzDMZTRNVCHqXRWyeTBpw-cG2feobhHOrgXr7qol6khqMP9QIEsqQptVu53xMlDlmZ0Zd4T8y7sXEXUy82_v0cNVrhE90aEpTijP6ag1thNclTxUhLN9BwPFzSzXysI5CgzjN1Eo22DdBriUbJt7qD9yvD4Won4Cp3hdMWQ5BgvXSQCY2-mZiAT53gzvUCVwxpL4dIFVkncin3FjFeNTfKj3lRVFNHYzWVkGo1Us-pD3Bd740Gjfd_jfSysfroVz-QQwZPfcNZJfCGYQzKi37kdTGLAfcwDAn_jdfd-yC4qaQFcY-OGHg"
                           }
        

let  body ={
  "name": "",
  "description": "",
  "expiredIn": null,
  "paidLeaveDays": "12"
}
  body.name= randomString
  body.description= randomString1
export class Phanloainhamsu {
  readonly reqContext: APIRequestContext ;
  readonly bodypost: object;
  readonly headerspost: object;
  readonly postResponse: object;
  readonly errorpost: Object;

constructor (request: APIRequestContext) {

    this.reqContext = request;   
    // this.bodypost = {
    //   "name":"kibo"
    //   }

    // this.postResponse = {
    //     "name": "Ben",
    //     "email": "ben123@email.com",
    //     "phone": "111-111-1111",
    //     "messageid": expect.any(Number),
    //     "subject": "I would like to book a room",
    //     "description": "This is a great message"
    //   }
    // this.errorpost = {
    //     "errorCode": 400,
    //     "error": "BAD_REQUEST"
    //   }
}
async createpost() {
  // const validationValues = ["1", "", "@bH1${randomString}" ,"    ", "123456789a123456789a123456789a123456789a123456789a" , ];
  // for (const validationValue of validationValues) {
     body.name = randomString;
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
   
  // }
    await test.step(`The location status is status`, async() => {
      expect(statusResponse,'Expected status').toBe(200)
      })
      // expect(callResponse).toHaveProperty('randomString');
    console.log(statusResponse);
    console.log(Headers);
    console.log(callResponse);
    await test.step('delete', async() => {
       expect(callResponse).toHaveProperty('id');
    const createdDataId = callResponse.data.id;

    // console.log('Created Data ID:', createdDataId);
      const response = await this.reqContext.delete(baseUrl, 
      {
      headers:Headers
      
      })
  
    //   statusResponse = response.status()
    //   callResponse = await response.json()
    //   })

  // await test.step('The location response body matches the expected body', async() => {
  //     expect.soft(await callResponse, 'The postLocation repsonse does not match the expected results').toEqual(returns)
      })

 } 
 async kitudacbiet() {
  // const validationValues = ["1", "", "@bH1${randomString}" ,"    ", "123456789a123456789a123456789a123456789a123456789a" , ];
  // for (const validationValue of validationValues) {
    body.name = "#$78*&"+randomString;
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(200)
      })
      console.log(callResponse);
 
 } 
 async kitu255() {
  // const validationValues = ["1", "", "@bH1${randomString}" ,"    ", "123456789a123456789a123456789a123456789a123456789a" , ];
  // for (const validationValue of validationValues) {
    const kitu255="a".repeat(255)
       body.name = kitu255;
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(401)
      })
      console.log(callResponse);
 
 } 
 async kitu2000() {
  // const validationValues = ["1", "", "@bH1${randomString}" ,"    ", "123456789a123456789a123456789a123456789a123456789a" , ];
  // for (const validationValue of validationValues) {
   const randomString=generateRandomString(2000)
       body.name = randomString;
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(401)
      })
      console.log(callResponse);
 
 } 
 async khongnhapkitu() {
       body.name = "";
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(401)
      })
      console.log(callResponse);
 
 } 
 async khoangtrang() {
  // const validationValues = ["1", "", "@bH1${randomString}" ,"    ", "123456789a123456789a123456789a123456789a123456789a" , ];
  // for (const validationValue of validationValues) {
  //  const randomString=generateRandomString(2000)
       body.name = "    ";
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(401)
      })
      console.log(callResponse);
 
 } 
 async khoangtrangdaucuoi() {
       body.name =" randomString ";
   await test.step('testvalidate', async() => {
    const response = await this.reqContext.post(baseUrl, 
    {
    data: body,
    headers:Headers
    })

    statusResponse = response.status()
    callResponse = await response.json()
    })
  // }
    await test.step(`kitudacbiet`, async() => {
      expect(statusResponse,'Expected status').toBe(401)
      })
      console.log(callResponse);
 
 } 

}


