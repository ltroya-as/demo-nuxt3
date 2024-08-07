import cobaltData from '~/constants/esg/cobalt'
import lithiumData from '~/constants/esg/lithium'
import nickelData from '~/constants/esg/nickel'
import graphiteData from '~/constants/esg/graphite'
import rareEarthsData from '~/constants/esg/rare-earths'
import {
  ESG_COBALT,
  ESG_LITHIUM,
  ESG_NICKEL,
  ESG_GRAPHITE,
  ESG_RARE_EARTHS,
} from '~/constants/services/esg'
import {
  COBALT,
  ESG,
  LITHIUM,
  NICKEL,
  GRAPHITE,
  NATURAL_GRAPHITE,
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
} from '~/constants/services/constants'

const overview = {
  title: ESG.name,
  subtitle:
    'The lithium ion battery supply chain is set to play a fundamental role on the road to electrification and the clean energy revolution, and all stages of the supply chain are coming under increased scrutiny for their sustainability credentials.',
  descriptions: [
    'In light of this, Benchmark’s sustainability products and services can help market participants with their strategic planning and assessment of market opportunities.',
  ],
  moreInfo: 'Available Subscriptions',
  availableText:
    'For more information on our other subscriptions, contact Benchmark’s price specialists today.',
  service: ESG.slug,
  servicesESG: [
    {
      membership: ESG_COBALT.subscription,
      name: COBALT.sidebar,
      icon: COBALT.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...cobaltData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: ESG_COBALT.overview,
      initialFields: [ESG.slug, COBALT.slug],
    },
    {
      membership: ESG_NICKEL.subscription,
      name: NICKEL.sidebar,
      icon: NICKEL.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...nickelData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      menu: ESG_NICKEL.overview,
      initialFields: [ESG.slug, NICKEL.slug],
    },
    {
      membership: ESG_LITHIUM.subscription,
      name: LITHIUM.sidebar,
      icon: LITHIUM.iconLine,
      methodology: {
        active: false,
      },
      brochure: {
        ...lithiumData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      menu: ESG_LITHIUM.overview,
      initialFields: [ESG.slug, LITHIUM.slug],
    },
    {
      membership: ESG_GRAPHITE.subscription,
      name: GRAPHITE.sidebar,
      icon: GRAPHITE.iconLine,
      menu: ESG_GRAPHITE.overview,
      methodology: {
        active: false,
      },
      brochure: {
        ...graphiteData.brochureFile,
      },
      backgroundIcon: 'bg-p-400',
      initialFields: [ESG.slug, NATURAL_GRAPHITE.slug, SYNTHETIC_GRAPHITE.slug],
    },
    {
      membership: ESG_RARE_EARTHS.subscription,
      name: RARE_EARTHS.sidebar,
      icon: RARE_EARTHS.iconLine,
      menu: ESG_RARE_EARTHS.overview,
      methodology: {
        active: false,
      },
      brochure: {
        ...rareEarthsData.brochureFile,
      },
      backgroundIcon: 'bg-p-50',
      initialFields: [ESG.slug, RARE_EARTHS.slug],
    },
  ],
}
export default overview
