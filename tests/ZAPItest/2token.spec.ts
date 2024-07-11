import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://api.hrm.dev-tokyotechlab.com/api/v1'; // Thay thế bằng URL thực tế của API
const LOGIN_ENDPOINT = 'ttlab-test-local';
const OTHER_API_ENDPOINT = '/other-api';

test.describe('API Tests with Playwright', () => {
  let authToken: string;

  test('POST /login to get token', async ({ request }) => {
    const loginResponse = await request.post(`https://api.hrm.dev-tokyotechlab.com/api/v1/realms/ttlab-test-local/protocol/openid-connect/token`, {
      data: {
        username: 'lylt@tokyotechlab.com', // Thay thế bằng tên người dùng thực tế
        password: 'Ab123456' ,// Thay thế bằng mật khẩu thực tế
        grant_type: 'password' , // Thay thế bằng mật khẩu thực tế
        client_id: 'hrm' , // Thay thế bằng mật khẩu thực tế
        client_secret: 'S9HOrGVaeYv8wbg6YCFKC14caVVAPlnT',  // Thay thế bằng mật khẩu thực tế
        scope: 'openid'  // Thay thế bằng mật khẩu thực tế
      },
      headers: {
        // 'Content-Type': 'application/json',
        'Tnid': 'tims',
      },
    });

    // Kiểm tra mã trạng thái HTTP
    expect(loginResponse.status()).toBe(200);

    // Lấy token từ phản hồi
    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty('access_token');
    authToken = loginData.access_token;

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
