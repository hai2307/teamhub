import { test, expect, APIRequestContext } from '@playwright/test';

export class loginpage {
    readonly reqContext: object;
    readonly examplePost: object;
    readonly exampleResponse: object;
    readonly errorBlankName: object;
   
constructor (request: APIRequestContext) {

    this.reqContext = request;   
    this.examplePost = {
        "name": "Ben",
        "email": "ben123@email.com",
        "phone": "111-111-1111",
        "subject": "I would like to book a room",
        "description": "This is a great message"
      }
    this.exampleResponse = {
        "name": "Ben",
        "email": "ben123@email.com",
        "phone": "111-111-1111",
        "messageid": expect.any(Number),
        "subject": "I would like to book a room",
        "description": "This is a great message"
      }
    this.errorBlankName = {
        "errorCode": 400,
        "error": "BAD_REQUEST",
        "errorMessage": "error Message",
        "fieldErrors": [
          "Name may not be blank"
        ]
      }
    }
    async postapi({ request }) {
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
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json()
        console.log("responseBody......" + responseBody.booking.firstname)
        expect(responseBody.booking).toHaveProperty("firstname", "John");
        expect(responseBody.booking).toHaveProperty("lastname", "Britt Bat");
        expect(responseBody.booking).toHaveProperty("totalprice", 121);
        expect(responseBody.booking).toHaveProperty("depositpaid", true);
     
}
}