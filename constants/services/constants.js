/** Sections available */
export const FORECASTS = {
  slug: 'forecasts',
  checkbox: 'forecasts_and_costs',
  name: 'Forecasts',
  service: 'Forecasting',
  singularName: 'Forecast',
  seo: {
    description:
      'Benchmark Mineral Intelligence produces expert quarterly forecasts for Lithium, Graphite, Cobalt, Nickel, Anode, Cathode, Natural Graphite, Recycling, Solid State, and Synthetic Graphite out to 2040. Subscribe for access.',
  },
}
export const SOURCE = {
  slug: 'https://source.benchmarkminerals.com',
  name: 'Source',
  service: 'Membership',
}

export const CONSULTANCY = {
  slug: 'consultancy',
  name: 'Consultancy',
  service: 'Consultancy',
}
export const MARKET_ASSESSMENTS = {
  slug: 'market-assessments',
  checkbox: 'market-assessments',
  name: 'Market Assessments',
  service: 'Market Assessments',
  singularName: 'Market Assessment',
}
export const PRICE_ASSESSMENTS = {
  slug: 'price-assessments',
  checkbox: 'price-assessments',
  name: 'Price Assessments',
  singularName: 'Price Assessment',
  service: 'Price Assessments',
  seo: {
    description:
      'Price assessments for the lithium ion battery supply chain. lithium, cobalt, graphite & nickel. Subscribe for price assessments & more.',
  },
}
export const ESG = {
  slug: 'esg',
  name: 'Sustainability',
  checkbox: 'esg',
  service: 'ESG',
  singularName: 'Sustainability',
  seo: {
    description:
      "Having emerged out of the investor space, ESG (environment, social and governance) is a tool for companies to monitor and report on their sustainability performance. Good ESG practices and disclosure ensure the conduct of an organisation does not jeopardise future generation's access to resources and operates with social license",
  },
}

export const MARKET = {
  slug: 'market',
  name: 'Markets',
  service: 'Market',
  seo: {
    description:
      'Benchmark Mineral Intelligence provides market intelligence for the lithium ion battery supply chain. Subscribe for market intelligence & more.',
  },
}

export const AVAILABLE_SERVICES = [
  FORECASTS,
  SOURCE,
  CONSULTANCY,
  MARKET_ASSESSMENTS,
  PRICE_ASSESSMENTS,
  ESG,
  MARKET,
]

/** Subscriptions */
export const PA_SUBSCRIPTION_PREFIX = 'pricing-'
/** Subscriptions available */
export const SUBSCRIPTION_FORECASTS_ANODE = 'forecast-anode'
export const SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES =
  'forecast-battery-database'
export const SUBSCRIPTION_FORECASTS_CATHODE = 'forecast-cathode'
export const SUBSCRIPTION_FORECASTS_COBALT = 'forecast-cobalt'
export const SUBSCRIPTION_FORECASTS_LITHIUM = 'forecast-lithium'
export const SUBSCRIPTION_FORECASTS_SILICON_ANODE = 'forecast-silicon-anode'
export const SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE =
  'forecast-natural-graphite'
export const SUBSCRIPTION_FORECASTS_NICKEL = 'forecast-nickel'
export const SUBSCRIPTION_FORECASTS_SOLID_STATE = 'forecast-solid-state'
export const SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE =
  'forecast-synthetic-graphite'
export const SUBSCRIPTION_FORECASTS_RECYCLING = 'forecast-recycling'
export const SUBSCRIPTION_SOURCE_SUBSCRIBER = 'subscriber'
export const SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT =
  'market-assessment-gigafactory'
export const SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT =
  'market-assessment-precursor'
export const SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES =
  'market-assessment-sodium-ion-battery'
export const SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM = `${PA_SUBSCRIPTION_PREFIX}lithium`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT = `${PA_SUBSCRIPTION_PREFIX}cobalt`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL = `${PA_SUBSCRIPTION_PREFIX}nickel`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE = `${PA_SUBSCRIPTION_PREFIX}natural-graphite`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE = `${PA_SUBSCRIPTION_PREFIX}synthetic-graphite`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES = `${PA_SUBSCRIPTION_PREFIX}battery-cell`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS = `${PA_SUBSCRIPTION_PREFIX}rare-earths`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE = `${PA_SUBSCRIPTION_PREFIX}anode`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE = `${PA_SUBSCRIPTION_PREFIX}cathode`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS = `${PA_SUBSCRIPTION_PREFIX}black-mass`
export const SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD = `${PA_SUBSCRIPTION_PREFIX}price-dashboard`
export const SUBSCRIPTION_ESG_LITHIUM = 'esg-lithium'
export const SUBSCRIPTION_ESG_COBALT = 'esg-cobalt'
export const SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER =
  'esg-battery-emissions-analyser'
export const SUBSCRIPTION_ESG_NICKEL = 'esg-nickel'
export const SUBSCRIPTION_ESG_NATURAL_GRAPHITE = 'esg-natural-graphite'
export const SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE = 'esg-synthetic-graphite'
export const SUBSCRIPTION_ESG_GRAPHITE = 'esg-graphite'
export const SUBSCRIPTION_ESG_RARE_EARTHS = 'esg-rare-earths'
export const SUBSCRIPTION_FORECASTS_RARE_EARTHS = 'forecast-rare-earths'
export const SUBSCRIPTION_ALL = 'allSubscriptions'
export const SUBSCRIPTION_FORECASTS_MANGANESE = 'forecast-manganese'
export const SUBSCRIPTION_FORECASTS_PHOSPHATE = 'forecast-phosphate'
export const SUBSCRIPTION_FORECASTS_FLUORSPAR = 'forecast-fluorspar'
export const SUBSCRIPTION_FORECASTS_SODIUM_ION_BATTERIES =
  'forecast-sodium-ion-batteries'

export const SIGN_IN = 'Sign in'

/** Services available */
export const LITHIUM = {
  slug: 'lithium',
  name: 'Lithium',
  simplifiedName: 'Lithium',
  capacityName: 'Lithium',
  category: 'lithium',
  categoryReportPricing: 'lithium',
  categoryReportForecast: 'forecast-lithium',
  categoryReportEsg: 'esg-lithium',
  mineralId: 2,
  menu: 'Lithium',
  sidebar: 'Lithium',
  iconLine: 'Lithium',
  iconColor: 'lithium-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Lithium Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const COBALT = {
  slug: 'cobalt',
  name: 'Cobalt',
  simplifiedName: 'Cobalt',
  capacityName: 'Cobalt',
  category: 'cobalt',
  categoryReportPricing: 'cobalt',
  categoryReportForecast: 'forecast-cobalt',
  categoryReportEsg: 'esg-cobalt',
  mineralId: 3,
  menu: 'Cobalt',
  sidebar: 'Cobalt',
  iconLine: 'Cobalt',
  iconColor: 'cobalt-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Cobalt Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const BATTERY_EMISSIONS_ANALYSER = {
  slug: 'battery-emissions-analyser',
  name: 'Battery Emissions Analyser',
  simplifiedName: 'Battery Emissions Analyser',
  capacityName: 'Battery Emissions Analyser',
  category: 'battery-emissions-analyser',
  categoryReportPricing: 'battery-emissions-analyser',
  categoryReportForecast: 'forecast-battery-emissions-analyser',
  categoryReportEsg: 'esg-battery-emissions-analyser',
  mineralId: 3,
  menu: 'Battery Emissions Analyser',
  sidebar: 'Battery Emissions Analyser',
  iconLine: 'BEA',
  iconColor: 'cobalt-logo',
  description: `
    Supports at all stages of the supply chain with carbon intensity analysis for key battery chemistries, raw materials and production locations. This tool and service is provided as part of Benchmark’s ESG Reports for Lithium, Cobalt, Nickel and Graphite, or as a standalone service.
  `,
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Battery Emissions Analyser Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const NICKEL = {
  slug: 'nickel',
  name: 'Nickel',
  simplifiedName: 'Nickel',
  capacityName: 'Nickel',
  category: 'nickel',
  categoryReportPricing: 'nickel',
  categoryReportForecast: 'forecast-nickel',
  categoryReportEsg: 'esg-nickel',
  mineralId: 4,
  menu: 'Nickel',
  sidebar: 'Nickel',
  iconLine: 'Nickel',
  iconColor: 'nickel-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Nickel Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const NATURAL_GRAPHITE = {
  slug: 'natural-graphite',
  name: 'Natural Graphite',
  simplifiedName: 'Natural Graphite',
  capacityName: 'Natural Graphite',
  category: 'natural-graphite',
  categoriesArticles: ['graphite'],
  categoryReportPricing: 'natural-graphite',
  categoryReportForecast: 'forecast-natural-graphite',
  categoryReportEsg: 'esg-graphite',
  mineralId: 1,
  menu: 'Natural Graphite',
  sidebar: 'Natural Graphite',
  iconLine: 'FlakeGraphite',
  iconColor: 'graphite-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Natural Graphite Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const SYNTHETIC_GRAPHITE = {
  slug: 'synthetic-graphite',
  name: 'Synthetic Graphite',
  altName: 'Anode Coke',
  simplifiedName: 'Synthetic Graphite',
  capacityName: 'Synthetic Graphite',
  category: 'synthetic-graphite',
  categoriesArticles: ['graphite'],
  categoryReportPricing: 'synthetic-graphite',
  categoryReportForecast: 'forecast-synthetic-graphite',
  categoryReportEsg: 'esg-graphite',
  mineralId: 5,
  menu: 'Synthetic Graphite',
  sidebar: 'Synthetic Graphite',
  iconLine: 'SyntheticGraphite',
  iconColor: 'synthetic-graphite-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Synthetic Graphite Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const SOLID_STATE = {
  slug: 'solid-state',
  name: 'Solid-state + Lithium Metal Batteries',
  simplifiedName: 'Solid State',
  capacityName: 'Solid State',
  category: 'solid-state',
  categoryReportPricing: null,
  categoryReportForecast: 'forecast-solid-state',
  mineralId: null,
  menu: 'Solid State',
  sidebar: 'Solid-state + Lithium Metal Batteries',
  iconLine: 'SolidState',
  iconColor: 'solid-state',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Solid State Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const ANODE = {
  slug: 'anode',
  checkbox: 'anode',
  name: 'Anode',
  simplifiedName: 'Anode',
  category: 'anode',
  categoryReportPricing: 'anode',
  categoryReportForecast: 'forecast-anode',
  mineralId: 6,
  menu: 'Anode',
  sidebar: 'Anode',
  iconLine: 'Anodes',
  iconSquare: 'Anode',
  iconColor: 'anode-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Anode Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Anode Producers: Total Capacity Pipeline: tpa',
    },
  },
}
export const CATHODE = {
  slug: 'cathode',
  name: 'Cathode',
  simplifiedName: 'Cathode',
  checkbox: 'cathode',
  category: 'cathode',
  categoryReportPricing: 'cathode',
  categoryReportForecast: 'forecast-cathode',
  mineralId: 7,
  menu: 'Cathode',
  sidebar: 'Cathode',
  iconLine: 'Cathodes',
  iconSquare: 'Cathode',
  iconColor: 'cathode-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Cathode Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Cathode Producers: Total Capacity Pipeline: tpa',
    },
  },
}

export const RECYCLING = {
  slug: 'recycling',
  name: 'Recycling',
  simplifiedName: 'Recycling',
  capacityName: 'Recycling',
  category: 'recycling',
  categoryReportPricing: null,
  categoryReportForecast: 'forecast-recycling',
  mineralId: null,
  menu: 'Recycling',
  sidebar: 'Recycling',
  iconLine: 'Recycling',
  iconColor: null,
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Recycling Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}
export const LITHIUM_ION_BATTERIES = {
  slug: 'lithium-ion-batteries',
  checkbox: 'lithium-ion-batteries',
  name: 'Lithium ion Batteries',
  simplifiedName: 'Lithium ion Batteries',
  capacityName: 'Lithium ion Battery',
  capacitySimplifiedName: 'Gigafactory',
  capacitySlug: 'gigafactory',
  category: 'lithium-ion-batteries',
  categoriesArticles: [
    'gigafactories',
    'battery-cell',
    'lithium-ion-batteries',
  ],
  categoryReportPricing: 'lithium-ion-batteries',
  categoryReportForecast: 'forecast-battery-database',
  mineralId: 8,
  menu: 'Lithium ion Batteries',
  sidebar: 'Lithium ion Batteries',
  iconLine: 'BatteryDatabase',
  iconSquare: 'LithiumIonBatteries',
  iconColor: 'battery-cells-logo',
  forecasts: {
    name: 'Lithium ion Batteries',
  },
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Lithium ion Batteries Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Gigafactory Producers: Total Capacity Pipeline: GWh',
    },
  },
}
export const GIGAFACTORY_ASSESSMENT = {
  slug: 'gigafactory-assessment',
  name: 'Lithium ion Battery Gigafactory Assessment',
  simplifiedName: 'Gigafactory',
  checkbox: 'gigafactory-assessment',
  capacityName: 'Lithium ion Battery',
  capacitySlug: 'gigafactory',
  category: 'gigafactory',
  categoryReportPricing: 'gigafactory',
  categoryReportForecast: null,
  mineralId: null,
  menu: 'Gigafactory Assessment',
  sidebar: 'Gigafactory Assessment',
  iconLine: 'BatteryDatabase',
  iconColor: 'battery-cells-logo',
  unauthorizedTitle: 'Lithium ion Battery Gigafactory Assessment',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Gigafactory Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
    marketAssessments: {
      reportDescription:
        'Find every Gigafactory Market Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Gigafactory Producers: Total Capacity Pipeline: tpa',
    },
  },
}

export const SODIUM_ION_BATTERIES = {
  slug: 'sodium-ion-batteries',
  checkbox: 'sodium-ion',
  name: 'Sodium ion Batteries',
  simplifiedName: 'Sodium ion',
  category: 'sodium-ion-batteries',
  categoryReportPricing: 'sodium-ion-batteries',
  reportSlug: 'sodium-ion-batteries',
  mineralId: null,
  menu: 'Sodium ion Batteries',
  sidebar: 'Sodium ion Batteries',
  iconLine: 'SodiumIonBatteries',
  iconSquare: 'SodiumIonBatteries',
  iconColor: 'SodiumIonBatteries',
  seo: {
    marketAssessments: {
      capacities:
        'Headquartered: Download chart as image Cathode Producers: Total Capacity Pipeline: tpa',
      reportDescription:
        'Headquartered: Download chart as image Cathode Producers: Total Capacity Pipeline: tpa',
    },
  },
}

export const RARE_EARTHS = {
  slug: 'rare-earths',
  name: 'Rare Earths',
  simplifiedName: 'Rare Earths',
  capacityName: 'Rare Earths',
  category: 'rare-earths',
  categoryReportPricing: 'rare-earths',
  categoryReportForecast: 'forecast-rare-earths',
  categoryReportEsg: 'esg-rare-earths',
  mineralId: null,
  menu: 'Rare Earths',
  sidebar: 'Rare Earths',
  iconLine: 'motor',
  iconColor: 'rare-earths-logo',
  forecasts: {
    name: 'Rare Earths',
  },
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Rare Earths Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const GRAPHITE = {
  slug: 'graphite',
  name: 'Graphite',
  simplifiedName: 'Graphite',
  capacityName: 'Graphite',
  category: 'graphite',
  categoryReportPricing: 'graphite',
  categoryReportEsg: 'esg-graphite',
  mineralId: null,
  menu: 'Graphite',
  sidebar: 'Graphite',
  iconLine: 'SyntheticGraphite',
  iconColor: 'graphite-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Graphite Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const SILICON_ANODE = {
  slug: 'silicon-anode',
  name: 'Silicon Anode',
  simplifiedName: 'Silicon Anode',
  capacityName: 'Silicon Anode',
  category: 'silicon-anode',
  categoryReportPricing: 'silicon-anode',
  categoryReportForecast: 'forecast-silicon-anode',
  categoryReportEsg: 'esg-silicon-anode',
  mineralId: 2,
  menu: 'Silicon Anode',
  sidebar: 'Silicon Anode',
  iconLine: 'SiliconAnode',
  iconColor: 'silicon-anode',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Silicon Anode Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const NEWSLETTER_SENTENCES = [
  'Be informed of everything that happens at Benchmark',
  'Regular content on critical minerals, lithium ion batteries, gigafactories, electric vehicles, energy storage, rare earths and permanent magnets',
  'Free In Person & Online Events',
  'New Product Launches',
]

export const OUR_DIVISIONS = [
  {
    title: 'Prices',
    icon: 'Pricing',
    url: '/services/price-assessments',
    description: 'The world’s most trusted PRA for future facing commodities',
  },
  {
    title: 'Data',
    icon: 'Data',
    url: '/services/market-assessments',
    description:
      'Unrivalled, granular supply chain data, regularly reassessed and refreshed',
  },
  {
    title: 'Forecasts',
    icon: 'about/forecast',
    url: '/services/forecasts',
    description:
      'The most extensive supply chain forecasts databases, from mine to EV',
  },
  {
    title: 'Consultancy',
    icon: 'about/consultancy',
    url: '/consultancy',
    description:
      'Bespoke research from the world’s experts, backed by Benchmark’s proprietary data',
  },
  {
    title: 'Sustainability',
    icon: 'about/sustainability',
    url: '/services/esg',
    description:
      'Industry-first life cycle assessments, risk metrics, and ESG advisory',
  },
  {
    title: 'Benchmark Source',
    icon: 'about/source',
    url: '',
    description: 'Your gateway to Benchmark Mineral Intelligence',
  },
  {
    title: 'Events',
    icon: 'about/events',
    url: '/events',
    description:
      'Dealmaking & networking with Benchmark’s community - worldwide',
  },
  {
    title: 'Team Benchmark',
    icon: 'about/team',
    url: '/join-us',
    description:
      'We have a truly global and expanding operation. Join Team Benchmark ',
  },
]

export const PRICE_SPOTLIGHT_SENTENCES = [
  [
    'Lithium Carbonate China',
    'Lithium Carbonate ROW',
    'Cobalt Chemical',
    'Nickel Sulphate',
    'Flake Graphite',
    'Synthetic Graphite',
  ],
  [
    'Cathode',
    'Anode',
    'Lithium ion Batteries',
    'Rare Earths',
    'Black Mass',
    'Manganese',
  ],
]

export const COPPER_WEEKLY_SENTENCES = [
  'Understand the latest copper price drivers and Benchmark’s near-term price outlook',
  'Keep up to date with the latest news from across the copper industry',
  'Stay on top of copper’s key submarkets: concentrate, blister/anode, cathode and scrap',
  'Get first-hand accounts of the China market from Benchmark’s Beijing-based analyst',
  'Gain exclusive access to Benchmark’s insights and analysis on pertinent market issues',
  'Keep track of key high-frequency copper market indicators',
]

export const BLACK_MASS = {
  slug: 'black-mass',
  reportSlug: 'recycling',
  name: 'Recycling',
  simplifiedName: 'Recycling',
  category: 'black-mass',
  categoryReportPricing: 'recycling',
  categoriesArticles: ['black-mass', 'recycling'],
  mineralId: 9,
  menu: 'Black Mass',
  sidebar: 'Black Mass',
  iconLine: 'blackMass',
  iconColor: 'blackMass-logo',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Black Mass Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const MANGANESE = {
  slug: 'manganese',
  name: 'Manganese',
  titleForecast: 'Manganese Sulphate Market Outlook',
  simplifiedName: 'Manganese',
  category: 'manganese',
  categoryReportPricing: null,
  categoryReportForecast: 'forecast-manganese',
  mineralId: null,
  menu: 'Manganese',
  sidebar: 'Manganese',
  overviewName: 'Manganese Sulphate',
  iconLine: 'Manganese',
  iconColor: 'manganese',
  forecasts: {
    name: 'Manganese',
  },
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Manganese Sulphate Market Outlook Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const PHOSPHATE = {
  slug: 'phosphate',
  name: 'Phosphate',
  titleForecast: 'Phosphoric Acid Market Outlook',
  simplifiedName: 'Phosphate',
  capacityName: 'Phosphate',
  category: 'phosphate',
  categoryReportPricing: null,
  categoryReportForecast: 'forecast-phosphate',
  mineralId: null,
  menu: 'Phosphate',
  sidebar: 'Phosphate',
  overviewName: 'Phosphoric Acid',
  iconLine: 'Phosphate',
  iconColor: 'phosphate',
  forecasts: {
    name: 'Phosphate',
  },
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Phosphoric Acid Market Outlook Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
  },
}

export const PRECURSOR_ASSESSMENT = {
  slug: 'precursor-assessment',
  name: 'Precursor Cathode Active Material Assessment',
  simplifiedName: 'Precursor Cathode Active Material Assessment',
  capacityName: 'Precursor',
  capacitySlug: 'precursor',
  checkbox: 'precursor',
  category: 'gigafactory',
  categoryReportPricing: 'precursor',
  categoryReportForecast: null,
  mineralId: null,
  menu: 'Precursor Assessment',
  sidebar: 'Precursor',
  iconLine: 'Precursor',
  iconColor: 'precursor-assessment-logo',
  unauthorizedTitle: 'Precursor Cathode Active Material Assessment',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Precursor Cathode Active Material Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
    marketAssessments: {
      reportDescription:
        'Find every Precursor Cathode Active Material Market Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Gigafactory Producers: Total Capacity Pipeline: tpa',
    },
  },
}

export const POLICY_NEWSLETTER_SENTENCES = [
  'Get timely updates on government policies and decisions',
  'Access expert analyses and opinions',
  'Simplified infographics for easy comprehension',
  'Personalised newsletters based on your interests',
]

export const FLUORSPAR = {
  slug: 'fluorspar',
  name: 'Fluorspar',
  titleForecast: 'Fluorspar Market Outlook',
  category: 'fluorspar',
  categoryReportPricing: null,
  categoryReportForecast: 'forecast-fluorspar',
  mineralId: null,
  menu: 'Fluorspar',
  sidebar: 'Fluorspar',
  iconLine: 'Fluorspar',
  iconColor: 'fluorspar',
  unauthorizedTitle: 'Precursor Cathode Active Material Assessment',
  seo: {
    priceAssessments: {
      reportDescription:
        'Find every Fluorspar Market Outlook Price Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
    },
    marketAssessments: {
      reportDescription:
        'Find every Fluorspar Market Outlook Market Assessment report obtained by the Benchmark Mineral Intelligence in the past weeks or months.',
      capacities:
        'Headquartered: Download chart as image Gigafactory Producers: Total Capacity Pipeline: tpa',
    },
  },
}

export const PRICE_DASHBOARD = {
  slug: 'price-dashboard',
  name: 'Price Dashboard',
  simplifiedName: 'Price Dashboard',
  menu: 'Price Dashboard',
  sidebar: 'Price Dashboard',
  iconLine: 'lineChart',
  iconColor: 'lithium-logo',
}

export const MARKETS_WITH_SUSTAINABILITY_INDEX = [
  LITHIUM,
  COBALT,
  NICKEL,
  NATURAL_GRAPHITE,
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
]

export const MARKETS_WITH_INDEX_OR_PRICES = [
  ...MARKETS_WITH_SUSTAINABILITY_INDEX,
  ANODE,
  CATHODE,
  LITHIUM_ION_BATTERIES,
  RECYCLING,
]

export const ALL_MARKETS = [
  ...MARKETS_WITH_INDEX_OR_PRICES,
  MANGANESE,
  PHOSPHATE,
  FLUORSPAR,
  SILICON_ANODE,
  SODIUM_ION_BATTERIES,
  SOLID_STATE,
]
