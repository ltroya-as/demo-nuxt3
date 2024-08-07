import snakeCase from 'lodash/snakeCase'
import {
  ANODE,
  LITHIUM_ION_BATTERIES,
  CATHODE,
  COBALT,
  LITHIUM,
  NATURAL_GRAPHITE,
  NICKEL,
  RECYCLING,
  SOLID_STATE,
  SYNTHETIC_GRAPHITE,
  RARE_EARTHS,
  MANGANESE,
  PHOSPHATE,
  FLUORSPAR,
  SILICON_ANODE,
  BLACK_MASS,
  SODIUM_ION_BATTERIES,
} from '~/constants/services/constants'

export const forecastsReportType = (reportType) =>
  forecastsTypesReport[reportType] ?? 'DEFAULT'

export const getForecastsImagesByReportType = (_reportType, category) => {
  const reportType = snakeCase(_reportType).toUpperCase()
  const forecastsReportType = getReportType(_reportType)

  if (
    forecastsImagesCard[category] &&
    forecastsImagesCard[category][reportType]
  ) {
    return forecastsImagesCard[category][reportType]
  }

  return forecastsImagesCard[forecastsReportType]
}

export const forecastsImagesCard = {
  COST_MODEL: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1675892979/assets/forecasts/forecats-report-total-cost-model_csam78.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1675893773/assets/forecasts/forecats-report-total-cost-model-mobile_i6pmbg.png?_i=AA',
  },
  FORECAST: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1675896615/assets/forecasts/forecasts-report-forecasts_isebe0.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1675896615/assets/forecasts/forecasts-report-forecasts-mobile_oymog8.png?_i=AA',
  },
  FORECAST_REPORT: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1675896848/assets/forecasts/forecasts-report-forecasts-report_jhzreu.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1675896848/assets/forecasts/forecasts-report-forecasts-report-mobile_cxtcgv.png?_i=AA',
  },
  PRICE_FORECAST: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1675897003/assets/forecasts/forecasts-report-price-forecasts_e89hem.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1675897003/assets/forecasts/forecasts-report-price-forecasts-mobile_pyylyy.png?_i=AA',
  },
  EXECUTIVE_SUMMARY: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751090/assets/forecasts/silicon-anode/silicon-anode-executive-summary_a5x5pb.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751090/assets/forecasts/silicon-anode/silicon-anode-executive-summary_a5x5pb.png',
  },
  TECHNOLOGY_HANDBOOK: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751084/assets/forecasts/silicon-anode/silicon-anode-technology-workbook_d5odcu.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751084/assets/forecasts/silicon-anode/silicon-anode-technology-workbook_d5odcu.png',
  },
  COMPANY_PROFILES: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751088/assets/forecasts/silicon-anode/silicon-anode-company-profiles_pbvrsm.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751088/assets/forecasts/silicon-anode/silicon-anode-company-profiles_pbvrsm.png',
  },
  POLICY_BRIEFING: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751085/assets/forecasts/silicon-anode/silicon-anode-policy-briefing_gwahwr.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751085/assets/forecasts/silicon-anode/silicon-anode-policy-briefing_gwahwr.png',
  },
  FORECAST_WORKBOOK: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751086/assets/forecasts/silicon-anode/silicon-anode-forecast-workbook_tfekfu.png',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751086/assets/forecasts/silicon-anode/silicon-anode-forecast-workbook_tfekfu.png',
  },
  VIDEO: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
  },
  DEFAULT: {
    desktop:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1675892979/assets/forecasts/forecats-report-total-cost-model_csam78.png?_i=AA',
    mobile:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1675893773/assets/forecasts/forecats-report-total-cost-model-mobile_i6pmbg.png?_i=AA',
  },
  [SODIUM_ION_BATTERIES.category]: {
    EXECUTIVE_SUMMARY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1720022492/assets/forecasts/sodium-ion-batteries/1_asqwyr.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1720022492/assets/forecasts/sodium-ion-batteries/1_asqwyr.png',
    },
    TECHNOLOGY_HANDBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/2_t6dmdk.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/2_t6dmdk.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/3_qupaa4.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/3_qupaa4.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/4_yktov7.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1720022491/assets/forecasts/sodium-ion-batteries/4_yktov7.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1720022493/assets/forecasts/sodium-ion-batteries/1e_m7pd6h.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1720022493/assets/forecasts/sodium-ion-batteries/1e_m7pd6h.png',
    },
  },
  [LITHIUM_ION_BATTERIES.category]: {
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745164/assets/forecasts/battery-cells/lob-cost-model_vlakf0.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745164/assets/forecasts/battery-cells/lob-cost-model_vlakf0.png',
    },
    BATTERY_DATABASE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864086/assets/forecasts/battery-cells/reports/grid_0_5_1_kegyny.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864086/assets/forecasts/battery-cells/reports/grid_0_5_1_kegyny.png',
    },
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745162/assets/forecasts/battery-cells/lob-forecast-report_q6pgjf.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745162/assets/forecasts/battery-cells/lob-forecast-report_q6pgjf.png',
    },
    COST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1700855261/assets/forecasts/battery-cells/forecast-lithium-ion-batteries-cost-report_eduvug.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1700855261/assets/forecasts/battery-cells/forecast-lithium-ion-batteries-cost-report_eduvug.png',
    },
    COST_CALCULATOR: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864086/assets/forecasts/battery-cells/reports/image_286_2_jq8zsg.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864086/assets/forecasts/battery-cells/reports/image_286_2_jq8zsg.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745169/assets/forecasts/battery-cells/lob-market-overview_enc8yx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745169/assets/forecasts/battery-cells/lob-market-overview_enc8yx.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745163/assets/forecasts/battery-cells/lob-policy-briefing_qcu81o.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745163/assets/forecasts/battery-cells/lob-policy-briefing_qcu81o.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745166/assets/forecasts/battery-cells/lob-partnership-tracker_jqlmqf.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745166/assets/forecasts/battery-cells/lob-partnership-tracker_jqlmqf.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745167/assets/forecasts/battery-cells/lob-forecast-workbook_xxiffx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745167/assets/forecasts/battery-cells/lob-forecast-workbook_xxiffx.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745168/assets/forecasts/battery-cells/lob-company-profiles_sw2srv.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745168/assets/forecasts/battery-cells/lob-company-profiles_sw2srv.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745164/assets/forecasts/battery-cells/lob-price-forescast_cxsc2z.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745164/assets/forecasts/battery-cells/lob-price-forescast_cxsc2z.png',
    },
  },
  [LITHIUM.category]: {
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-company-profiles_glxiig.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718729196/assets/forecasts/lithium/lithium-company-profiles_glxiig.png',
    },
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_2_bjzkls.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_2_bjzkls.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-market-overview_zvcebs.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-market-overview_zvcebs.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-policy-briefing_vyu2ho.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718729196/assets/forecasts/lithium/lithium-policy-briefing_vyu2ho.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-partnership-tracker_mjpazi.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718729196/assets/forecasts/lithium/lithium-partnership-tracker_mjpazi.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718729196/assets/forecasts/lithium/lithium-forecast-workbook_cgpku3.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718729196/assets/forecasts/lithium/lithium-forecast-workbook_cgpku3.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_lithium_mine_flat_shades_of_yellow_and_white_1bd378f6-3e1f-4610-8990-343340814004_1_2_vrhedd.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_lithium_mine_flat_shades_of_yellow_and_white_1bd378f6-3e1f-4610-8990-343340814004_1_2_vrhedd.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_Portable_tech_shades_of_yellow_and_white_lo-_28518d32-6b22-47dd-91c2-60ee7cb3927fv2_1_1_cq8fq1.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_Portable_tech_shades_of_yellow_and_white_lo-_28518d32-6b22-47dd-91c2-60ee7cb3927fv2_1_1_cq8fq1.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_shades_of_yellow_and_white_lo-fi_illustratio_aed18cc0-a456-4c9b-9e47-996656d1d820_1_1_bxfysm.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864148/assets/forecasts/lithium/reports/Benchmark_Minerals_shades_of_yellow_and_white_lo-fi_illustratio_aed18cc0-a456-4c9b-9e47-996656d1d820_1_1_bxfysm.png',
    },
    POLICY_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1710269870/assets/forecasts/lithium/lithium-forecast-policy-report_xqzrko.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1710269870/assets/forecasts/lithium/lithium-forecast-policy-report_xqzrko.png',
    },
    FORECAST_VIDEO: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
    },
  },
  [COBALT.category]: {
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201408/assets/forecasts/cobalt/market-overview_bawkjn.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201408/assets/forecasts/cobalt/market-overview_bawkjn.png',
    },
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201408/assets/forecasts/cobalt/company-profiles_czb5tz.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201408/assets/forecasts/cobalt/company-profiles_czb5tz.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201408/assets/forecasts/cobalt/forecast-report_uvdtx8.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201408/assets/forecasts/cobalt/forecast-report_uvdtx8.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201408/assets/forecasts/cobalt/policy-briefing_qw2hiq.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201408/assets/forecasts/cobalt/policy-briefing_qw2hiq.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864190/assets/forecasts/cobalt/reports/image_102_3_uiaxee.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864190/assets/forecasts/cobalt/reports/image_102_3_uiaxee.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201924/assets/forecasts/cobalt/partnership-report_akwjzx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201924/assets/forecasts/cobalt/partnership-report_akwjzx.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201923/assets/forecasts/cobalt/price-model_uft0oi.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201923/assets/forecasts/cobalt/price-model_uft0oi.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718201923/assets/forecasts/cobalt/price-forecast_xfie9w.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718201923/assets/forecasts/cobalt/price-forecast_xfie9w.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864190/assets/forecasts/cobalt/reports/image_101_3_r8wa1p.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864190/assets/forecasts/cobalt/reports/image_101_3_r8wa1p.png',
    },
    FORECAST_VIDEO: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718202206/assets/forecasts/cobalt/forecast-video_mqdjhs.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718202206/assets/forecasts/cobalt/forecast-video_mqdjhs.png',
    },
  },
  [NICKEL.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742104/assets/forecasts/nickel/nickel-forecast-report_ks2ll0.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742104/assets/forecasts/nickel/nickel-forecast-report_ks2ll0.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864223/assets/forecasts/nickel/reports/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_b32d8257-51ab-49bb-90c3-49d6d30588df_1_2_mtvr1b.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864223/assets/forecasts/nickel/reports/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_b32d8257-51ab-49bb-90c3-49d6d30588df_1_2_mtvr1b.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742106/assets/forecasts/nickel/nickel-price-forecast_d4kejv.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742106/assets/forecasts/nickel/nickel-price-forecast_d4kejv.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742106/assets/forecasts/nickel/nickel-cost-model_ggqwzo.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742106/assets/forecasts/nickel/nickel-cost-model_ggqwzo.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718732850/assets/forecasts/nickel/nickel-market-overview_ggel0a.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718732850/assets/forecasts/nickel/nickel-market-overview_ggel0a.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718732849/assets/forecasts/nickel/nickel-policy-briefing_sh8xeh.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718732849/assets/forecasts/nickel/nickel-policy-briefing_sh8xeh.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718741915/assets/forecasts/nickel/nickel-partnership-tracker_hid8sc.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718741915/assets/forecasts/nickel/nickel-partnership-tracker_hid8sc.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718732849/assets/forecasts/nickel/nickel-forecast-workbook_oukm96.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718732849/assets/forecasts/nickel/nickel-forecast-workbook_oukm96.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718732850/assets/forecasts/nickel/nickel-company-profiles_ecigax.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718732850/assets/forecasts/nickel/nickel-company-profiles_ecigax.png',
    },
  },
  [NATURAL_GRAPHITE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-forecast-report_z79t1b.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-forecast-report_z79t1b.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864254/assets/forecasts/natural-graphite/reports/Benchmark_Minerals_Factory_production_of_Spherical_graphite_ben_03639d6b-2d9c-4e6a-a478-3f40d3a383e7_1_1_ahwgbo.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864254/assets/forecasts/natural-graphite/reports/Benchmark_Minerals_Factory_production_of_Spherical_graphite_ben_03639d6b-2d9c-4e6a-a478-3f40d3a383e7_1_1_ahwgbo.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-price-forecast_xsokw0.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-price-forecast_xsokw0.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-cost-model_hfsbyw.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743088/assets/forecasts/natural-graphite/natural-graphite-cost-model_hfsbyw.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-market-overview_rgczgj.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-market-overview_rgczgj.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-policy-briefing_thgmd5.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-policy-briefing_thgmd5.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-partnership-tracker_rfcajk.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-partnership-tracker_rfcajk.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-forecast-workbook_hocsef.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-forecast-workbook_hocsef.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-company-profiles_e2odqs.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718742690/assets/forecasts/natural-graphite/natural-graphite-company-profiles_e2odqs.png',
    },
  },
  [SYNTHETIC_GRAPHITE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-forecast-report_gh1c3q.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-forecast-report_gh1c3q.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864282/assets/forecasts/synthetic-graphite/reports/Benchmark_Minerals_portable_technology_lo-fi_illustration_shade_6e7d03b7-b41f-4416-b029-46579245e0b5_1_1_xaujqh.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864282/assets/forecasts/synthetic-graphite/reports/Benchmark_Minerals_portable_technology_lo-fi_illustration_shade_6e7d03b7-b41f-4416-b029-46579245e0b5_1_1_xaujqh.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-price-forecast_mcsoyq.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-price-forecast_mcsoyq.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-cost-model_xaa6a7.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743607/assets/forecasts/synthetic-graphite/synthetic-graphite-cost-model_xaa6a7.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-market-overview_gs2hsa.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-market-overview_gs2hsa.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743421/assets/forecasts/synthetic-graphite/synthetic-graphite-policy-briefing_jhe3fm.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743421/assets/forecasts/synthetic-graphite/synthetic-graphite-policy-briefing_jhe3fm.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-partnership-tracker_wciczc.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-partnership-tracker_wciczc.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743421/assets/forecasts/synthetic-graphite/synthetic-graphite-forecast-workbook_ikrrpv.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743421/assets/forecasts/synthetic-graphite/synthetic-graphite-forecast-workbook_ikrrpv.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-company-profiles_q7lwvh.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718743420/assets/forecasts/synthetic-graphite/synthetic-graphite-company-profiles_q7lwvh.png',
    },
  },
  [SOLID_STATE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_cedfd5e1-1312-4e10-9210-bc034f03c1e9_1_1_jgmr10.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_cedfd5e1-1312-4e10-9210-bc034f03c1e9_1_1_jgmr10.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Futuristic_people_in_action_of_investment_tr_7744fe4a-073d-4645-85c5-af5355fc6481_1_1_m1p86h.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Futuristic_people_in_action_of_investment_tr_7744fe4a-073d-4645-85c5-af5355fc6481_1_1_m1p86h.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_83902b06-0a38-48ba-9b02-ff5df65112c8_1_1_kapeb5.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_83902b06-0a38-48ba-9b02-ff5df65112c8_1_1_kapeb5.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_e61d6a01-5a7f-4556-b9a3-b418f18b7063_1_wboisi.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864315/assets/forecasts/solid-state/reports/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_e61d6a01-5a7f-4556-b9a3-b418f18b7063_1_wboisi.png',
    },
    EXECUTIVE_SUMMARY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718750852/assets/forecasts/solid-state/solid-state-executive-summary_mj0bvv.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718750852/assets/forecasts/solid-state/solid-state-executive-summary_mj0bvv.png',
    },
    TECHNOLOGY_HANDBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718750856/assets/forecasts/solid-state/solid-state-technology-workbook_q0czw1.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718750856/assets/forecasts/solid-state/solid-state-technology-workbook_q0czw1.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718750854/assets/forecasts/solid-state/solid-state-company-profiles_op4nkz.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718750854/assets/forecasts/solid-state/solid-state-company-profiles_op4nkz.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718750853/assets/forecasts/solid-state/solid-state-policy-briefing_nddnrk.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718750853/assets/forecasts/solid-state/solid-state-policy-briefing_nddnrk.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718750851/assets/forecasts/solid-state/solid-state-forecast-workbook_umwyeq.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718750851/assets/forecasts/solid-state/solid-state-forecast-workbook_umwyeq.png',
    },
  },
  [ANODE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744178/assets/forecasts/anodes/anode-forecast-report_xayzsq.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744178/assets/forecasts/anodes/anode-forecast-report_xayzsq.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864370/assets/forecasts/anodes/reports/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__60340f94-7fc5-46fa-9020-9aa0bcc42d9d_1_1_waowmm.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864370/assets/forecasts/anodes/reports/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__60340f94-7fc5-46fa-9020-9aa0bcc42d9d_1_1_waowmm.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744174/assets/forecasts/anodes/anode-price-forecast_nuyvxc.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744174/assets/forecasts/anodes/anode-price-forecast_nuyvxc.png',
    },
    RECYCLING_PARTNERSHIP: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1697579365/assets/forecasts/anodes/anode_recycling_partnership_xpeiyx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1697579365/assets/forecasts/anodes/anode_recycling_partnership_xpeiyx.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744177/assets/forecasts/anodes/anode-cost-model_eepvbg.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744177/assets/forecasts/anodes/anode-cost-model_eepvbg.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744174/assets/forecasts/anodes/anode-market-overview_ehxm0l.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744174/assets/forecasts/anodes/anode-market-overview_ehxm0l.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744176/assets/forecasts/anodes/anode-policy-briefing_wqymqx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744176/assets/forecasts/anodes/anode-policy-briefing_wqymqx.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744174/assets/forecasts/anodes/anode-partnership-tracker_vb8pct.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744174/assets/forecasts/anodes/anode-partnership-tracker_vb8pct.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744175/assets/forecasts/anodes/anode-forecast-workbook_ggao1d.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744175/assets/forecasts/anodes/anode-forecast-workbook_ggao1d.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744175/assets/forecasts/anodes/anode-company-profiles_dxx7td.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744175/assets/forecasts/anodes/anode-company-profiles_dxx7td.png',
    },
  },
  [CATHODE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744715/assets/forecasts/cathodes/cathode-forecast-report_b6zrns.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744715/assets/forecasts/cathodes/cathode-forecast-report_b6zrns.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864401/assets/forecasts/cathodes/reports/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__02e765ab-8052-49bf-8736-6e51ded8acdc_1_1_mbpmmo.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864401/assets/forecasts/cathodes/reports/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__02e765ab-8052-49bf-8736-6e51ded8acdc_1_1_mbpmmo.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744717/assets/forecasts/cathodes/cathode-price-forecast_y6u40i.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744717/assets/forecasts/cathodes/cathode-price-forecast_y6u40i.png',
    },
    RECYCLING_PARTNERSHIP: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1682611976/assets/forecasts/forecast-video_y2sa0n.png?_i=AA',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744716/assets/forecasts/cathodes/cathode-cost-model_gc0pvf.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744716/assets/forecasts/cathodes/cathode-cost-model_gc0pvf.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744720/assets/forecasts/cathodes/cathode-market-overview_ezqenz.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744720/assets/forecasts/cathodes/cathode-market-overview_ezqenz.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744715/assets/forecasts/cathodes/cathode-policy-briefing_gzteeg.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744715/assets/forecasts/cathodes/cathode-policy-briefing_gzteeg.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744718/assets/forecasts/cathodes/cathode-partnership-tracker_bsojf2.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744718/assets/forecasts/cathodes/cathode-partnership-tracker_bsojf2.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744721/assets/forecasts/cathodes/cathode-forecast-workbook_fw3wqk.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744721/assets/forecasts/cathodes/cathode-forecast-workbook_fw3wqk.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718744717/assets/forecasts/cathodes/cathode-company-profiles_qsnysb.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718744717/assets/forecasts/cathodes/cathode-company-profiles_qsnysb.png',
    },
  },
  [RECYCLING.category]: {
    BATTERY_DATABASE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1677864434/assets/forecasts/recycling/reports/Benchmark_Minerals_recycling_battery_components_lo-fi_illustrat_c6c12a36-cc1c-4e29-805f-a0313c7fb08a_1_ajo6vw.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1677864434/assets/forecasts/recycling/reports/Benchmark_Minerals_recycling_battery_components_lo-fi_illustrat_c6c12a36-cc1c-4e29-805f-a0313c7fb08a_1_ajo6vw.png',
    },
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745644/assets/forecasts/recycling/recycling-forecast-report_mqwgir.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745644/assets/forecasts/recycling/recycling-forecast-report_mqwgir.png',
    },
    COST_CALCULATOR: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1695935049/assets/forecasts/recycling/recycling-cost-calculator_aiiz8e.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1695935049/assets/forecasts/recycling/recycling-cost-calculator_aiiz8e.png',
    },
    COST_MODEL: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745651/assets/forecasts/recycling/recycling-cost-model_emlsuw.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745651/assets/forecasts/recycling/recycling-cost-model_emlsuw.png',
    },
    RECYCLING_PARTNERSHIP: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1687970663/assets/forecasts/recycling/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_abb212d0-e919-403f-84ce-6168b907c6be_1_uim3aq.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1687970663/assets/forecasts/recycling/Benchmark_Minerals_Futuristic_screen_displaying_tracking_analyt_abb212d0-e919-403f-84ce-6168b907c6be_1_uim3aq.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745650/assets/forecasts/recycling/recycling-price-forecast_x6fksp.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745650/assets/forecasts/recycling/recycling-price-forecast_x6fksp.png',
    },
    MARKET_OVERVIEW: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745648/assets/forecasts/recycling/recycling-market-overview_job5sx.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745648/assets/forecasts/recycling/recycling-market-overview_job5sx.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745642/assets/forecasts/recycling/recycling-policy-briefing_ouwdkr.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745642/assets/forecasts/recycling/recycling-policy-briefing_ouwdkr.png',
    },
    PARTNERSHIP_TRACKER: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745643/assets/forecasts/recycling/recycling-partnership-tracker_oryfax.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745643/assets/forecasts/recycling/recycling-partnership-tracker_oryfax.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745645/assets/forecasts/recycling/recycling-forecast-workbook_mgvsqp.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745645/assets/forecasts/recycling/recycling-forecast-workbook_mgvsqp.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718745646/assets/forecasts/recycling/recycling-company-profiles_ayskvd.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718745646/assets/forecasts/recycling/recycling-company-profiles_ayskvd.png',
    },
  },
  [RARE_EARTHS.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1684424603/assets/forecasts/rare-earths/image_286_1_m6drb8.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1684424603/assets/forecasts/rare-earths/image_286_1_m6drb8.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1684424612/assets/forecasts/rare-earths/Benchmark_Minerals_Data_tracking_maps_and_charts_lo-fi_illustra_81c077ee-4e6a-47e2-a6a9-94d59c7f2091_2_fcjrib.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1684424612/assets/forecasts/rare-earths/Benchmark_Minerals_Data_tracking_maps_and_charts_lo-fi_illustra_81c077ee-4e6a-47e2-a6a9-94d59c7f2091_2_fcjrib.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1684424620/assets/forecasts/rare-earths/Benchmark_Minerals_charts_data_on_computer_screens_5_computer_s_d78ae76d-efb5-41f9-9495-19223e15064a_1_1_dmhchs.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1684424620/assets/forecasts/rare-earths/Benchmark_Minerals_charts_data_on_computer_screens_5_computer_s_d78ae76d-efb5-41f9-9495-19223e15064a_1_1_dmhchs.png',
    },
    NON_CHINA_PROJECT_FILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1695842172/assets/forecasts/rare-earths/RE_non-china-profile-files_u5mi0q.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1695842172/assets/forecasts/rare-earths/RE_non-china-profile-files_u5mi0q.png',
    },
  },
  [MANGANESE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1692135894/assets/forecasts/manganese/Benchmark_Minerals_mining_mine_pit_big_sky_tones_of_yellow_and__88696925-b194-4290-b5ef-e38c6b1fd55d_1_u0icth.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1692135894/assets/forecasts/manganese/Benchmark_Minerals_mining_mine_pit_big_sky_tones_of_yellow_and__88696925-b194-4290-b5ef-e38c6b1fd55d_1_u0icth.png',
    },
    PRICE_FORECAST: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1692135893/assets/forecasts/manganese/Benchmark_Minerals_black_coal_rock_in_the_close_tones_of_yellow_73b78eab-62ce-4b23-b7d5-8523a66b1019_1_br0pcc.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1692135893/assets/forecasts/manganese/Benchmark_Minerals_black_coal_rock_in_the_close_tones_of_yellow_73b78eab-62ce-4b23-b7d5-8523a66b1019_1_br0pcc.png',
    },
    MARKET_OUTLOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751874/assets/forecasts/manganese/manganese-market-outlook_myon75.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751874/assets/forecasts/manganese/manganese-market-outlook_myon75.png',
    },
    MARKET_OUTLOOK_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826830/assets/forecasts/manganese/manganese-market-outlook_xknaqv.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826830/assets/forecasts/manganese/manganese-market-outlook_xknaqv.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826830/assets/forecasts/manganese/manganese-policy-briefing_e7nvpi.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826830/assets/forecasts/manganese/manganese-policy-briefing_e7nvpi.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826831/assets/forecasts/manganese/manganese-company-profiles_fmcmkg.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826831/assets/forecasts/manganese/manganese-company-profiles_fmcmkg.png',
    },
  },
  [PHOSPHATE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1694726101/assets/forecasts/phosphate/benchmarkminerals_LFP_Battery_Cell_tones_of_yellow_and_white_in_c1499e8d-1e1e-4477-906e-2cfceac1b16d_2_1_bfytqf.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1694726101/assets/forecasts/phosphate/benchmarkminerals_LFP_Battery_Cell_tones_of_yellow_and_white_in_c1499e8d-1e1e-4477-906e-2cfceac1b16d_2_1_bfytqf.png',
    },
    BATTERY_DATABASE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1694726090/assets/forecasts/phosphate/benchmarkminerals_Phosphoric_acid_tones_of_yellow_and_white_in__4b8e566b-eed9-4f73-9fa5-dc6b96c68b07_2_2_h9lboj.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1694726090/assets/forecasts/phosphate/benchmarkminerals_Phosphoric_acid_tones_of_yellow_and_white_in__4b8e566b-eed9-4f73-9fa5-dc6b96c68b07_2_2_h9lboj.png',
    },
    MARKET_OUTLOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718752153/assets/forecasts/phosphate/phosphate-market-outlook_grd9dg.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718752153/assets/forecasts/phosphate/phosphate-market-outlook_grd9dg.png',
    },
    MARKET_OUTLOOK_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718752154/assets/forecasts/phosphate/phosphate-market-outlook-workbook_hgmdpo.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718752154/assets/forecasts/phosphate/phosphate-market-outlook-workbook_hgmdpo.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718825626/assets/forecasts/phosphate/phosphate-policy-briefing_ubg9ie.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718825626/assets/forecasts/phosphate/phosphate-policy-briefing_ubg9ie.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718825626/assets/forecasts/phosphate/phosphate-company-profiles_np6ye9.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718825626/assets/forecasts/phosphate/phosphate-company-profiles_np6ye9.png',
    },
  },
  [FLUORSPAR.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1705679733/assets/forecasts/fluorspar/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_24_rutd9e.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1705679733/assets/forecasts/fluorspar/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_24_rutd9e.png',
    },
    MARKET_BALANCE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1705691109/assets/forecasts/fluorspar/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_25_b2agtf.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1705691109/assets/forecasts/fluorspar/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_25_b2agtf.png',
    },
    MARKET_OUTLOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718752388/assets/forecasts/fluorspar/flourspan-market-outlook_kw1snz.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718752388/assets/forecasts/fluorspar/flourspan-market-outlook_kw1snz.png',
    },
    MARKET_OUTLOOK_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-market-outlook_i26vm1.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-market-outlook_i26vm1.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-policy-briefing_voeafw.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-policy-briefing_voeafw.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-company-profiles_dm4egs.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718826185/assets/forecasts/fluorspar/flourspan-company-profiles_dm4egs.png',
    },
  },
  [SILICON_ANODE.category]: {
    FORECAST_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1713199704/assets/forecasts/silicon-anode/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_ua6uvo.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1713199704/assets/forecasts/silicon-anode/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_ua6uvo.png',
    },
    BATTERY_DATABASE: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1713199765/assets/forecasts/silicon-anode/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_snahpj.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1713199765/assets/forecasts/silicon-anode/Benchmark_Minerals_Charts_in_futuristics_computers_shades_of_ye_90ae876b-5ac3-4c83-81fb-0941ec3c5246_1_1_snahpj.png',
    },
    POLICY_REPORT: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1710269870/assets/forecasts/lithium/lithium-forecast-policy-report_xqzrko.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1710269870/assets/forecasts/lithium/lithium-forecast-policy-report_xqzrko.png',
    },
    EXECUTIVE_SUMMARY: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751090/assets/forecasts/silicon-anode/silicon-anode-executive-summary_a5x5pb.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751090/assets/forecasts/silicon-anode/silicon-anode-executive-summary_a5x5pb.png',
    },
    TECHNOLOGY_HANDBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751084/assets/forecasts/silicon-anode/silicon-anode-technology-workbook_d5odcu.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751084/assets/forecasts/silicon-anode/silicon-anode-technology-workbook_d5odcu.png',
    },
    COMPANY_PROFILES: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751088/assets/forecasts/silicon-anode/silicon-anode-company-profiles_pbvrsm.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751088/assets/forecasts/silicon-anode/silicon-anode-company-profiles_pbvrsm.png',
    },
    POLICY_BRIEFING: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751085/assets/forecasts/silicon-anode/silicon-anode-policy-briefing_gwahwr.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751085/assets/forecasts/silicon-anode/silicon-anode-policy-briefing_gwahwr.png',
    },
    FORECAST_WORKBOOK: {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_250,h_350,f_auto/v1718751086/assets/forecasts/silicon-anode/silicon-anode-forecast-workbook_tfekfu.png',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_500,h_200,f_auto/v1718751086/assets/forecasts/silicon-anode/silicon-anode-forecast-workbook_tfekfu.png',
    },
  },
}

forecastsImagesCard[BLACK_MASS.category] =
  forecastsImagesCard[RECYCLING.category]

export const getReportType = (reportType) => {
  const type = String(reportType).split('/').join('')
  return forecastsReportType(type)
}

const forecastsTypesReport = {
  'cost model': 'COST_MODEL',
  '(?!price )forecast': 'FORECAST',
  'forecast report': 'FORECAST_REPORT',
  'price forecast': 'PRICE_FORECAST',
  'forecast-video': 'VIDEO',
}
