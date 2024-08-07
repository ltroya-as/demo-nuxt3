import { gql } from 'graphql-tag'
import { camelAndPascalCase } from '~/utils/string'
import seoFields from '@/queries/fragments/seo-fields'

const buildAnalysisArticleDetailBySlugQuery = ({ service }) => {
  const { strLower, capitalizeWord } = camelAndPascalCase(service)
  return gql`
    query get${capitalizeWord}ArticleDetailBySlug($slug: ID!) {
      article: ${strLower}Analysis(id: $slug, idType: SLUG) {
        id: databaseId
        title
        slug
        date
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

export default buildAnalysisArticleDetailBySlugQuery
