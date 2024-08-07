import { gql } from 'graphql-tag'
import videoFields from '~/queries/fragments/video-fields'

const buildVideosQuery = () => {
  return gql`
    query getVideos($first: Int, $after: String, $categoryName: [String]) {
      videos(
        first: $first
        after: $after
        where: {
          stati: [PUBLISH]
          orderby: { field: DATE, order: DESC }
          taxQuery: {
            taxArray: {
              field: SLUG
              operator: IN
              taxonomy: CATEGORY
              terms: $categoryName
            }
          }
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${videoFields}
        }
      }
    }
  `
}

export default buildVideosQuery
