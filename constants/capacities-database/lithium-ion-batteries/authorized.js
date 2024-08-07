/** @module */
import {
  checkClassColors,
  circleClassColors,
  colors,
  commonTabs,
  defaultTab,
  icon,
  product,
  seo,
  slugGigafactory,
  slugTierRanking,
  subscription,
  subtitleGigafactory,
  title,
  unit,
} from './common'

/** @constants */
import { LITHIUM_ION_BATTERIES } from '~/constants/services/constants'

export const LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED = {
  seo,
  defaultTab,
  commonTabs,
  subscription,
  [slugTierRanking]: {
    slug: slugTierRanking,
    icon,
    title,
    subtitle: subtitleGigafactory,
  },
  [LITHIUM_ION_BATTERIES.capacitySlug]: {
    slug: slugGigafactory,
    icon,
    title,
    subtitle: subtitleGigafactory,
    product,
    colors,
    circleClassColors,
    checkClassColors,
    unit,
    subscription,
  },
}
