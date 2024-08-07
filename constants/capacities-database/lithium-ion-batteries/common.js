import {
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
} from '~/constants/services/constants'

export const methodology = {
  url: `/methodologies/${MARKET_ASSESSMENTS.slug}/gigafactories`,
}

export const checkboxes = [
  LITHIUM_ION_BATTERIES.checkbox,
  MARKET_ASSESSMENTS.slug,
]
export const unit = 'GWh'
export const colors = ['#EA8000', '#FDAF00', '#FDD24C', '#FEEBB2']
export const circleClassColors = [
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
]
export const checkClassColors = [
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
]
export const icon = LITHIUM_ION_BATTERIES.iconColor
export const slugGigafactory = LITHIUM_ION_BATTERIES.capacitySlug
export const product = LITHIUM_ION_BATTERIES.capacityName
export const singularProduct = LITHIUM_ION_BATTERIES.capacitySimplifiedName

export const subtitleGigafactory = `${LITHIUM_ION_BATTERIES.capacitySimplifiedName} Capacities`
export const subtitleTierRanking = `Benchmark’s Tiers of automotive-grade battery producers`

export const slugTierRanking = 'tier-ranking'
export const seo = {
  title: `${MARKET_ASSESSMENTS.name}: ${LITHIUM_ION_BATTERIES.name}`,
  description: LITHIUM_ION_BATTERIES.seo.priceAssessments.capacities,
}

export const title = `${LITHIUM_ION_BATTERIES.capacitySimplifiedName} Assessment`

export const commonTabs = [
  { name: subtitleGigafactory, slug: LITHIUM_ION_BATTERIES.capacitySlug },
  { name: 'Tier Ranking', slug: slugTierRanking },
]

export const defaultTab = LITHIUM_ION_BATTERIES.capacitySlug

export const subscription = SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES
