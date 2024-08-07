/** @module */
import {
  icon,
  title,
  subtitleCathode,
  subtitlePrecursor,
  commonTabs,
  seoCathode,
  seoPrecursor,
  defaultTab,
  slugCathode,
  productCathode,
  colorsCathode,
  unitCathode,
  unitPrecursor,
  colorsPrecursor,
  productPrecursor,
  slugPrecursor,
  circleClassColorsPrecursor,
  checkClassColorsPrecursor,
  circleClassColorsCathode,
  checkClassColorsCathode,
} from './common'

/** @constants */
import {
  CATHODE,
  PRECURSOR_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
} from '~/constants/services/constants'

export const CATHODE_CAPACITIES_AUTHORIZED = {
  defaultTab,
  commonTabs,
  title: {
    icon,
    text: title,
  },
  [CATHODE.slug]: {
    seo: seoCathode,
    subtitle: subtitleCathode,
    slug: slugCathode,
    product: productCathode,
    colors: colorsCathode,
    circleClassColors: circleClassColorsCathode,
    checkClassColors: checkClassColorsCathode,
    unit: unitCathode,
    subscription: SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
  },
  [PRECURSOR_ASSESSMENT.capacitySlug]: {
    seo: seoPrecursor,
    subtitle: subtitlePrecursor,
    slug: slugPrecursor,
    product: productPrecursor,
    colors: colorsPrecursor,
    circleClassColors: circleClassColorsPrecursor,
    checkClassColors: checkClassColorsPrecursor,
    unit: unitPrecursor,
    subscription: SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  },
}
