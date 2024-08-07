import fs from 'fs'
import { expect } from '@playwright/test'

export class BasePage {
  static async validDownload(page, locator) {
    const downloadPromise = page.waitForEvent('download', {
      timeout: 240000,
    })

    await locator.click()

    const download = await downloadPromise
    const suggestedFileName = download.suggestedFilename()
    const filePath = 'playwright/download/' + suggestedFileName

    await download.saveAs(filePath)
    await expect(fs.existsSync(filePath)).toBeTruthy()
    await download.delete()
  }
}
