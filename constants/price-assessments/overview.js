import {
  PRICE_ASSESSMENTS_ANODE,
  PRICE_ASSESSMENTS_CATHODE,
  PRICE_ASSESSMENTS_COBALT,
  PRICE_ASSESSMENTS_LITHIUM,
  PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
  PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  PRICE_ASSESSMENTS_NICKEL,
  PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
  PRICE_ASSESSMENTS_RARE_EARTHS,
  PRICE_ASSESSMENTS_BLACK_MASS,
} from '~/constants/services/price-assessments'
import {
  ANODE,
  CATHODE,
  COBALT,
  LITHIUM,
  LITHIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  NICKEL,
  PRICE_ASSESSMENTS,
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
  BLACK_MASS,
} from '~/constants/services/constants'

const overview = {
  title: PRICE_ASSESSMENTS.name,
  subtitle:
    'Partner with Benchmark’s Price Reporting Agency (PRA) to empower your lithium, nickel, cobalt, graphite, cathode, anode and battery cell contract and pricing decisions.',
  service: PRICE_ASSESSMENTS.slug,
  moreInfo:
    'For more information on our other subscriptions, contact Benchmark’s price specialists today.',
  availableText:
    'For more information on our other subscriptions, contact Benchmark’s price specialists today.',
  packages: [
    {
      icon: 'Pricing',
      description:
        'Most detailed, IOSCO regulated battery raw material and battery cell prices',
      title: 'Benchmark Prices',
    },
    {
      icon: 'Data',
      description:
        'Weekly, bi-weekly and monthly data cycles that are constantly reviewed.',
      title: 'Constant Price Data Stream',
    },
    {
      icon: 'Dynamic',
      description:
        'Join the industry and use our prices in and to negotiate contracts.',
      title: 'Embedded in industry',
    },
  ],
  servicesPrice: [
    {
      membership: PRICE_ASSESSMENTS_LITHIUM.subscription,
      name: LITHIUM.simplifiedName,
      icon: LITHIUM.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: LITHIUM.slug,
      },
      menu: PRICE_ASSESSMENTS_LITHIUM.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, LITHIUM.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_COBALT.subscription,
      name: COBALT.simplifiedName,
      icon: COBALT.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: COBALT.slug,
      },
      menu: PRICE_ASSESSMENTS_COBALT.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, COBALT.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_NICKEL.subscription,
      name: NICKEL.simplifiedName,
      icon: NICKEL.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: NICKEL.slug,
      },
      menu: PRICE_ASSESSMENTS_NICKEL.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, NICKEL.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_NATURAL_GRAPHITE.subscription,
      name: NATURAL_GRAPHITE.simplifiedName,
      icon: NATURAL_GRAPHITE.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: NATURAL_GRAPHITE.slug,
      },
      menu: PRICE_ASSESSMENTS_NATURAL_GRAPHITE.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, NATURAL_GRAPHITE.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.subscription,
      name: SYNTHETIC_GRAPHITE.simplifiedName,
      icon: SYNTHETIC_GRAPHITE.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: SYNTHETIC_GRAPHITE.slug,
      },
      menu: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, SYNTHETIC_GRAPHITE.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_ANODE.subscription,
      name: ANODE.simplifiedName,
      icon: ANODE.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: ANODE.slug,
      },
      menu: PRICE_ASSESSMENTS_ANODE.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, ANODE.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_CATHODE.subscription,
      name: CATHODE.simplifiedName,
      icon: CATHODE.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: CATHODE.slug,
      },
      menu: PRICE_ASSESSMENTS_CATHODE.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, CATHODE.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES.subscription,
      name: LITHIUM_ION_BATTERIES.forecasts.name,
      icon: LITHIUM_ION_BATTERIES.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: LITHIUM_ION_BATTERIES.slug,
      },
      menu: PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, 'battery-cell'],
    },
    {
      membership: PRICE_ASSESSMENTS_BLACK_MASS.subscription,
      name: BLACK_MASS.simplifiedName,
      icon: BLACK_MASS.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: BLACK_MASS.slug,
      },
      backgroundIcon: 'bg-p-400',
      menu: PRICE_ASSESSMENTS_BLACK_MASS.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, BLACK_MASS.slug],
    },
    {
      membership: PRICE_ASSESSMENTS_RARE_EARTHS.subscription,
      name: RARE_EARTHS.simplifiedName,
      icon: RARE_EARTHS.iconLine,
      methodology: {
        active: true,
        type: 'file',
        data: RARE_EARTHS.slug,
      },
      backgroundIcon: 'bg-p-400',
      menu: PRICE_ASSESSMENTS_RARE_EARTHS.overview,
      initialFields: [PRICE_ASSESSMENTS.slug, RARE_EARTHS.slug],
    },
  ],
}
export default overview
