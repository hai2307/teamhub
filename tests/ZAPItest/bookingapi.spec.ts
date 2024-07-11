 import  test , {expect} from "@playwright/test"
 
// var url = 'https://restful-booker.herokuapp.com';
// post
 

test('should be able to create a booking', async ({ request }) => {
    
        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        data: {
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
    });
    console.log("Response in JSON : ....." + await response.json());
    // expect(response.ok()).toBeTruthy();
    // expect(response.status()).toBe(200);
    // const responseBody = await response.json()
    // console.log("responseBody......" + responseBody.booking.firstname)
    // expect(responseBody.booking).toHaveProperty("firstname", "John");
    // expect(responseBody.booking).toHaveProperty("lastname", "Britt Bat");
    // expect(responseBody.booking).toHaveProperty("totalprice", 121);
    // expect(responseBody.booking).toHaveProperty("depositpaid", true);

  });

//   Get 
  test('parameters', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
        params: {
            firstname: "Susan",
            lastname: "Jackson"
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    console.log(await response.json())
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
  })

test('To update the booking details', async ({ request }) => {
    // PUT
    const updateRequest = await request.put('$https://restful-booker.herokuapp.com/booking/170', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        data: {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-01",
                "checkout": "2023-06-15"
            },
            "additionalneeds": "Breakfast"
        }
    });
    console.log("Response Body...." + await updateRequest.body());
    // await expect(updateRequest.ok()).toBeTruthy();
    await expect(updateRequest.status()).toBe(200);
    const updatedResponseBody = await updateRequest.json()
    expect(updatedResponseBody).toHaveProperty("firstname", "James");
    expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
    expect(updatedResponseBody).toHaveProperty("totalprice", 111);
    expect(updatedResponseBody).toHaveProperty("depositpaid", true);
})
  
// delete 
// test('To delete the booking details', async ({ request }) => {
//     const deleteRequest = await request.delete('/booking/1', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
//         }
//     });
//     expect(deleteRequest.status()).toEqual(201);
//     expect(deleteRequest.statusText()).toBe('Created');
// })