import pkg from '@sheet/core'
import { DateTime } from 'luxon'
import { format, parseISO } from 'date-fns'
import {
  ANODE,
  CATHODE,
  LITHIUM,
  NATURAL_GRAPHITE,
  SYNTHETIC_GRAPHITE,
  BLACK_MASS,
} from '~/constants/services/constants'
import { getPropertyOrCategoryByProperty } from '~/constants/services/products-and-purities'

// eslint-disable-next-line import/no-named-as-default-member
const { utils, write } = pkg
const fontStyleDefault = Object.freeze({ name: 'Arial', sz: 10 })

/**
 * Generate a cell object of type date for SheetJS.
 * @param {string|Date} value - Cell value.
 * @param options
 * @param {string} [format=yyyy-MM-dd] .
 */
const cellObjectDate = (value, options = {}, format = 'yyyy-MM-dd') => {
  const date =
    typeof value === 'string'
      ? DateTime.fromFormat(value, format)
      : DateTime.fromJSDate(value)
  return {
    f: `DATE(${date.year},${date.month},${date.day})`,
    z: 'dd mmm yyyy',
    s: {
      ...fontStyleDefault,
      ...options,
    },
  }
}

/**
 * Generate a cell object of type number for SheetJS.
 * @param {number} value - Cell value.
 * @param {string} [format=#,##0] .
 * @param {object} options
 */
const cellObjectNumber = (value, format = '#,##0', options = {}) => ({
  t: 'n',
  v: value,
  z: format,
  s: {
    ...fontStyleDefault,
    ...options,
  },
})

/**
 * Generate a cell object of type text with bold for SheetJS.
 * @param {string} value - Cell value.
 * @param options
 */
const cellObjectTextBold = (value, options = {}) => ({
  t: 's',
  v: value,
  s: {
    bold: true,
    ...fontStyleDefault,
    ...options,
  },
})

/**
 * Generate a cell object of type text for SheetJS.
 * @param {string} value - Cell value.
 * @param {object} options
 */
const cellObjectText = (value, options = {}) => ({
  t: 's',
  v: value,
  s: {
    ...fontStyleDefault,
    ...options,
  },
})

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isLithium = (category) => category === LITHIUM.category

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isAnode = (category) => category === ANODE.category

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isCathode = (category) => category === CATHODE.category

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isNaturalGraphite = (category) =>
  category === NATURAL_GRAPHITE.category

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isLithiumIonBatteries = (category) =>
  category === 'lithium-ion-batteries'

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isBlackMass = (category) => category === BLACK_MASS.category

/**
 * @param {string} category
 * @returns {boolean}
 */
export const isSyntheticGraphite = (category) =>
  category === SYNTHETIC_GRAPHITE.category

/**
 * @param {string} category
 * @returns {string}
 */
export const getPurityHeader = (category) => {
  let header = 'Purity'
  switch (category) {
    case BLACK_MASS.category:
      header = 'Product'
      break
    case 'lithium-ion-batteries':
      header = 'Format'
      break
  }
  return header
}

export const getPurityValue = (category, item) => {
  let purityValue = item.purity
  switch (category) {
    case BLACK_MASS.category:
      purityValue = item.product
      break
    case 'lithium-ion-batteries':
      purityValue = item.format
      break
  }
  return purityValue
}

/**
 * extracts the properties for the headers
 * @param {string} category - Category.
 * @param {PriceSeries} group - Price Grade.
 */
const extractHeaderProperties = (category, group) => {
  const groupKey = group.Product.ProductTypeName
  const regionName = group.RegionName
  const unitLabel = group.UnitMeasure === '%' ? 'Payable' : 'Price'
  const unit = group.UnitMeasure ? unitLabel : ''
  const currencyUnitMeasure =
    group.UnitMeasure === '%'
      ? group.UnitMeasure
      : `${group.Currency}/${group.UnitMeasure}`
  let productName = getPropertyOrCategoryByProperty(groupKey, 'name', 'alias')
  let formula = group.Product.ProductTypeName
  if (isLithium(category)) {
    productName = group.Product.ProductTypeName
    formula = getPropertyOrCategoryByProperty(groupKey, 'name', 'alias')
  }
  const onlyFormula = formula.includes('NiSO4') ? 'NiSO4' : formula
  let purity
  let size
  if (isAnode(category)) {
    const [_purity, _size] = group.Purity.split(',')
    const [_concentration, _onlyPurity] = _purity.split(' (')
    purity = _onlyPurity.replace(')', '')
    const cleanSize = _size.replace(', ', '').replace(')', '')
    size = `${_concentration.replace('(', '').trim()},${cleanSize}`
  } else if (isCathode(category)) {
    purity = group.Product.ProductTypeName
  } else {
    purity = group.Purity.replace('(', '').replace(')', '')
    size = group.Size
  }
  return {
    groupKey,
    regionName,
    productName,
    onlyFormula,
    purity,
    size,
    unit,
    currencyUnitMeasure,
  }
}

/**
 * extracts the properties for the headers
 * @param {string} category - Category.
 * @param {CategoryPrices} group - Price Grade.
 */
const extractHeaderPropertiesServicePro = (category, group) => {
  const groupKey = group.category ? group.category.name : group.feedstock.name
  const regionName = group.shippingRoute.name
  const unit = group.priceType.name === 'Payable' ? 'Payable' : 'Price'
  const currencyUnitMeasure = group.unit === 'Percentage' ? '%' : group.unit

  const isLithiumCategory = isLithium(category)
  const productName = isLithiumCategory
    ? groupKey
    : getPropertyOrCategoryByProperty(groupKey, 'name', 'alias')
  const formula = isLithiumCategory
    ? getPropertyOrCategoryByProperty(groupKey, 'name', 'alias')
    : groupKey
  const onlyFormula = formula.includes('NiSO4') ? 'NiSO4' : formula
  let purity = group.purity ? group.purity.name : ''
  let grade = group.grade || ''
  if (isAnode(category)) {
    grade += `${purity}`.trim()
  } else if (isCathode(category)) {
    purity = groupKey
  } else if (isNaturalGraphite(category)) {
    grade = group.meshSize ? group.meshSize.size : ''
  } else if (isBlackMass(category)) {
    purity = group.product.name
  }
  return {
    groupKey,
    regionName,
    productName,
    onlyFormula,
    purity,
    grade,
    unit,
    currencyUnitMeasure,
  }
}

/**
 * Generates the text for the Price Grade field
 * @param {string} category - Category.
 * @param {PriceSeries} group - Price Grade.
 * @return {string}
 */
const priceGradeGenerator = (category, group) => {
  const { purity, regionName, productName, onlyFormula, size, groupKey } =
    extractHeaderProperties(category, group)
  let complement = ''
  if (groupKey.includes(SYNTHETIC_GRAPHITE.name)) {
    complement = ` ${SYNTHETIC_GRAPHITE.name}`
  }
  let priceGradeText = 'Benchmark'
  switch (category) {
    case NATURAL_GRAPHITE.category:
      priceGradeText = `${priceGradeText} ${purity}, ${size} ${regionName}`
      break
    case SYNTHETIC_GRAPHITE.category:
      priceGradeText = `${priceGradeText} ${productName?.toLowerCase()} ${purity} ${regionName}`
      break
    case ANODE.category:
      priceGradeText = `${priceGradeText}${complement} ${size}, ${purity}`
      break
    case CATHODE.category:
      priceGradeText = `${priceGradeText} ${purity} ${regionName}`
      break
    default:
      priceGradeText = `${priceGradeText} ${productName?.toLowerCase()}, ${regionName}, ${onlyFormula} ${purity} ${size}`
      break
  }
  return priceGradeText.trim()
}

/**
 * Generates the text for the Price Grade field
 * @param {string} category - Category.
 * @param {CategoryPrices} seriesRow - Price Grade.
 * @return {string}
 */
const priceGradeGeneratorServicePro = (category, seriesRow) => {
  const { purity, regionName, productName, onlyFormula, grade, groupKey } =
    extractHeaderPropertiesServicePro(category, seriesRow)
  let complement = ''
  if (groupKey.includes(SYNTHETIC_GRAPHITE.name)) {
    complement = ` ${SYNTHETIC_GRAPHITE.name}`
  }
  let priceGradeText = 'Benchmark'
  switch (category) {
    case NATURAL_GRAPHITE.category:
      priceGradeText = `${priceGradeText} ${purity}, ${grade} ${regionName}`
      break
    case SYNTHETIC_GRAPHITE.category:
      priceGradeText = `${priceGradeText} ${productName?.toLowerCase()} ${purity} ${regionName}`
      break
    case ANODE.category:
      priceGradeText = `${priceGradeText}${complement} ${grade}, ${purity}`
      break
    case CATHODE.category:
      priceGradeText = `${priceGradeText} ${purity} ${regionName}`
      break
    default:
      priceGradeText = `${priceGradeText} ${productName?.toLowerCase()}, ${regionName}, ${onlyFormula} ${purity} ${grade}`
      break
  }
  return priceGradeText.trim()
}

/**
 * Generates the text for the purity field.
 * @param {string} category - anode.
 * @param {string} formula - No4s.
 * @param {string} purity - NCM111, 140-160 mAh/g.
 * @return {string}
 */
const purityTextGenerator = (category, formula, purity) => {
  const mineralReturnOnlyPurity = [
    NATURAL_GRAPHITE.category,
    SYNTHETIC_GRAPHITE.category,
    ANODE.category,
  ]
  if (mineralReturnOnlyPurity.includes(category)) {
    return purity
  } else if (isCathode(category)) {
    return purity.split(', ').pop()
  }
  return formula.concat(' ').concat(purity)
}

/**
 * Generate the object with the data from the headers with the structure of SheetJS
 * @param {string} category - Category.
 * @param {PriceSeries} group - Price Grade.
 */
const headersGenerator = (category, group) => {
  const { purity, regionName, groupKey, onlyFormula, currencyUnitMeasure } =
    extractHeaderProperties(category, group)
  const copySeries = [...group.Series]
  const firstDate = copySeries.shift().Date
  const lastDate = copySeries.length === 0 ? firstDate : copySeries.pop().Date
  const hideCurrency = groupKey === 'Mixed Hydroxide Precipitate'
  return [
    {
      A: cellObjectTextBold('Start Date', cellStylesTextCenter),
      B: cellObjectDate(firstDate, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold('End Date', cellStylesTextCenter),
      B: cellObjectDate(lastDate, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold(
        hideCurrency ? '' : 'Currency',
        cellStylesTextCenter,
      ),
      B: cellObjectText(hideCurrency ? '' : 'USD', cellStylesTextCenter),
    },
    {},
    {
      A: cellObjectTextBold('Price Grade', cellStylesTextCenter),
      B: {
        t: 's',
        v: priceGradeGenerator(category, group),
        s: {
          ...fontStyleDefault,
          ...cellStylesTextCenter,
        },
      },
    },
    {
      A: cellObjectTextBold('Shipping term', cellStylesTextCenter),
      B: cellObjectText(regionName, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold(getPurityHeader(category), cellStylesTextCenter),
      B: cellObjectText(
        purityTextGenerator(category, onlyFormula, purity),
        cellStylesTextCenter,
      ),
    },
    {
      A: cellObjectTextBold('Data source', cellStylesTextCenter),
      B: cellObjectText('Benchmark Mineral Intelligence', cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold('Unit', cellStylesTextCenter),
      B: cellObjectText(
        isBlackMass(category)
          ? currencyUnitMeasure
          : getPropertyOrCategoryByProperty(groupKey, 'name', 'unit'),
        cellStylesTextCenter,
      ),
    },
    {},
    {
      A: cellObjectTextBold('Date', cellStylesTitle),
      B: cellObjectTextBold('Low', cellStylesTitle),
      C: cellObjectTextBold('High', cellStylesTitle),
      D: cellObjectTextBold('Mid', cellStylesTitle),
      E: cellObjectTextBold('Month Average', cellStylesTitle),
    },
  ]
}

/**
 * Generate the object with the data from the headers with the structure of SheetJS
 * @param {string} category - Category.
 * @param {CategoryPrices} seriesRow - Price Grade.
 */
const headersGeneratorServicePro = (category, seriesRow) => {
  const { purity, regionName, onlyFormula, currencyUnitMeasure } =
    extractHeaderPropertiesServicePro(category, seriesRow)
  const copySeries = [...seriesRow.series]
  const firstDate = copySeries.shift().date
  const lastDate = copySeries.length === 0 ? firstDate : copySeries.pop().date
  const hideCurrency = currencyUnitMeasure === '%'
  return [
    {
      A: cellObjectTextBold('Start Date', cellStylesTextCenter),
      B: cellObjectDate(firstDate, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold('End Date', cellStylesTextCenter),
      B: cellObjectDate(lastDate, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold(
        hideCurrency ? '' : 'Currency',
        cellStylesTextCenter,
      ),
      B: cellObjectText(hideCurrency ? '' : 'USD', cellStylesTextCenter),
    },
    {},
    {
      A: cellObjectTextBold('Price Grade', cellStylesTextCenter),
      B: {
        t: 's',
        v: priceGradeGeneratorServicePro(category, seriesRow),
        s: {
          ...fontStyleDefault,
          ...cellStylesTextCenter,
        },
      },
    },
    {
      A: cellObjectTextBold('Shipping term', cellStylesTextCenter),
      B: cellObjectText(regionName, cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold(getPurityHeader(category), cellStylesTextCenter),
      B: cellObjectText(
        purityTextGenerator(category, onlyFormula, purity),
        cellStylesTextCenter,
      ),
    },
    {
      A: cellObjectTextBold('Data source', cellStylesTextCenter),
      B: cellObjectText('Benchmark Mineral Intelligence', cellStylesTextCenter),
    },
    {
      A: cellObjectTextBold('Unit', cellStylesTextCenter),
      B: cellObjectText(currencyUnitMeasure, cellStylesTextCenter),
    },
    {},
    {
      A: cellObjectTextBold('Date', cellStylesTitle),
      B: cellObjectTextBold('Low', cellStylesTitle),
      C: cellObjectTextBold('High', cellStylesTitle),
      D: cellObjectTextBold('Mid', cellStylesTitle),
      E: cellObjectTextBold('Month Average', cellStylesTitle),
    },
  ]
}

/** @typedef {import('./classes/pricing')} Series */
/**
 * Generates an array of objects with the price data of a
 * "Price Grade" with the structure expected by Sheetjs
 * @param {Series[]} series
 * @return {array}
 */
const generatePriceRows = (series) => {
  const lengthRow = 12
  let lastRows = lengthRow
  let rangeMonth = 0
  let monthAverageCellObject
  return series.map((item, index) => {
    const isLastItem = index + 1 === series.length
    const nextItem = isLastItem ? item : series[index + 1]
    const nextDate = nextItem.Date.substring(0, 7)
    const actualDate = item.Date.substring(0, 7)
    const isMonthAverage = isLastItem || nextDate !== actualDate

    if (isMonthAverage) {
      monthAverageCellObject = {
        f: `AVERAGE(D${lastRows}:D${lastRows + rangeMonth})`,
        z: '#,##0',
        s: {
          ...fontStyleDefault,
          ...cellStylesNormal,
        },
      }
      lastRows = lengthRow + index + 1
      rangeMonth = 0
    } else {
      rangeMonth += 1
      monthAverageCellObject = {
        s: cellStylesNormal,
      }
    }
    return {
      A: cellObjectDate(item.Date, cellStylesNormal),
      B: cellObjectNumber(item.PriceLow, '#,##0', cellStylesNormal),
      C: cellObjectNumber(item.PriceHigh, '#,##0', cellStylesNormal),
      D: cellObjectNumber(item.PriceMid, '#,##0', cellStylesNormal),
      E: monthAverageCellObject,
    }
  })
}

/** @typedef {import('./classes/pricing')} SeriesPrices
 *
 * Generates an array of objects with the price data of a
 * "Price Grade" with the structure expected by Sheetjs
 * @param {SeriesPrices[]} series
 * @return {array}
 */
const generatePriceRowsServicePro = (series) => {
  const lengthRow = 12
  let lastRows = lengthRow
  let rangeMonth = 0
  let monthAverageCellObject
  return series.map((item, index) => {
    const isLastItem = index + 1 === series.length
    const nextItem = isLastItem ? item : series[index + 1]
    const nextDate = nextItem.date.substring(0, 7)
    const actualDate = item.date.substring(0, 7)
    const isMonthAverage = isLastItem || nextDate !== actualDate

    if (isMonthAverage) {
      monthAverageCellObject = {
        f: `AVERAGE(D${lastRows}:D${lastRows + rangeMonth})`,
        z: '#,##0',
        s: {
          ...fontStyleDefault,
          ...cellStylesNormal,
        },
      }
      lastRows = lengthRow + index + 1
      rangeMonth = 0
    } else {
      rangeMonth += 1
      monthAverageCellObject = {
        s: cellStylesNormal,
      }
    }
    return {
      A: cellObjectDate(item.date, cellStylesNormal),
      B: cellObjectNumber(item.low, '#,##0', cellStylesNormal),
      C: cellObjectNumber(item.high, '#,##0', cellStylesNormal),
      D: cellObjectNumber(item.mid, '#,##0', cellStylesNormal),
      E: monthAverageCellObject,
    }
  })
}

/**
 * Generates the name of the sheet dynamically with the data of the "Price Grade" group,
 * selecting the product name, the region name, the size and the purity
 * @param {string} category - Category.
 * @param {PriceSeries} group - Price Grade.
 * @returns {string}
 */
const createNameSheet = (category, group) => {
  const { size, productName, regionName, purity, unit } =
    extractHeaderProperties(category, group)
  let sheetName
  if (isNaturalGraphite(category)) {
    sheetName = `${purity}, ${size} ${regionName}`
  } else if (isAnode(category)) {
    sheetName = `${size}, ${purity}`
  } else if (isCathode(category)) {
    sheetName = `${purity}, ${regionName}`
  } else if (isBlackMass(category)) {
    let property = getPropertyOrCategoryByProperty(productName, 'name', 'alias')
    // We replace those names to reduce the length of the sheet name because of the 31 characters limit
    property = property.replace(/Chemistries, EOL Scrap/g, '')
    property = property.replace(/Chemistries, Process Scrap/g, '')
    sheetName = `${property?.toString()} ${purity} - ${regionName}`
  } else {
    const property = getPropertyOrCategoryByProperty(
      productName,
      'name',
      'alias',
    )
    sheetName = `${property?.toString()} ${regionName}`
    if (size) {
      sheetName = sheetName.concat(` (${size.toLowerCase()})`)
    }
  }
  if (unit) {
    sheetName = sheetName.concat(` (${unit})`)
  }

  return sheetName.replaceAll('/', '').substring(0, 31)
}

/**
 * Generates the name of the sheet dynamically with the data of the "Price Grade" group,
 * selecting the product name, the region name, the size and the purity
 * @param {string} category - Category.
 * @param {CategoryPrices} seriesRow - Price Grade.
 * @returns {string}
 */
const createNameSheetServicePro = (category, seriesRow) => {
  const { grade, productName, regionName, purity, unit } =
    extractHeaderPropertiesServicePro(category, seriesRow)

  let sheetName
  if (isNaturalGraphite(category)) {
    sheetName = `${purity}, ${grade} ${regionName}`
  } else if (isAnode(category)) {
    sheetName = `${grade}, ${purity}`
  } else if (isCathode(category)) {
    sheetName = `${purity}, ${regionName}`
  } else if (isSyntheticGraphite(category)) {
    sheetName = `${productName}, ${purity} ${regionName}`
  } else if (isBlackMass(category)) {
    const property = getPropertyOrCategoryByProperty(
      productName,
      'name',
      'alias',
    )
    sheetName = `${property?.toString()} ${purity}-${regionName}`
  } else {
    const property = getPropertyOrCategoryByProperty(
      productName,
      'name',
      'alias',
    )
    sheetName = `${property?.toString()} ${regionName}`
    if (grade) {
      sheetName = sheetName.concat(` (${grade.toLowerCase()})`)
    }
  }
  if (unit) {
    sheetName = sheetName.concat(` (${unit})`)
  }

  return sheetName.replaceAll('/', '').substring(0, 31)
}

/**
 * Transforms the API response into an XLSX file
 * @param {string} category - Category.
 * @param {PricesResponse} rawData - API response data.
 * @param {string} name
 * @param firstDate
 * @param lastDate
 * @returns {Blob}
 */
export const objectToXlsxOneSheet = (
  category,
  rawData,
  name,
  firstDate,
  lastDate,
) => {
  const prices = getPriceDate(rawData)
  const workbook = createSheetForSections(
    prices,
    rawData,
    category,
    name,
    firstDate,
    lastDate,
  )
  return createBlobToWorkbook(workbook)
}

/**
 * Transforms the API response into an XLSX file
 * @param {string} category - Category.
 * @param {PricesResponse} rawData - API response data.
 * @returns {Blob}
 */
export const objectToXlsxInGroups = (category, rawData) => {
  const prices = getPriceDate(rawData)
  const pricesSorted = sortDataByProductTypeName(prices)
  const workbook = createSheetsForGroups(pricesSorted, rawData, category)
  return createBlobToWorkbook(workbook)
}

export const objectToXlsxInGroupsServicePro = (category, rawData) => {
  const prices = getPriceDateServicePRO(rawData)
  const workbook = createSheetsForGroupsServicePro(prices, rawData, category)
  return createBlobToWorkbook(workbook)
}

export const objectToXlsxInGroupsAllPrices = (data) => {
  const workbook = utils.book_new()

  Object.entries(data).forEach(([category, items]) => {
    const rows = items.flatMap(mapDataToRows)
    const format = getPropertyOrCategoryByProperty(
      category,
      'category',
      'format',
    )
    const sheetName = `Summary ${category}`

    const sheetData = [
      [
        'Date',
        'MeshSize',
        'Mineral',
        'PriceLow',
        'PriceHigh',
        'PriceMid',
        'PayableLow',
        'PayableHigh',
        'PayableMid',
        getPurityHeader(category),
        'ShippingRegion',
        isBlackMass(category) ? 'Feedstock' : 'Type',
      ],
      ...rows.map((row) => [
        cellObjectDate(row.date, cellStylesNormal),
        cellObjectText(row.meshSize, cellStylesNormal),
        cellObjectText(row.mineral, cellStylesNormal),
        cellObjectNumber(row.priceLow, format, cellStylesNormal),
        cellObjectNumber(row.priceHigh, format, cellStylesNormal),
        cellObjectNumber(row.priceMid, format, cellStylesNormal),
        cellObjectNumber(row.payableLow, format, cellStylesNormal),
        cellObjectNumber(row.payableHigh, format, cellStylesNormal),
        cellObjectNumber(row.payableMid, format, cellStylesNormal),
        cellObjectText(row.purity, cellStylesNormal),
        cellObjectText(row.shippingRegion, cellStylesNormal),
        cellObjectText(row.type, cellStylesNormal),
      ]),
    ]

    const summarySheet = utils.aoa_to_sheet(sheetData)
    summarySheet['!cols'] = [
      { wpx: 120 },
      { wpx: 80 },
      { wpx: 120 },
      { wpx: 80 },
      { wpx: 80 },
      { wpx: 80 },
      { wpx: 80 },
      { wpx: 80 },
      { wpx: 80 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 150 },
    ]

    utils.book_append_sheet(workbook, summarySheet, sheetName)
  })
  return createBlobToWorkbook(workbook)
}

/**
 * @param {PriceSeries[]} series - API response data.
 * @returns {PriceSeries[]}
 */
const sortDataByProductTypeName = (series) =>
  [...series].sort((a, b) => {
    const productTypeNameA = a.Product.ProductTypeName.toLowerCase()
    const productTypeNameB = b.Product.ProductTypeName.toLowerCase()
    if (productTypeNameA < productTypeNameB) {
      return -1
    }
    if (productTypeNameA > productTypeNameB) {
      return 1
    }
    // names must be equal
    return 0
  })

/**
 * @param {PricesResponse} rawData - API response data.
 * @returns {PriceSeries[]}
 */
const getPriceDate = (rawData) => {
  const getSeries = (row) => {
    const series = row.series.map((s) => ({
      Date: s.date,
      PriceHigh: s.valueHigh || 0,
      PriceLow: s.valueLow || 0,
      PriceMid: s.valueMid || 0,
    }))
    return { ...row, Series: series }
  }

  const prices = []

  if (rawData.y1) {
    rawData.y1.data = rawData.y1?.data?.map(getSeries) ?? []
    prices.push(...rawData.y1.data)
  }
  if (rawData.y2) {
    rawData.y2.data = rawData.y2?.data?.map(getSeries) ?? []
    prices.push(...rawData.y2.data)
  }
  return prices
}

/**
 * @param {object} rawData - API response data.
 * @returns {CategoryPrices[]}
 */
const getPriceDateServicePRO = (rawData) => {
  try {
    const payable =
      rawData.y2?.data?.map((row) => {
        const series = row.series
          .map((s) => ({
            date: s.date,
            high: s.valueHigh,
            low: s.valueLow,
            mid: s.valueMid,
          }))
          .sort(sortDate)
        return {
          ...row,
          series,
          unit: rawData.y2.unitOfMeasure.name,
        }
      }) ?? []
    const prices =
      rawData.y1?.data?.map((row) => {
        const series = row.series
          .map((s) => ({
            date: s.date,
            high: s.valueHigh,
            low: s.valueLow,
            mid: s.valueMid,
          }))
          .sort(sortDate)
        return { ...row, series, unit: rawData.y1.unitOfMeasure.name }
      }) ?? []
    return [...prices, ...payable].sort((before, after) => {
      const categoryNameBefore = before.seriesTitle.toLowerCase()
      const categoryNameAfter = after.seriesTitle.toLowerCase()
      if (categoryNameBefore < categoryNameAfter) {
        return -1
      }
      if (categoryNameBefore > categoryNameAfter) {
        return 1
      }
      return 0
    })
  } catch (e) {
    return []
  }
}

const createNewSheet = (jsonData) =>
  utils.json_to_sheet(jsonData, {
    skipHeader: true,
  })

const createBlobToWorkbook = (workbook) => {
  return new Blob([
    write(workbook, { type: 'array', bookType: 'xlsx', cellStyles: true }),
  ])
}

/**
 *
 * @param {PriceSeries[]} pricesData
 * @param {PricesResponse} rawData - API response data.
 * @param {string} category
 */
const createSheetsForGroups = (pricesData, rawData, category) => {
  const workbook = utils.book_new()
  addSummary(workbook, rawData, category)
  pricesData.forEach((priceGrade) => {
    /* Generates the objects with the information from rows 1 to 9 */
    const xlsxJSONData = headersGenerator(category, priceGrade)
    /* Generates the objects with the price information */
    xlsxJSONData.push(...generatePriceRows(priceGrade.Series))
    /* Generate sheet names dynamically */
    const sheetName = createNameSheet(category, priceGrade)
    /* Transforms the created object into an Excel sheet */
    const newSheet = createNewSheet(xlsxJSONData)

    /* Change the height of the rows */
    newSheet['!rows'] = new Array(xlsxJSONData.length)
      .fill(null)
      .map((_, index) => ({ hpt: index === 10 ? 30 : 20 }))
    /* Change the width of the columns */
    newSheet['!cols'] = [
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
    ]
    newSheet['!gridlines'] = false
    /* Add the created sheet to the Excel workbook */
    utils.book_append_sheet(workbook, newSheet, sheetName)
  })
  return workbook
}

/**
 * @typedef {import('./classes/pricing')} Series
 *
 * @param {CategoryPrices[]} pricesData
 * @param {object} rawData - API response data.
 * @param {string} category
 */
const createSheetsForGroupsServicePro = (pricesData, rawData, category) => {
  const workbook = utils.book_new()
  addSummaryServicePro(workbook, rawData, category)
  pricesData.forEach((_item) => {
    /* Generates the objects with the information from rows 1 to 9 */
    const xlsxJSONData = headersGeneratorServicePro(category, _item)
    /* Generates the objects with the price information */
    const series = generatePriceRowsServicePro(_item.series)
    xlsxJSONData.push(...series)
    /* Generate sheet names dynamically */
    const sheetName = createNameSheetServicePro(category, _item)
    /* Transforms the created object into an Excel sheet */
    const newSheet = createNewSheet(xlsxJSONData)

    /* Change the height of the rows */
    newSheet['!rows'] = new Array(xlsxJSONData.length)
      .fill(null)
      .map((_, index) => ({ hpt: index === 10 ? 30 : 20 }))
    /* Change the width of the columns */
    newSheet['!cols'] = [
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
    ]
    newSheet['!gridlines'] = false
    /* Add the created sheet to the Excel workbook */
    utils.book_append_sheet(workbook, newSheet, sheetName)
  })
  return workbook
}

/**
 *
 * @param {PriceSeries[]} pricesData
 * @param {PricesResponse} rawData - API response data.
 * @param {string} category
 * @param {string} name
 * @param {string|Date} firstDate
 * @param {string|Date} lastDate
 */
const createSheetForSections = (
  pricesData,
  rawData,
  category,
  name,
  firstDate,
  lastDate,
) => {
  const workbook = utils.book_new()
  const workbookWithSummary = addSummaryServicePro(workbook, rawData, category)
  const categories = getCategories(pricesData, category)
  const dataSheet = getRowsWithValues(
    firstDate,
    lastDate,
    pricesData,
    category,
    categories,
  )
  const worksheet = createNewSheet(dataSheet)
  /* Change the height of the rows */
  worksheet['!rows'] = new Array(dataSheet.length)
    .fill(null)
    .map(() => ({ hpt: 20 }))
  /* Change the width of the columns */

  const cols = categories?.Unit || []
  worksheet['!cols'] = [
    { wpx: 120 },
    ...cols.map((_, index) => {
      return { wpx: index % 2 === 0 ? 200 : 80 }
    }),
  ]
  worksheet['!gridlines'] = false
  utils.book_append_sheet(workbookWithSummary, worksheet, name)
  return workbookWithSummary
}

const cellStylesNormal = {
  alignment: { wrapText: false },
}

const cellStylesTextCenter = {
  alignment: { wrapText: false, horizontal: 'left', vertical: 'center' },
}
const cellStylesLineBottom = {
  alignment: { wrapText: false, horizontal: 'center', vertical: 'center' },
  bottom: { style: 'thin', color: { rgb: 0x000000 } },
}

const cellStylesTitle = {
  alignment: { wrapText: false, horizontal: 'center', vertical: 'center' },
  bottom: { style: 'thin', color: { rgb: 0x000000 } },
  left: { style: 'thin', color: { rgb: 0x000000 } },
  right: { style: 'thin', color: { rgb: 0x000000 } },
  top: { style: 'thin', color: { rgb: 0x000000 } },
}

const getRowsWithValues = (
  firstDate,
  lastDate,
  prices,
  category,
  categories,
) => {
  const dates = getDates(prices)
  const values = getValues(prices, dates, category)
  const rowsDate = dates?.map((_date) => {
    const data = []
    Object.values(values[_date])?.forEach((_item) => {
      data.push(_item[0] ?? { s: cellStylesNormal })
      data.push({ s: cellStylesNormal })
    })
    return [cellObjectDate(_date, cellStylesNormal), ...data]
  })
  return [
    [
      cellObjectTextBold('Start Date', cellStylesTextCenter),
      cellObjectDate(new Date(firstDate), cellStylesTextCenter),
    ],
    [
      cellObjectTextBold('End Date', cellStylesTextCenter),
      cellObjectDate(new Date(lastDate), cellStylesTextCenter),
    ],
    [
      cellObjectTextBold('Currency', cellStylesTextCenter),
      cellObjectText('USD', cellStylesTextCenter),
    ],
    [],
    [
      cellObjectTextBold('Price Grade', cellStylesTextCenter),
      ...categories['Price Grade'],
    ],
    [
      cellObjectTextBold('Shipping term', cellStylesTextCenter),
      ...categories['Shipping term'],
    ],
    [
      cellObjectTextBold(getPurityHeader(category), cellStylesTextCenter),
      ...categories.Purity,
    ],
    [
      cellObjectTextBold('Data source', cellStylesTextCenter),
      ...categories['Data source'],
    ],
    [
      cellObjectTextBold(
        isBlackMass(category) ? 'Feedstock' : 'Unit',
        cellStylesTextCenter,
      ),
      ...categories.Unit,
    ],
    [cellObjectTextBold('Date', cellStylesTextCenter)],
    ...rowsDate,
  ]
}

const getDates = (_prices) =>
  [
    ...new Set(
      _prices
        ?.map((_price) => _price.Series?.map((_item) => _item.Date).flat())
        ?.flat(),
    ),
  ]?.sort((a, b) => new Date(a) - new Date(b))

const addSummary = (workbook, prices, category) => {
  const values = getValuesForSummary(prices)
  const format = getPropertyOrCategoryByProperty(category, 'category', 'format')
  const rows = []

  Object.keys(values)?.forEach((_items) => {
    values[_items]?.sort(sortDate)?.forEach((_item) => {
      rows.push([
        cellObjectDate(_item.date, cellStylesNormal),
        cellObjectText(_item.meshSize, cellStylesNormal),
        cellObjectText(_item.mineral, cellStylesNormal),
        cellObjectNumber(_item.priceLow, format, cellStylesNormal),
        cellObjectNumber(_item.priceHigh, format, cellStylesNormal),
        cellObjectNumber(_item.priceMid, format, cellStylesNormal),
        cellObjectNumber(_item.payableLow, format, cellStylesNormal),
        cellObjectNumber(_item.payableHigh, format, cellStylesNormal),
        cellObjectNumber(_item.payableMid, format, cellStylesNormal),
        cellObjectText(_item.purity, cellStylesNormal),
        cellObjectText(_item.shippingRegion, cellStylesNormal),
        cellObjectText(_item.type, cellStylesNormal),
      ])
    })
  })
  const summarySheet = createNewSheet([
    [
      cellObjectTextBold('Date', cellStylesLineBottom),
      cellObjectTextBold('MeshSize', cellStylesLineBottom),
      cellObjectTextBold('Mineral', cellStylesLineBottom),
      cellObjectTextBold('PriceLow', cellStylesLineBottom),
      cellObjectTextBold('PriceHigh', cellStylesLineBottom),
      cellObjectTextBold('PriceMid', cellStylesLineBottom),
      cellObjectTextBold('PayableLow', cellStylesLineBottom),
      cellObjectTextBold('PayableHigh', cellStylesLineBottom),
      cellObjectTextBold('PayableMid', cellStylesLineBottom),
      cellObjectTextBold(getPurityHeader(category), cellStylesLineBottom),
      cellObjectTextBold('ShippingRegion', cellStylesLineBottom),
      cellObjectTextBold(
        isBlackMass(category) ? 'Feedstock' : 'Type',
        cellStylesLineBottom,
      ),
    ],
    ...rows,
  ])
  /* Change the height of the rows */
  summarySheet['!rows'] = new Array(
    Object.values(values)[0]?.length * Object.keys(values)?.length + 1,
  )
    .fill(null)
    .map((_, index) => ({ hpt: index === 0 ? 30 : 22 }))

  /* Change the width of the columns */
  summarySheet['!cols'] = [
    { wpx: 120 },
    { wpx: 80 },
    { wpx: 120 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 100 },
    { wpx: 150 },
    { wpx: 150 },
  ]

  utils.book_append_sheet(workbook, summarySheet, 'Summary')
  return workbook
}

const addSummaryServicePro = (workbook, prices, category) => {
  const values = getValuesForSummaryServicePro(prices)
  const format = getPropertyOrCategoryByProperty(category, 'category', 'format')
  const rows = []

  Object.keys(values)?.forEach((_items) => {
    values[_items]?.sort(sortDate)?.forEach((_item) => {
      rows.push([
        cellObjectDate(_item.date, cellStylesNormal),
        cellObjectText(
          isNaturalGraphite(category) ? _item.meshSize : _item.grade,
          cellStylesNormal,
        ),
        cellObjectText(_item.mineral, cellStylesNormal),
        cellObjectNumber(_item.priceLow, format, cellStylesNormal),
        cellObjectNumber(_item.priceHigh, format, cellStylesNormal),
        cellObjectNumber(_item.priceMid, format, cellStylesNormal),
        cellObjectNumber(_item.payableLow, format, cellStylesNormal),
        cellObjectNumber(_item.payableHigh, format, cellStylesNormal),
        cellObjectNumber(_item.payableMid, format, cellStylesNormal),
        cellObjectText(getPurityValue(category, _item), cellStylesNormal),
        cellObjectText(_item.shippingRegion, cellStylesNormal),
        cellObjectText(
          isBlackMass(category) ? _item.feedstock : _item.type,
          cellStylesNormal,
        ),
      ])
    })
  })
  const summarySheet = createNewSheet([
    [
      cellObjectTextBold('Date', cellStylesLineBottom),
      cellObjectTextBold(
        isNaturalGraphite(category) ? 'Mesh Size' : 'Grade',
        cellStylesLineBottom,
      ),
      cellObjectTextBold('Mineral', cellStylesLineBottom),
      cellObjectTextBold('Price Low', cellStylesLineBottom),
      cellObjectTextBold('Price High', cellStylesLineBottom),
      cellObjectTextBold('Price Mid', cellStylesLineBottom),
      cellObjectTextBold('Payable Low', cellStylesLineBottom),
      cellObjectTextBold('Payable High', cellStylesLineBottom),
      cellObjectTextBold('Payable Mid', cellStylesLineBottom),
      cellObjectTextBold(getPurityHeader(category), cellStylesLineBottom),
      cellObjectTextBold('Shipping Route', cellStylesLineBottom),
      cellObjectTextBold(
        isBlackMass(category) ? 'Feedstock' : 'Type',
        cellStylesLineBottom,
      ),
    ],
    ...rows,
  ])
  /* Change the height of the rows */
  summarySheet['!rows'] = new Array(rows?.length + 1)
    .fill(null)
    .map((_, index) => ({ hpt: index === 0 ? 30 : 22 }))

  /* Change the width of the columns */
  summarySheet['!cols'] = [
    { wpx: 120 },
    { wpx: 80 },
    { wpx: 120 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 80 },
    { wpx: 100 },
    { wpx: 150 },
    { wpx: 150 },
  ]

  utils.book_append_sheet(workbook, summarySheet, 'Summary')
  return workbook
}

const labels = ['Price Grade', 'Shipping term', 'Purity', 'Data source', 'Unit']

const getCategories = (_prices, _category) => {
  const data = {
    'Price Grade': [],
    'Shipping term': [],
    Purity: [],
    'Data source': [],
    Unit: [],
  }
  _prices?.forEach((_price) => {
    labels?.forEach((_label) => {
      if (_label === 'Data source') {
        data[_label].push(
          cellObjectText(
            'Benchmark Mineral Intelligence',
            cellStylesTextCenter,
          ),
        )
        data[_label].push({})
      }
      if (_label === 'Unit') {
        data[_label].push(
          cellObjectText(
            `${_price.currency.iso}/${_price.unitOfMeasure.symbol}`,
            cellStylesTextCenter,
          ),
        )
        data[_label].push({})
      }
      if (_label === 'Price Grade') {
        data[_label].push(
          cellObjectText(getPriceGradeName(_price), cellStylesTextCenter),
        )
        data[_label].push({})
      }
      if (_label === 'Shipping term') {
        data[_label].push(
          cellObjectText(
            _price.shippingRoute?.name || '',
            cellStylesTextCenter,
          ),
        )
        data[_label].push({})
      }
      if (_label === 'Purity') {
        data[_label].push(
          cellObjectText(_price.format?.name || '', cellStylesTextCenter),
        )
        data[_label].push({})
      }
    })
  })
  return data
}

const getPriceGradeName = (_price) => {
  const values = []
  if (_price.category?.name) values.push(_price.category.name)
  if (_price.shippingRoute?.name) values.push(_price.shippingRoute.name)
  if (_price.format?.name) values.push(_price.format.name)
  return `Benchmark ${values.join(', ')}`
}

const getValues = (_prices, dates, category, property = 'PriceMid') => {
  const data = []
  dates?.forEach((_date) => {
    data[_date] = []
    _prices?.forEach((_price) => {
      const index = getPriceGradeName(_price)
      data[_date][index] = []
      _price.Series?.forEach((_item) => {
        if (_item.Date === _date) {
          let value = {}
          if (_item[property]) {
            const format = getPropertyOrCategoryByProperty(
              category,
              'category',
              'format',
            )
            value = cellObjectNumber(_item[property], format, cellStylesNormal)
          }
          data[_date][index].push(value)
        }
      })
    })
  })
  return data
}

const getValuesForSummary = (_data) => {
  const data = {}
  const properties = ['Payable', 'Price']
  properties?.forEach((_property) => {
    _data[_property]?.forEach((_item) => {
      const idSeries = `${_item?.RegionName}-${_item?.Purity}-${_item?.Product?.ProductTypeName}`
      data[idSeries] = []
      _item.Series?.forEach((_serie) => {
        data[idSeries].push({
          date: _serie?.Date ? format(parseISO(_serie.Date), 'yyyy-MM-dd') : '',
          meshSize: _item?.size || '',
          mineral: _item?.Product?.ProductName || '',
          priceLow: _serie?.PriceLow || '',
          priceHigh: _serie?.PriceHigh || '',
          priceMid: _serie?.PriceMid || '',
          payableLow: _serie?.PayableLow || '',
          payableHigh: _serie?.PayableHigh || '',
          payableMid: _serie?.PayableMid || '',
          purity: _item?.Purity || '',
          shippingRegion: _item?.RegionName || '',
          type: _item?.Product?.ProductTypeName || '',
        })
      })
    })
  })
  return data
}

function getValueOrZero(value) {
  return value || 0
}

const getValuesForSummaryServicePro = (_data) => {
  const data = {}
  const properties = ['y1', 'y2']
  properties?.forEach((_property) => {
    _data[_property]?.data?.forEach((_item) => {
      const idSeries = `${_item.category?.name || _item.feedstock?.name}-
      ${_item.seriesTitle}-${_item.unitOfMeasure.name}`
      data[idSeries] = []
      _item.series?.forEach((_series) => {
        data[idSeries] = mapDataToRows(_item)
      })
    })
  })
  return data
}

const mapDataToRows = (item) => {
  const unit = item.unitOfMeasure.name
  return item.series.map((seriesItem) => ({
    date: format(parseISO(seriesItem.date), 'yyyy-MM-dd'),
    grade: item?.grade || '',
    mineral: item.Product.ProductName || '',
    priceLow: unit !== 'Percentage' ? getValueOrZero(seriesItem?.valueLow) : 0,
    priceHigh:
      unit !== 'Percentage' ? getValueOrZero(seriesItem?.valueHigh) : 0,
    priceMid: unit !== 'Percentage' ? getValueOrZero(seriesItem?.valueMid) : 0,
    payableLow:
      unit === 'Percentage' ? getValueOrZero(seriesItem?.valueLow) : 0,
    payableHigh:
      unit === 'Percentage' ? getValueOrZero(seriesItem?.valueHigh) : 0,
    payableMid:
      unit === 'Percentage' ? getValueOrZero(seriesItem?.valueMid) : 0,
    purity: item.purity?.name || item.format?.name || '',
    shippingRegion: item.shippingRoute?.name || '',
    type: item.category?.name || '',
    meshSize: item.meshSize?.size || '',
    feedstock: item.feedstock?.name || '',
    product: item.product?.name || '',
    format: item.format?.name || '',
    unit,
  }))
}

const sortDate = (a, b) => new Date(a.date) - new Date(b.date)
