import {
  MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
} from '~/constants/services/market-assessments'

import {
  PRICE_ASSESSMENTS_CATHODE,
  PRICE_ASSESSMENTS_ANODE,
} from '~/constants/services/price-assessments'

import {
  ANODE,
  CATHODE,
  LITHIUM_ION_BATTERIES,
  MARKET,
  MARKET_ASSESSMENTS,
  SODIUM_ION_BATTERIES,
} from '~/constants/services/constants'
import { getRouteByOverview } from '~/constants/services/methods'

export const marketAssessmentsOverview = {
  title: MARKET_ASSESSMENTS.name,
  subtitle:
    'Benchmark Market Assessments provide insights into the strategies of both current and emerging players in the lithium ion battery industry. This understanding is crucial for evaluating the future of electric vehicles and decreasing global dependence on fossil fuels through advanced energy storage solutions.',
  descriptions: [
    'Benchmark produces the leading market assessments on monthly cycles to mineral-specific methodologies.',
  ],
  moreInfoText: 'Available Products',
  moreInfoDescription:
    'For more information on our other subscriptions, contact Benchmark’s price specialists today.',
  service: MARKET_ASSESSMENTS.service,
  services: [
    {
      membership: MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT.subscription,
      name: 'Gigafactories',
      icon: LITHIUM_ION_BATTERIES.iconSquare,
      menu: getRouteByOverview(
        MARKET.slug,
        LITHIUM_ION_BATTERIES.slug,
        'capacity-database',
        'View Product',
      ),
      methodology: {
        active: true,
        type: 'file',
        file: {
          category: 'methodology-market-assessments',
          file_name: 'Benchmark-Gigafactory-Assessment-Methodology.pdf',
          EnvKey: 'gigafactoriesPriceAssessmentsMethodologyId',
        },
      },
      backgroundIcon: 'bg-p-400',
      initialFields: [
        LITHIUM_ION_BATTERIES.checkbox,
        MARKET_ASSESSMENTS.checkbox,
      ],
    },
    {
      membership: PRICE_ASSESSMENTS_CATHODE.subscription,
      name: CATHODE.name,
      icon: CATHODE.iconSquare,
      menu: getRouteByOverview(
        MARKET.slug,
        CATHODE.slug,
        'capacity-database',
        'View Product',
      ),
      methodology: {
        active: true,
        type: 'file',
        file: {
          category: 'methodology-price-assessments',
          file_name: 'Benchmark-Cathode-Price-Assessment-Methodology.pdf',
          EnvKey: 'cathodePriceAssessmentsMethodologyId',
        },
      },
      backgroundIcon: 'bg-p-50',
      initialFields: [CATHODE.checkbox, MARKET_ASSESSMENTS.checkbox],
    },
    {
      membership: PRICE_ASSESSMENTS_ANODE.subscription,
      name: ANODE.name,
      icon: ANODE.iconSquare,
      menu: getRouteByOverview(
        MARKET.slug,
        ANODE.slug,
        'capacity-database',
        'View Product',
      ),
      methodology: {
        active: true,
        type: 'file',
        file: {
          category: 'methodology-price-assessments',
          file_name: 'Benchmark-Anode-Price-Assessment-Methodology.pdf',
          EnvKey: 'anodePriceAssessmentsMethodologyId',
        },
      },
      backgroundIcon: 'bg-p-400',
      initialFields: [ANODE.checkbox, MARKET_ASSESSMENTS.checkbox],
    },
    {
      membership: MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES.subscription,
      name: SODIUM_ION_BATTERIES.name,
      icon: SODIUM_ION_BATTERIES.iconSquare,
      menu: getRouteByOverview(
        MARKET.slug,
        SODIUM_ION_BATTERIES.slug,
        'capacity-database',
        'View Product',
      ),
      methodology: {
        active: true,
        type: 'file',
        file: {
          category: 'public-documents',
          file_name:
            'Benchmark-Sodium-Ion-Batteries-Market-Assessment-Methodology.pdf',
          EnvKey: 'sodiumIonBatteriesMarketAssessmentsMethodologyId',
        },
      },
      backgroundIcon: 'bg-p-50',
      initialFields: [
        SODIUM_ION_BATTERIES.checkbox,
        MARKET_ASSESSMENTS.checkbox,
      ],
    },
  ],
  seo: {
    title: MARKET_ASSESSMENTS.name,
    description:
      'Benchmark Market Assessments provide insights into the strategies of both current and emerging players in the lithium ion battery industry. This understanding is crucial for evaluating the future of electric vehicles and decreasing global dependence on fossil fuels through advanced energy storage solutions.',
  },
}
