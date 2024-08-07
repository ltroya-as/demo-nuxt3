import {
  ANODE,
  LITHIUM_ION_BATTERIES,
  CATHODE,
  COBALT,
  FORECASTS,
  LITHIUM,
  SILICON_ANODE,
  SODIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  NICKEL,
  RECYCLING,
  SOLID_STATE,
  SUBSCRIPTION_FORECASTS_ANODE,
  SUBSCRIPTION_FORECASTS_SODIUM_ION_BATTERIES,
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
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
  SUBSCRIPTION_FORECASTS_RARE_EARTHS,
  MANGANESE,
  SUBSCRIPTION_FORECASTS_MANGANESE,
  PHOSPHATE,
  SUBSCRIPTION_FORECASTS_PHOSPHATE,
  FLUORSPAR,
  SUBSCRIPTION_FORECASTS_FLUORSPAR,
  MARKET,
} from '~/constants/services/constants'
import {
  getChildrenSidebar,
  getRoute,
  getRoutes,
} from '~/constants/services/methods'

export const FORECASTS_LITHIUM_ION_BATTERIES = {
  name: LITHIUM_ION_BATTERIES.name,
  slug: LITHIUM_ION_BATTERIES.slug,
  subscription: SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES,
  checkbox: 'lithium-ion',
  routes: getRoutes(
    LITHIUM_ION_BATTERIES.slug,
    FORECASTS.slug,
    'reports',
    false,
  ),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(LITHIUM_ION_BATTERIES.slug, MARKET.slug),
  ),
}
export const FORECASTS_LITHIUM = {
  name: LITHIUM.name,
  slug: LITHIUM.slug,
  subscription: SUBSCRIPTION_FORECASTS_LITHIUM,
  checkbox: LITHIUM.slug,
  routes: getRoutes(LITHIUM.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(LITHIUM.slug, MARKET.slug),
  ),
}
export const FORECASTS_COBALT = {
  name: COBALT.name,
  slug: COBALT.slug,
  subscription: SUBSCRIPTION_FORECASTS_COBALT,
  checkbox: COBALT.slug,
  routes: getRoutes(COBALT.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(COBALT.slug, MARKET.slug),
  ),
}
export const FORECASTS_NICKEL = {
  name: NICKEL.name,
  slug: NICKEL.slug,
  subscription: SUBSCRIPTION_FORECASTS_NICKEL,
  checkbox: NICKEL.slug,
  routes: getRoutes(NICKEL.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(NICKEL.slug, MARKET.slug),
  ),
}
export const FORECASTS_NATURAL_GRAPHITE = {
  name: NATURAL_GRAPHITE.name,
  slug: NATURAL_GRAPHITE.slug,
  subscription: SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE,
  checkbox: NATURAL_GRAPHITE.slug,
  routes: getRoutes(NATURAL_GRAPHITE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(NATURAL_GRAPHITE.slug, MARKET.slug),
  ),
}
export const FORECASTS_SYNTHETIC_GRAPHITE = {
  name: SYNTHETIC_GRAPHITE.name,
  slug: SYNTHETIC_GRAPHITE.slug,
  subscription: SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE,
  checkbox: SYNTHETIC_GRAPHITE.slug,
  routes: getRoutes(SYNTHETIC_GRAPHITE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(SYNTHETIC_GRAPHITE.slug, MARKET.slug),
  ),
}
export const FORECASTS_SOLID_STATE = {
  name: SOLID_STATE.name,
  slug: SOLID_STATE.slug,
  subscription: SUBSCRIPTION_FORECASTS_SOLID_STATE,
  checkbox: 'battery-cell',
  routes: getRoutes(SOLID_STATE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(SOLID_STATE.slug, MARKET.slug),
  ),
}

export const FORECASTS_ANODE = {
  name: ANODE.name,
  slug: ANODE.slug,
  subscription: SUBSCRIPTION_FORECASTS_ANODE,
  checkbox: ANODE.slug,
  routes: getRoutes(ANODE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(ANODE.slug, MARKET.slug),
  ),
}
export const FORECASTS_CATHODE = {
  name: CATHODE.name,
  slug: CATHODE.slug,
  subscription: SUBSCRIPTION_FORECASTS_CATHODE,
  checkbox: CATHODE.slug,
  routes: getRoutes(CATHODE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(CATHODE.slug, MARKET.slug),
  ),
}
export const FORECASTS_RECYCLING = {
  name: RECYCLING.name,
  slug: RECYCLING.slug,
  subscription: SUBSCRIPTION_FORECASTS_RECYCLING,
  checkbox: RECYCLING.slug,
  routes: getRoutes(RECYCLING.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(RECYCLING.slug, MARKET.slug),
  ),
}
export const FORECASTS_RARE_EARTHS = {
  name: RARE_EARTHS.name,
  slug: RARE_EARTHS.slug,
  subscription: SUBSCRIPTION_FORECASTS_RARE_EARTHS,
  checkbox: FORECASTS.slug,
  routes: getRoutes(RARE_EARTHS.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(RARE_EARTHS.slug, MARKET.slug),
  ),
}
export const FORECASTS_MANGANESE = {
  name: MANGANESE.name,
  slug: MANGANESE.slug,
  subscription: SUBSCRIPTION_FORECASTS_MANGANESE,
  checkbox: MANGANESE.slug,
  routes: getRoutes(MANGANESE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(MANGANESE.slug, MARKET.slug),
  ),
}
export const FORECASTS_PHOSPHATE = {
  name: PHOSPHATE.name,
  slug: PHOSPHATE.slug,
  subscription: SUBSCRIPTION_FORECASTS_PHOSPHATE,
  checkbox: PHOSPHATE.slug,
  routes: getRoutes(PHOSPHATE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(PHOSPHATE.slug, MARKET.slug),
  ),
}

export const FORECASTS_FLUORSPAR = {
  name: FLUORSPAR.name,
  slug: FLUORSPAR.slug,
  subscription: SUBSCRIPTION_FORECASTS_FLUORSPAR,
  checkbox: FLUORSPAR.slug,
  routes: getRoutes(FLUORSPAR.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(FLUORSPAR.slug, MARKET.slug),
  ),
}

export const FORECASTS_SILICON_ANODE = {
  name: SILICON_ANODE.name,
  slug: SILICON_ANODE.slug,
  subscription: SUBSCRIPTION_FORECASTS_SILICON_ANODE,
  checkbox: SILICON_ANODE.slug,
  routes: getRoutes(SILICON_ANODE.slug, FORECASTS.slug, 'reports', false),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(SILICON_ANODE.slug, MARKET.slug),
  ),
}

export const FORECASTS_SODIUM_ION_BATTERIES = {
  name: SODIUM_ION_BATTERIES.name,
  slug: SODIUM_ION_BATTERIES.slug,
  subscription: SUBSCRIPTION_FORECASTS_SODIUM_ION_BATTERIES,
  checkbox: SODIUM_ION_BATTERIES.slug,
  routes: getRoutes(
    SODIUM_ION_BATTERIES.slug,
    FORECASTS.slug,
    'reports',
    false,
  ),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'data-reports/?tab=forecast' }],
    getRoute(SODIUM_ION_BATTERIES.slug, MARKET.slug),
  ),
}
