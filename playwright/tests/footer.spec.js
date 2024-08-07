import { test, expect } from '@playwright/test'
test.describe('Footer', () => {
  test('Should show footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const link1 = footer.getByRole('link', { name: 'Join Team Benchmark' })
    const link2 = footer.getByRole('link', { name: 'Newsletter' })

    await expect(footer).toHaveCount(1)
    await expect(link1).toHaveCount(1)
    await expect(link2).toHaveCount(1)
    footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await footer.getByText('Contact Us').click()
    await expect(page.getByTestId('contact-modal')).toHaveCount(1)
  })
})
