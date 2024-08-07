import { format } from 'date-fns'
import { random } from '~/utils/random'
import { reformat } from '~/utils/date'
import { formatVideoDuration } from '~/utils/time'
import { SUBSCRIPTIONS } from '@/constants/memberships'
import { ARTICLE_COVERS } from '~/constants/market-insights'
import {
  ESG,
  FORECASTS,
  GIGAFACTORY_ASSESSMENT,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  PA_SUBSCRIPTION_PREFIX,
  PRECURSOR_ASSESSMENT,
  PRICE_ASSESSMENTS,
  SODIUM_ION_BATTERIES,
  SOURCE,
} from '~/constants/services/constants'

import { priceTab } from '~/constants/dummyData/priceTab'

const VIDEO_IMG_FALLBACK =
  'https://res.cloudinary.com/benchmarkminerals/image/upload/v1678209404/assets/request-for-proposal_mq7uco.jpg'

export function getAdaptedUser(user) {
  const roles = user.roles.nodes.map((role) => role.name)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    roles,
    canPreviewContent: roles.some((role) =>
      ['administrator', 'editor', 'author'].includes(role),
    ),
  }
}

const getRandomArticleCover = () => {
  const randomIndex = Math.floor(random() * ARTICLE_COVERS.length)
  return ARTICLE_COVERS[randomIndex]
}

export function getAdaptedPost(article) {
  const { id, slug } = article
  const coverUrl =
    article.featuredImage?.node?.mediaItemUrl ?? getRandomArticleCover()

  return {
    ...article,
    slug: slug || id,
    coverUrl,
  }
}

export function getAdaptedPosts({ nodes }) {
  return nodes.map((article) => getAdaptedPost(article))
}

function getAdaptedSubscription(subs) {
  const { name, slug, status } = subs
  let expirationDate = subs.expiration_date

  if (status === 'active' && expirationDate === 'none') {
    expirationDate = 'Never'
  } else if (expirationDate !== 'none') {
    expirationDate = format(Date.parse(expirationDate), 'dd/MM/yyyy')
  }

  return {
    name,
    slug,
    status,
    expirationDate,
  }
}

export function getAdaptedMembershipStatuses(membershipStatuses) {
  const productsAndServices = {}
  const productNames = {
    Pricing: PRICE_ASSESSMENTS.name,
    Forecast: FORECASTS.name,
    'Market-Assessment': MARKET_ASSESSMENTS.name,
    ESG: ESG.name,
  }
  membershipStatuses.forEach((membership) => {
    const splittedName = membership.name.split(': ')
    let product

    if (splittedName.length > 1) {
      product = splittedName[0]
      membership.name = splittedName[1]
    } else {
      product = 'Source'
    }

    if (membership.name === 'Gigafactory') {
      membership.name = GIGAFACTORY_ASSESSMENT.menu
    } else if (['Battery Cell', 'Battery Database'].includes(membership.name)) {
      membership.name = LITHIUM_ION_BATTERIES.menu
    } else if (membership.name === 'Precursor') {
      membership.name = PRECURSOR_ASSESSMENT.menu
    } else if (membership.name === 'Sodium Ion Battery') {
      membership.name = SODIUM_ION_BATTERIES.menu
    }

    if (productNames[product]) {
      product = productNames[product]
    }

    if (!productsAndServices[product]) {
      productsAndServices[product] = []
    }

    productsAndServices[product].push(getAdaptedSubscription(membership))
  })

  const productsAndServicesData = setProductsAndServices(productsAndServices)

  return getResponseForProductsAndServices(productsAndServicesData)
}

function setProductsAndServices(productsAndServices) {
  for (const [key, value] of Object.entries(SUBSCRIPTIONS)) {
    if (!productsAndServices[key]) {
      productsAndServices[key] = [...value]
      continue
    }

    value.forEach((subscription) => {
      if (
        !productsAndServices[key].some((sub) => sub.name === subscription.name)
      ) {
        productsAndServices[key].push(subscription)
      }
    })
  }
  return productsAndServices
}

function getResponseForProductsAndServices(productsAndServices) {
  return {
    [PRICE_ASSESSMENTS.name]: productsAndServices[PRICE_ASSESSMENTS.name],
    [FORECASTS.name]: productsAndServices[FORECASTS.name],
    [SOURCE.name]: productsAndServices[SOURCE.name],
    [MARKET_ASSESSMENTS.name]: productsAndServices[MARKET_ASSESSMENTS.name],
    [ESG.name]: productsAndServices[ESG.name],
  }
}

export function getAdaptedTickerIndexes(indexes) {
  return indexes?.map((index) => {
    const data = []
    const dates = []
    index.oneYearIndexTrend.forEach((index) => {
      data.push(index.value)
      dates.push(index.date)
    })
    const chartData = { data, dates }
    return {
      name: index.label,
      values: {
        today: index.today,
        last: index.last,
        percentageChange: index.percentageChange,
        publishedDate: index.publishedDate,
        hasAccess: index.hasAccess,
        updateFrequency: index.updateFrequency,
        updateFrequencyText: index.updateFrequencyText,
        url: index.url,
        yearOnYear: index.yearOnYear,
        yearToDate: index.yearToDate,
        subscription: index.subscription,
        chartData,
      },
    }
  })
}

export function getAdaptedRegions(regions) {
  return regions.map((region) => {
    return {
      name: region.label,
      selected: true,
    }
  })
}

export function getAdaptedAllPricesDataChart(response) {
  const groupedData = {}

  response.forEach((product) => {
    const ProductName = product.$metadata.product

    product.data.forEach((item) => {
      const unitOfMeasureId = item.unitOfMeasure.id

      if (!groupedData[unitOfMeasureId]) {
        groupedData[unitOfMeasureId] = {
          unitOfMeasure: item.unitOfMeasure,

          data: [],

          currency: item.currency,
        }
      }

      groupedData[unitOfMeasureId].data.push({
        ...item,

        Product: { ProductName },
      })
    })
  })

  return Object.fromEntries(
    Object.entries(groupedData).map(([_, value], index) => [
      `y${index + 1}`,

      value,
    ]),
  )
}

export function transformIndexToPricesStructure(indexStructure) {
  return {
    productName: `${indexStructure.product} Index`,
    subscription: '',
    label: `${indexStructure.product} Index`,
    classTextColor: '',
    frequency: '1M',
    isSustainable: false,
    values: indexStructure.indexes.summary.map((item) => ({
      currency: item.data.latestChange ? item.data.latestChange?.unit : null,
      unitMeasure: '',
      name: item.product,
      today: item.data.today,
      last: item.data.last,
      latestChange: item.data.latestChange
        ? item.data.latestChange?.value
        : null,
      yearToDate: item.data.yearToDate ? item.data.yearToDate?.value : null,
      yearOnYear: item.data.yearOnYear ? item.data.yearOnYear?.value : null,
      isPublic: true,
      pillColor: '',
      classTextColor: '',
      isSustainable: false,
    })),
  }
}

export function getAdaptedSummaryTable(summaries) {
  return summaries.map((summary) => ({
    productName: summary.productName,
    authorized: summary.authorized,
    subscription: summary.subscription,
    label: summary.name,
    classTextColor: summary.classTextColor,
    frequency: summary.frequency,
    isSustainable: summary.isSustainable,
    values: summary.series.map((serie) => ({
      currency: serie.currency?.symbol || '',
      unitMeasure: serie.unitOfMeasure.symbol,
      name: serie.name,
      today: serie.data.today,
      last: serie.data.last,
      latestChange: serie.data.latestChange
        ? serie.data.latestChange?.value
        : null,
      yearToDate: serie.data.yearToDate ? serie.data.yearToDate?.value : null,
      yearOnYear: serie.data.yearOnYear ? serie.data.yearOnYear?.value : null,
      isPublic: serie.isPublic,
      pillColor: serie.pillColor,
      classTextColor: serie.classTextColor,
      isSustainable: summary.isSustainable,
    })),
  }))
}

export function getAdaptedSummaries(summaries) {
  const allSummariesData = summaries.map((summary) => {
    summary.data.forEach((data) => {
      data.subscription = getPASubscription(summary.$metadata.product)
      data.productName = summary.$metadata.product
      data.authorized = summary.authorized
    })
    return summary.data
  })
  const allSummaries = allSummariesData.flat()
  return getAdaptedSummaryTable(allSummaries)
}

function getPASubscription(product) {
  let slug = product.toLowerCase().replace(/ /g, '-')
  if (slug === 'lithium-ion-batteries') slug = 'battery-cell'
  return `${PA_SUBSCRIPTION_PREFIX}${slug}`
}

export function getAdaptedPrices(response) {
  const ProductName = response.$metadata.product
  const groupedData = {}
  response.data.forEach((item) => {
    const priceType = item.unitOfMeasure.name
    if (!groupedData[priceType]) {
      groupedData[priceType] = {
        data: [],
        unitOfMeasure: item.unitOfMeasure,
        currency: item.currency,
      }
    }
    groupedData[priceType].data.push({
      ...item,
      Product: {
        ProductName,
      },
    })
  })

  return Object.fromEntries(
    Object.entries(groupedData).map(([_, value], index) => [
      `y${index + 1}`,
      value,
    ]),
  )
}

// Video Adapters
const TIME_FORMAT = 'dd MMM yyyy'

function removeAnchorWithHref(text) {
  const anchorTagRegexInit = /<a[^>]*href="[^"]*"[^>]*>/gi
  const sanitizeTextInit = text?.replaceAll(anchorTagRegexInit, '')
  const anchorTagRegexEnd = /<\/a>/gi
  return sanitizeTextInit?.replaceAll(anchorTagRegexEnd, '')
}

function getAdaptedVideo(video) {
  const { id, slug, title, date } = video
  const { previewVimeoId, speaker, vimeoId, isPublic, description } =
    video.videos
  const categories = video.categories?.nodes
  const tags = video.tags?.nodes

  let publishedDate = ''
  try {
    publishedDate = reformat(date, TIME_FORMAT, 'yyyy-MM-dd HH:mm:ss')
  } catch (e) {
    try {
      const _date = new Date(date)

      publishedDate = format(_date, TIME_FORMAT)
    } catch (_e) {}
  }

  const coverUrl = video.videos.thumbnail?.mediaItemUrl || VIDEO_IMG_FALLBACK
  const duration = video.videos.duration

  return {
    id,
    contentType: 'video',
    publishedDate,
    duration: duration ? formatVideoDuration(duration) : '',
    slug: slug || id,
    title,
    excerpt: removeAnchorWithHref(speaker || ''),
    description,
    coverUrl,
    categories,
    vimeoId: vimeoId || 0,
    previewVimeoId: previewVimeoId || 0,
    isPublic,
    tags,
    relatedVideos: [],
    date,
  }
}

export function getAdaptedVideos(videos) {
  return videos.map((video) => getAdaptedVideo(video))
}

export const getAdaptedArticles = (articles, format = TIME_FORMAT) => {
  return articles
    .map((article) => {
      const publishedDate = reformat(
        article?.date,
        format,
        'yyyy-MM-dd HH:mm:ss',
      )
      const coverUrl =
        article?.featuredImage?.node?.mediaItemUrl ?? getRandomArticleCover()
      const isExternal = article?.__typename === 'Membership'
      const url = isExternal ? `article/${article?.slug}` : null
      const readingTime = article?.memberships?.estimatedReadingTime ?? null
      const categories = article?.categories?.nodes || []

      return {
        publishedDate,
        slug: article?.slug || article?.id,
        title: article?.title,
        url,
        readingTime,
        excerpt: removeAnchorWithHref(article?.excerpt),
        coverUrl,
        categories,
      }
    })
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
}

const getAdaptedEvents = (events) => {
  return events.map(({ slug, events }) => ({
    slug,
    coverUrl: events.backgroundImage?.node?.sourceUrl,
    url: events.url,
    eventType: events.eventType?.at(0) ?? '',
  }))
}

const getAdaptedMarketInsightsArticles = (marketInsights) => {
  const sourceArticles = getAdaptedArticles(marketInsights.articles.nodes)
  const analysisArticles = getAdaptedArticles(
    marketInsights?.analysisArticles?.nodes || [],
  )

  const firstSourceArticle = sourceArticles.length ? [sourceArticles[0]] : []
  const firstAnalysisArticle = analysisArticles.length
    ? [analysisArticles[0]]
    : []
  const restSourceArticles = sourceArticles.length
    ? sourceArticles.slice(1, sourceArticles.length)
    : []

  return [
    ...firstSourceArticle,
    ...firstAnalysisArticle,
    ...restSourceArticles,
  ].slice(0, 5)
}

export const getAdaptedMarketInsights = (marketInsights) => {
  if (!marketInsights) return null
  const articles = getAdaptedMarketInsightsArticles(marketInsights)
  const events = getAdaptedEvents(marketInsights.events.nodes)
  const videos = getAdaptedVideos(marketInsights.videos.nodes)

  return { articles, events, videos }
}

export const getAdaptedPriceTab = (response) => {
  const ProductName = response.product
  const groupedData = {}
  if (response.prices?.chart?.length) {
    response.prices.chart.forEach((item) => {
      const { unitOfMeasure, currency } = item
      const priceType = unitOfMeasure.name
      if (!groupedData[priceType]) {
        groupedData[priceType] = {
          data: [],
          unitOfMeasure,
          currency,
        }
      }
      groupedData[priceType].data.push({
        ...item,
        Product: {
          ProductName,
        },
      })
    })
  } else {
    groupedData.tonne = priceTab
  }

  return Object.fromEntries(
    Object.entries(groupedData).map(([_, value], index) => [
      `y${index + 1}`,
      value,
    ]),
  )
}

export function getAdaptedFormidableErrors({ errors, form }) {
  const messages = {}

  for (const fieldId in errors) {
    const field = form.value.fields.find((_field) => _field.id === fieldId)
    messages[field.name] = errors[fieldId]
  }

  return messages
}
