import {
  ANODE,
  CONSULTANCY,
  LITHIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  SYNTHETIC_GRAPHITE,
  MANGANESE,
  PHOSPHATE,
  FLUORSPAR,
  RARE_EARTHS,
  SILICON_ANODE,
  SODIUM_ION_BATTERIES,
  SOLID_STATE,
  COBALT,
  NICKEL,
  LITHIUM,
  CATHODE,
  SOURCE,
  RECYCLING,
} from '~/constants/services/constants'

export const menuItems = [
  {
    name: 'Markets',
    open: false,
    groups: [
      {
        name: 'Markets',
        href: '/market',
        hasSubMenu: true,
        children: [
          {
            name: 'Upstream',
            href: '',
            parent: '',
            subMenu: [
              {
                name: LITHIUM.name,
                href: `/${LITHIUM.slug}/portal`,
              },
              {
                name: COBALT.name,
                href: `/${COBALT.slug}/portal`,
              },
              {
                name: NICKEL.name,
                href: `/${NICKEL.slug}/portal`,
              },
              {
                name: NATURAL_GRAPHITE.name,
                href: `/${NATURAL_GRAPHITE.slug}/portal`,
              },
              {
                name: SYNTHETIC_GRAPHITE.name,
                href: `/${SYNTHETIC_GRAPHITE.slug}/portal`,
              },
              {
                name: MANGANESE.name,
                href: `/${MANGANESE.slug}/portal`,
              },
              {
                name: PHOSPHATE.name,
                href: `/${PHOSPHATE.slug}/portal`,
              },
              {
                name: FLUORSPAR.name,
                href: `/${FLUORSPAR.slug}/portal`,
              },
              {
                name: RARE_EARTHS.name,
                href: `/${RARE_EARTHS.slug}/portal`,
              },
            ],
          },
          {
            name: 'Midstream',
            href: '',
            parent: '',
            subMenu: [
              {
                name: ANODE.name,
                href: `/${ANODE.slug}/portal`,
              },
              {
                name: CATHODE.name,
                href: `/${CATHODE.slug}/portal`,
              },
              {
                name: SILICON_ANODE.name,
                href: `/${SILICON_ANODE.slug}/portal`,
              },
            ],
          },
          {
            name: 'Downstream',
            href: '',
            parent: '',
            subMenu: [
              {
                name: LITHIUM_ION_BATTERIES.name,
                href: `/${LITHIUM_ION_BATTERIES.slug}/portal`,
              },
              {
                name: SODIUM_ION_BATTERIES.name,
                href: `/${SODIUM_ION_BATTERIES.slug}/portal`,
              },
              {
                name: SOLID_STATE.name,
                href: `/${SOLID_STATE.slug}/portal`,
              },
              {
                name: RECYCLING.name,
                href: `/${RECYCLING.slug}/portal`,
              },
            ],
          },
        ],
        orderMenuMobile: 1,
      },
    ],
  },
  {
    name: 'Services',
    open: false,
    groups: [
      {
        name: 'SUBSCRIPTIONS',
        href: '',
        children: [
          {
            name: 'Source',
            href: SOURCE.slug,
            target: '_blank',
            parent: '',
            icon: 'source',
          },
          {
            name: 'Price Assessments',
            href: '/services/price-assessments/',
            parent: '',
          },
          {
            name: 'Market Assessments',
            href: '/services/market-assessments/',
            parent: '',
          },
          {
            name: 'Forecasts',
            href: '/services/forecasts/',
            parent: '',
          },
          {
            name: 'ESG Sustainability',
            href: `/services/esg/`,
            parent: '',
          },
        ],
        orderMenuMobile: 1,
      },
      {
        name: 'CONSULTANCY',
        href: '',
        children: [
          {
            name: 'Bespoke Studies',
            href: `/${CONSULTANCY.slug}`,
            parent: '',
          },
          {
            name: 'Life Cycle Assessments Consultancy ',
            href: '/services/lca',
            parent: '',
          },
        ],
        orderMenuMobile: 2,
      },
    ],
  },
  {
    name: 'Tools',
    open: false,
    groups: [
      {
        name: 'Tools',
        href: '',
        children: [
          {
            name: 'Price Dashboard',
            href: '/market/price-dashboard/',
            parent: '',
          },
          {
            name: 'Battery Emissions Analyser',
            href: `/tools/battery-emissions-analyser/`,
            parent: '',
          },
        ],
        orderMenuMobile: 1,
      },
    ],
  },
  {
    name: 'Events',
    open: false,
    groups: [],
    href: '/events/',
  },
  {
    name: 'Newsletters',
    open: false,
    groups: [
      {
        name: 'Newsletters',
        href: '',
        children: [
          {
            name: 'Benchmark Newsletter',
            href: '/newsletter-signup/',
            parent: '',
          },
          {
            name: 'Free Prices',
            href: '/price-spotlight-signup/',
            parent: '',
          },
          {
            name: 'Industry Reports',
            href: '/industry-reports/',
            parent: '',
          },
          {
            name: 'Policy Newsletter',
            href: '/policy-newsletter/',
            parent: '',
          },
          {
            name: 'Copper Weekly',
            href: '/copper-weekly/',
            parent: '',
          },
        ],
        orderMenuMobile: 1,
      },
    ],
  },
  {
    name: 'Contact',
    open: false,
    groups: [],
    modal: 'contact',
    menuStyle: 'border-none',
  },
  {
    name: 'About',
    open: false,
    groups: [
      {
        name: 'About',
        href: '',
        children: [
          {
            name: 'About',
            href: '/about/',
            parent: '',
          },
          {
            name: 'Join us',
            href: '/join-us/',
            parent: '',
          },
          {
            name: 'Announcements',
            href: `/announcements/`,
            parent: '',
          },
        ],
        orderMenuMobile: 1,
      },
    ],
  },
]

export const menuMobileItems = [
  {
    name: 'Markets',
    open: false,
    groups: [
      {
        name: 'Upstream',
        href: '/market',
        hasSubMenu: true,
        children: [
          {
            name: LITHIUM.name,
            href: `/market/${LITHIUM.slug}/portal`,
          },
          {
            name: COBALT.name,
            href: `/market/${COBALT.slug}/portal`,
          },
          {
            name: NICKEL.name,
            href: `/market/${NICKEL.slug}/portal`,
          },
          {
            name: NATURAL_GRAPHITE.name,
            href: `/market/${NATURAL_GRAPHITE.slug}/portal`,
          },
          {
            name: SYNTHETIC_GRAPHITE.name,
            href: `/market/${SYNTHETIC_GRAPHITE.slug}/portal`,
          },
          {
            name: MANGANESE.name,
            href: `/market/${MANGANESE.slug}/portal`,
          },
          {
            name: PHOSPHATE.name,
            href: `/market/${PHOSPHATE.slug}/portal`,
          },
          {
            name: FLUORSPAR.name,
            href: `/market/${FLUORSPAR.slug}/portal`,
          },
          {
            name: RARE_EARTHS.name,
            href: `/market/${RARE_EARTHS.slug}/portal`,
          },
        ],
      },
      {
        name: 'Midstream',
        href: '/market',
        hasSubMenu: true,
        children: [
          {
            name: ANODE.name,
            href: `/market/${ANODE.slug}/portal`,
          },
          {
            name: CATHODE.name,
            href: `/market/${CATHODE.slug}/portal`,
          },
          {
            name: SILICON_ANODE.name,
            href: `/market/${SILICON_ANODE.slug}/portal`,
          },
        ],
      },
      {
        name: 'Downstream',
        href: '/market',
        hasSubMenu: true,
        children: [
          {
            name: LITHIUM_ION_BATTERIES.name,
            href: `/market/${LITHIUM_ION_BATTERIES.slug}/portal`,
          },
          {
            name: SODIUM_ION_BATTERIES.name,
            href: `/market/${SODIUM_ION_BATTERIES.slug}/portal`,
          },
          {
            name: SOLID_STATE.name,
            href: `/market/${SOLID_STATE.slug}/portal`,
          },
          {
            name: RECYCLING.name,
            href: `/market/${RECYCLING.slug}/portal`,
          },
        ],
      },
    ],
  },
  {
    name: 'Services',
    open: false,
    groups: [
      {
        name: 'Subscriptions',
        href: '',
        children: [
          {
            name: 'Source',
            href: SOURCE.slug,
            target: '_blank',
            parent: '',
            icon: 'SourceIcon',
          },
          {
            name: 'Price Assessments',
            href: '/services/price-assessments/',
            parent: '',
          },
          {
            name: 'Market Assessments',
            href: '/services/market-assessments/',
            parent: '',
          },
          {
            name: 'Forecasts',
            href: '/services/forecasts/',
            parent: '',
          },
          {
            name: 'ESG Sustainability',
            href: `/services/esg/`,
            parent: '',
          },
        ],
        orderMenuMobile: 1,
      },
      {
        name: 'Consultancy',
        href: '',
        children: [
          {
            name: 'Bespoke Studies',
            href: `/${CONSULTANCY.slug}`,
            parent: '',
          },
          {
            name: 'Life Cycle Assessments Consultancy ',
            href: '/services/lca',
            parent: '',
          },
        ],
        orderMenuMobile: 2,
      },
    ],
  },
  {
    name: 'Tools',
    open: false,
    groups: [
      {
        name: 'Price Dashboard',
        href: '/market/price-dashboard/',
      },
      {
        name: 'Battery Emissions Analyser',
        href: `/tools/battery-emissions-analyser/`,
      },
    ],
  },
  {
    name: 'Events',
    open: false,
    groups: [],
    href: '/events/',
  },
  {
    name: 'Newsletters',
    open: false,
    groups: [
      {
        name: 'Benchmark Newsletter',
        href: '/newsletter-signup/',
      },
      {
        name: 'Free Prices',
        href: '/price-spotlight-signup/',
      },
      {
        name: 'Industry Reports',
        href: '/industry-reports/',
      },
      {
        name: 'Policy Newsletter',
        href: '/policy-newsletter/',
      },
      {
        name: 'Copper Weekly',
        href: '/copper-weekly/',
      },
    ],
  },
  {
    name: 'Contact',
    open: false,
    groups: [],
    modal: 'contact',
  },
  {
    name: 'About',
    open: false,
    groups: [
      {
        name: 'About',
        href: '/about/',
        initial: true,
      },
      {
        name: 'Join us',
        href: '/join-us/',
      },
      {
        name: 'Announcements',
        href: `/announcements/`,
      },
    ],
  },
  {
    name: 'Source',
    open: false,
    groups: [],
    href: SOURCE.slug,
    target: '_blank',
    icon: 'SourceIcon',
  },
]
