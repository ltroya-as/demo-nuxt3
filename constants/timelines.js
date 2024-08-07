import {
  CONSULTANCY,
  ESG,
  FORECASTS,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  PRICE_ASSESSMENTS,
  SOURCE,
} from '~/constants/services/constants'
import { MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT } from '~/constants/services/market-assessments'

export const supplyChain = [
  {
    title: 'Critical Minerals',
    icon: 'icons/diamond',
    backgroundColor: 'bg-p-500',
    containerArrowClasses:
      'bg-p-500 after:border-x-p-300 after:border-t-p-500 md:after:border-y-p-300 md:after:border-l-p-500',
    products: [
      { label: SOURCE.service, url: SOURCE.slug, target: true },
      {
        label: PRICE_ASSESSMENTS.service,
        url: `/services/${PRICE_ASSESSMENTS.slug}`,
        target: false,
      },
      { label: FORECASTS.service, url: `/${FORECASTS.slug}`, target: false },
      { label: CONSULTANCY.service, url: `${CONSULTANCY.slug}`, target: false },
      { label: ESG.service, url: `/services/${ESG.slug}`, target: false },
    ],
  },
  {
    title: 'Cathode & Anode',
    icon: 'icons/cathode-anode',
    backgroundColor: 'bg-p-300',
    containerArrowClasses:
      'bg-p-300 after:border-x-p-100 after:border-t-p-300 md:after:border-y-p-100 md:after:border-l-p-300',
    products: [
      { label: SOURCE.service, url: SOURCE.slug, target: true },
      {
        label: PRICE_ASSESSMENTS.service,
        url: `/services/${PRICE_ASSESSMENTS.slug}`,
        target: false,
      },
      {
        label: MARKET_ASSESSMENTS.service,
        url: MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT.routes.default,
        target: false,
      },
      { label: FORECASTS.service, url: `/${FORECASTS.slug}`, target: false },
      { label: CONSULTANCY.service, url: `${CONSULTANCY.slug}`, target: false },
      { label: ESG.service, url: `/services/${ESG.slug}`, target: false },
    ],
  },
  {
    title: LITHIUM_ION_BATTERIES.menu,
    icon: 'icons/battery-cells',
    backgroundColor: 'bg-p-100',
    containerArrowClasses:
      'bg-p-100 after:border-x-p-50 after:border-t-p-100 md:after:border-y-p-50 md:after:border-l-p-100',
    products: [
      { label: SOURCE.service, url: SOURCE.slug, target: true },
      { label: FORECASTS.service, url: `/${FORECASTS.slug}`, target: false },
      { label: CONSULTANCY.service, url: `${CONSULTANCY.slug}`, target: false },
      { label: ESG.service, url: `/services/${ESG.slug}`, target: false },
    ],
  },
  {
    title: 'EV, ESS, Portable Tech',
    icon: 'icons/vehicle-logo',
    backgroundColor: 'bg-p-50',
    containerArrowClasses:
      'hidden bg-p-50 after:border-t-p-50 after:border-x-p-50 after:border-t-p-50 md:block md:after:border-y-p-50 md:after:border-l-p-50',
    products: [
      { label: SOURCE.service, url: SOURCE.slug, target: true },
      { label: CONSULTANCY.service, url: `${CONSULTANCY.slug}`, target: false },
      { label: ESG.service, url: `/services/${ESG.slug}`, target: false },
    ],
  },
]

export const consultancyOurProcess = [
  {
    icon: 'icon-currency-dollar',
    backgroundColor: 'bg-p-700',
    containerArrowClasses:
      'bg-p-700 after:border-x-p-500 after:border-t-p-700 md:after:border-y-p-500 md:after:border-l-p-700',
    description:
      'Present and historical market prices for lithium, graphite, cobalt and nickel.',
  },
  {
    icon: 'icon-mine',
    backgroundColor: 'bg-p-500',
    containerArrowClasses:
      'bg-p-500 after:border-x-p-300 after:border-t-p-500 md:after:border-y-p-300 md:after:border-l-p-500',
    description:
      'Mine by mine, project by project databases for each of the key battery raw materials.',
  },
  {
    icon: 'icon-factory',
    backgroundColor: 'bg-p-300',
    containerArrowClasses:
      'bg-p-300 after:border-x-p-100 after:border-t-p-300 md:after:border-y-p-100 md:after:border-l-p-300',
    description: 'Cathodes and anode plant database.',
  },
  {
    icon: 'icon-chart-bar',
    backgroundColor: 'bg-p-100',
    containerArrowClasses:
      'bg-p-100 after:border-x-p-50 after:border-t-p-100 md:after:border-y-p-50 md:after:border-l-p-100',
    description:
      'Cost Curves for each of the key raw materials and battery cells, updated each quarter.',
  },
  {
    icon: 'icon-battery-cell',
    backgroundColor: 'bg-p-50',
    containerArrowClasses:
      'hidden bg-p-50 after:border-t-p-50 after:border-x-p-50 after:border-t-p-50 md:block md:after:border-y-p-50 md:after:border-l-p-50',
    description:
      'Global lithium ion battery capacity by plant, chemistry, format and size',
  },
]
