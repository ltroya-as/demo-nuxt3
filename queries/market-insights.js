import { gql } from 'graphql-tag'
import { camelAndPascalCase } from '~/utils/string'

const marketsWithAnalysis = [
  'lithium',
  'cobalt',
  'nickel',
  'natural graphite',
  'synthetic graphite',
  'black mass',
  'rare earths',
]

export const buildMarketInsightsQuery = ({ market, articles = null }) => {
  const { strLower } = camelAndPascalCase(market)
  let termsArticles = `terms: ["${market}"]`

  if (articles) {
    const categories = articles.map((article) => `"${article}"`).join(', ')
    termsArticles = `terms: [${categories}]`
  }

  const marketAnalyses = `${strLower}Analyses`

  const hasAnalysis = marketsWithAnalysis.includes(market)

  const analysisArticles = hasAnalysis
    ? `analysisArticles: ${marketAnalyses}(first: 5) {
    nodes {
      id: databaseId
      title
      slug
      date
      excerpt
      __typename
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }`
    : ''

  return gql`
    query getMarketInsightsData {
      articles: memberships(
        first: 5
        where: {
          taxQuery: {
            relation: OR
            taxArray: [
              {
                ${termsArticles}
                taxonomy: CATEGORY
                operator: IN
                field: SLUG
              }
            ]
          }
        }
      ) {
        nodes {
          id: databaseId
          title
          slug
          date
          excerpt
          __typename
          memberships {
            estimatedReadingTime
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
      ${analysisArticles}
      events(first: 3, where: { showOnlyFeaturedPosts: false }) {
        nodes {
          slug
          events {
            url
            backgroundImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      videos(
        first: 3
        where: {
          showOnlyFeaturedPosts: true,
          taxQuery: {
            relation: OR
            taxArray: [
              {
                ${termsArticles}
                taxonomy: CATEGORY
                operator: IN
                field: SLUG
              }
            ]
          }
        }
      ) {
        nodes {
          id: databaseId
          slug
          title
          date
          videos {
            isPublic
            duration
            vimeoId
            previewVimeoId
            thumbnail {
              node {
                mediaItemUrl
                sizes
                srcSet
              }
            }
          }
        }
      }
    }
  `
}
