import { Decimal } from 'decimal.js'

export const numberFormatter = (
  value: number | Decimal,
  digits: number = 0,
  fixed: boolean = false,
): string => {
  if (!value) return ''
  const data = fixed
    ? new Decimal(value).toFixed(digits)
    : new Decimal(value).toDP(digits)

  return new Decimal(data).toNumber().toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
