import { gql } from 'graphql-tag'
import { getAllowedPostStatuses } from '@/utils/content'
import { camelAndPascalCase } from '~/utils/string'

const buildAnalysisArticlesByDateQuery = ({
  service,
  includeNonPublished,
  orderDate,
}) => {
  const { strLower, strUpper, capitalizeWord } = camelAndPascalCase(service)
  return gql`
    query get${capitalizeWord}ArticlesByDate(
      $categories: [String]
      $order: OrderEnum!
      $day: Int!
      $month: Int!
      $year: Int!
    ) {
      articles: ${strLower}Analyses(
        first: 1
        where: {
          stati: [${getAllowedPostStatuses(includeNonPublished)}]
          taxQuery: {
            relation: OR
            taxArray: [
              {
                terms: $categories
                taxonomy: ${strUpper}CATEGORY
                operator: IN
                field: SLUG
              }
            ]
          }
          orderby: {field: DATE, order: $order}
          dateQuery: { ${orderDate}: { day: $day, month: $month, year: $year } },
        }
      ) {
        nodes {
          id: databaseId
          title
          slug
        }
      }
    }
  `
}

export default buildAnalysisArticlesByDateQuery
