<template>
  <div
    class="relative grid grid-cols-1 gap-x-4 gap-y-6 md:h-[650px] md:grid-cols-2"
  >
    <div v-if="loading" class="absolute left-0 top-0 h-full w-full">
      <TheLoader />
    </div>
    <template v-else-if="articles.length > 0">
      <NavigationLink
        class="bg-grey-900 flex cursor-pointer flex-col"
        :url="getArticleUrl(firstArticle)"
        :type="getNavigationTypeElement(firstArticle)"
      >
        <div
          class="min-h-44 flex-1 bg-cover bg-center"
          :style="{ backgroundImage: `url('${firstArticle.coverUrl}')` }"
        />
        <div class="flex min-h-[300px] flex-col justify-between p-6 text-white">
          <div>
            <div class="text-grey-600 flex flex-col text-xs font-semibold">
              <span class="hidden md:block">Article</span>
              <span>
                {{ firstArticle?.publishedDate }}
                {{
                  firstArticle?.readingTime
                    ? `| ${firstArticle.readingTime} min read`
                    : ''
                }}
              </span>
            </div>
            <h3
              class="mb-3 mt-2 line-clamp-2 text-lg font-bold leading-normal md:text-4xl md:leading-[38px]"
            >
              {{ firstArticle.title }}
            </h3>
            <p
              class="mb-11 line-clamp-3 text-base"
              v-html="firstArticle.excerpt"
            />
          </div>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="category in firstArticle.categories"
              :key="category.id"
              class="bg-p-500 text-grey-900 md:text-xxs rounded-full px-2 py-1.5 text-sm font-semibold leading-normal"
            >
              {{ category.name }}
            </span>
          </div>
        </div>
      </NavigationLink>
      <div
        class="flex flex-col overflow-hidden md:max-h-[650px] md:overflow-y-auto"
      >
        <NavigationLink
          v-for="article in articles"
          :key="article.slug"
          class="card-hover-md flex cursor-pointer flex-col items-start gap-x-5 gap-y-1.5 pb-4 last:pb-0 md:flex-row"
          :url="getArticleUrl(article)"
          :type="getNavigationTypeElement(article)"
        >
          <div
            class="relative h-44 w-full shrink-0 bg-cover bg-center md:h-28 md:w-48"
            :style="{
              backgroundImage: `url('${article.coverUrl}')`,
            }"
          >
            <div
              class="absolute right-3 top-3 hidden h-6 w-6 items-center justify-center rounded-full bg-white p-1 md:flex"
            >
              <ArticleIcon class="size-3.5" />
            </div>
          </div>
          <div class="flex flex-col gap-y-2 md:pr-5">
            <div
              class="flex items-center gap-x-1.5 text-xs font-semibold text-[#A3A5AE] md:font-normal"
            >
              <div
                class="ml-0.5 flex size-7 items-center justify-center rounded-full border md:hidden"
              >
                <ArticleIcon class="size-3.5" />
              </div>
              <div class="flex flex-col">
                <span>Article</span>
                <span>
                  {{ article?.publishedDate }}
                  {{
                    article?.readingTime
                      ? `| ${article.readingTime} min read`
                      : ''
                  }}
                </span>
              </div>
            </div>
            <p class="line-clamp-2 text-base font-bold leading-6 md:text-xl">
              {{ article.title }}
            </p>
          </div>
        </NavigationLink>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleIcon from '~/assets/icons/ArticleSmall.svg'

import NavigationLink from '~/components/shared/navigation/Link.vue'

export default {
  components: {
    ArticleIcon,
    NavigationLink,
  },
  props: {
    market: {
      type: String,
      required: true,
    },
    categoriesArticles: {
      type: [Array, null],
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      firstArticle: null,
      articles: [],
    }
  },
  computed: {
    categories() {
      return this.categoriesArticles ?? null
    },
  },
  async mounted() {
    await this.fetchNews()
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true
        const news = await this.$graphqlClient.getNewsArticles({
          market: this.market,
          articles: this.categories,
        })
        if (news.length) {
          this.firstArticle = news[0]
          this.articles = news.slice(1)
        }
      } finally {
        this.loading = false
      }
    },
    getNavigationTypeElement(article) {
      return article?.url ? 'a' : 'nuxt-link'
    },
    getArticleUrl(article) {
      if (!article) return ''
      if (article?.url) return article.url
      if (this.market === '') return ''
      return article.slug ? `/market/${this.market}/${article.slug}` : ''
    },
  },
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .card-hover-md {
    @apply cursor-pointer transition-shadow duration-500;

    &:hover {
      @apply shadow-card-hover scale-[1.008] hover:z-10;
    }
  }
}
</style>
