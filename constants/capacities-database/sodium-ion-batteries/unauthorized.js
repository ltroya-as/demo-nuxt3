/** @module */
import { checkboxes, methodology, icon, seo, title } from './common'

export const SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED = {
  seo,
  image: {
    src: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_920,f_auto/v1719006244/assets/market/sodium-ion-batteries/unauthorized/sodium-ion-batteries-capacities-descripcion-desktop_fpixfj.png?_i=AA',
  },
  methodology,
  checkboxes,
  hero: {
    title,
    checkboxes,
    images: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719004487/assets/market/sodium-ion-batteries/unauthorized/sodium-ion-batteries-capacities-hero-desktop_fuevzw.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719004487/assets/market/sodium-ion-batteries/unauthorized/sodium-ion-batteries-capacities-hero-mobile_pvbqay.png?_i=AA',
    },
  },
  title: {
    icon,
    text: title,
  },
  descriptions: {
    title: null,
    texts: [
      'Sodium-ion batteries are now a near-term next-generation battery technology. With a global ramp-up of sodium ion battery cell capacity now underway, what are the implications for lithium ion batteries and electric vehicles?',
      'Please contact us to find out more about services we offer in the Sodium ion Battery market.',
    ],
  },
  packages: {
    title: null,
    services: [
      {
        icon: 'services/icon-factory',
        title: 'Facility-by-facility:',
        description:
          'ambitious gigafactory pipeline capacity announcements paint a picture of rapid market growth, but the truth lies in understanding realised production and ramp-up timelines.',
        classes: 'min-h-[103px] h-full',
      },
      {
        icon: 'services/icon-lab',
        title: 'Cell chemistry:',
        description:
          'not all sodium ion batteries are born equal – Benchmark tracks cell developments on a company-by-company basis, assessing technical breakthroughs and identifying barriers to commercialisation.',
        classes: 'min-h-[103px] h-full',
      },
      {
        icon: 'services/icon-diamond',
        title: 'Raw materials:',
        description:
          'with new raw materials inputs come new supply chains. See where production capacity is focused and identify market opportunities.',
        classes: 'min-h-[103px] h-full',
      },
      {
        icon: 'services/icon-cost',
        title: 'Cost:',
        description:
          'In a high lithium price environment, sodium-ion batteries are deemed a cheaper alternative – how does this claim stand up if lithium prices fall?',
        classes: 'min-h-[103px] h-full',
      },
    ],
    classes: '!grid-cols-1',
  },
  subscribe: null,
}
