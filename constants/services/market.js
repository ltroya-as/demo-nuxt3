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
  MARKET,
  SYNTHETIC_GRAPHITE,
  MANGANESE,
  PHOSPHATE,
  FLUORSPAR,
  SILICON_ANODE,
  SODIUM_ION_BATTERIES,
  SOLID_STATE,
  RECYCLING,
  SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
} from '~/constants/services/constants'
import { getMenu, getRoutes, getSidebar } from '~/constants/services/methods'

const getMenuByProductName = () => {
  return [
    { name: 'portal', path: 'portal' },
    { name: 'market insights', path: 'market-insights' },
    { name: 'data & reports', path: 'data-reports' },
  ]
}

export const MARKET_PRICE_DASHBOARD = {
  subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
  menu: getMenu(
    PRICE_DASHBOARD.menu,
    PRICE_DASHBOARD.slug,
    MARKET.slug,
    true,
    'chart-builder',
  ),
  routes: getRoutes(PRICE_DASHBOARD.slug, MARKET.slug, 'chart-builder', false),
  sidebar: getSidebar(
    PRICE_DASHBOARD.slug,
    PRICE_DASHBOARD.sidebar,
    MARKET.slug,
    PRICE_DASHBOARD.iconLine,
    [
      { name: 'chart builder', path: 'chart-builder' },
      { name: 'watchlists', path: 'watchlist' },
    ],
    true,
  ),
}

export const MARKET_LITHIUM = {
  sidebar: getSidebar(
    LITHIUM.slug,
    LITHIUM.sidebar,
    MARKET.slug,
    LITHIUM.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: `Lithium Prices`, path: 'lithium-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_COBALT = {
  sidebar: getSidebar(
    COBALT.slug,
    COBALT.sidebar,
    MARKET.slug,
    COBALT.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: 'Cobalt Prices', path: 'cobalt-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'Sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_NICKEL = {
  sidebar: getSidebar(
    NICKEL.slug,
    NICKEL.sidebar,
    MARKET.slug,
    NICKEL.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: 'Nickel Prices', path: 'nickel-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_NATURAL_GRAPHITE = {
  sidebar: getSidebar(
    NATURAL_GRAPHITE.slug,
    NATURAL_GRAPHITE.sidebar,
    MARKET.slug,
    NATURAL_GRAPHITE.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: 'Natural Graphite Prices', path: 'natural-graphite-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'Sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_SYNTHETIC_GRAPHITE = {
  sidebar: getSidebar(
    SYNTHETIC_GRAPHITE.slug,
    SYNTHETIC_GRAPHITE.sidebar,
    MARKET.slug,
    SYNTHETIC_GRAPHITE.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: 'Synthetic Graphite Prices', path: 'synthetic-graphite-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'Sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_LITHIUM_ION_BATTERIES = {
  sidebar: getSidebar(
    LITHIUM_ION_BATTERIES.slug,
    LITHIUM_ION_BATTERIES.sidebar,
    MARKET.slug,
    LITHIUM_ION_BATTERIES.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      {
        name: `Lithium ion Batteries Prices`,
        path: 'lithium-ion-batteries-prices',
      },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'capacity database', path: 'capacity-database' },
    ],
  ),
}

export const MARKET_ANODE = {
  sidebar: getSidebar(ANODE.slug, ANODE.sidebar, MARKET.slug, ANODE.iconLine, [
    { name: 'portal', path: 'portal' },
    { name: 'market insights', path: 'market-insights' },
    { name: `Anode Prices`, path: 'anode-prices' },
    { name: 'data & reports', path: 'data-reports' },
    { name: 'capacity database', path: 'capacity-database' },
  ]),
}

export const MARKET_CATHODE = {
  sidebar: getSidebar(
    CATHODE.slug,
    CATHODE.sidebar,
    MARKET.slug,
    CATHODE.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: `Cathode Prices`, path: 'cathode-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'capacity database', path: 'capacity-database' },
    ],
  ),
}

export const MARKET_RARE_EARTHS = {
  sidebar: getSidebar(
    RARE_EARTHS.slug,
    RARE_EARTHS.sidebar,
    MARKET.slug,
    RARE_EARTHS.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: `Rare Earths Prices`, path: 'rare-earths-prices' },
      { name: 'data & reports', path: 'data-reports' },
      { name: 'sustainability', path: 'sustainability' },
    ],
  ),
}

export const MARKET_MANGANESE = {
  sidebar: getSidebar(
    MANGANESE.slug,
    MANGANESE.sidebar,
    MARKET.slug,
    MANGANESE.iconLine,
    getMenuByProductName(),
  ),
}

export const MARKET_PHOSPHATE = {
  sidebar: getSidebar(
    PHOSPHATE.slug,
    PHOSPHATE.sidebar,
    MARKET.slug,
    PHOSPHATE.iconLine,
    getMenuByProductName(),
  ),
}

export const MARKET_FLUORSPAR = {
  sidebar: getSidebar(
    FLUORSPAR.slug,
    FLUORSPAR.sidebar,
    MARKET.slug,
    FLUORSPAR.iconLine,
    getMenuByProductName(),
  ),
}

export const MARKET_SILICON_ANODE = {
  sidebar: getSidebar(
    SILICON_ANODE.slug,
    SILICON_ANODE.sidebar,
    MARKET.slug,
    SILICON_ANODE.iconLine,
    getMenuByProductName(),
  ),
}

export const MARKET_SODIUM_ION_BATTERIES = {
  sidebar: getSidebar(
    SODIUM_ION_BATTERIES.slug,
    SODIUM_ION_BATTERIES.sidebar,
    MARKET.slug,
    SODIUM_ION_BATTERIES.iconLine,
    [
      ...getMenuByProductName(),
      { name: 'capacity database', path: 'capacity-database' },
    ],
  ),
}

export const MARKET_SOLID_STATE = {
  sidebar: getSidebar(
    SOLID_STATE.slug,
    SOLID_STATE.sidebar,
    MARKET.slug,
    SOLID_STATE.iconLine,
    getMenuByProductName(),
  ),
}

export const MARKET_RECYCLING = {
  sidebar: getSidebar(
    RECYCLING.slug,
    RECYCLING.sidebar,
    MARKET.slug,
    RECYCLING.iconLine,
    [
      { name: 'portal', path: 'portal' },
      { name: 'market insights', path: 'market-insights' },
      { name: `Recycling Prices`, path: 'recycling-prices' },
      { name: 'data & reports', path: 'data-reports' },
    ],
  ),
}
