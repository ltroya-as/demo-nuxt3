export default {
  data() {
    return {
      articles: [],
    }
  },

  methods: {
    async fetchArticles(mineral) {
      const query = await import(`@/queries/${mineral}-articles.gql`)
      const response = await this.$bmAuth.getGraphqlClient().query({ query })

      const articles = response.data.articles

      if (articles) {
        this.articles = articles.nodes.map(
          ({ categories, ...articleProps }) => {
            let categorySlug = ''

            if (categories.nodes?.length > 0) {
              categorySlug = categories.nodes[0].slug
            }

            return {
              ...articleProps,
              categorySlug,
            }
          },
        )
      }
    },
  },
}
