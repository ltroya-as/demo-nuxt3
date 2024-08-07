const cobaltData = {
  images: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719346124/assets/market/cobalt/cobalt-sustainability-overview-banner_utrocw.jpg',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719346124/assets/market/cobalt/cobalt-sustainability-overview-banner_utrocw.jpg',
  },
  brochureFile: {
    file_name: 'Cobalt ESG Brochure.pdf',
    category: 'cobalt-esg-brochure',
    EnvKey: 'ESGBrochureCobaltFilePdfId',
  },
  banner: {
    title: `Benchmark’s Cobalt ESG Report is an annual subscription with quarterly updates.`,
    descriptions: [
      {
        items: [
          'Benchmark’s Cobalt ESG Report is an annual subscription with quarterly updates.',
          'The report offers comprehensive coverage of the evolving ESG landscape in the upstream cobalt supply chain, forecasted trends and our Benchmark Global LCAs, which measure the environmental impact of producing both cobalt metal and cobalt sulphate.',
          'To keep subscribers up to date, the report contains individual assessments of all cobalt miners and converters, with indicators measuring ESG performance alongside index ratings allocated based on our Benchmark’s Sustainability Index. Utilising data collected through Benchmark’s independent research and analysis, this report provides detailed and expert ESG assessment and monitoring of the cobalt industry.',
        ],
      },
    ],
    images: {
      one: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719346124/assets/market/cobalt/cobalt-1_huvz00.jpg',
        alt: 'Cobalt Forecasts',
      },
      two: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719346125/assets/market/cobalt/cobalt-2_buia0t.jpg',
        alt: 'Cobalt Forecasts',
      },
      three: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,g_auto,w_auto/v1719346124/assets/market/cobalt/cobalt-3_s7urso.jpg',
        alt: 'Cobalt Forecasts',
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
      description: 'Benchmark Global Cobalt LCA',
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
  ],
}
export default cobaltData
