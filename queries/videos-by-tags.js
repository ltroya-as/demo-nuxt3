import { gql } from 'graphql-tag'
import videosByTagsSubQuery from '~/queries/fragments/videos-by-tags'

const buildVideosByTagsQuery = (
  first,
  tags,
  excludeTags = false,
  after = null,
) => {
  return gql`
    query getVideosByTags($categories: [String]) {
      ${videosByTagsSubQuery(first, tags, excludeTags, after)}
    }
  `
}

export default buildVideosByTagsQuery
