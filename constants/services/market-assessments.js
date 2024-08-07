import {
  GIGAFACTORY_ASSESSMENT,
  MARKET_ASSESSMENTS,
  SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  PRECURSOR_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  SODIUM_ION_BATTERIES,
  SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
} from '~/constants/services/constants'
import { getMenu, getRoutes, getSidebar } from '~/constants/services/methods'
export const MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT = {
  name: GIGAFACTORY_ASSESSMENT.name,
  slug: GIGAFACTORY_ASSESSMENT.slug,
  icon: GIGAFACTORY_ASSESSMENT.iconColor,
  subscription: SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  checkbox: 'battery-cell',
  menu: getMenu(
    GIGAFACTORY_ASSESSMENT.menu,
    GIGAFACTORY_ASSESSMENT.slug,
    MARKET_ASSESSMENTS.slug,
  ),
  routes: getRoutes(
    GIGAFACTORY_ASSESSMENT.slug,
    MARKET_ASSESSMENTS.slug,
    'capacities',
    false,
  ),
  sidebar: getSidebar(
    GIGAFACTORY_ASSESSMENT.slug,
    GIGAFACTORY_ASSESSMENT.sidebar,
    MARKET_ASSESSMENTS.slug,
    GIGAFACTORY_ASSESSMENT.iconLine,
    [
      { name: 'capacities', path: 'capacities' },
      { name: 'tier ranking', path: 'tier-ranking' },
      { name: 'reports', path: 'reports' },
    ],
  ),
}

export const MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT = {
  name: PRECURSOR_ASSESSMENT.name,
  slug: PRECURSOR_ASSESSMENT.slug,
  icon: PRECURSOR_ASSESSMENT.iconColor,
  subscription: SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  checkbox: null,
  menu: getMenu(
    PRECURSOR_ASSESSMENT.menu,
    PRECURSOR_ASSESSMENT.slug,
    MARKET_ASSESSMENTS.slug,
  ),
  routes: getRoutes(
    PRECURSOR_ASSESSMENT.slug,
    MARKET_ASSESSMENTS.slug,
    'capacities',
    false,
  ),
  sidebar: getSidebar(
    PRECURSOR_ASSESSMENT.slug,
    PRECURSOR_ASSESSMENT.sidebar,
    MARKET_ASSESSMENTS.slug,
    PRECURSOR_ASSESSMENT.iconLine,
    [
      { name: 'capacities', path: 'capacities' },
      { name: 'reports', path: 'reports' },
    ],
  ),
}

export const MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES = {
  name: SODIUM_ION_BATTERIES.name,
  slug: SODIUM_ION_BATTERIES.slug,
  icon: SODIUM_ION_BATTERIES.iconColor,
  subscription: SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
  checkbox: 'sodium-ion',
  menu: getMenu(
    SODIUM_ION_BATTERIES.menu,
    SODIUM_ION_BATTERIES.slug,
    MARKET_ASSESSMENTS.slug,

    true,
    'battery cell capacities',
  ),
  routes: getRoutes(
    SODIUM_ION_BATTERIES.slug,
    MARKET_ASSESSMENTS.slug,
    'battery-cell-capacities',
    false,
  ),
  sidebar: getSidebar(
    SODIUM_ION_BATTERIES.slug,
    SODIUM_ION_BATTERIES.sidebar,
    MARKET_ASSESSMENTS.slug,
    SODIUM_ION_BATTERIES.iconLine,
    [
      { name: 'battery cell capacities', path: 'battery-cell-capacities' },
      { name: 'anode capacities', path: 'anode-capacities' },
      { name: 'cathode capacities', path: 'cathode-capacities' },
      { name: 'reports', path: 'reports' },
    ],
  ),
}
