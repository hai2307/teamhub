import { test, expect } from '@playwright/test';
import { Phanloainhamsu } from '../../page/apibase.page';




test('1',async ({ request }) => {
    
    const   post = new Phanloainhamsu(request);
    await   post.createpost()
    
})

test('phanloainhansu-kitudacbiet',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.kitudacbiet()
    
})
test('kitudacbiet',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.kitudacbiet()
    
})
test('kitu255',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.kitu255()
    
})

test('2000 ki tu',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.kitu2000()
    
})
test('khongnhapkitu',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.khongnhapkitu()
    
})

test('khoangtrang',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.khoangtrang()
    
})

test('khoangtrangdaucuoi',async ({ request }) => {    
    const   post = new Phanloainhamsu(request);
    await   post.khoangtrang()
    
})


// public async postMessage (body: any, returns: any, status: any){
//     let statusResponse: number
//     let callResponse: any

//     await test.step('I can post a location', async() => {
//         const response = await this.reqContext.post(`${ENV.BASE_URL}/message/`, {
//         'headers': {
//         'accept': 'application/json',
//         'Authorization': `Bearer ${process.env.AuthID}`,
//         'Content-Type': 'application/json-patch+json',
//         },
//         data: body
//         });

//         statusResponse = response.status()
//         callResponse = await response.json()
//         })

//     await test.step(`The location status is ${status}`, async() => {
//         expect(statusResponse,'Expected status').toBe(status)
//         })

//     await test.step('The location response body matches the expected body', async() => {
//         expect.soft(await callResponse, 'The postLocation repsonse does not match the expected results').toEqual(returns)
//         })

//     await test.step('Grab the Location & Calendar ID for future tests', async() => {

//         ENV.Name = callResponse.name

//     })