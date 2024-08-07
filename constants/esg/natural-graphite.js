const graphiteData = {
  images: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1719430669/assets/market/natural-graphite/banner_farqbh.jpg',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1719430669/assets/market/natural-graphite/banner_farqbh.jpg',
  },
  brochureFile: {
    file_name: 'Graphite ESG Report Brochure - Benchmark.pdf',
    category: 'public-documents',
    EnvKey: 'ESGBrochureGraphiteFilePdfId',
  },
  banner: {
    title:
      'Benchmark’s Graphite ESG Report is an annual subscription with quarterly updates.',
    descriptions: [
      {
        items: [
          'Benchmark’s Graphite ESG Report is an annual subscription with quarterly updates.',
          'The report offers comprehensive coverage of the evolving ESG landscape in the upstream graphite supply chain, forecasted trends and our Benchmark Global LCAs, which measure the environmental impact of producing both natural (flake) graphite and synthetic graphite for use in EV battery anode production.',
          'To keep subscribers up to date, the report contains individual assessments of all graphite producers, including companies both in development as well as operational, with indicators measuring and benchmarking ESG performance based on our Benchmark Sustainability Index. Utilising data collected through Benchmark’s independent research and analysis, this report provides detailed, holistic and expert ESG assessment and monitoring of the natural and synthetic graphite industries of the lithium ion battery supply chain.',
        ],
      },
    ],
    images: {
      one: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1719430666/assets/market/natural-graphite/natural-graphite-1_lofkqf.jpg',
        alt: 'Graphite ESG',
      },
      two: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1719430668/assets/market/natural-graphite/natural-graphite-2_lv9h1m.jpg',
        alt: 'Graphite ESG',
      },
      three: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1719430670/assets/market/natural-graphite/natural-graphite-3_zpjg0b.jpg',
        alt: 'Graphite ESG',
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
      description: 'Benchmark Global Graphite LCA',
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
  sustainabilityIndexes: [{ name: 'Natural', slug: 'flake' }],
}
export default graphiteData
