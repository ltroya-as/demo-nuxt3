/** @module */
import { checkboxes, methodology, icon, seo } from './common'

/** @constants */
import {
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
} from '~/constants/services/constants'

export const LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED = {
  seo,
  hero: {
    methodology,
    title: `${LITHIUM_ION_BATTERIES.capacityName} Gigafactory Capacities`,
    checkboxes,
    images: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719515546/assets/market/lithium-ion-batteries/data-and-reports/lithium-ion-batteries-data-and-reports_plstyc.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719515546/assets/market/lithium-ion-batteries/data-and-reports/lithium-ion-batteries-data-and-reports_plstyc.png?_i=AA',
    },
  },
  title: {
    icon,
    text: `${LITHIUM_ION_BATTERIES.capacitySimplifiedName} Assessment`,
  },
  subtitle: `${LITHIUM_ION_BATTERIES.capacityName} Capacities`,
  descriptions: {
    title: null,
    texts: [
      'The battery Gigafactory concept, Tesla’s Gigafactory 1, became a reality in 2016 and sparked a global battery arms race to shift the world to electric vehicles and energy storage.',
      'These multi-gigawatt hour facilities are an order of magnitude bigger than their predecessors and the impact on the supply chains that feed them has been profound.',
      'Understanding the plans of all current and emerging players in the lithium ion battery space is crucial to assessing the fate of electric vehicles and reducing the world’s reliance on fossil fuels via energy storage.',
    ],
  },
  packages: {
    title: `${MARKET_ASSESSMENTS.singularName} Package`,
    services: [
      {
        icon: 'services/icon-chart-line',
        description:
          'Access to exclusive Battery Cells data, with company and regional capacity, and supply demand/analytics.',
      },
      {
        icon: 'services/icon-report',
        description:
          'Monthly report providing Battery Cell insights and analysis to reveal the direction of the downstream battery sector.',
      },
      {
        icon: 'services/icon-global',
        description:
          'A global perspective on the evolution of the Anode industry.',
      },
      {
        icon: 'services/icon-idea',
        description:
          'Our goal is to help you understand the context of our data, not just give you the numbers.',
      },
    ],
    classes: '',
  },
  subscribe: {
    checkboxes,
    methodology,
  },
}
