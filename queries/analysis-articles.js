import { gql } from 'graphql-tag'
import { camelAndPascalCase } from '~/utils/string'
import { getAllowedPostStatuses } from '@/utils/content'

const buildAnalysisArticlesQuery = ({ service, includeNonPublished }) => {
  const { strLower, strUpper, capitalizeWord } = camelAndPascalCase(service)
  return gql`
    query get${capitalizeWord}Articles(
      $first: Int
      $after: String
      $categories: [String]
      $search: String
    ) {
      articles: ${strLower}Analyses(
        first: $first
        after: $after
        where: {
          stati: [${getAllowedPostStatuses(includeNonPublished)}]
          taxQuery: {
            relation: OR
            taxArray: [
              {
                terms: $categories
                taxonomy: ${strUpper}CATEGORY
                operator: IN
                field: SLUG
              }
            ]
          }
          search: $search
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id: databaseId
          date
          title
          excerpt
          viewerCanRead
          slug
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          ${strLower}Categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `
}

export default buildAnalysisArticlesQuery
