import lithiumIonBatteriesForecasts from '~/constants/forecasts/lithium-ion-batteries'
import cobaltData from '~/constants/forecasts/cobalt'
import lithiumData from '~/constants/forecasts/lithium'
import SiliconAnodeData from '~/constants/forecasts/silicon-anode'
import naturalGraphiteData from '~/constants/forecasts/natural-graphite'
import nickelData from '~/constants/forecasts/nickel'
import recyclingData from '~/constants/forecasts/recycling'
import solidStateData from '~/constants/forecasts/solid-state'
import syntheticGraphiteData from '~/constants/forecasts/synthetic-graphite'
import anodeData from '~/constants/forecasts/anode'
import cathodeData from '~/constants/forecasts/cathode'
import rareEarthsData from '~/constants/forecasts/rare-earths'
import manganeseData from '~/constants/forecasts/manganese'
import phosphateData from '~/constants/forecasts/phosphate'
import fluorsparData from '~/constants/forecasts/fluorspar'

import {
  FORECASTS_ANODE,
  FORECASTS_CATHODE,
  FORECASTS_COBALT,
  FORECASTS_LITHIUM,
  FORECASTS_SILICON_ANODE,
  FORECASTS_LITHIUM_ION_BATTERIES,
  FORECASTS_NATURAL_GRAPHITE,
  FORECASTS_NICKEL,
  FORECASTS_RECYCLING,
  FORECASTS_SOLID_STATE,
  FORECASTS_SYNTHETIC_GRAPHITE,
  FORECASTS_RARE_EARTHS,
  FORECASTS_MANGANESE,
  FORECASTS_PHOSPHATE,
  FORECASTS_FLUORSPAR,
} from '~/constants/services/forecasts'
import {
  ANODE,
  CATHODE,
  COBALT,
  FORECASTS,
  LITHIUM,
  SILICON_ANODE,
  LITHIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  NICKEL,
  RECYCLING,
  SOLID_STATE,
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
  MANGANESE,
  PHOSPHATE,
  FLUORSPAR,
} from '~/constants/services/constants'

const overview = {
  title: FORECASTS.name,
  subtitle:
    'The world’s most extensive battery supply chain forecast databases, updated every quarter.',
  descriptions: [
    'Benchmark’s Forecast services provide a long-term outlook on the entire lithium-ion battery ecosystem, from the upstream raw materials, to the midstream products, to the final batteries, alongside our unique recycling insights.',
    'Each Forecast service provides an in-depth, long-term view on the major trends in each market sector and their implications, updated on a quarterly basis.',
    'Benchmark Forecasts are your indispensable business tool for expanding new supply, planning your contracts, managing inventory and for major investments.',
  ],
  availableText:
    'For more information on our other subscriptions, contact Benchmark’s price specialists today.',
  service: FORECASTS.slug,
  servicesForecasts: [
    {
      slug: LITHIUM.slug,
      membership: FORECASTS_LITHIUM.subscription,
      name: LITHIUM.sidebar,
      icon: LITHIUM.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...lithiumData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_LITHIUM.overview,
      initialFields: [FORECASTS.checkbox, LITHIUM.slug],
    },
    {
      slug: COBALT.slug,
      membership: FORECASTS_COBALT.subscription,
      name: COBALT.sidebar,
      icon: COBALT.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...cobaltData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_COBALT.overview,
      initialFields: [FORECASTS.checkbox, COBALT.slug],
    },
    {
      slug: NICKEL.slug,
      membership: FORECASTS_NICKEL.subscription,
      name: NICKEL.sidebar,
      icon: NICKEL.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...nickelData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_NICKEL.overview,
      initialFields: [FORECASTS.checkbox, NICKEL.slug],
    },
    {
      slug: NATURAL_GRAPHITE.slug,
      membership: FORECASTS_NATURAL_GRAPHITE.subscription,
      name: NATURAL_GRAPHITE.sidebar,
      icon: NATURAL_GRAPHITE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...naturalGraphiteData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_NATURAL_GRAPHITE.overview,
      initialFields: [FORECASTS.checkbox, NATURAL_GRAPHITE.slug],
    },
    {
      slug: SYNTHETIC_GRAPHITE.slug,
      membership: FORECASTS_SYNTHETIC_GRAPHITE.subscription,
      name: SYNTHETIC_GRAPHITE.sidebar,
      icon: SYNTHETIC_GRAPHITE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...syntheticGraphiteData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_SYNTHETIC_GRAPHITE.overview,
      initialFields: [FORECASTS.checkbox, SYNTHETIC_GRAPHITE.slug],
    },
    {
      slug: MANGANESE.slug,
      membership: FORECASTS_MANGANESE.subscription,
      name: MANGANESE.overviewName,
      icon: MANGANESE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...manganeseData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_MANGANESE.overview,
      initialFields: [FORECASTS.checkbox, MANGANESE.slug],
    },
    {
      slug: PHOSPHATE.slug,
      membership: FORECASTS_PHOSPHATE.subscription,
      name: PHOSPHATE.overviewName,
      icon: PHOSPHATE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...phosphateData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_PHOSPHATE.overview,
      initialFields: [FORECASTS.checkbox],
    },
    {
      slug: ANODE.slug,
      membership: FORECASTS_ANODE.subscription,
      name: ANODE.sidebar,
      icon: ANODE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...anodeData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_ANODE.overview,
      initialFields: [FORECASTS.checkbox, ANODE.slug],
    },
    {
      slug: CATHODE.slug,
      membership: FORECASTS_CATHODE.subscription,
      name: CATHODE.sidebar,
      icon: CATHODE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...cathodeData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_CATHODE.overview,
      initialFields: [FORECASTS.checkbox, CATHODE.slug],
    },
    {
      slug: SILICON_ANODE.slug,
      membership: FORECASTS_SILICON_ANODE.subscription,
      name: SILICON_ANODE.sidebar,
      icon: SILICON_ANODE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...SiliconAnodeData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_SILICON_ANODE.overview,
      initialFields: [FORECASTS.checkbox, SILICON_ANODE.slug],
    },
    {
      slug: LITHIUM_ION_BATTERIES.slug,
      membership: FORECASTS_LITHIUM_ION_BATTERIES.subscription,
      name: LITHIUM_ION_BATTERIES.sidebar,
      icon: LITHIUM_ION_BATTERIES.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...lithiumIonBatteriesForecasts.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_LITHIUM_ION_BATTERIES.overview,
      initialFields: [FORECASTS.checkbox, 'battery-cell'],
    },
    {
      slug: SOLID_STATE.slug,
      membership: FORECASTS_SOLID_STATE.subscription,
      name: SOLID_STATE.sidebar,
      icon: SOLID_STATE.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...solidStateData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_SOLID_STATE.overview,
      initialFields: [FORECASTS.checkbox],
    },
    {
      slug: RECYCLING.slug,
      membership: FORECASTS_RECYCLING.subscription,
      name: RECYCLING.sidebar,
      icon: RECYCLING.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...recyclingData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_RECYCLING.overview,
      initialFields: [FORECASTS.checkbox],
    },
    {
      slug: RARE_EARTHS.slug,
      membership: FORECASTS_RARE_EARTHS.subscription,
      name: RARE_EARTHS.sidebar,
      icon: RARE_EARTHS.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...rareEarthsData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: FORECASTS_RARE_EARTHS.overview,
      initialFields: [FORECASTS.checkbox],
    },
    {
      slug: FLUORSPAR.slug,
      membership: FORECASTS_FLUORSPAR.subscription,
      name: FLUORSPAR.sidebar,
      icon: FLUORSPAR.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...fluorsparData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: FORECASTS_FLUORSPAR.overview,
      initialFields: [FORECASTS.checkbox, FORECASTS_FLUORSPAR.checkbox],
    },
  ],
}
export default overview
