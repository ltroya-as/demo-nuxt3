import { gql } from 'graphql-tag'
import { camelAndPascalCase } from '~/utils/string'

const buildAnalysisCategoriesQuery = ({ service }) => {
  const { capitalizeWord, strLower } = camelAndPascalCase(service)
  return gql`
    query get${capitalizeWord}AnalysisCategories {
      ${strLower}Categories {
        nodes {
          name
          slug
        }
      }
    }
  `
}

export default buildAnalysisCategoriesQuery
