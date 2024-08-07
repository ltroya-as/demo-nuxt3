const graphiteData = {
  images: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1699378400/assets/esg/graphite/ESG_Graphite_Background_z1rjzl.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1699378400/assets/esg/graphite/ESG_Graphite_Background_z1rjzl.png',
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
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1705343087/assets/esg/graphite/Benchmark_Minerals_Cobalt_mine_lo-fi_illustration_shades_of_yel_9b8fca91-b104-445b-bfa1-bf28608881f7_by18ea.png',
        alt: 'Graphite ESG',
      },
      two: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1705343106/assets/esg/graphite/Benchmark_Minerals_landscape_lo-fi_illustration_shades_of_yello_2093b518-9ac5-40ff-bb97-68a250f26c19_nfmycn.png',
        alt: 'Graphite ESG',
      },
      three: {
        url: 'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_400,f_auto/v1705343123/assets/esg/graphite/Benchmark_Minerals_landscape_lo-fi_illustration_shades_of_yello_492ace01-02d2-4d58-b53a-2e7ee1f60fe6_om1pcc.png',
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
