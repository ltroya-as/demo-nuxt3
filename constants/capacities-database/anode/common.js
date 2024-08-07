import { ANODE, PRICE_ASSESSMENTS } from '~/constants/services/constants'

export const methodology = {
  varName: 'anodePriceAssessmentsMethodologyId',
  category: 'methodology-price-assessments',
  file_name: 'Benchmark-Anode-Price-Assessment-Methodology.pdf',
}

export const checkboxes = [ANODE.checkbox, PRICE_ASSESSMENTS.slug]
export const unit = 'GWh'
export const colors = ['#FDBD00', '#00325C', '#005BA9', '#2699FC']
export const circleClassColors = [
  'bg-grey-900',
  'bg-white',
  'bg-white',
  'bg-grey-900',
]
export const checkClassColors = [
  'text-grey-900',
  'text-white',
  'text-white',
  'text-grey-900',
]
export const icon = ANODE.iconColor
export const product = ANODE.name
export const slug = ANODE.slug
export const singularProduct = ANODE.simplifiedName

export const title = `${ANODE.name} Capacity Database`
export const subtitle = `${ANODE.name} Capacities`
export const seo = {
  title: `${PRICE_ASSESSMENTS.name}: ${ANODE.name}`,
  description: ANODE.seo.priceAssessments.capacities,
}
