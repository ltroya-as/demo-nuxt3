const nickelData = {
  images: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719346124/assets/market/cobalt/cobalt-sustainability-overview-banner_utrocw.jpg',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719346124/assets/market/cobalt/cobalt-sustainability-overview-banner_utrocw.jpg',
  },
  brochureFile: {
    EnvKey: 'ESGBrochureNickelFilePdfId',
    file_name: 'Nickel ESG Brochure.pdf',
    category: 'nickel-esg-brochure',
  },
  banner: {
    title:
      'Benchmark’s Nickel ESG Report is an annual subscription with quarterly updates.',
    descriptions: [
      {
        items: [
          'Benchmark’s Nickel ESG Report is an annual subscription with quarterly updates.',
          'The report offers comprehensive coverage of the evolving ESG landscape in the upstream nickel supply chain, forecasted trends, Nickel carbon intensity curves and our Benchmark Global LCAs, which measure the environmental impact of mining nickel ore and producing both refined nickel and nickel sulphate.',
          'To keep subscribers up to date, the report contains individual assessments of all mined nickel, refined nickel and nickel sulphate producers, with indicators measuring ESG performance alongside tiers allocated based on our Benchmark’s Sustainability Index Methodology. Utilising data collected through Benchmark’s independent research and analysis, this report provides detailed and expert ESG assessment and monitoring of the nickel industry.',
        ],
      },
    ],
    images: {
      one: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719416656/assets/market/nickel/nickel-1_ge67qk.jpg',
        alt: 'Nickel Forecasts',
      },
      two: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719416655/assets/market/nickel/nickel-2_nklewv.jpg',
        alt: 'Nickel Forecasts',
      },
      three: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719416657/assets/market/nickel/nickel-3_rnhrr5.jpg',
        alt: 'Nickel Forecasts',
      },
    },
  },
  services: [
    {
      icon: 'services/icon-success-chart',
      description: 'Company-by-company ESG database',
    },
    {
      icon: 'services/icon-presentation',
      description: 'Materiality assessment and critical ESG analysis',
    },
    {
      icon: 'services/icon-eco-earth',
      description: 'Benchmark Global Nickel LCA',
    },
    {
      icon: 'services/icon-consultancy',
      description: 'ESG news brief and global policy review',
    },
    {
      icon: 'services/icon-idea',
      description: 'Access to Benchmark’s analysts',
    },
  ],
  sustainabilityIndexes: [
    { name: 'Miners', slug: 'miners' },
    { name: 'Refiners', slug: 'refiners' },
    { name: 'Sulphate', slug: 'sulphate' },
  ],
}
export default nickelData
