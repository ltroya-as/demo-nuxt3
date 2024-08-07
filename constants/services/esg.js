import {
  COBALT,
  RARE_EARTHS,
  ESG,
  LITHIUM,
  NICKEL,
  NATURAL_GRAPHITE,
  SUBSCRIPTION_ESG_COBALT,
  SUBSCRIPTION_ESG_LITHIUM,
  SUBSCRIPTION_ESG_NICKEL,
  SUBSCRIPTION_ESG_RARE_EARTHS,
  GRAPHITE,
  SUBSCRIPTION_ESG_GRAPHITE,
  SYNTHETIC_GRAPHITE,
  BATTERY_EMISSIONS_ANALYSER,
  SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER,
  MARKET,
  SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'
import {
  getChildrenSidebar,
  getRoute,
  getRoutes,
} from '~/constants/services/methods'

export const ESG_LITHIUM = {
  name: LITHIUM.name,
  slug: LITHIUM.slug,
  subscription: SUBSCRIPTION_ESG_LITHIUM,
  checkbox: LITHIUM.slug,
  routes: getRoutes(LITHIUM.slug, ESG.slug, 'reports', false),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(LITHIUM.slug, MARKET.slug),
  ),
}

export const ESG_COBALT = {
  name: COBALT.name,
  slug: COBALT.slug,
  subscription: SUBSCRIPTION_ESG_COBALT,
  checkbox: COBALT.slug,
  routes: getRoutes(COBALT.slug, ESG.slug, 'reports', false),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(COBALT.slug, MARKET.slug),
  ),
}

export const ESG_BATTERY_EMISSIONS_ANALYSER = {
  name: BATTERY_EMISSIONS_ANALYSER.name,
  slug: BATTERY_EMISSIONS_ANALYSER.slug,
  subscription: SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER,
  checkbox: 'battery-cell',
  routes: getRoutes(
    BATTERY_EMISSIONS_ANALYSER.slug,
    ESG.slug,
    'reports',
    false,
  ),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(BATTERY_EMISSIONS_ANALYSER.slug, MARKET.slug),
  ),
}

export const ESG_NICKEL = {
  name: NICKEL.name,
  slug: NICKEL.slug,
  subscription: SUBSCRIPTION_ESG_NICKEL,
  checkbox: NICKEL.slug,
  routes: getRoutes(NICKEL.slug, ESG.slug, 'reports', false),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(NICKEL.slug, MARKET.slug),
  ),
}

export const ESG_NATURAL_GRAPHITE = {
  name: NATURAL_GRAPHITE.name,
  slug: NATURAL_GRAPHITE.slug,
  checkbox: NATURAL_GRAPHITE.slug,
  subscription: SUBSCRIPTION_ESG_GRAPHITE,
}

export const ESG_SYNTHETIC_GRAPHITE = {
  name: SYNTHETIC_GRAPHITE.name,
  slug: SYNTHETIC_GRAPHITE.slug,
  checkbox: SYNTHETIC_GRAPHITE.slug,
  subscription: SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE,
}

export const ESG_GRAPHITE = {
  name: GRAPHITE.name,
  slug: GRAPHITE.slug,
  subscription: SUBSCRIPTION_ESG_GRAPHITE,
  checkbox: [NATURAL_GRAPHITE.slug, SYNTHETIC_GRAPHITE.slug],
  routes: getRoutes(GRAPHITE.slug, ESG.slug, 'reports', false),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(NATURAL_GRAPHITE.slug, MARKET.slug),
  ),
}

export const ESG_RARE_EARTHS = {
  name: RARE_EARTHS.name,
  slug: RARE_EARTHS.slug,
  subscription: SUBSCRIPTION_ESG_RARE_EARTHS,
  checkbox: RARE_EARTHS.slug,
  routes: getRoutes(RARE_EARTHS.slug, ESG.slug, 'reports', false),
  overview: getChildrenSidebar(
    [
      {
        name: 'View Product',
        path: `sustainability/?tab=overview`,
      },
    ],
    getRoute(RARE_EARTHS.slug, MARKET.slug),
  ),
}
