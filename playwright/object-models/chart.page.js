import { expect } from '@playwright/test'

export class ChartPage {
  page

  constructor(page) {
    this.page = page
  }

  static async prepare(p) {
    const chart = new this(p)
    await chart.page.goto('/')

    return chart
  }

  static async createPriceAssessmentVisit(p, mineral) {
    const chart = await this.prepare(p)
    await chart.page.goto(`/price-assessments/${mineral}/chart/`)
    return chart
  }

  async validateDatePickerAreClickable() {
    await this.page.waitForSelector('[data-testid="chart-end-date-picker"]')
    const pickerSelectors = ['chart-start-date-picker', 'chart-end-date-picker']

    for (const pickerSelector of pickerSelectors) {
      const datePicker = this.page.getByTestId(pickerSelector)
      await datePicker.click()

      const leftArrow = this.page.locator('.vc-arrow.is-left').first()
      await leftArrow.click()
    }
  }

  async validateDownloadDropdownOptionsAreClickable(withExportPng = false) {
    await this.page.waitForSelector('[data-testid="chart-download-button"]')
    const downloadDropdown = this.page.getByTestId('chart-download-button')
    await this.page.waitForSelector('[data-testid="price-assessments-chart"]')
    await downloadDropdown.hover()
    const [downloadCSV] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByTestId('chart-download-csv-button').click(),
    ])
    expect(downloadCSV?.suggestedFilename()?.endsWith('.xlsx')).toBeTruthy()

    if (withExportPng) {
      await downloadDropdown.hover()
      const [downloadPNG] = await Promise.all([
        this.page.waitForEvent('download'),
        this.page.getByTestId('chart-download-png-button').click(),
      ])
      expect(downloadPNG?.suggestedFilename()?.endsWith('.png')).toBeTruthy()
    }
  }

  static async validChart(page, identWrapper, snapshotName) {
    const container = page.locator(`#${identWrapper}`)
    await page.waitForTimeout(1000)
    expect(
      await container.screenshot({ animations: 'disabled' }),
    ).toMatchSnapshot([`${snapshotName}.png`])
  }

  static async validTooltip(page, identWrapper, snapshotName, position) {
    const chartLocator = page.locator(`#${identWrapper}`)
    await chartLocator.click({ position: { x: 0, y: 0 } })
    await chartLocator.hover({ position })
    await page.waitForTimeout(1000)
    expect(
      await chartLocator.screenshot({ animations: 'disabled' }),
    ).toMatchSnapshot([`${snapshotName}-tooltip.png`])
  }
}
