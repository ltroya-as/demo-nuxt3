<template>
  <div>
    <FiltersSection
      v-if="categories.length && isAuthenticated"
      :data-testid="`${slug}-analysis-filters`"
      :search="search"
      :categories="categories"
      :activated-categories="activeCategories"
      @search="searchArticles"
      @change-categories="changeCategories"
    />
    <div
      class="relative"
      :class="isAuthenticated ? 'mt-8' : ''"
      :data-testid="`${slug}-analysis`"
    >
      <div
        v-if="loading"
        data-testid="analisys-page-loading"
        class="absolute left-0 top-0 w-full"
      >
        <TheLoader />
      </div>

      <div v-else>
        <div
          v-if="noResultsFound || noResultsSearch || noResultsFilter"
          class="text-s-700 mx-auto flex w-full max-w-full flex-col items-center justify-center gap-5 pt-20 text-center text-xl font-semibold md:max-w-[580px]"
        >
          <ArticleAnalysisIcon
            class="h-full max-h-[112px] min-h-[112px] w-full min-w-[126px] max-w-[126px]"
          />
          <span v-if="noResultsFound">
            There are currently no
            <strong class="font-bold text-black">{{ serviceName }}</strong>
            articles published, please check back next month for newly posted
            articles!
          </span>
          <span v-if="noResultsFilter">
            Sorry, we couldn’t find any results for the selected filters
          </span>
          <span v-if="noResultsSearch">
            Sorry, we couldn’t find any results for
            <strong class="font-bold text-black"> "{{ search }}".</strong>
          </span>
        </div>

        <div
          v-if="!noResultsFound"
          class="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <ArticleCard
            v-for="article in articles"
            :key="article.slug"
            :title="article.title"
            :date="article.date"
            :excerpt="article.excerpt"
            :categories="article[serviceCategoryName]"
            :slug="article.slug"
            :cover-url="article.coverUrl"
            :service="slug"
            :query-string="queryString"
          />
        </div>

        <div
          v-if="hasNextPage && !noResultsFound && isAuthenticated"
          class="mt-6 flex items-center justify-center"
        >
          <Button
            class="!px-4 !py-3 text-sm lg:!w-full lg:!max-w-40"
            variant="primary"
            :disabled="loadMoreLoading"
            :show-spinner="loadMoreLoading"
            @click="loadMoreArticles"
          >
            Load more
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { camelAndPascalCase } from '~/utils/string'

import ArticleAnalysisIcon from '~/assets/icons/article-analysis.svg'
import ArticleCard from '~/components/price-assessments/ArticleCard.vue'
import Button from '~/components/common/Button.vue'
import FiltersSection from '~/components/price-assessments/FiltersSection.vue'
import TheLoader from '~/components/TheLoader.vue'

export default {
  components: {
    ArticleAnalysisIcon,
    ArticleCard,
    Button,
    FiltersSection,
    TheLoader,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      activeCategories: [],
      loading: true,
      loadMoreLoading: false,
      articles: [],
      endCursor: null,
      hasNextPage: true,
      pageSize: 6,
      currentPage: 1,
      categories: [],
      queryString: null,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    noResultsFound() {
      return (
        this.activeCategories.length === this.categories.length &&
        this.search === '' &&
        !this.articles.length &&
        !this.loading
      )
    },
    noResultsSearch() {
      return this.search !== '' && !this.articles.length && !this.loading
    },
    noResultsFilter() {
      return (
        this.activeCategories.length !== this.categories.length &&
        this.search === '' &&
        !this.articles.length &&
        !this.loading
      )
    },
    serviceCategoryName() {
      const { strLower } = camelAndPascalCase(this.slug)
      return `${strLower}Categories`
    },
    serviceName() {
      return this.service?.name ?? ''
    },
  },
  created() {
    if (this.$route.query) {
      this.queryString = this.$route.query
    }

    const search = this.$route.query.search

    if (search && search !== '') {
      this.search = search
    }
  },
  async mounted() {
    this.loading = true
    this.categories = await this.fetchCategories()

    // if (
    //   this.$nuxt.context.from?.name === `market-${this.slug}-slug` &&
    //   this.$store.state.articles.articles[this.slug]
    // )
    //   this.fetchDataFromStore()
    // else await this.fetchData()
    await this.fetchData()

    this.loading = false
  },
  beforeUnmount() {
    this.$store.commit('articles/setCursorPosition', {
      service: this.slug,
      cursorPosition: window.scrollY,
    })
  },
  methods: {
    async fetchData() {
      const categories = this.$route.query.categories
      if (categories && categories !== '') {
        this.activeCategories = this.categories.filter((category) =>
          categories.includes(category.slug),
        )
      } else {
        this.activeCategories = this.categories
      }
      await this.fetchArticles({})
    },
    fetchDataFromStore() {
      const { articles, categories, hasNextPage, endCursor, cursorPosition } =
        this.$store.state.articles.articles[this.slug]
      this.articles = articles
      this.hasNextPage = hasNextPage
      this.endCursor = endCursor
      this.activeCategories = categories
      setTimeout(() => {
        window.scrollTo({
          top: cursorPosition,
          left: 0,
          behavior: 'smooth',
        })
      }, 100)
    },
    async loadMoreArticles() {
      if (!this.hasNextPage) return

      this.loadMoreLoading = true
      await this.fetchArticles()
      this.loadMoreLoading = false
    },
    clearArticles() {
      this.articles = []
      this.endCursor = null
      this.hasNextPage = true
      this.$store.commit('articles/setArticles', {
        service: this.slug,
        articles: this.articles,
        categories: this.activeCategories,
        hasNextPage: this.hasNextPage,
        endCursor: this.endCursor,
      })
    },
    async searchArticles(search) {
      this.clearArticles()
      this.loading = true
      this.search = search
      this.updateQueryParams()
      await this.fetchArticles()
      this.loading = false
    },
    async changeCategories(categories) {
      this.clearArticles()
      this.loading = true
      this.activeCategories = categories
      this.updateQueryParams()
      await this.fetchArticles()
      this.loading = false
    },
    async fetchArticles() {
      const categories =
        this.activeCategories.length > 0
          ? this.activeCategories.map((c) => c.slug)
          : this.categories.map((c) => c.slug)

      const response = await this.$graphqlClient.getAnalysisArticles({
        service: this.slug,
        categories,
        search: this.search,
        first: this.pageSize,
        after: this.endCursor,
      })

      if (!response) return []

      const articles = response.data?.articles ?? []

      this.articles = uniqBy(
        [...this.articles, ...this.formatArticles(articles.nodes)],
        'slug',
      )

      this.hasNextPage = response.data.articles.pageInfo.hasNextPage
      this.endCursor = response.data.articles.pageInfo.endCursor

      this.$store.commit('articles/setArticles', {
        service: this.slug,
        articles: this.articles,
        categories: this.activeCategories,
        hasNextPage: this.hasNextPage,
        endCursor: this.endCursor,
      })
    },

    formatArticles(articles) {
      return articles.map((article) => {
        let categorySlug = ''
        if (article[this.serviceCategoryName].nodes?.length > 0) {
          categorySlug = article[this.serviceCategoryName].nodes[0].slug
        }

        return {
          ...article,
          categorySlug,
        }
      })
    },

    async fetchCategories() {
      const response = await this.$graphqlClient.getAnalysisCategories({
        service: this.slug,
      })

      if (!response) return []

      return response?.data[this.serviceCategoryName].nodes.map((category) => {
        return {
          name: category.name,
          slug: category.slug,
        }
      })
    },

    async updateQueryParams() {
      const query = { ...this.$route.query }
      if (this.activeCategories != null && this.activeCategories.length > 0) {
        query.categories = this.activeCategories.map((c) => c.slug).join(',')
      }

      if (this.search != null && this.search !== '') {
        query.search = this.search
      }

      if (!isEqual(this.$route.query, query)) {
        await this.$router.replace({ query })
        this.queryString = query
      }
    },
  },
}
</script>
