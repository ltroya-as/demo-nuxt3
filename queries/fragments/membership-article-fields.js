const membershipArticleFields = `
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
      srcSet
    }
  }
  membership {
    publicUrl
  }
  categories {
    nodes {
      id: databaseId
      name
    }
  }
`
export default membershipArticleFields
