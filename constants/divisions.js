import {
  ANODE,
  CATHODE,
  COBALT,
  CONSULTANCY,
  ESG,
  FORECASTS,
  LITHIUM,
  SILICON_ANODE,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  NATURAL_GRAPHITE,
  NICKEL,
  PRICE_ASSESSMENTS,
  SOURCE,
  SYNTHETIC_GRAPHITE,
  BLACK_MASS,
  MANGANESE,
  SOLID_STATE,
  RECYCLING,
  RARE_EARTHS,
} from '~/constants/services/constants'

export const DIVISIONS = [
  {
    title: PRICE_ASSESSMENTS.service,
    link: `/services/${PRICE_ASSESSMENTS.slug}`,
    icon: 'Pricing',
    elements: ['li', 'co', 'ni', 'c', 'plus', 'minus', 'battery', 'black-mass'],
    subTitle: 'Offering: annual subscription regularity: monthly',
    description: `The world’s most trusted PRA for future facing commodities`,
    links: [
      {
        name: LITHIUM.menu,
        link: `/market/${LITHIUM.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: NICKEL.menu,
        link: `/market/${NICKEL.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: NATURAL_GRAPHITE.menu,
        link: `/market/${NATURAL_GRAPHITE.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: SYNTHETIC_GRAPHITE.menu,
        link: `/market/${SYNTHETIC_GRAPHITE.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: COBALT.menu,
        link: `/market/${COBALT.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: ANODE.menu,
        link: `/market/${ANODE.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: CATHODE.menu,
        link: `/market/${CATHODE.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: LITHIUM_ION_BATTERIES.menu,
        link: `/market/${LITHIUM_ION_BATTERIES.slug}/data-reports/?tab=price-assessments`,
      },
      {
        name: BLACK_MASS.menu,
        link: `/market/${BLACK_MASS.reportSlug}/data-reports/?tab=price-assessments`,
      },
    ],
  },
  {
    title: MARKET_ASSESSMENTS.service,
    link: `market/${LITHIUM_ION_BATTERIES.slug}/portal`,
    icon: 'Data',
    elements: ['battery'],
    subTitle: 'Offering: annual subscription regularity: monthly',
    description:
      'Unrivalled, granular supply chain data, regularly reassessed and refreshed',
    links: [
      {
        name: 'Lithium ion Batteries',
        link: `market/${LITHIUM_ION_BATTERIES.slug}/portal`,
      },
    ],
  },
  {
    title: FORECASTS.service,
    link: `services/${FORECASTS.slug}`,
    icon: 'about/forecast',
    elements: [
      'li',
      'co',
      'ni',
      'c',
      'mn',
      'plus',
      'minus',
      'battery',
      'car',
      'black-mass',
      'recycling',
    ],
    subTitle: 'Offering: Annual Subscription Regularity: Every 3 Months',
    description:
      'The most extensive supply chain forecasts databases, from mine to EV',
    links: [
      {
        name: LITHIUM.menu,
        link: `/market/${LITHIUM.slug}/data-reports/?tab=forecast`,
      },
      {
        name: COBALT.menu,
        link: `/market/${COBALT.slug}/data-reports/?tab=forecast`,
      },
      {
        name: NICKEL.menu,
        link: `/market/${NICKEL.slug}/data-reports/?tab=forecast`,
      },
      {
        name: NATURAL_GRAPHITE.menu,
        link: `/market/${NATURAL_GRAPHITE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: SYNTHETIC_GRAPHITE.menu,
        link: `/market/${SYNTHETIC_GRAPHITE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: LITHIUM_ION_BATTERIES.menu,
        link: `/market/${LITHIUM_ION_BATTERIES.slug}/data-reports/?tab=forecast`,
      },
      {
        name: MANGANESE.menu,
        link: `/market/${MANGANESE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: ANODE.menu,
        link: `/market/${ANODE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: CATHODE.menu,
        link: `/market/${CATHODE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: SILICON_ANODE.menu,
        link: `/market/${SILICON_ANODE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: SOLID_STATE.menu,
        link: `/market/${SOLID_STATE.slug}/data-reports/?tab=forecast`,
      },
      {
        name: RECYCLING.menu,
        link: `/market/${RECYCLING.slug}/data-reports/?tab=forecast`,
      },
      {
        name: RARE_EARTHS.menu,
        link: `/market/${RARE_EARTHS.slug}/data-reports/?tab=forecast`,
      },
    ],
  },
  {
    title: 'Consultancy and Advisory',
    link: CONSULTANCY.slug,
    icon: 'about/consultancy',
    elements: ['li', 'co', 'ni', 'c', 'mn', 'plus', 'minus', 'battery', 'car'],
    subTitle: 'Offering: Bespoke Regularity: On Request',
    description:
      'Bespoke research from the world’s experts, backed by Benchmark’s proprietary data',
    links: [{ name: 'Benchmark Consultancy', link: `/${CONSULTANCY.slug}` }],
  },
  {
    title: 'Independent verifications / Sustainability',
    link: `/services/${ESG.slug}`,
    icon: 'about/sustainability',
    elements: ['li', 'co', 'ni', 'c'],
    subTitle: 'Offering: Annual Subscription Regularity: Every 3 Months',
    description:
      'Industry-first life cycle assessments, risk metrics, and ESG advisory',
    links: [
      { name: 'ESG Reporting', link: `services/${ESG.slug}` },
      { name: 'LCA Reporting', link: `services/lca` },
      { name: 'Battery Emissions Analyser', link: `services/${ESG.slug}` },
    ],
  },
  {
    title: 'Benchmark Source',
    link: SOURCE.slug,
    icon: 'about/source',
    elements: ['li', 'co', 'ni', 'c', 'mn', 'plus', 'minus', 'battery', 'car'],
    subTitle: 'Offering: Access to Source, daily updates',
    description: 'Your gateway to Benchmark Mineral Intelligence',
    links: [
      {
        name: 'Benchmark Source',
        link: SOURCE.slug,
        target: true,
      },
    ],
  },
]
