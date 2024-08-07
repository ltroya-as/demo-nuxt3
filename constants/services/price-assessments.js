import {
  ANODE,
  CATHODE,
  COBALT,
  LITHIUM,
  RARE_EARTHS,
  LITHIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  NICKEL,
  PRICE_DASHBOARD,
  PRICE_ASSESSMENTS,
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
  SYNTHETIC_GRAPHITE,
  BLACK_MASS,
  SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
  MARKET,
} from '~/constants/services/constants'
import {
  getChildrenSidebar,
  getMenu,
  getRoute,
  getRoutes,
} from '~/constants/services/methods'

export const PRICE_ASSESSMENTS_PRICE_DASHBOARD = {
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
  menu: getMenu(
    PRICE_DASHBOARD.menu,
    PRICE_DASHBOARD.slug,
    PRICE_ASSESSMENTS.slug,
    true,
    'chart-builder',
  ),
  routes: getRoutes(
    PRICE_DASHBOARD.slug,
    PRICE_ASSESSMENTS.slug,
    'chart-builder',
    false,
  ),
}

export const PRICE_ASSESSMENTS_LITHIUM = {
  checkbox: LITHIUM.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM,
  routes: getRoutes(LITHIUM.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(LITHIUM.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_COBALT = {
  checkbox: COBALT.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT,
  routes: getRoutes(COBALT.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(COBALT.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_NICKEL = {
  checkbox: NICKEL.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL,
  routes: getRoutes(NICKEL.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(NICKEL.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_NATURAL_GRAPHITE = {
  checkbox: NATURAL_GRAPHITE.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  routes: getRoutes(NATURAL_GRAPHITE.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(NATURAL_GRAPHITE.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE = {
  checkbox: SYNTHETIC_GRAPHITE.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
  routes: getRoutes(SYNTHETIC_GRAPHITE.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(SYNTHETIC_GRAPHITE.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES = {
  name: LITHIUM_ION_BATTERIES.name,
  slug: LITHIUM_ION_BATTERIES.slug,
  icon: LITHIUM_ION_BATTERIES.iconColor,
  checkbox: 'battery-cell',
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
  routes: getRoutes(LITHIUM_ION_BATTERIES.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(LITHIUM_ION_BATTERIES.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_ANODE = {
  checkbox: ANODE.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE,
  routes: getRoutes(ANODE.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(ANODE.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_CATHODE = {
  checkbox: CATHODE.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
  routes: getRoutes(CATHODE.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(CATHODE.slug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_BLACK_MASS = {
  checkbox: BLACK_MASS.slug,
  name: BLACK_MASS.name,
  slug: BLACK_MASS.slug,
  icon: BLACK_MASS.iconColor,
  iconLine: BLACK_MASS.iconLine,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
  routes: getRoutes(BLACK_MASS.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(BLACK_MASS.reportSlug, MARKET.slug),
  ),
}

export const PRICE_ASSESSMENTS_RARE_EARTHS = {
  checkbox: RARE_EARTHS.slug,
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS,
  routes: getRoutes(RARE_EARTHS.slug, PRICE_ASSESSMENTS.slug),
  overview: getChildrenSidebar(
    [{ name: 'View Product', path: 'portal' }],
    getRoute(RARE_EARTHS.slug, MARKET.slug),
  ),
}
