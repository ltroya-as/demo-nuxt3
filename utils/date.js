import {
  format,
  isSameDay,
  lastDayOfQuarter,
  parseISO,
  startOfQuarter,
  sub,
  subQuarters,
} from 'date-fns'

const reformat = (stringDate, to = 'MMM dd, yyyy', from = 'yyyy-MM-dd') => {
  try {
    const parsedDate = parseISO(stringDate, from, new Date())
    return format(parsedDate, to)
  } catch (e) {
    return format(parsePresentationStringDate(stringDate), 'yyy-MM-dd')
  }
}

const parsePresentationStringDate = (stringDate) => {
  // This function take an string date in the format yyy-MM-dd HH:mm:ss" and parses it to a JS Date.
  // We expect the presentation date to come in this format: "yyyy-MM-dd HH:mm:ss". For example: "2022-08-22 12:38:32"
  // We use the parseISO function to avoid some issues in Safari
  return parseISO(stringDate, 'yyyy-MM-dd HH:mm:ss', new Date())
}

// Get the last quarter date range for the given date.
const getLastQuarter = (date) => {
  const lastQuarterStartDate = startOfQuarter(subQuarters(date, 1))
  const lastQuarterEndDate = lastDayOfQuarter(subQuarters(date, 1))

  return { start: lastQuarterStartDate, end: lastQuarterEndDate }
}

// Get the last calendar month date range for the given date.
const getLastCalendarMonth = (date) => {
  const monthStartDate = sub(new Date(), { months: 1 })
  return { start: monthStartDate, end: date }
}

// Get the last calendar year date range for the given date.
const getLastCalendarYear = (date) => {
  const yearStartDate = sub(date, { years: 1 })
  return { start: yearStartDate, end: date }
}

const formatDateRange = (startDateTime, endDateTime, _formatDay = '') => {
  if ((!startDateTime && !endDateTime) || (!startDateTime && endDateTime)) {
    return
  }

  if (startDateTime && !endDateTime) {
    return format(startDateTime, `${_formatDay} d MMMM yyyy`)
  }

  if (isSameDay(startDateTime, endDateTime)) {
    return format(startDateTime, `${_formatDay} d MMMM yyyy`)
  }

  const sameYear = format(startDateTime, 'yyyy') === format(endDateTime, 'yyyy')
  const sameMonth =
    format(startDateTime, 'MMMM') === format(endDateTime, 'MMMM')
  const sameDay = format(startDateTime, 'd') === format(endDateTime, 'd')

  let startDate
  let endDate

  if (sameYear && sameMonth && !sameDay) {
    startDate = format(startDateTime, `${_formatDay} d`)
    endDate = format(endDateTime, `${_formatDay} d MMMM yyyy`)
  }

  if (sameYear && !sameMonth && !sameDay) {
    startDate = format(startDateTime, `${_formatDay} d MMMM`)
    endDate = format(endDateTime, `${_formatDay} d MMMM yyyy`)
  }

  if (!sameYear && !sameMonth && !sameDay) {
    startDate = format(startDateTime, `${_formatDay} d MMMM yyyy`)
    endDate = format(endDateTime, `${_formatDay} d MMMM yyyy`)
  }

  return `${startDate} - ${endDate}`
}

/**
 * Checks if a prop value is a date. This is a workaround to the
 * "Expected Date, got Date" error, thrown in some cases when setting
 * the prop type to "Date":
 * See: https://github.com/nuxt/nuxt.js/issues/5565#issuecomment-859181328
 */
const validateDateProp = (value) => {
  return Object.prototype.toString.call(value) === '[object Date]'
}

// Get the YTD range for the given date.
const getYTD = (date) => {
  const yearStartDate = new Date(new Date().getFullYear(), 0, 1)
  return { start: yearStartDate, end: date }
}

const getDayDifference = (fromDate, toDate) => {
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
  const fromDateObj = new Date(fromDate)
  const toDateObj = new Date(toDate)
  const diffTime = Math.abs(toDateObj - fromDateObj)
  const diffDays = Math.ceil(diffTime / MILLISECONDS_IN_A_DAY)
  return diffDays
}

export {
  reformat,
  parsePresentationStringDate,
  getLastQuarter,
  getLastCalendarMonth,
  getLastCalendarYear,
  formatDateRange,
  validateDateProp,
  getYTD,
  getDayDifference,
}
