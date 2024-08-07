import path from 'path'
import { existsSync } from 'fs'
import { expect } from '@playwright/test'
import * as dotenv from 'dotenv'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config()
export class LoginUtils {
  static async saveState({ fileName, browser, password, username, baseURL }) {
    const pathState = this.getState(fileName)

    if (existsSync(pathState)) return

    const page = await browser.newPage()

    await page.goto(baseURL)
    await page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await page.waitForTimeout(2000)
    await page.getByTestId('signInDesktopBtn').click()
    await expect(page.getByTestId('signin-modal')).toBeVisible({
      timeout: 10000,
    })
    await page.getByLabel('Username or Email').fill(username)
    await page.getByLabel('Password').fill(password)
    await page.getByTestId('login').click()

    await expect(page.getByTestId('accountDesktopMenu')).toHaveText('Account', {
      timeout: 10000,
    })

    await closeCookieBar(page)

    await page.context().storageState({ path: pathState })
    await page.close()
  }

  static getState(fileName) {
    return path.join(__dirname, '..', 'states', fileName)
  }
}

export async function closeCookieBar(page) {
  await page.waitForTimeout(500)
  const cookiesBar = page.getByTestId('cookies-bar')
  if (await cookiesBar.isVisible()) {
    await cookiesBar.getByTestId('cookies-bar-accept-button').click()
    await cookiesBar.isHidden()
  }
}
