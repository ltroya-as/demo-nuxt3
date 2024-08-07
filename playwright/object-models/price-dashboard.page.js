import { expect } from '@playwright/test'
import { format, subYears } from 'date-fns'
import { closeCookieBar } from '~/playwright/utils/login.utils'

export class PriceDashboardPage {
  page
  locators = {
    chartBuilderContainer: undefined,
    unitsInfoModal: undefined,
    unitsMeasurementContainer: undefined,
    checkboxContainer: undefined,
    selectedDataSeriesQuantity: undefined,
    resetButton: undefined,
    nextButton: undefined,
    chartBuilderResetModal: undefined,
    openBuilderButton: undefined,
    addAnotherProductButton: undefined,
    drawerOverlay: undefined,
    summaryTable: undefined,
    summaryTableHeader: undefined,
    dataSeriesPill: undefined,
  }

  #unitsMeasurement = {
    price: 'Price',
    kwh: 'unit/kWh',
    payable: '% Payable',
  }

  constructor(page) {
    this.page = page
    this.locators.chartBuilderContainer = page.getByTestId(
      'chart-Builder-container',
    )
    this.locators.unitsInfoModal = page.locator('#units-step-description')
    this.locators.unitsMeasurementContainer = page.getByTestId(
      'units-measurement-container',
    )
    this.locators.checkboxContainer = page.getByTestId('checkbox-container')
    this.locators.selectedDataSeriesQuantity = page.getByTestId(
      'selected-data-series-quantity',
    )
    this.locators.resetButton = page.getByTestId('reset-button')
    this.locators.nextButton = page.getByTestId('next-button')
    this.locators.openBuilderButton = page.getByTestId('build-chart-button')
    this.locators.chartBuilderResetModal = page.getByTestId(
      'chartBuilderReset-modal',
    )
    this.locators.initialDate = page.getByTestId('chart-start-date-picker')
    this.locators.endDate = page.getByTestId('chart-end-date-picker')
    this.locators.oneYear = page.getByTestId('start-date').getByText('1 Year')
    this.locators.yearToDate = page.getByTestId('start-date').getByText('YTD')
    this.locators.allTime = page.getByTestId('start-date').getByText('All Time')
    this.locators.canvasChart = page.locator('canvas')
    this.locators.addAnotherProductButton = page.getByTestId(
      'add-another-product-button',
    )
    this.locators.drawerOverlay = page.getByTestId('drawer-overlay')
    this.locators.summaryTable = page.getByTestId('summary-table')
    this.locators.summaryTableHeader = this.locators.summaryTable.getByTestId(
      'summary-table-price-dashboard-header',
    )
    this.locators.dataSeriesPill =
      this.locators.summaryTable.getByTestId('data-series-pill')
  }

  static async prepare(p) {
    const page = new this(p)
    await page.page.goto('/market/price-dashboard/chart-builder/')
    await page.page.waitForSelector('[data-testid="price-dashboard"]')
    await closeCookieBar(page.page)

    return page
  }

  async testBasicFlow(selectDataSeries, executeReset = true) {
    const { selectedDataSeriesQuantity, nextButton, openBuilderButton } =
      this.locators

    await openBuilderButton.click()
    await this.hideUnitsInfoModal()
    await this.validateUnitsMeasurementContainer()
    await this.page.getByTestId('search').click()
    await expect(selectedDataSeriesQuantity).toHaveText('0')
    await selectDataSeries()
    expect(selectedDataSeriesQuantity).not.toHaveText('0')
    await nextButton.click()
    await this.page.waitForSelector('[data-testid="chart-container"]')
    await this.testSummaryTable()
    if (executeReset) {
      await openBuilderButton.click()
      await this.resetBuilder()
    }
  }

  testCloseActions = async () => {
    const { openBuilderButton, drawerOverlay } = this.locators

    await openBuilderButton.click()
    await this.hideUnitsInfoModal()
    await expect(drawerOverlay).toBeVisible()
    await this.page.getByTestId('close-icon').click()
    await expect(drawerOverlay).toBeHidden()
    await openBuilderButton.click()
    await expect(drawerOverlay).toBeVisible()
    await drawerOverlay.click()
    await expect(drawerOverlay).toBeHidden()
  }

  testSummaryTable = async ({ shouldShowPills = true } = {}) => {
    const { dataSeriesPill, summaryTableHeader, summaryTable } = this.locators

    await summaryTable.scrollIntoViewIfNeeded()
    await expect(summaryTable).toBeVisible()
    await expect(summaryTableHeader).toBeVisible()
    await expect(summaryTableHeader.getByText('Current')).toBeVisible()
    await expect(summaryTableHeader.getByText('Change')).toBeVisible()
    await expect(summaryTableHeader.getByText('YOY')).toBeVisible()
    await expect(summaryTableHeader.getByText('YTD')).toBeVisible()
    if (shouldShowPills) {
      expect(await dataSeriesPill.count()).toBeGreaterThan(0)
    } else {
      expect(await dataSeriesPill.count()).toBe(0)
    }
  }

  async resetBuilder() {
    const { resetButton, chartBuilderResetModal } = this.locators
    await expect(resetButton).toBeVisible()
    await resetButton.click()
    await expect(chartBuilderResetModal).toBeVisible()
    await chartBuilderResetModal
      .getByRole('button', { name: 'Keep editing' })
      .click()
    await expect(chartBuilderResetModal).not.toBeVisible()
    await resetButton.click()
    await expect(chartBuilderResetModal).toBeVisible()
    await chartBuilderResetModal
      .getByRole('button', { name: 'Reset builder' })
      .click()
    await expect(chartBuilderResetModal).not.toBeVisible()
  }

  validateUnitsMeasurementContainer = async () => {
    const { unitsMeasurementContainer } = this.locators
    await expect(unitsMeasurementContainer.getByText('Price')).toBeVisible()
    await expect(unitsMeasurementContainer.getByText('unit/kWh')).toBeVisible()
    await expect(unitsMeasurementContainer.getByText('% Payable')).toBeVisible()
  }

  validateCurrencyStepDefaultSelection = async () => {
    await expect(this.page.getByTestId('currency-step')).toBeVisible()
    await expect(this.page.getByLabel('USD')).toBeChecked()
  }

  validateUnitsStepDefaultSelection = async () => {
    await expect(this.page.getByTestId('unit-step')).toBeVisible()
    await expect(this.page.getByLabel('Tonne (t)')).toBeChecked()
  }

  validateUnitsStepLithiumIonDefaultSelection = async () => {
    await expect(this.page.getByTestId('unit-step')).toBeVisible()
    expect(
      await this.page
        .getByTestId('unit-radio-buttons')
        .locator('input')
        .count(),
    ).toBe(0)
    await expect(
      this.page.getByText('kWh (Lithium ion Batteries Selected)'),
    ).toBeVisible()
  }

  validateUnitsStepWithPayableSelection = async () => {
    await expect(this.page.getByTestId('unit-step')).toBeVisible()
    expect(
      await this.page
        .getByTestId('unit-radio-buttons')
        .locator('input')
        .count(),
    ).toBe(0)
    await expect(this.page.getByTestId('% Payable')).toBeVisible()
  }

  validateUnitPriceIndicatorIsSelected = async (unitName) => {
    const { unitsMeasurementContainer } = this.locators
    await expect(
      unitsMeasurementContainer
        .locator('div')
        .filter({ hasText: unitName })
        .getByTestId('icon-check'),
    ).toBeVisible()
  }

  async hideUnitsInfoModal() {
    const { unitsInfoModal } = this.locators
    await this.page.waitForTimeout(500)
    if (await unitsInfoModal.isVisible()) {
      await unitsInfoModal.getByText('Do not show this message again').click()
      await expect(unitsInfoModal).toBeHidden()
    }
  }

  async doneProduct() {
    const doneButton = await this.page.getByTestId('done-button')

    expect(doneButton).toBeVisible()

    await doneButton.click()
  }

  selectPriceDataSeries = async () => {
    const { checkboxContainer, nextButton } = this.locators
    await this.page.getByTestId('product-anode').click()
    await checkboxContainer.getByLabel('Natural Graphite Anode').check()
    await checkboxContainer
      .getByLabel('High (360-370 mAh/g), min 99.97% C')
      .check()
    await checkboxContainer.getByLabel('DDP China').check()

    await this.doneProduct()

    await nextButton.click()
    await this.validateCurrencyStepDefaultSelection()
    await nextButton.click()
    await this.validateUnitsStepDefaultSelection()
  }

  selectPayableDataSeries = async () => {
    const { checkboxContainer, nextButton } = this.locators
    await this.page.getByTestId('product-nickel').click()
    await checkboxContainer.getByLabel('Payable').check()
    await this.validateUnitPriceIndicatorIsSelected(
      this.#unitsMeasurement.payable,
    )
    await checkboxContainer.getByLabel('Mixed Hydroxide Precipitate').check()
    await checkboxContainer.getByLabel('Min 35%').check()
    await checkboxContainer.getByLabel('CIF Asia').check()
    await this.doneProduct()
    await nextButton.click()
    await this.validateUnitsStepWithPayableSelection()
  }

  selectKwhDataSeries = async () => {
    const { checkboxContainer, nextButton } = this.locators
    await this.page.getByTestId('product-lithium-ion-batteries').click()
    await checkboxContainer.getByLabel('LCO').check()
    await checkboxContainer.getByLabel('Pouch').check()
    await checkboxContainer.getByLabel('EXW Asia').check()
    await this.doneProduct()
    await nextButton.click()
    await this.validateCurrencyStepDefaultSelection()
    await nextButton.click()
    await this.validateUnitsStepLithiumIonDefaultSelection()
  }

  selectPricesAndPayablesDataSeries = async () => {
    const { page, locators } = this
    const { nextButton, checkboxContainer } = locators

    await page.getByTestId('product-lithium').click()
    await checkboxContainer.getByLabel('Select all').check()
    await checkboxContainer.getByLabel('6%').check()
    await checkboxContainer.getByLabel('Min 99.0%').check()
    await checkboxContainer.getByLabel('Min 99.2%').check()
    await checkboxContainer.getByLabel('Min 99.5%').check()
    await checkboxContainer
      .getByLabel('Benchmark Sustainable CIF Asia (spot)')
      .check()
    await checkboxContainer.getByLabel('CIF Asia (contract)').check()
    await checkboxContainer.getByLabel('CIF EU').check()
    await checkboxContainer.getByLabel('EXW China').check()
    await checkboxContainer.getByLabel('FOB S America').check()
    await this.validateUnitPriceIndicatorIsSelected(
      this.#unitsMeasurement.price,
    )
    await this.doneProduct()
    await page.getByTestId('add-another-product-button').click()
    await page.getByTestId('search').click()
    await expect(page.getByText('Lithium (selected)')).toBeVisible()
    await page.getByTestId('product-black-mass').click()
    await checkboxContainer.getByLabel('Payable').check()
    await checkboxContainer.getByLabel('LCO').check()
    await checkboxContainer.getByLabel('NCM').check()
    await checkboxContainer.getByLabel('Co', { exact: true }).check()
    await checkboxContainer.getByLabel('LCE').check()
    await checkboxContainer.getByLabel('NiSO4').check()
    await page.getByLabel('CIF Asia').check()
    await page.getByLabel('EXW North America').check()
    await page.getByLabel('EXW China').check()
    await page.getByLabel('EXW China').uncheck()
    await this.doneProduct()
    await nextButton.click()
    await this.validateCurrencyStepDefaultSelection()
    await nextButton.click()
    await expect(
      page.getByTestId('unit-radio-buttons').getByText('% Payable'),
    ).toBeVisible()
  }

  selectPricesAndKwhDataSeries = async () => {
    const { page, locators } = this
    const { nextButton, checkboxContainer } = locators

    await page.getByTestId('product-cobalt').click()
    await checkboxContainer.getByLabel('Fixed Price').check()
    await checkboxContainer.getByLabel('Cobalt Metal').check()
    await checkboxContainer.getByLabel('Cobalt Oxide').check()
    await checkboxContainer.getByLabel('Mixed Hydroxide Precipitate').check()
    await checkboxContainer.getByLabel('Min 72.8%').check()
    await checkboxContainer.getByLabel('Min 99.8%').check()
    await checkboxContainer.getByLabel('EXW China').check()
    await checkboxContainer.getByLabel('EXW Europe').check()
    await this.validateUnitPriceIndicatorIsSelected(
      this.#unitsMeasurement.price,
    )
    await this.doneProduct()

    await page.getByTestId('add-another-product-button').click()
    await page.getByTestId('search').click()
    await expect(page.getByText('Cobalt (selected)')).toBeVisible()

    await page.getByTestId('product-lithium-ion-batteries').click()
    await checkboxContainer.getByLabel('LFP').check()
    await checkboxContainer.getByLabel('NCM111').check()
    await checkboxContainer.getByLabel('NCM811').check()
    await checkboxContainer.getByLabel('Prismatic').check()
    await checkboxContainer.getByLabel('EXW Asia').check()
    await checkboxContainer.getByLabel('EXW China').check()
    await checkboxContainer.getByLabel('EXW North America').check()
    await this.validateUnitPriceIndicatorIsSelected(this.#unitsMeasurement.kwh)
    await this.doneProduct()

    await page.getByTestId('add-another-product-button').click()
    await page.getByTestId('search').click()
    await expect(
      page.getByText('Lithium ion Batteries (selected)'),
    ).toBeVisible()
    await page.getByTestId('remove-product').click()

    await nextButton.click()
    await nextButton.click()
    await expect(
      page.getByText('kWh (Lithium ion Batteries Selected)'),
    ).toBeVisible()
  }

  selectKwhAndPayablesDataSeries = async () => {
    const { page, locators } = this
    const { nextButton, checkboxContainer } = locators

    await page.getByTestId('product-lithium-ion-batteries').click()
    await checkboxContainer.getByLabel('NCA').check()
    await checkboxContainer.getByLabel('NCM111').check()
    await checkboxContainer.getByLabel('Cylindrical').check()
    await checkboxContainer.getByLabel('Prismatic').check()
    await checkboxContainer.getByLabel('EXW Asia').check()
    await checkboxContainer.getByLabel('EXW North America').check()
    await this.validateUnitPriceIndicatorIsSelected(this.#unitsMeasurement.kwh)
    await this.doneProduct()

    await page.getByTestId('add-another-product-button').click()
    await page.getByTestId('search').click()
    await page.getByTestId('product-cobalt').click()
    await checkboxContainer.getByLabel('Payable').check()
    await checkboxContainer.getByLabel('Mixed Hydroxide Precipitate').check()
    await checkboxContainer.getByLabel('Min 1%').check()
    await checkboxContainer.getByLabel('CIF Asia').check()
    await this.validateUnitPriceIndicatorIsSelected(
      this.#unitsMeasurement.payable,
    )

    await this.doneProduct()
    await page.getByTestId('add-another-product-button').click()
    await page.getByTestId('search').click()
    await expect(page.getByText('Lithium (Blocked)')).toBeVisible()
    await page.getByTestId('remove-product').click()

    await nextButton.click()
    await nextButton.click()
    await expect(
      page.getByText('kWh (Lithium ion Batteries Selected)'),
    ).toBeVisible()
    await expect(
      page.getByTestId('unit-radio-buttons').getByText('% Payable'),
    ).toBeVisible()
  }

  selectOneYear = async () => {
    const today = new Date()
    await this.locators.oneYear.click()
    await this.page.waitForTimeout(1000)
    await this.page.waitForSelector('[data-testid="chart-container"]')
    await expect(this.locators.oneYear).toHaveClass(/underline/)
    const oneYearAgo = subYears(today, 1)
    await expect(this.locators.initialDate).toHaveValue(
      format(oneYearAgo, 'MM/dd/yyyy'),
    )
    await expect(this.locators.endDate).toHaveValue(format(today, 'MM/dd/yyyy'))
  }

  selectYearToDate = async () => {
    const today = new Date()
    await this.locators.yearToDate.click()
    await this.page.waitForTimeout(1000)
    await this.page.waitForSelector('[data-testid="chart-container"]')
    await expect(this.locators.yearToDate).toHaveClass(/underline/)
    const yearStartDate = new Date(new Date().getFullYear(), 0, 1)
    await expect(this.locators.initialDate).toHaveValue(
      format(yearStartDate, 'MM/dd/yyyy'),
    )
    await expect(this.locators.endDate).toHaveValue(format(today, 'MM/dd/yyyy'))
  }

  selectAllTime = async () => {
    const today = new Date()
    await this.locators.allTime.click()
    await this.page.waitForTimeout(1000)
    await this.page.waitForSelector('[data-testid="chart-container"]')
    await expect(this.locators.allTime).toHaveClass(/underline/)
    await expect(this.locators.initialDate).toHaveValue('01/29/2016')
    await expect(this.locators.endDate).toHaveValue(format(today, 'MM/dd/yyyy'))
  }

  validateChart = async () => {
    this.locators.canvasChart.scrollIntoViewIfNeeded()
    await this.page.waitForSelector('[data-testid="chart-container"]')
    await expect(this.locators.canvasChart).toBeVisible()
    await this.page.waitForTimeout(500)
    this.locators.canvasChart.hover({ position: { x: 330, y: 250 } })
    await this.page.waitForTimeout(1000)
    expect(this.page.locator('#chartjs-tooltip')).toBeVisible()

    const tooltipBackgroundColor = await this.getBackgroundColor(
      '#chartjs-tooltip > table > tbody > tr > td > span',
    )
    const pillBackgroundColor = await this.getBackgroundColor(
      '.col-span-4 > .h-3',
    )

    expect(tooltipBackgroundColor).toBe(pillBackgroundColor)
  }

  getBackgroundColor = async (selector) => {
    const element = await this.page.locator(selector)
    return await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color')
    })
  }

  async testChartContainer() {
    await this.testBasicFlow(this.selectPriceDataSeries, false)
    await this.selectOneYear()
    await this.selectYearToDate()
    await this.selectAllTime()
    await this.validateChart()
  }
}
