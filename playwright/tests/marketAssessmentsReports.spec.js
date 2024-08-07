import { test } from '@playwright/test'
import { SERVICES } from '../constants/market-assessments'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'
import { ReportsPage } from '~/playwright/object-models/reports.page'

test.describe('Market assessment report page as a RCP user', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  SERVICES.forEach(({ slug, title }) => {
    test(`should trigger download of a ${title} assessment report after clicking a report card`, async ({
      page,
    }) => {
      const reports = await ReportsPage.prepare(
        page,
        'market-assessments',
        slug,
      )

      await reports.reportDownload()
    })
  })
})
