import { BasePage } from '~/playwright/object-models/base.page'

export class ReportsPage {
  page

  constructor(page) {
    this.page = page
  }

  static async prepare(page, base, service) {
    const reports = new ReportsPage(page)
    await reports.page.goto(`${base}/${service}/reports/`)
    await reports.page.waitForSelector('[data-testid="report-card"]')

    return reports
  }

  async reportDownload() {
    const reportCard = await this.page.getByTestId('report-card').first()
    const reportDownloadButton = await reportCard.getByTestId(
      'report-downloader-button',
    )
    await BasePage.validDownload(this.page, reportDownloadButton)
  }
}
