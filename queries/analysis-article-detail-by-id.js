import { gql } from 'graphql-tag'
import seoFields from '@/queries/fragments/seo-fields'

const buildAnalysisArticleDetailByIdQuery = ({ service }) => {
  const serviceLower = service.toLowerCase()
  const serviceCapitalize = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  return gql`
    query get${serviceCapitalize(service)}ArticleDetailById($id: ID!) {
      article: ${serviceLower}Analysis(id: $id, idType: DATABASE_ID) {
        id: databaseId
        title
        slug
        content
        excerpt
        viewerCanRead
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        ${seoFields}
      }
    }
  `
}

export default buildAnalysisArticleDetailByIdQuery
