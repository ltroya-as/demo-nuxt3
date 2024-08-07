import {
  LITHIUM,
  NICKEL,
  COBALT,
  NATURAL_GRAPHITE,
  BATTERY_EMISSIONS_ANALYSER,
  RARE_EARTHS,
  SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'

export const getEsgImagesByReportType = (category, reportType) => {
  if (esgImagesCard[category]) {
    return (
      esgImagesCard[category][reportType] ?? esgImagesCard[category].DEFAULT
    )
  }

  return esgImagesCard[reportType]
}
export const esgImagesCard = {
  ESG_METHODOLOGY: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689302/assets/esg/image_17_knaiuf.png?_i=AA',
  },
  ESG_REPORT: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689302/assets/esg/image_24_jvhjl8.png?_i=AA',
  },
  ESG_PROFILES: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689301/assets/esg/image_22_jnqiwc.png?_i=AA',
  },
  ESG_TIERING: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689301/assets/esg/image_20_wdalwq.png?_i=AA',
  },
  ESG_MATRICES: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689301/assets/esg/image_19_ybpjal.png?_i=AA',
  },
  ESG_BATTERY_EMISSIONS_ANALYSER: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1686579648/assets/esg/image_280_1_lcn3vv.png?_i=AA',
  },
  ESG_CLIENT_BRIEFING: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1686579648/assets/esg/image_280_1_lcn3vv.png?_i=AA',
  },
  DEFAULT: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1677689301/assets/esg/image_22_jnqiwc.png?_i=AA',
  },
  [LITHIUM.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690514/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_wx3fxs.png?_i=AA',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690514/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_2_maezwb.png?_i=AA',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_3_k9xxol.png?_i=AA',
    },
    ESG_TIERING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_4_isegkh.png?_i=AA',
    },
    ESG_CARBON_INTENSITY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_5_ribgln.png?_i=AA',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1703001288/assets/esg/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_pucs9m.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_5_ribgln.png?_i=AA',
    },
  },
  [NICKEL.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698697260/assets/esg/nickel/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_10_q2i62i.png?_i=AA',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698697261/assets/esg/nickel/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_8_jgd6gh.png?_i=AA',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1698697260/assets/esg/nickel/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_9_vilzsf.png?_i=AA',
    },
    ESG_TIERING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698313/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_13_s6xgt3.png?_i=AA',
    },
    ESG_CARBON_INTENSITY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698697260/assets/esg/nickel/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_11_dh8zqu.png?_i=AA',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1703001288/assets/esg/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_pucs9m.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698697260/assets/esg/nickel/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_11_dh8zqu.png?_i=AA',
    },
  },
  [COBALT.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698313/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_13_s6xgt3.png?_i=AA',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_14_fobnez.png?_i=AA',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_15_rdv410.png?_i=AA',
    },
    ESG_TIERING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_16_y0uiox.png?_i=AA',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1703001288/assets/esg/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_pucs9m.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_17_muufla.png?_i=AA',
    },
  },
  [NATURAL_GRAPHITE.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699013/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_18_hhkroh.png?_i=AA',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_19_shsafa.png?_i=AA',
    },
    ESG_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699013/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_20_nhonlm.png?_i=AA',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_21_sups27.png?_i=AA',
    },
    ESG_MATRICES_2: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1701812516/assets/esg/graphite/esg-graphite-matrix-2_xnslba.png',
    },
    ESG_TIERING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_22_cf0fdz.png?_i=AA',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1703001288/assets/esg/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_pucs9m.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_17_muufla.png?_i=AA',
    },
  },
  [SYNTHETIC_GRAPHITE.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699013/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_18_hhkroh.png?_i=AA',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_19_shsafa.png?_i=AA',
    },
    ESG_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699013/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_20_nhonlm.png?_i=AA',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_21_sups27.png?_i=AA',
    },
    ESG_MATRICES_2: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1701812516/assets/esg/graphite/esg-graphite-matrix-2_xnslba.png',
    },
    ESG_TIERING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698699012/assets/esg/graphite/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_22_cf0fdz.png?_i=AA',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1703001288/assets/esg/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_pucs9m.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_17_muufla.png?_i=AA',
    },
  },
  [RARE_EARTHS.slug]: {
    ESG_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1706108521/assets/esg/rare-earths/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_lahimn.png',
    },
    ESG_METHODOLOGY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1706110122/assets/esg/rare-earths/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_v8miaa.png',
    },
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1706110365/assets/esg/rare-earths/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_2_qx0ahl.png',
    },
    ESG_CLIENT_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1706111174/assets/esg/rare-earths/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_3_zjkmtr.png',
    },
    ESG_MATRICES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1706111867/assets/esg/rare-earths/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_4_wtj4zo.png',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698698312/assets/esg/cobalt/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_17_muufla.png?_i=AA',
    },
  },
  [BATTERY_EMISSIONS_ANALYSER.slug]: {
    ESG_BATTERY_EMISSIONS_ANALYSER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
    DEFAULT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_250,f_auto/v1698690513/assets/esg/lithium/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_6_bsb05f.png?_i=AA',
    },
  },
}
