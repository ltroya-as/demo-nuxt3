import { test, expect } from '@playwright/test'
import { LoginPage } from '../object-models/login.page'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'

test.describe('Login forms', () => {
  test('page form fields validations', async ({ page }) => {
    const loginPage = await LoginPage.prepare(page)
    await loginPage.gotoLoginPage()
    await loginPage.testLoginForm()
  })
  test('modal form fields validations', async ({ page }) => {
    const loginPage = await LoginPage.prepare(page, 'modal')
    await loginPage.openModal()
    await loginPage.testLoginForm()
  })
})

test.describe('Login cookie check', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.NONE_SUBSCRIPTION_ACTIVE),
  })

  test('should exist the essential cookies', async ({ context }) => {
    const cookies = await context.cookies()

    const cookieNames = cookies.map((cookie) => cookie.name)

    expect(cookieNames).toContain('jwt_token')
    expect(cookieNames).toContain('refresh_token')
  })
})
