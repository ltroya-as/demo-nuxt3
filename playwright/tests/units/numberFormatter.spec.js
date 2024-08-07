import { test, expect } from '@playwright/test'
import { Decimal } from 'decimal.js'
import { numberFormatter } from '../../../utils/number'

test.describe('Number formatter', () => {
  test('should format a number to the correct number of decimals', () => {
    const value = new Decimal(123.12)
    expect(numberFormatter(value)).toEqual('123')
    expect(numberFormatter(value, 1)).toEqual('123.1')
    expect(numberFormatter(value, 2)).toEqual('123.12')
  })

  test('should format a number with the correct thousands and decimal separator', () => {
    const value = new Decimal(9999999.12)
    expect(numberFormatter(value)).toEqual('9,999,999')
    expect(numberFormatter(value, 1)).toEqual('9,999,999.1')
    expect(numberFormatter(value, 2)).toEqual('9,999,999.12')
  })

  test('should return an empty string if there is no value', () => {
    expect(numberFormatter(0)).toEqual('')
  })
})
