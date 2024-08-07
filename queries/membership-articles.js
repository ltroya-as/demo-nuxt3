import { gql } from 'graphql-tag'
import { getAllowedPostStatuses } from '@/utils/content'

const buildMembershipArticlesQuery = ({ includeNonPublished }) => {
  return gql`
    query getMembershipArticles(
      $first: Int
      $after: String
      $search: String
      $showOnlyFeaturedPosts: Boolean
      $categoryName: String
    ) {
      memberships(
        first: $first
        after: $after
        where: {
          stati: [${getAllowedPostStatuses(includeNonPublished)}]
          search: $search
          showOnlyFeaturedPosts: $showOnlyFeaturedPosts
          taxQuery: {
            taxArray: [
              {
                terms: ["public"]
                taxonomy: CATEGORY
                operator: NOT_IN
                field: SLUG
              }
            ]
          }
          categoryName: $categoryName
        }
      ) {
        nodes {
          id: databaseId
          title
          date
          slug
          excerpt
          featuredImage {
            node {
              mediaItemUrl
              srcSet
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
}

export default buildMembershipArticlesQuery
