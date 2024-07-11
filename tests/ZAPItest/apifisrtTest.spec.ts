import test , {expect} from "@playwright/test"
import { closeSync } from "fs"
let url=
test('get api', async ({request})=>{
    const response = await request.get ("https://reqres.in/api/users/1",{
                headers:{
                    accept:'application/json'
                }

    })  
    console.log(await response.json())
    // kiểm tra trạng thái phản hồi 
    expect(response.status()).toBe(200)
})

test('get api 1', async ({request})=>{
    const response = await request.get('https://restful-booker.herokuapp.com/booking',
        { params : {
            bookingid:'547'
        }
    })
    const response1: Body[] = await response.json()
    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
})

test('post', async({request})=>{
    const response = await request.post('https://restful-booker.herokuapp.com/booking',
        {
            headers:{"Content-Type":"application/json"},
        
           data:{
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
         })
    console.log("Response Body...." + await response.json());
    const responseBody = await response.json()
    await expect(response.status()).toBe(200);
    expect(responseBody.booking).toHaveProperty("firstname", "Jim")
    expect(responseBody.booking).toHaveProperty("lastname", "Brown")
    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

})

let token

test('Update', async ({ request }) => {

    // Create a Token to use in PUT request

    const response = await request.post(`https://restful-booker.herokuapp.com/auth`, {
        data: {
            "username": "admin",
            "password": "password123"
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    token = responseBody.token;
    console.log("New Token is: " + token);

    // PUT
    const updateRequest = await request.put(`https://restful-booker.herokuapp.com/booking/1`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`,
        },
        data: {
            "firstname": "Alex",
            "lastname": "Lee",
            "totalprice": 2000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-01-01",
                "checkout": "2023-03-15"
            },
            "additionalneeds": "Breakfast"
        }
    });
    console.log(await updateRequest.json());
    expect(updateRequest.ok()).toBeTruthy();
    expect(updateRequest.status()).toBe(200);
    const updatedResponseBody = await updateRequest.json()
    expect(updatedResponseBody).toHaveProperty("firstname", "Alex");
    expect(updatedResponseBody).toHaveProperty("lastname", "Lee");
    expect(updatedResponseBody).toHaveProperty("totalprice", 2000);
    expect(updatedResponseBody).toHaveProperty("depositpaid", true);
});