import { format, parseISO } from 'date-fns'
import SheetClip from 'sheetclip'
import groupBy from 'lodash/groupBy'
import { getPurityHeader, isBlackMass } from '@/utils/download-xlsx'

export const groupDataByKey = (data) => {
  const groupByData = {}
  const datasetsToCheck = ['y1', 'y2']
  datasetsToCheck.forEach((key) => {
    const groupedData = groupBy(data[key]?.data, 'Product.ProductName')
    Object.assign(groupByData, groupedData)
  })

  return groupByData
}

export const generateSheetData = (groupByData) => {
  const sheetData = []
  const lengthCategories = []

  for (const [category, items] of Object.entries(groupByData)) {
    const rows = items.flatMap((item) => {
      const unit = item.unitOfMeasure.name
      return item.series.map((seriesItem) => ({
        date: format(parseISO(seriesItem.date), 'yyyy-MM-dd'),
        grade: seriesItem?.grade || '',
        mineral: category || '',
        priceLow: unit !== 'Percentage' ? seriesItem.valueLow : '',
        priceHigh: unit !== 'Percentage' ? seriesItem.valueHigh : '',
        priceMid: unit !== 'Percentage' ? seriesItem.valueMid : '',
        payableLow: unit === 'Percentage' ? seriesItem.valueLow : '',
        payableHigh: unit === 'Percentage' ? seriesItem.valueHigh : '',
        payableMid: unit === 'Percentage' ? seriesItem.valueMid : '',
        purity: item.purity?.name || '',
        shippingRegion: item.shippingRoute?.name || '',
        type: item.category?.name || '',
        meshSize: `'${item.meshSize?.size}` || '',
        unit,
      }))
    })

    const categoryData = [
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
        row.date,
        row.meshSize,
        row.mineral,
        row.priceLow,
        row.priceHigh,
        row.priceMid,
        row.payableLow,
        row.payableHigh,
        row.payableMid,
        row.purity,
        row.shippingRegion,
        row.type,
      ]),
    ]

    lengthCategories.push(categoryData.length)
    sheetData.push(categoryData)
  }

  return { sheetData, lengthCategories }
}

export const adjustSheetData = ({ sheetData, lengthCategories }) => {
  const maxLength = Math.max(...lengthCategories)

  for (let i = 0; i < maxLength; i++) {
    for (const [j, row] of sheetData.entries()) {
      if (!row[i]) {
        sheetData[j][i] = Array(12).fill('')
      }
    }
  }

  const copySheetData = []
  sheetData.forEach((categoryData) => {
    categoryData.forEach((row, rowIndex) => {
      if (copySheetData[rowIndex] === undefined) {
        copySheetData[rowIndex] = []
      }
      copySheetData[rowIndex] = copySheetData[rowIndex].concat(row)
    })
  })

  return copySheetData
}

export const convertToExcelFormat = (copySheetData) => {
  const sheetclip = new SheetClip()
  return sheetclip.stringify(copySheetData)
}
