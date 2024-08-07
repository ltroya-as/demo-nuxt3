const videoFields = `
  id: databaseId
  slug
  title
  date
  categories {
    nodes {
      id: databaseId
      name
      slug
    }
  }
  tags {
    nodes {
      id: databaseId
      name
      slug
    }
  }
  videos {
    vimeoId
    previewVimeoId
    isPublic
    event
    speaker
    description
    duration
    thumbnail {
      node {
        mediaItemUrl
        sizes
        srcSet
      }
    }
  }
`

export default videoFields
