export const extractDates = (data) => {
  // Collect unique dates using a Set.
  const datesSet = new Set()

  Object.values(data).forEach((productType) => {
    productType?.data?.forEach((product) => {
      product.series.forEach(({ date }) => {
        datesSet.add(date)
      })
    })
  })

  // Convert Set to an array and sort dates by ascending order.
  return [...datesSet].sort((a, b) => new Date(a) - new Date(b))
}

const getProductLabel = ({
  unit,
  category,
  purity,
  format,
  grade,
  shippingRoute,
  meshSize,
  feedstock,
  product,
}) => {
  const currencyUnitMeasure = unit === '%' ? unit : ''
  const categoryLabel = category ? category.name : feedstock.name
  const baseLabel = `${categoryLabel} ${currencyUnitMeasure}#`
  const purityLabel = purity ? `(${purity.name})` : ''
  const formatLabel = format ? ` (${format.name})` : ''
  const productLabel = product ? ` ${product.alias || product.name}` : ''
  const gradeLabel = grade || ''
  const meshSizeLabel = meshSize ? ` ${meshSize.size}` : ''
  const separator =
    purity || format || grade || meshSize || productLabel ? ' - ' : ''
  const shippingRouteLabel = shippingRoute ? `${shippingRoute.name}` : ''

  const label =
    `${baseLabel} ${purityLabel} ${formatLabel} ${gradeLabel} ${meshSizeLabel} ${productLabel} ${separator} ${shippingRouteLabel}`.trim()

  return label
}

export const extractProductsBy = ({ type, data, dates }) => {
  const dataType = data[type]
  if (!dataType) return null

  const dataset = []
  let datasetLabel = ''
  let minAxis = 0
  let maxAxis = null

  const { currency, unitOfMeasure } = dataType

  datasetLabel =
    currency === null ? `% Payable` : `${currency?.iso}/${unitOfMeasure.name}`

  dataType?.data?.forEach((_product) => {
    const datasetDates = dates.map((date) => {
      const record = _product.series.find((_series) => _series.date === date)

      return !record
        ? null
        : {
            y: record.valueMid,
            x: record.date,
          }
    })

    const label = getProductLabel({ ..._product, unit: dataType.unit })

    dataset.push({
      label,
      pillColor: _product.pillColor,
      dataset: datasetDates,
      symbol: dataType.currency === null ? '%' : dataType.currency.symbol,
      yAxisID: type,
    })
  })

  const allYValues = dataset
    .flatMap((entry) => entry.dataset.map((dataPoint) => dataPoint?.y))
    .filter((value) => typeof value === 'number')

  if (allYValues.length > 0 && currency === null) {
    const minNumber = Math.min(...allYValues)
    const maxNumber = Math.max(...allYValues)

    minAxis = Math.max(0, minNumber - minNumber * 0.2)
    maxAxis = Math.min(100, maxNumber + maxNumber * 0.2)
  }

  return { dataset, label: datasetLabel, minAxis, maxAxis }
}

const getNewColor = () => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  const randomColor = (array[0] % 16777215).toString(16)

  return `#${'0'.repeat(6 - randomColor.length)}${randomColor}`
}

export const formatDatasets = (datasets) => {
  return datasets.map(({ label, dataset, symbol, yAxisID, pillColor }) => ({
    label,
    /** this filter is used to remove the null indices from the array */
    data: dataset?.filter((_data) => _data),
    borderColor: pillColor || getNewColor(),
    fill: false,
    yAxisID,
    spanGaps: true,
    symbol,
  }))
}
