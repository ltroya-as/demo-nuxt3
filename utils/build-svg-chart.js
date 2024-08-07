import { getDayDifference } from '@/utils/date'

export function buildSVGChart(
  data,
  dates,
  X_AXIS_SCALE = 145,
  Y_AXIS_SCALE = 75,
  LINE_COLOR = '#25262A',
) {
  const getDayIntervals = (days, currentDate, i) => {
    if (!i) return days
    const dayDiff =
      getDayDifference(dates[i - 1], currentDate) + days[days.length - 1] || 0
    days.push(dayDiff)
    return days
  }

  const dayIntervals = dates.reduce(getDayIntervals, [0])

  const xAxisIntervalDivisor =
    dayIntervals[dayIntervals.length - 1] / X_AXIS_SCALE

  const xAxisIntervals = dayIntervals.map((day) => day / xAxisIntervalDivisor)

  const maxDataValue = data.reduce((max, value) => {
    return Math.max(max, value)
  })

  const minDataValue = data.reduce((min, value) => {
    return Math.min(min, value)
  })

  const dataValueDifference = Math.ceil(maxDataValue - minDataValue)

  // to set y axis scale from min to max value
  const yAxisIntervalDivisor = dataValueDifference / Y_AXIS_SCALE
  const yAxisIntervals = data.map(
    (value) => (value - minDataValue) / yAxisIntervalDivisor,
  )

  const reverseYAxisIntervalsVertically = yAxisIntervals.map(
    (value) => Y_AXIS_SCALE - value,
  )
  const intervals = xAxisIntervals.map((x, i) => {
    return `${x},${reverseYAxisIntervalsVertically[i]}`
  })

  return `<svg viewBox="0 0 ${X_AXIS_SCALE} ${Y_AXIS_SCALE}" width="${X_AXIS_SCALE}" height="${Y_AXIS_SCALE}" class="chart"><polyline fill="none" stroke="${LINE_COLOR}" stroke-width="1" points="${intervals.join(
    ' ',
  )}"/></svg>`
}
