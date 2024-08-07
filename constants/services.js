import snakeCase from 'lodash/snakeCase'

const getProductsInterestedService = (service) => ({
  checkboxes: [`which_markets_are_you_interested_in_${snakeCase(service)}`],
})

const getBenchmarkService = (service) => ({
  checkboxes: [`benchmark_services_${snakeCase(service)}`],
})

const getOurEventsService = (service) => ({
  checkboxes: [`our_events_${snakeCase(service)}`],
})

export const getServices = (servicesNames) => {
  let checkboxes = []
  servicesNames?.forEach((service) => {
    if (service && services[service])
      checkboxes = [...checkboxes, ...services[service].checkboxes]
  })
  return { checkboxes }
}

export const services = {
  lithium: getProductsInterestedService('Lithium'),
  'esg-lithium': getProductsInterestedService('Lithium'),
  cobalt: getProductsInterestedService('Cobalt'),
  'esg-cobalt': getProductsInterestedService('Cobalt'),
  'natural-graphite': getProductsInterestedService('Natural Graphite'),
  'esg-natural-graphite': getProductsInterestedService('Natural Graphite'),
  'synthetic-graphite': getProductsInterestedService('Synthetic Graphite'),
  'esg-synthetic-graphite': getProductsInterestedService('Synthetic Graphite'),
  nickel: getProductsInterestedService('Nickel'),
  'esg-nickel': getProductsInterestedService('Nickel'),
  manganese: getProductsInterestedService('Manganese'),
  cathode: getProductsInterestedService('Cathode'),
  gigafactory: getProductsInterestedService('Battery Cells'),
  'battery-cell': getProductsInterestedService('Battery Cells'),
  'lithium-ion-batteries': getProductsInterestedService('Battery Cells'),
  'sodium-ion': getProductsInterestedService('Sodium Ion'),
  'sodium-ion-batteries': getProductsInterestedService('Sodium Ion'),
  'rare-earths': getProductsInterestedService('Rare Earths'),
  anode: getProductsInterestedService('Anode'),
  'black-mass': getProductsInterestedService('Recycling'),
  recycling: getProductsInterestedService('Recycling'),
  fluorspar: getProductsInterestedService('Fluorspar'),
  'silicon-anode': getProductsInterestedService('Silicon Anode'),
  copper: getProductsInterestedService('Copper'),
  phosphate: getProductsInterestedService('Phosphate'),
  'solid-state': getProductsInterestedService('Solid State'),

  esg: getBenchmarkService('sustainability'),
  membership: getBenchmarkService('Membership'),
  'price-assessments': getBenchmarkService('Price Assessments'),
  'market-assessments': getBenchmarkService('Market Assessments'),
  forecasts: getBenchmarkService('Forecasts'),
  forecasts_and_costs: getBenchmarkService('Forecasts and Costs'),
  consultancy: getBenchmarkService('Consultancy'),
  'price-dashboard': getBenchmarkService('Price Dashboard'),
  source: getBenchmarkService('Benchmark Source'),

  'benchmark-week': getOurEventsService('Benchmark Week'),
  'gigafactories-europe': getOurEventsService('Gigafactories Europe'),
  'gigafactories-apac': getOurEventsService('Gigafactories APAC'),
  'gigafactories-usa': getOurEventsService('Gigafactories USA'),
  'gigafactories-uk': getOurEventsService('Gigafactories UK'),
}
