import { gql } from 'graphql-tag'

const buildNewsArticlesQuery = ({ market, articles = null }) => {
  const category = market.toLowerCase().replace(' ', '-')
  let termsArticles = `terms: ["${category}"]`

  if (articles) {
    const categories = articles.map((article) => `"${article}"`).join(', ')
    termsArticles = `terms: [${categories}]`
  }
  return gql`
    query getNewsArticles(
      $first: Int
    ) {
      memberships(
        first: $first
        where: {
          stati: [PUBLISH]
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
          date
          slug
          excerpt
          __typename
          featuredImage {
            node {
              mediaItemUrl
              srcSet
            }
          }
          memberships {
            estimatedReadingTime
          }
          categories {
            nodes {
              name
              slug
              id: databaseId
            }
          }
        }
      }
    }
  `
}

export default buildNewsArticlesQuery
