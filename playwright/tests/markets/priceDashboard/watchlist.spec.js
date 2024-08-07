import { test, expect } from '@playwright/test'
import { LoginUtils } from '@/playwright/utils/login.utils'
import { USER_STATE } from '@/playwright/enums/user-state.enum'
import { closeCookieBar } from '~/playwright/utils/login.utils'

const titleWatchlist = 'Test Watchlist e2e'

test.describe.configure({ mode: 'serial' })

test.use({
  storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
})

const doneProduct = async (page) => {
  const doneButton = await page.getByTestId('done-button')

  expect(doneButton).toBeVisible()

  await doneButton.click()
}

const path = '/market/price-dashboard/'
const watchlistPath = '/market/price-dashboard/watchlist/'

test('Should save the chart in Watchlists', async ({ page }) => {
  await page.goto(path)

  await page.evaluate(() => {
    localStorage.setItem('__do_not_show_units_of_measurement_message', 'true')
  })

  await page.waitForSelector('h1:has-text("Price Dashboard")', {
    timeout: 30000,
  })

  await closeCookieBar(page)

  const titleElement = await page.locator('h1', {
    hasText: 'Price Dashboard',
  })
  await expect(titleElement).toBeVisible()
  await expect(titleElement).toHaveCount(1)

  const buildChartButton = await page.locator('span', {
    hasText: 'Build Chart',
  })

  const asideContainer = await page.locator('aside')
  await expect(asideContainer).toBeVisible()

  await expect(buildChartButton).toBeVisible()
  await buildChartButton.click()

  const form = await page.locator('form:has(input[placeholder="Search..."])')
  await expect(form).toBeVisible()

  const searchInput = await form.locator('input[placeholder="Search..."]')

  await expect(searchInput).toBeVisible()
  await searchInput.fill('Lithium')

  const searchList = await form.locator('ul').first()
  await expect(searchList).toBeVisible()

  const searchItem = await searchList
    .locator('span', {
      hasText: /Lithium/,
    })
    .first()

  await expect(searchItem).toBeVisible()
  await searchItem.click()

  const categoriesSelectAll = await page
    .locator('label', {
      hasText: 'Select all',
    })
    .first()

  await expect(categoriesSelectAll).toBeVisible()
  await categoriesSelectAll.click()

  const puritiesContainer = await asideContainer
    .locator('div > h4:has-text("Purity")')
    .locator('../..')

  await expect(puritiesContainer).toBeVisible()

  const firstPurityLabelWithoutSelectAll = await puritiesContainer
    .locator('label', { hasNotText: 'Select all' })
    .first()

  await expect(firstPurityLabelWithoutSelectAll).toBeVisible()
  await firstPurityLabelWithoutSelectAll.click()

  const shippingRoutesContaienr = await asideContainer
    .locator('div > h4:has-text("Shipping Route")')
    .locator('../..')

  await expect(shippingRoutesContaienr).toBeVisible()

  const firstShippingRouteLabelWithoutSelectAll = await shippingRoutesContaienr
    .locator('label', { hasNotText: 'Select all' })
    .first()

  await expect(firstShippingRouteLabelWithoutSelectAll).toBeVisible()
  await firstShippingRouteLabelWithoutSelectAll.click()

  const nextButton = await asideContainer.locator(
    'button:has(div:has-text("Next"))',
  )

  doneProduct(page)

  await expect(nextButton).toBeVisible()
  await nextButton.click()

  await page.waitForTimeout(1000)

  await nextButton.click()

  await page.waitForTimeout(1000)

  const buildChartFormButton = await asideContainer.locator(
    'button:has(div:has-text("Build Chart"))',
  )

  await expect(buildChartFormButton).toBeVisible()
  await buildChartFormButton.click()

  await page.waitForTimeout(4000)

  const watchListButton = await page.locator('span', {
    hasText: 'Save to Watchlist',
  })

  await expect(watchListButton).toBeVisible()
  await watchListButton.click()

  const formWatchList = await page.locator('form.save-watchlist')

  await expect(formWatchList).toBeVisible()

  const inputName = await formWatchList.locator('input[name="name"]')

  await expect(inputName).toBeVisible()
  await inputName.fill(titleWatchlist)

  const saveButton = await formWatchList.locator(
    'button:has(div:has-text("Save to Watchlist"))',
  )

  await expect(saveButton).toBeVisible()
  await saveButton.click()

  await page.waitForSelector('span', {
    hasText: 'Saved to your Watchlist',
    timeout: 6000,
  })

  await page.waitForTimeout(2000)
})

test('Should render the created item in watchlist and filter with search input', async ({
  page,
}) => {
  await page.goto(watchlistPath)

  await page.waitForSelector('h1:has-text("Watchlist")')

  const containerPage = await page
    .locator('h1', {
      hasText: 'Watchlist',
    })
    .locator('..')

  await expect(containerPage).toBeVisible()

  const subTtitleElement = await containerPage.locator('span', {
    hasText: 'Here you can find a collection of the prices you have built.',
  })

  await expect(subTtitleElement).toBeVisible()

  const watchlistTableHeader = await containerPage
    .locator('div', {
      hasText: 'Date range',
    })
    .locator('..')

  const numberHeader = await watchlistTableHeader.locator('span', {
    hasText: 'Nº',
  })

  await expect(numberHeader).toBeVisible()

  const nameHeader = await watchlistTableHeader.locator('span', {
    hasText: 'Name',
  })

  await expect(nameHeader).toBeVisible()

  const actionsHeader = await watchlistTableHeader.locator(
    'div.xl\\:col-span-2',
    {
      hasText: 'Actions',
    },
  )

  await expect(actionsHeader).toBeVisible()

  const searchInput = await containerPage.locator(
    'input[placeholder="Search..."]',
  )

  await expect(searchInput).toBeVisible()
  await searchInput.fill(titleWatchlist)

  const watchListSpanItem = await containerPage
    .locator('span', {
      hasText: titleWatchlist,
    })
    .first()

  await expect(watchListSpanItem).toBeVisible()

  const watchlistRow = await watchListSpanItem.locator('../../..')

  const viewButton = await watchlistRow.locator(
    'button:has(div:has-text("View"))',
  )

  await expect(viewButton).toBeVisible()

  const lastButton = await watchlistRow.locator('button:last-child')

  await expect(lastButton).toBeVisible()
  await lastButton.click()

  const containerLastButton = await lastButton.locator('..')

  const editButton = await containerLastButton.locator('span', {
    hasText: 'Edit',
  })

  await expect(editButton).toBeVisible()

  const deleteButton = await containerLastButton.locator('span', {
    hasText: 'Delete',
  })

  await expect(deleteButton).toBeVisible()
})

test('Should go to view page when click in view button', async ({ page }) => {
  await page.goto(watchlistPath)

  await page.waitForSelector('h1:has-text("Watchlist")')

  const containerPage = await page
    .locator('h1', {
      hasText: 'Watchlist',
    })
    .locator('..')

  await expect(containerPage).toBeVisible()

  const watchListSpanItem = await containerPage
    .locator('span', {
      hasText: titleWatchlist,
    })
    .first()

  await expect(watchListSpanItem).toBeVisible()

  const watchlistRow = await watchListSpanItem.locator('../../..')

  const viewButton = await watchlistRow.locator(
    'button:has(div:has-text("View"))',
  )

  await expect(viewButton).toBeVisible()
  await viewButton.click()

  await page.waitForSelector(`h1:has-text("${titleWatchlist}")`)

  const url = page.url()

  await expect(url).toContain(watchlistPath)
})

test('Should go to edit page when click in edit button and show the chart builder open', async ({
  page,
}) => {
  await page.goto(watchlistPath)

  await page.waitForSelector('h1:has-text("Watchlist")')

  const containerPage = await page
    .locator('h1', {
      hasText: 'Watchlist',
    })
    .locator('..')

  await expect(containerPage).toBeVisible()

  const watchListSpanItem = await containerPage
    .locator('span', {
      hasText: titleWatchlist,
    })
    .first()

  await expect(watchListSpanItem).toBeVisible()

  const watchlistRow = await watchListSpanItem.locator('../../..')

  const lastButton = await watchlistRow.locator('button:last-child')

  await expect(lastButton).toBeVisible()
  await lastButton.click()

  const containerLastButton = await lastButton.locator('..')

  const editButton = await containerLastButton.locator('span', {
    hasText: 'Edit',
  })

  await expect(editButton).toBeVisible()
  await editButton.click()

  await page.waitForSelector(`h1:has-text("${titleWatchlist}")`)

  const currentUrl = page.url()

  await expect(currentUrl).toContain(watchlistPath)

  const url = new URL(currentUrl)

  const queryParam = url.searchParams.get('openBuilder')
  await expect(queryParam).toBe('true')

  const asideContainer = await page.locator(
    'aside:has(h1:has-text("Build price chart"))',
  )
  await expect(asideContainer).toBeVisible()
})

test('Should delete item when click in delete button', async ({ page }) => {
  await page.goto(watchlistPath)

  await page.waitForSelector('h1:has-text("Watchlist")')

  const containerPage = await page
    .locator('h1', {
      hasText: 'Watchlist',
    })
    .locator('..')

  await expect(containerPage).toBeVisible()

  const watchListSpanItem = await containerPage
    .locator('span', {
      hasText: titleWatchlist,
    })
    .first()

  await expect(watchListSpanItem).toBeVisible()

  const watchlistRow = await watchListSpanItem.locator('../../..')

  const lastButton = await watchlistRow.locator('button:last-child')

  await expect(lastButton).toBeVisible()
  await lastButton.click()

  const containerLastButton = await lastButton.locator('..')

  const deleteButton = await containerLastButton.locator('span', {
    hasText: 'Delete',
  })

  await expect(deleteButton).toBeVisible()
  await deleteButton.click()

  const deleteDialog = await containerPage.locator('div[role="dialog"]')

  await expect(deleteDialog).toBeVisible()

  const deleteChartButton = await deleteDialog.locator(
    'button:has(div:has-text("Delete Chart"))',
  )

  await expect(deleteChartButton).toBeVisible()
  await deleteChartButton.click()

  await page.waitForSelector('span', {
    hasText: 'Chart successfully deleted',
    timeout: 6000,
  })
})
