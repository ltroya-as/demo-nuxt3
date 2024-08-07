import isObject from 'lodash/isObject'
import uniqBy from 'lodash/uniqBy'
import { META_DESCRIPTION, TITLE } from '~/utils/constants'
import type {
  Link,
  Meta,
  SeoProperties,
  SeoProps,
  BuildMeta,
} from '~/models/seo'

const formatTitle = (title: string) =>
  `${title} | Benchmark Mineral Intelligence`

export const addAdditionalSeoProperties = (
  seoProperties: SeoProperties,
  url: string,
) => {
  if (seoProperties?.opengraphImage) {
    return {
      ...seoProperties,
      'opengraphImage:secure_url': seoProperties.opengraphImage,
    }
  }

  return { ...seoProperties, opengraphUrl: url }
}

export const getSeoProperties = (seoProperties: SeoProperties) => {
  return Object.keys(seoProperties).filter((key) => !!seoProperties[key])
}

export const getSeoValue = (seoProperties: SeoProperties, key) => {
  if (isObject(seoProperties[key])) return seoProperties[key].mediaItemUrl
  return seoProperties[key]
}

export const isOpenGraphProperty = (propertyName: string) =>
  propertyName.startsWith('opengraph')

export const isTwitterProperty = (propertyName: string) =>
  propertyName.startsWith('twitter')

export const formatSeoPropertyName = (propertyName: string) => {
  const firstUpperLetterIndex = propertyName
    .split('')
    .findIndex((letter) => /[A-Z]/.test(letter))
  const name = propertyName.substr(firstUpperLetterIndex).toLowerCase()

  if (isOpenGraphProperty(propertyName)) return `og:${name}`

  return isTwitterProperty(propertyName) ? `twitter:${name}` : propertyName
}

export const buildMetas = ({ seoProperties, url }: BuildMeta) => {
  const allSeoProperties = addAdditionalSeoProperties(seoProperties, url)
  return getSeoProperties(allSeoProperties).map((key) => ({
    hid: formatSeoPropertyName(key),
    [isOpenGraphProperty(key) ? 'property' : 'name']:
      formatSeoPropertyName(key),
    content: getSeoValue(seoProperties, key),
  }))
}

export const generateCanonicalLink = (url: string): Link[] => [
  { hid: 'canonical', rel: 'canonical', href: url },
]

export const generateSeoInfo = ({
  metaProps,
  url,
  seoProperties = {},
}: SeoProps): Meta => {
  const {
    title = TITLE,
    description = seoProperties.description || META_DESCRIPTION,
    ...remaining
  } = metaProps

  const meta: BuildMeta = {
    seoProperties: {
      description,
      twitterDescription: description,
      opengraphDescription: description,
      opengraphTitle: formatTitle(title),
      ...seoProperties,
    },
    url,
  }

  return {
    title: formatTitle(title),
    meta: uniqBy(buildMetas(meta), 'hid'),
    link: generateCanonicalLink(url),
    ...remaining,
  }
}
