export const getProductionByCountry = (mines) => {
  const productionByCountry = mines.reduce((production, mine) => {
    const { code } = mine.country
    const mineProduction = mine.production.value
    if (!production[code]) {
      production[code] = parseFloat(mineProduction)
    } else {
      production[code] += parseFloat(mineProduction)
    }
    return production
  }, {})
  productionByCountry.unit = mines[0].production.unit
  return productionByCountry
}

export const getProductionByRegion = (mines) => {
  const productionByRegion = mines.reduce((production, mine) => {
    const { name } = mine.region
    const mineProduction = mine.production.value
    if (!production[name]) {
      production[name] = parseFloat(mineProduction)
    } else {
      production[name] += parseFloat(mineProduction)
    }
    return production
  }, {})
  productionByRegion.unit = mines[0].production.unit
  return productionByRegion
}

export const getOperatingMines = (mines) => {
  return (
    mines.filter(
      (mine) =>
        (mine.latitude !== null || mine.longitude !== null) &&
        mine.production.value !== 0 &&
        mine.status === 'Operating',
    ) || []
  )
}

export const getMineSource = (mines) => {
  const points = mines.map((mine) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [mine.longitude, mine.latitude],
    },
  }))
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: points,
    },
  }
}

export const mapNumberToRGB = (
  number,
  minRange,
  maxRange,
  color1,
  color2,
  color3,
) => {
  const maxNumber = Math.max(minRange, Math.min(maxRange, number))

  const normalizedValue = (maxNumber - minRange) / (maxRange - minRange)

  let red, green, blue

  if (normalizedValue <= 0.5) {
    // Interpolate between color1 and color2 for the first half of the range
    red = Math.round(color1[0] + 2 * normalizedValue * (color2[0] - color1[0]))
    green = Math.round(
      color1[1] + 2 * normalizedValue * (color2[1] - color1[1]),
    )
    blue = Math.round(color1[2] + 2 * normalizedValue * (color2[2] - color1[2]))
  } else {
    // Interpolate between color2 and color3 for the second half of the range
    const innerNormalizedValue = normalizedValue - 0.5
    red = Math.round(
      color2[0] + 2 * innerNormalizedValue * (color3[0] - color2[0]),
    )
    green = Math.round(
      color2[1] + 2 * innerNormalizedValue * (color3[1] - color2[1]),
    )
    blue = Math.round(
      color2[2] + 2 * innerNormalizedValue * (color3[2] - color2[2]),
    )
  }

  // Return the RGB color in CSS format
  return `rgb(${red},${green},${blue})`
}
