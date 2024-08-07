import {
  ANODE,
  CATHODE,
  MARKET_ASSESSMENTS,
  SODIUM_ION_BATTERIES,
  SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
} from '~/constants/services/constants'

export const methodology = {
  varName: 'sodiumIonBatteriesMarketAssessmentsMethodologyId',
  file_name: 'Benchmark-Sodium-Ion-Batteries-Market-Assessment-Methodology.pdf',
  category: 'public-documents',
}

export const checkboxes = [
  SODIUM_ION_BATTERIES.checkbox,
  MARKET_ASSESSMENTS.slug,
]
export const unitAnode = 'tpa'
export const unitCathode = 'tpa'
export const unitBatteryCell = 'GWh'
export const colorsAnode = ['#FDBD00', '#00325C', '#005BA9', '#2699FC']
export const circleClassColorsAnode = [
  'bg-grey-900',
  'bg-white',
  'bg-white',
  'bg-grey-900',
]
export const checkClassColorsAnode = [
  'text-grey-900',
  'text-white',
  'text-white',
  'text-grey-900',
]
export const colorsCathode = ['#EA8000', '#FDAF00', '#FDD24C', '#FEEBB2']
export const circleClassColorsCathode = [
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
  'bg-grey-900',
]
export const checkClassColorsCathode = [
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
  'text-grey-900',
]
export const colorsBatteryCell = ['#EA8000', '#12733C', '#4BBF7C', '#A3F5C6']
export const circleClassColorsBatteryCell = [
  'bg-grey-900',
  'bg-white',
  'bg-white',
  'bg-grey-900',
]
export const checkClassColorsBatteryCell = [
  'text-grey-900',
  'text-white',
  'text-white',
  'text-grey-900',
]
export const icon = SODIUM_ION_BATTERIES.iconColor
export const title = `${SODIUM_ION_BATTERIES.name} Capacity Database`
export const subtitleAnode = `${SODIUM_ION_BATTERIES.simplifiedName} Anode Capacity Assessment`
export const subtitleCathode = `${SODIUM_ION_BATTERIES.simplifiedName} Cathode Capacity Assessment`
export const subtitleBatteryCell = `${SODIUM_ION_BATTERIES.simplifiedName} Battery Cell Capacity Assessment`
export const seo = {
  title: `${MARKET_ASSESSMENTS.name}: ${SODIUM_ION_BATTERIES.name}`,
  description: SODIUM_ION_BATTERIES.seo.marketAssessments.capacities,
}
export const subscription = SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES

export const commonTabs = [
  { name: CATHODE.name, slug: CATHODE.slug },
  { name: ANODE.name, slug: ANODE.slug },
  { name: 'Battery Cell', slug: 'battery-cell' },
]

export const defaultTab = CATHODE.slug
