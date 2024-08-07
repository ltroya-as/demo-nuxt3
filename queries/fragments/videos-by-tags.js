import videoFields from '~/queries/fragments/video-fields'

const videosByTagsSubQuery = (
  first,
  tags,
  excludeTags = false,
  after = null,
) => {
  return `
    videos(
      first: ${first}
      after: "${after}"
      where: {
        stati: [PUBLISH]
        taxQuery: {
          relation: AND
          taxArray: [
            {
              field: SLUG, 
              operator: IN, 
              taxonomy: CATEGORY, 
              terms: $categories
            },
            {
              terms: [${tags.map((tag) => `"${tag}"`).join(', ')}]
              taxonomy: TAG
              operator: ${excludeTags ? 'NOT_IN' : 'IN'}
              field: SLUG
            }
          ]
        }
      }
    ) {
      nodes {
        ${videoFields}
      }
      pageInfo {
        total
        hasNextPage
        endCursor
      }
    }
  `
}

export default videosByTagsSubQuery
