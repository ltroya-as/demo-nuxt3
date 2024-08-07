import { gql } from 'graphql-tag'
import videosByTagsSubQuery from '~/queries/fragments/videos-by-tags'

const buildMarketInsightsVideosQuery = (
  webinarsTags,
  oneToOneTags,
  interviewsTags,
) => {
  const relatedTags = [...webinarsTags, ...oneToOneTags, ...interviewsTags]
  return gql`
    query getMarketInsightsVideos($categories: [String]) {
      webinars: ${videosByTagsSubQuery(4, webinarsTags)}
      oneToOne: ${videosByTagsSubQuery(4, oneToOneTags)}
      interviews: ${videosByTagsSubQuery(4, interviewsTags)}
      related: ${videosByTagsSubQuery(4, relatedTags, true)}
    }
  `
}

export default buildMarketInsightsVideosQuery
