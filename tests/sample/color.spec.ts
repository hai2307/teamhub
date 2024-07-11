import {test, expect} from "@playwright/test"

test("basic test", async ({page}) => {
    await page.goto("https://playwright.dev/docs/intro")
    const docsLink = page.locator("a >> text=Docs")
    const color = await docsLink.evaluate((e) => {
        return window.getComputedStyle(e).getPropertyValue("color")
    })
    console.log(color)
    expect(color).toBe("rgb(26, 126, 31)")
})