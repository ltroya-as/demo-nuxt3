import axios from 'axios'
import { PUBLIC_GRAPHQL_ENDPOINT } from './constants'

const MAX_RESULTS_PER_PAGE = 50 // this is the max default in wpgraphql. See https://github.com/wp-graphql/wp-graphql/issues/261
const SKIP_DYNAMIC_GENERATION = process.env.SKIP_DYNAMIC_GENERATION === 'true'

const announcementsQuery = `query getAnnouncements($first: Int, $after: String) {
  announcements(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const downloadsFormQuery = `query downloadsFormQuery($first: Int, $after: String) {
  downloadForms(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}
`

const blogSlugsQuery = `query getBlogPosts($first: Int, $after: String) {
  blogArchives(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const lithiumAnalysisSlugQuery = `query getLithiumAnalysisPosts($first: Int, $after: String) {
  lithiumAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const cobaltAnalysisSlugQuery = `query getCobaltAnalysisPosts($first: Int, $after: String) {
  cobaltAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const nickelAnalysisSlugQuery = `query getNickelAnalysisPosts($first: Int, $after: String) {
  nickelAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const naturalGraphiteAnalysisSlugQuery = `query getNaturalGraphiteAnalysisPosts($first: Int, $after: String) {
  naturalGraphiteAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const syntheticGraphiteAnalysisSlugQuery = `query getSyntheticGraphiteAnalysisPosts($first: Int, $after: String) {
  syntheticGraphiteAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const blackMassAnalysisSlugQuery = `query getBlackMassAnalysisPosts($first: Int, $after: String) {
  blackMassAnalyses(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
    }
  }
}`

const eventsSlugQuery = `query getEvents($first: Int, $after: String) {
  events(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
      events {
        eventType
        url
      }
    }
  }
}`

const getPostTypeRoutes = async (query, basePath, postTypeName) => {
  let hasNextPage = true
  let endCursor = null
  const results = []
  while (hasNextPage) {
    const response = await axios.post(PUBLIC_GRAPHQL_ENDPOINT, {
      query,
      variables: { first: MAX_RESULTS_PER_PAGE, after: endCursor },
    })

    const data = response.data.data[postTypeName]
    let items = data.nodes

    if (basePath.includes('events')) {
      items = items.filter(
        (item) => item.events.eventType?.at(0) === 'Online' && !item.events.url,
      )
    }

    results.push(...items)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  // See for docs: https://github.com/nuxt/nuxt.js/blob/0145578493a123ee0ff0e9adc4921582d456d366/packages/generator/src/generator.js#L289
  return results.map((result) => ({
    route: `/${basePath}/${result.slug}`,
    payload: result,
  }))
}

export const getDynamicRoutes = async () => {
  // Even on SPA Mode, we need to execute the "nuxt-generate" so it creates the "dist" folder
  // for the site to be deployed. For that reason, we avoid creating all the .html files
  // for all the dynamic routes because we don't need them.
  if (SKIP_DYNAMIC_GENERATION) {
    return []
  }

  let paths = []

  if (['production', 'staging'].includes(process.env.CF_PAGES_BRANCH)) {
    const downloadsFormRoutes = await getPostTypeRoutes(
      downloadsFormQuery,
      'downloadform',
      'downloadForms',
    )

    const blogRoutes = await getPostTypeRoutes(
      blogSlugsQuery,
      'blog-archive',
      'blogArchives',
    )

    const lithiumAnalysisRoutes = await getPostTypeRoutes(
      lithiumAnalysisSlugQuery,
      'price-assessments/lithium',
      'lithiumAnalyses',
    )

    const eventRoutes = await getPostTypeRoutes(
      eventsSlugQuery,
      'events',
      'events',
    )

    const cobaltAnalysisRoutes = await getPostTypeRoutes(
      cobaltAnalysisSlugQuery,
      'price-assessments/cobalt',
      'cobaltAnalyses',
    )

    const nickelAnalysisRoutes = await getPostTypeRoutes(
      nickelAnalysisSlugQuery,
      'price-assessments/nickel',
      'nickelAnalyses',
    )

    const naturalGraphiteAnalysisRoutes = await getPostTypeRoutes(
      naturalGraphiteAnalysisSlugQuery,
      'price-assessments/natural-graphite',
      'naturalGraphiteAnalyses',
    )

    const syntheticGraphiteAnalysisRoutes = await getPostTypeRoutes(
      syntheticGraphiteAnalysisSlugQuery,
      'price-assessments/synthetic-graphite',
      'syntheticGraphiteAnalyses',
    )

    const blackMassAnalysisRoutes = await getPostTypeRoutes(
      blackMassAnalysisSlugQuery,
      'price-assessments/black-mass',
      'blackMassAnalyses',
    )

    const announcementsRoutes = await getPostTypeRoutes(
      announcementsQuery,
      'announcements',
      'announcements',
    )

    paths = [
      ...blogRoutes,
      ...lithiumAnalysisRoutes,
      ...downloadsFormRoutes,
      ...eventRoutes,
      ...cobaltAnalysisRoutes,
      ...nickelAnalysisRoutes,
      ...naturalGraphiteAnalysisRoutes,
      ...syntheticGraphiteAnalysisRoutes,
      ...blackMassAnalysisRoutes,
      ...announcementsRoutes,
    ]
  } else {
    //   These routes are used on cypress, so we build only the routes cypress needs.
    paths = [
      '/blog-archive/all-new-blog-posts-now-under-membership-section',
      '/announcements/benchmark-mineral-intelligence-to-take-on-first-ever-investment-from-leading-software-and-data-intelligence-focused-growth-equity-firm-spectrum-equity',
    ]
  }
  return paths
}
