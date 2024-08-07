import { test } from '@playwright/test'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'
import { ReportsPage } from '~/playwright/object-models/reports.page'

const SERVICES = [
  'lithium',
  'cobalt',
  'nickel',
  'natural-graphite',
  'synthetic-graphite',
  'anode',
  'cathode',
  'lithium-ion-batteries',
  'black-mass',
  'rare-earths',
]
test.describe('Price assessments reports page as RCP user', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  SERVICES.forEach((service) => {
    const serviceName = service.replace('-', ' ')

    test(`should trigger download of a ${serviceName} report after clicking a report card`, async ({
      page,
    }) => {
      const reports = await ReportsPage.prepare(
        page,
        'price-assessments',
        service,
      )

      await reports.reportDownload()
    })
  })
})
