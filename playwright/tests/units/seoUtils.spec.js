import { test, expect } from '@playwright/test'
import {
  generateCanonicalLink,
  buildMetas,
  formatSeoPropertyName,
  getSeoValue,
  addAdditionalSeoProperties,
  getSeoProperties,
  isOpenGraphProperty,
} from '@/utils/seo'

test.describe('Seo Utils', () => {
  test('it should generate canonical link', () => {
    const value = generateCanonicalLink()
    expect(value[0].hid).toEqual('canonical')
    expect(value[0].rel).toEqual('canonical')
  })
  test('it should build the right meta tags for opengraph values', () => {
    const metas = buildMetas({ seoProperties: { opengraphTitle: 'Test' } })
    expect(metas).toEqual([
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Test',
      },
    ])
  })
  test('it should build the right metas for twitter tags', () => {
    const metas = buildMetas({ seoProperties: { twitterTitle: 'Test' } })
    expect(metas).toEqual([
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Test',
      },
    ])
  })
  test('it should build the right metas for normal tags', () => {
    const metas = buildMetas({ seoProperties: { description: 'Test' } })
    expect(metas).toEqual([
      {
        hid: 'description',
        name: 'description',
        content: 'Test',
      },
    ])
  })
  test('it should format opengraph property', () => {
    expect(formatSeoPropertyName('opengraphTitle')).toEqual('og:title')
  })
  test('it should format twitter property', () => {
    expect(formatSeoPropertyName('twitterCard')).toEqual('twitter:card')
  })
  test('it should get the correct value for opengraphImage', () => {
    const value = { opengraphImage: { mediaItemUrl: '#' } }
    expect(getSeoValue(value, 'opengraphImage')).toEqual('#')
  })
  test('it should get the correct value for twitterImage', () => {
    const value = { twitterImage: { mediaItemUrl: '#' } }
    expect(getSeoValue(value, 'twitterImage')).toEqual('#')
  })
  test('it should add the extra property when opengraphImage exists', () => {
    const value = { opengraphImage: { mediaItemUrl: '#' } }
    const result = addAdditionalSeoProperties(value)
    expect(Object.keys(result)).toMatchObject([
      'opengraphImage',
      'opengraphImage:secure_url',
      'opengraphUrl',
    ])
  })
  test('it should ignore null values', () => {
    const value = { nullKey: null }
    expect(getSeoProperties(value)).toHaveLength(0)
  })
  test('it should check if the seo key is opengraph', () => {
    expect(isOpenGraphProperty('opengraphTitle')).toEqual(true)
  })
})
