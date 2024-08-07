import {
  ANODE,
  CATHODE,
  COBALT,
  BATTERY_EMISSIONS_ANALYSER,
  ESG,
  FORECASTS,
  GIGAFACTORY_ASSESSMENT,
  PRECURSOR_ASSESSMENT,
  LITHIUM,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  NATURAL_GRAPHITE,
  NICKEL,
  GRAPHITE,
  PRICE_ASSESSMENTS,
  RECYCLING,
  RARE_EARTHS,
  MANGANESE,
  PHOSPHATE,
  SOLID_STATE,
  SODIUM_ION_BATTERIES,
  SOURCE,
  PRICE_DASHBOARD,
  SUBSCRIPTION_ESG_NICKEL,
  SUBSCRIPTION_ESG_GRAPHITE,
  SUBSCRIPTION_ESG_RARE_EARTHS,
  SUBSCRIPTION_ESG_COBALT,
  SUBSCRIPTION_ESG_LITHIUM,
  SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER,
  SUBSCRIPTION_FORECASTS_ANODE,
  SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES,
  SUBSCRIPTION_FORECASTS_CATHODE,
  SUBSCRIPTION_FORECASTS_COBALT,
  SUBSCRIPTION_FORECASTS_LITHIUM,
  SUBSCRIPTION_FORECASTS_SILICON_ANODE,
  SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE,
  SUBSCRIPTION_FORECASTS_NICKEL,
  SUBSCRIPTION_FORECASTS_RECYCLING,
  SUBSCRIPTION_FORECASTS_SOLID_STATE,
  SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE,
  SUBSCRIPTION_FORECASTS_RARE_EARTHS,
  SUBSCRIPTION_FORECASTS_MANGANESE,
  SUBSCRIPTION_FORECASTS_PHOSPHATE,
  SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
  SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT,
  SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM,
  SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
  SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL,
  SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS,
  SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
  SUBSCRIPTION_SOURCE_SUBSCRIBER,
  SYNTHETIC_GRAPHITE,
  BLACK_MASS,
  SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
  FLUORSPAR,
  SUBSCRIPTION_FORECASTS_FLUORSPAR,
} from '~/constants/services/constants'
import {
  PRICE_ASSESSMENTS_ANODE,
  PRICE_ASSESSMENTS_BLACK_MASS,
  PRICE_ASSESSMENTS_CATHODE,
  PRICE_ASSESSMENTS_COBALT,
  PRICE_ASSESSMENTS_LITHIUM,
  PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  PRICE_ASSESSMENTS_NICKEL,
  PRICE_ASSESSMENTS_RARE_EARTHS,
  PRICE_ASSESSMENTS_PRICE_DASHBOARD,
  PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
} from '~/constants/services/price-assessments'
import {
  MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
} from '~/constants/services/market-assessments'
import {
  FORECASTS_ANODE,
  FORECASTS_LITHIUM_ION_BATTERIES,
  FORECASTS_CATHODE,
  FORECASTS_COBALT,
  FORECASTS_LITHIUM,
  FORECASTS_SILICON_ANODE,
  FORECASTS_NATURAL_GRAPHITE,
  FORECASTS_NICKEL,
  FORECASTS_RECYCLING,
  FORECASTS_SOLID_STATE,
  FORECASTS_SYNTHETIC_GRAPHITE,
  FORECASTS_MANGANESE,
  FORECASTS_PHOSPHATE,
  FORECASTS_FLUORSPAR,
} from '~/constants/services/forecasts'

export const LEARN_MORE_LINKS = {
  [FORECASTS_LITHIUM.subscription]: FORECASTS_LITHIUM.routes.default,
  [FORECASTS_SILICON_ANODE.subscription]:
    FORECASTS_SILICON_ANODE.routes.default,
  [FORECASTS_LITHIUM_ION_BATTERIES.subscription]:
    FORECASTS_LITHIUM_ION_BATTERIES.routes.default,
  [FORECASTS_COBALT.subscription]: FORECASTS_COBALT.routes.default,
  [FORECASTS_NICKEL.subscription]: FORECASTS_NICKEL.routes.default,
  [FORECASTS_NATURAL_GRAPHITE.subscription]:
    FORECASTS_NATURAL_GRAPHITE.routes.default,
  [FORECASTS_SYNTHETIC_GRAPHITE.subscription]:
    FORECASTS_SYNTHETIC_GRAPHITE.routes.default,
  [FORECASTS_SOLID_STATE.subscription]: FORECASTS_SOLID_STATE.routes.default,
  [FORECASTS_ANODE.subscription]: FORECASTS_ANODE.routes.default,
  [FORECASTS_CATHODE.subscription]: FORECASTS_CATHODE.routes.default,
  [FORECASTS_RECYCLING.subscription]: FORECASTS_RECYCLING.routes.default,
  [FORECASTS_MANGANESE.subscription]: FORECASTS_MANGANESE.routes.default,
  [FORECASTS_PHOSPHATE.subscription]: FORECASTS_PHOSPHATE.routes.default,
  [FORECASTS_FLUORSPAR.subscription]: FORECASTS_FLUORSPAR.routes.default,
  subscriber: '/about',
  [MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT.subscription]:
    MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT.routes.default,
  [MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT.subscription]:
    MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT.routes.default,
  [MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES.subscription]:
    MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES.routes.default,
  [PRICE_ASSESSMENTS_ANODE.subscription]:
    PRICE_ASSESSMENTS_ANODE.routes.default,
  [PRICE_ASSESSMENTS_CATHODE.subscription]:
    PRICE_ASSESSMENTS_CATHODE.routes.default,
  [PRICE_ASSESSMENTS_LITHIUM.subscription]:
    PRICE_ASSESSMENTS_LITHIUM.routes.default,
  [PRICE_ASSESSMENTS_NICKEL.subscription]:
    PRICE_ASSESSMENTS_NICKEL.routes.default,
  [PRICE_ASSESSMENTS_COBALT.subscription]:
    PRICE_ASSESSMENTS_COBALT.routes.default,
  [PRICE_ASSESSMENTS_NATURAL_GRAPHITE.subscription]:
    PRICE_ASSESSMENTS_NATURAL_GRAPHITE.routes.default,
  [PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.subscription]:
    PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.routes.default,
  [PRICE_ASSESSMENTS_RARE_EARTHS.subscription]:
    PRICE_ASSESSMENTS_RARE_EARTHS.routes.default,
  [PRICE_ASSESSMENTS_PRICE_DASHBOARD.subscription]:
    PRICE_ASSESSMENTS_PRICE_DASHBOARD.routes.default,
  [SUBSCRIPTION_ESG_LITHIUM]: `/${ESG.slug}`,
  [SUBSCRIPTION_ESG_COBALT]: `/${ESG.slug}`,
  [SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER]: `/${ESG.slug}`,
  [SUBSCRIPTION_ESG_NICKEL]: `/${ESG.slug}`,
  [SUBSCRIPTION_ESG_GRAPHITE]: `/${ESG.slug}`,
  [SUBSCRIPTION_ESG_RARE_EARTHS]: `/${ESG.slug}`,
  [PRICE_ASSESSMENTS_BLACK_MASS.subscription]:
    PRICE_ASSESSMENTS_BLACK_MASS.routes.default,
}
export const SUBSCRIPTIONS = {
  [FORECASTS.name]: [
    {
      name: LITHIUM.menu,
      slug: SUBSCRIPTION_FORECASTS_LITHIUM,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: LITHIUM_ION_BATTERIES.menu,
      slug: SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: COBALT.menu,
      slug: SUBSCRIPTION_FORECASTS_COBALT,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: NICKEL.menu,
      slug: SUBSCRIPTION_FORECASTS_NICKEL,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: NATURAL_GRAPHITE.menu,
      slug: SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: SYNTHETIC_GRAPHITE.menu,
      slug: SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: SOLID_STATE.menu,
      slug: SUBSCRIPTION_FORECASTS_SOLID_STATE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: ANODE.menu,
      slug: SUBSCRIPTION_FORECASTS_ANODE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: CATHODE.menu,
      slug: SUBSCRIPTION_FORECASTS_CATHODE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: LITHIUM.menu,
      slug: SUBSCRIPTION_FORECASTS_SILICON_ANODE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: RECYCLING.menu,
      slug: SUBSCRIPTION_FORECASTS_RECYCLING,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: RARE_EARTHS.menu,
      slug: SUBSCRIPTION_FORECASTS_RARE_EARTHS,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: MANGANESE.name,
      slug: SUBSCRIPTION_FORECASTS_MANGANESE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: PHOSPHATE.name,
      slug: SUBSCRIPTION_FORECASTS_PHOSPHATE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: FLUORSPAR.name,
      slug: SUBSCRIPTION_FORECASTS_FLUORSPAR,
      status: 'null',
      expirationDate: 'none',
    },
  ],
  [SOURCE.name]: [
    {
      name: 'Subscriber',
      slug: SUBSCRIPTION_SOURCE_SUBSCRIBER,
      status: 'null',
      expirationDate: 'none',
    },
  ],
  [MARKET_ASSESSMENTS.name]: [
    {
      name: GIGAFACTORY_ASSESSMENT.menu,
      slug: SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: PRECURSOR_ASSESSMENT.menu,
      slug: SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: SODIUM_ION_BATTERIES.menu,
      slug: SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
      status: 'null',
      expirationDate: 'none',
    },
  ],
  [PRICE_ASSESSMENTS.name]: [
    {
      name: PRICE_DASHBOARD.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: LITHIUM.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: COBALT.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: NICKEL.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: NATURAL_GRAPHITE.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: SYNTHETIC_GRAPHITE.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: LITHIUM_ION_BATTERIES.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: ANODE.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: CATHODE.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: BLACK_MASS.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: RARE_EARTHS.menu,
      slug: SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS,
      status: 'null',
      expirationDate: 'none',
    },
  ],
  [ESG.name]: [
    {
      name: LITHIUM.menu,
      slug: SUBSCRIPTION_ESG_LITHIUM,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: COBALT.menu,
      slug: SUBSCRIPTION_ESG_COBALT,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: BATTERY_EMISSIONS_ANALYSER.menu,
      slug: SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: NICKEL.menu,
      slug: SUBSCRIPTION_ESG_NICKEL,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: GRAPHITE.menu,
      slug: SUBSCRIPTION_ESG_GRAPHITE,
      status: 'null',
      expirationDate: 'none',
    },
    {
      name: RARE_EARTHS.menu,
      slug: SUBSCRIPTION_ESG_RARE_EARTHS,
      status: 'null',
      expirationDate: 'none',
    },
  ],
}

export const subscriptionsQueryParamValues = (() => {
  let queryParam = ''
  let wasFirstValueAdded = false
  const key = 'slugs[]='
  const subscriptionsValues = Object.values(SUBSCRIPTIONS)

  subscriptionsValues.forEach((subscriptions) =>
    subscriptions.forEach((sub) => {
      if (wasFirstValueAdded) queryParam += '&'
      else wasFirstValueAdded = true

      queryParam += key + sub.slug
    }),
  )

  return queryParam
})()

export const MEMBERSHIP_ACF_TO_MEMBERSHIP_RCP = {
  anode: SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE,
  cathode: SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
  cobalt: SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT,
  gigafactory: SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  graphite: SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  lithium: SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM,
  megafactory: SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  natural_graphite: SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  nickel: SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL,
  synthetic_graphite: SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
  black_mass: SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
}

/**
 * ACF subscriptions are mapped here to RCP subscriptions.
 * @param {string} subscription
 * @returns {string}
 */
export const getSubscriptionRCPByACF = (subscription) => {
  return MEMBERSHIP_ACF_TO_MEMBERSHIP_RCP[subscription] ?? subscription
}
