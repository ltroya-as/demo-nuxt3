/** @module */
import {
  checkboxesCathode,
  checkboxesPrecursor,
  methodologyCathode,
  methodologyPrecursor,
  icon,
  title,
  subtitleCathode,
  subtitlePrecursor,
  commonTabs,
  seoCathode,
  seoPrecursor,
  defaultTab,
} from './common'

/** @constants */
import {
  CATHODE,
  MARKET_ASSESSMENTS,
  PRECURSOR_ASSESSMENT,
  PRICE_ASSESSMENTS,
} from '~/constants/services/constants'

export const CATHODE_CAPACITIES_UNAUTHORIZED = {
  defaultTab,
  commonTabs,
  seo: subtitleCathode,
  images: {
    big: {
      alt: 'Cathode capacities',
      src: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_420,f_auto/v1719010871/assets/market/cathode/capacity-database/cathode-capacities-description-desktop_jhnnmm.png?_i=AA',
    },
    small: {
      alt: 'Cathode capacities',
      src: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_240,f_auto/v1719010870/assets/market/cathode/capacity-database/cathode-capacities-description-desktop-2_tobsyl.png?_i=AA',
    },
  },
  title: {
    icon,
    text: title,
  },
  [CATHODE.slug]: {
    icon,
    seo: seoCathode,
    methodology: methodologyCathode,
    hero: {
      title,
      checkboxes: checkboxesCathode,
      images: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719502633/assets/market/cathode/prices/benchmarkminerals_Graphs_and_charts_photorealistic_realistic_sh_b618f3c7-6778-4a79-8040-ab977633ec26_zudvju.png?_i=AA',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719502633/assets/market/cathode/prices/benchmarkminerals_Graphs_and_charts_photorealistic_realistic_sh_b618f3c7-6778-4a79-8040-ab977633ec26_zudvju.png?_i=AA',
      },
    },
    subtitle: subtitleCathode,
    descriptions: {
      title: null,
      texts: [
        'Our Price Assessments draw on Benchmark’s proprietary databases, tracking every global production facility, capacity expansions, technology developments and industry partnerships to provide clarity to the complex lithium ion battery landscape',
      ],
    },
    packages: {
      title: `${PRICE_ASSESSMENTS.singularName} Package`,
      services: [
        {
          icon: 'services/icon-chart-line',
          description:
            'Access to exclusive Cathode data, with company and regional capacity, and supply demand/analytics',
        },
        {
          icon: 'services/icon-report',
          description:
            'Monthly report providing Cathode prices and insights to reveal the direction of the midstream battery sector',
        },
        {
          icon: 'services/icon-presentation',
          description:
            'Produce custom made representations of data to download for projects and presentations.',
        },
        {
          icon: 'services/icon-consultancy',
          description:
            'Create your own custom pricing charts using our bespoke data.',
        },
        {
          icon: 'services/icon-global',
          description:
            'A global perspective on the evolution of the Cathode industry.',
        },
        {
          icon: 'services/icon-idea',
          description:
            'Our goal is to help you understand the context of our data, not just give you the numbers.',
        },
      ],
      classes: '',
    },
    subscribe: { checkboxes: checkboxesCathode },
  },
  [PRECURSOR_ASSESSMENT.capacitySlug]: {
    icon,
    seo: seoPrecursor,
    methodology: methodologyPrecursor,
    hero: {
      title,
      checkboxes: checkboxesPrecursor,
      images: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719502633/assets/market/cathode/prices/benchmarkminerals_Graphs_and_charts_photorealistic_realistic_sh_b618f3c7-6778-4a79-8040-ab977633ec26_zudvju.png?_i=AA',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719502633/assets/market/cathode/prices/benchmarkminerals_Graphs_and_charts_photorealistic_realistic_sh_b618f3c7-6778-4a79-8040-ab977633ec26_zudvju.png?_i=AA',
      },
    },
    subtitle: subtitlePrecursor,
    descriptions: {
      title: null,
      texts: [
        'Precursor Cathode Active Material (pCAM) is the foundation for cathode active material (CAM), which is used in the production of cathodes for lithium ion batteries. ',
        'pCAM and CAM are essential to a successful transition towards e-mobility, with ultra-pure CAM being the battery’s most critical and therefore valuable component. ',
        'Understanding the plans of all current and emerging players in the lithium ion battery space is vital to evaluating the future of electric vehicles and reducing the world’s reliance on fossil fuels via energy storage.',
      ],
    },
    packages: {
      title: `${MARKET_ASSESSMENTS.singularName} Package`,
      services: [
        {
          icon: 'services/icon-chart-line',
          description:
            'Access to exclusive pCAM data, with company and regional capacity, and supply and demand/analytics.',
        },
        {
          icon: 'services/icon-report',
          description:
            'Monthly report providing pCAM insights and analysis to reveal the direction of the midstream battery sector.',
        },
        {
          icon: 'services/icon-global',
          description:
            'A global perspective on the evolution of the pCAM industry.',
        },
        {
          icon: 'services/icon-idea',
          description:
            'Our goal is to help you understand the context of our data, not just give you the numbers.',
        },
      ],
      classes: '',
    },
    subscribe: { checkboxes: checkboxesPrecursor },
  },
}
