<template>
  <div class="max-w-content-container mx-auto px-4 lg:px-14 2xl:px-0">
    <h1 class="mb-12 mt-10 text-2xl font-bold md:text-3xl lg:text-4xl">
      Blog Archive
    </h1>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4 xl:grid-cols-3">
      <CommonArticleCard
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :slug="article.slug"
        :date="article.date"
        :excerpt="article.excerpt"
        :thumbnail="article.featuredImage"
        detail-page-path="/blog-archive"
        class="articles"
      />
    </div>

    <div class="mt-10">
      <client-only>
        <InfiniteLoading
          :slots="{ complete: ' ', error: ' ' }"
          @infinite="loadMoreArticles"
        >
          <template #spinner>
            <TheLoader class="my-20" />
          </template>
        </InfiniteLoading>
      </client-only>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'v3-infinite-loading'
import uniqBy from 'lodash/uniqBy'

import getBlogArchiveArticles from '@/queries/blog-archive-articles.gql'
import { services } from '~/constants/services'

const MAX_ARTICLES_PER_QUERY = 21

export default {
  components: {
    InfiniteLoading,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Blog Archive' })
    useHead(seo)
  },
  data() {
    return {
      articles: [],
      featured: null,
      endCursor: null,
      hasNextPage: true,
      infiniteId: 1,
    }
  },
  async mounted() {
    await this.fetch()
    this.$store.commit('modal/setInitialFields', services.membership)
  },
  methods: {
    async fetch() {
      await this.fetchArticles()
    },
    async loadMoreArticles($state) {
      if (this.hasNextPage) {
        await this.fetchArticles()
        $state.loaded()
      } else {
        $state.complete()
      }
    },

    async fetchArticles() {
      const response = await this.$bmAuth.getPublicGraphqlClient().query({
        query: getBlogArchiveArticles,
        variables: {
          first: MAX_ARTICLES_PER_QUERY,
          after: this.endCursor,
        },
      })

      const articles = response.data.blogArchives

      if (articles) {
        this.articles = uniqBy([...this.articles, ...articles.nodes], 'slug')

        this.hasNextPage = articles.pageInfo.hasNextPage
        this.endCursor = articles.pageInfo.endCursor
      }
    },
  },
}
</script>
