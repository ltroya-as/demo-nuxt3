export const ONE_YEAR_DURATION = 365

export const BACKEND_VERSION_COOKIE = 'BACKEND_VERSION'
export const JWT_ACCESS_TOKEN = 'jwt_token'
export const REFRESH_TOKEN = 'refresh_token'
export const USER_INFO = 'user_info'
export const DEFAULT_OPTIONS = {
  path: '/',
  expires: ONE_YEAR_DURATION,
}

export const META_DESCRIPTION =
  'World leading supply chain & energy transition intelligence. Lithium, Nickel, Cobalt, Graphite, Batteries, Electric Vehicles, Rare Earths and Permanent Magnets.'
export const TITLE = 'Benchmark Mineral Intelligence'

export const MEMBERSHIPS = 'memberships'

export const FORMIDABLE_WEBSITE_URL_LABEL = 'website/url'

export const FRONTEND_DOMAIN = 'https://www.benchmarkminerals.com'

export const BASE_FRONTEND_URL =
  process.env.FRONTEND_BASE_URL || 'https://www.benchmarkminerals.com'
export const BENCHMARK_MINERALS_URLS = [
  'https://www.benchmarkminerals.com',
  FRONTEND_DOMAIN,
]
export const BASE_URL =
  process.env.BASE_URL || 'https://wp-staging.benchmarkminerals.com'
export const API_BASED_URL_ENDPOINT = `${BASE_URL}/wp-json`
export const GRAPHQL_ENDPOINT = `${BASE_URL}/wp/graphql`
export const GRAPH_CDN_ENDPOINT =
  process.env.GRAPH_CDN_ENDPOINT || 'https://benchmark-www-staging.stellate.sh'
export const PUBLIC_GRAPHQL_ENDPOINT = GRAPH_CDN_ENDPOINT

export const SOURCE_DOMAIN = 'https://source.benchmarkminerals.com'

export const NON_PUBLISHED_POST_STATES = ['DRAFT', 'FUTURE']
export const PUBLISHED_POST_STATES = ['PUBLISH']
