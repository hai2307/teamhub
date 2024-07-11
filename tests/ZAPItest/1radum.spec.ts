import { test, expect } from '@playwright/test';

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

test('Test with random variable', async ({ request }) => {
    // Tạo chuỗi ngẫu nhiên
    const randomString = generateRandomString(10); // Chuỗi ngẫu nhiên dài 10 ký tự

    // In ra chuỗi ngẫu nhiên để kiểm tra
    console.log('Random String:', randomString);

    // Ví dụ gửi yêu cầu POST sử dụng chuỗi ngẫu nhiên
    const response = await request.post('https://example.com/api', {
        data: {
            key: randomString
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Kiểm tra phản hồi
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('key', randomString);
});
