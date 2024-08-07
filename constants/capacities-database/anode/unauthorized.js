/** @module */
import { checkboxes, methodology, icon, title, subtitle, seo } from './common'

/** @constants */
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

export const ANODE_CAPACITIES_UNAUTHORIZED = {
  seo,
  methodology,
  checkboxes,
  images: {
    big: {
      src: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_420,f_auto/v1718930173/assets/market/anode/capacities-database/anode-capacities-description-desktop_tq4vjm.png?_i=AA',
    },
    small: {
      src: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_240,f_auto/v1718930235/assets/market/anode/capacities-database/anode-capacities-description-desktop-2_r0hhnu.png?_i=AA',
    },
  },
  hero: {
    title,
    checkboxes,
    images: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719441567/assets/market/anode/prices/benchmarkminerals_Charts_and_graphs_about_Lithium_photorealisti_86b5c406-e222-4b36-8973-097c3adaa718_w6sth9.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719441567/assets/market/anode/prices/benchmarkminerals_Charts_and_graphs_about_Lithium_photorealisti_86b5c406-e222-4b36-8973-097c3adaa718_w6sth9.png?_i=AA',
    },
    methodology,
  },
  title: {
    icon,
    text: title,
  },
  subtitle,
  descriptions: {
    title: null,
    texts: [
      'Our Price Assessments draw on Benchmark’s proprietary databases, tracking every global production facility, capacity expansions, technology developments and industry partnerships to provide clarity to the complex lithium ion battery landscape.',
    ],
  },
  packages: {
    title: `${PRICE_ASSESSMENTS.singularName} Package`,
    services: [
      {
        icon: 'services/icon-chart-line',
        description:
          'Access to exclusive Anode data, with company and regional capacity, and supply demand/analytics',
      },
      {
        icon: 'services/icon-report',
        description:
          'Monthly report providing Anode prices and insights to reveal the direction of the midstream battery sector',
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
          'A global perspective on the evolution of the Anode industry.',
      },
      {
        icon: 'services/icon-idea',
        description:
          'Our goal is to help you understand the context of our data, not just give you the numbers.',
      },
    ],
    classes: '',
  },
  subscribe: {
    checkboxes,
    methodology,
  },
}
