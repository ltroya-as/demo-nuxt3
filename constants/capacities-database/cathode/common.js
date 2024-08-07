import {
  CATHODE,
  MARKET_ASSESSMENTS,
  PRECURSOR_ASSESSMENT,
  PRICE_ASSESSMENTS,
} from '~/constants/services/constants'

export const methodologyCathode = {
  varName: 'cathodePriceAssessmentsMethodologyId',
  category: 'methodology-price-assessments',
  file_name: 'Benchmark-Cathode-Price-Assessment-Methodology.pdf',
}

export const methodologyPrecursor = {
  varName: 'precursorMarketAssessmentsMethodologyId',
  category: 'public-documents',
  file_name: 'Benchmark-Precursor-Market-Assessment-Methodology.pdf',
}

export const seoCathode = {
  title: `${PRICE_ASSESSMENTS.name}: ${CATHODE.name}`,
  description: CATHODE.seo.priceAssessments.capacities,
}

export const seoPrecursor = {
  title: `${MARKET_ASSESSMENTS.name}: ${PRECURSOR_ASSESSMENT.capacityName}`,
  description: PRECURSOR_ASSESSMENT.seo.marketAssessments.capacities,
}

export const checkboxesCathode = [CATHODE.checkbox, PRICE_ASSESSMENTS.checkbox]
export const checkboxesPrecursor = [MARKET_ASSESSMENTS.checkbox]
export const unit = 'GWh'
export const icon = CATHODE.iconColor

export const title = `${CATHODE.name} & ${PRECURSOR_ASSESSMENT.capacityName} Capacity Database`

export const subtitleCathode = `${CATHODE.name} Capacities`
export const subtitlePrecursor = `${PRECURSOR_ASSESSMENT.capacityName} ${CATHODE.name} Active Material Capacities`

export const commonTabs = [
  { name: CATHODE.name, slug: CATHODE.slug },
  {
    name: PRECURSOR_ASSESSMENT.capacityName,
    slug: PRECURSOR_ASSESSMENT.capacitySlug,
  },
]

export const defaultTab = CATHODE.slug
export const slugCathode = CATHODE.slug
export const productCathode = CATHODE.name
export const colorsCathode = ['#FDBD00', '#00325C', '#005BA9', '#2699FC']
export const circleClassColorsCathode = [
  'bg-grey-900',
  'bg-white',
  'bg-white',
  'bg-grey-900',
]
export const checkClassColorsCathode = [
  'text-grey-900',
  'text-white',
  'text-white',
  'text-grey-900',
]
export const unitCathode = 'GWh'
export const slugPrecursor = PRECURSOR_ASSESSMENT.capacitySlug
export const productPrecursor = PRECURSOR_ASSESSMENT.capacityName
export const colorsPrecursor = ['#EA8000', '#FDAF00', '#FDD24C', '#FEEBB2']
export const circleClassColorsPrecursor = [
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
]
export const checkClassColorsPrecursor = [
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
]
export const unitPrecursor = 'tpa'
