import { gql } from 'graphql-tag'
import { getAllowedPostStatuses } from '@/utils/content'

const buildEventsQuery = ({ includeNonPublished }) => {
  return gql`
    query getEvents {
      events(
        first: 100
        where: {
          stati: [${getAllowedPostStatuses(includeNonPublished)}]
        }
      ) {
        nodes {
          slug
          isFeatured
          events {
            title
            blurb
            url
            startDateTime
            endDateTime
            eventType
            eventWorldTour
            location
            backgroundImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `
}

export default buildEventsQuery
