import { gql } from 'graphql-tag'
import seoFields from '@/queries/fragments/seo-fields'

const buildBlogArchiveDetailQuery = () => {
  return gql`
    query getBlogArchiveDetail($slug: ID!) {
      blogArchive(id: $slug, idType: SLUG) {
        title
        slug
        content
        excerpt
        date
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

export default buildBlogArchiveDetailQuery
