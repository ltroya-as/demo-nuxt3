import { gql } from 'graphql-tag'
import { getAllowedPostStatuses } from '@/utils/content'

const buildEventsWithDateQuery = ({ includeNonPublished }) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  currentDate.setMonth(currentMonth - 1)

  const year =
    currentMonth === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  return gql`
    query getEvents {
      events(
        first: 100
        where: {
          stati: [${getAllowedPostStatuses(includeNonPublished)}],
          dateQuery: {
            year: ${year},
            month: ${month},
          }
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

export default buildEventsWithDateQuery
