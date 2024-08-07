import { chromium } from '@playwright/test'
import { USER_STATE } from '../enums/user-state.enum'
import { LoginUtils } from '../utils/login.utils'

async function globalSetup(config) {
  const { baseURL } = config.projects[0].use
  const browser = await chromium.launch()

  const normalLogin = {
    browser,
    baseURL,
    username: process.env.TESTING_NONE__USER,
    password: process.env.TESTING_NONE__PASS,
    fileName: USER_STATE.NONE_SUBSCRIPTION_ACTIVE,
  }

  const rcpLogin = {
    browser,
    baseURL,
    username: process.env.TESTING_RCP_ALL__USER,
    password: process.env.TESTING_RCP_ALL__PASS,
    fileName: USER_STATE.RCP_ALL,
  }

  await LoginUtils.saveState(normalLogin)
  await LoginUtils.saveState(rcpLogin)
  await browser.close()
}

export default globalSetup
