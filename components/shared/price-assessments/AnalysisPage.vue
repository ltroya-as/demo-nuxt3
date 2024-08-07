<template>
  <div class="relative h-full w-full">
    <PriceAssessmentsSectionTitle :title="title" authorized :icon="icon" />
    <PriceAssessmentsFiltersSection
      v-if="categories.length"
      :data-testid="`${slug}-analysis-filters`"
      :search="search as string"
      :categories="categories"
      :activated-categories="activeCategories"
      @search="searchArticles"
      @change-categories="changeCategories"
    />

    <div class="relative" :data-testid="`${slug}-analysis`">
      <div
        v-if="loadingPage"
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
          <PriceAssessmentsArticleCard
            v-for="article in articles"
            :key="article.slug"
            is-new
            :title="article.title"
            :date="article.date"
            :excerpt="article.excerpt"
            :categories="article[serviceCategoryName]"
            :slug="article.slug"
            authorized
            :service="slug"
            :query-string="queryString"
          />
        </div>

        <div
          v-if="hasNextPage && !noResultsFound"
          class="mt-4 flex items-center justify-center"
        >
          <CommonButton
            class="lg:!w-fit"
            variant="primary"
            :disabled="loadMoreLoading"
            :show-spinner="loadMoreLoading"
            @click="loadMoreArticles"
          >
            Load more
          </CommonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'

import CommonButton from '~/components/common/Button.vue'
import PriceAssessmentsArticleCard from '~/components/price-assessments/ArticleCard.vue'
import PriceAssessmentsFiltersSection from '~/components/price-assessments/FiltersSection.vue'
import PriceAssessmentsSectionTitle from '~/components/price-assessments/SectionTitle.vue'
import TheLoader from '~/components/TheLoader.vue'

import ArticleAnalysisIcon from '~/assets/icons/article-analysis.svg'

import { camelAndPascalCase } from '~/utils/string'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

const props = defineProps<{
  service: any
  slug: string
}>()

const route = useRoute()
const router = useRouter()
const store = useStore()
const { $graphqlClient } = useNuxtApp()
const { getSeoInfo } = useSeo()

const queryString = ref(route.query ?? null)
const search = ref(route.query.search ?? '')
const activeCategories = ref([])
const loadingPage = ref(true)
const loadMoreLoading = ref(false)
const articles = ref([])
const endCursor = ref(null)
const hasNextPage = ref(true)
const pageSize = ref(10)
const categories = ref([])

const noResultsFound = computed(() => {
  return (
    activeCategories.value.length === categories.value.length &&
    search.value === '' &&
    !articles.value.length &&
    !loadingPage.value
  )
})

const noResultsSearch = computed(() => {
  return search.value !== '' && !articles.value.length && !loadingPage.value
})

const noResultsFilter = computed(() => {
  return (
    activeCategories.value.length !== categories.value.length &&
    search.value === '' &&
    !articles.value.length &&
    !loadingPage.value
  )
})

const icon = computed(() => props.service.iconColor)

const title = computed(() => `${props.service.name} Analysis`)

const seo = computed(() =>
  getSeoInfo({
    title: `${PRICE_ASSESSMENTS.name}: ${title.value}`,
  }),
)

useHead(seo)

const serviceCategoryName = computed(() => {
  const { strLower } = camelAndPascalCase(props.service.slug)
  return `${strLower}Categories`
})

const serviceName = computed(() => props.service?.name ?? '')

const fetchArticles = async () => {
  const newCategories =
    activeCategories.value.length > 0
      ? activeCategories.value.map((c) => c.slug)
      : categories.value.map((c) => c.slug)

  const response = await $graphqlClient.getAnalysisArticles({
    service: props.service.slug,
    categories: newCategories,
    search: search.value,
    first: pageSize.value,
    after: endCursor.value,
  })

  const articlesResponse = response.data.articles ?? []

  articles.value = uniqBy(
    [...articles.value, ...formatArticles(articlesResponse.nodes)],
    'slug',
  )

  hasNextPage.value = response.data.articles.pageInfo.hasNextPage
  endCursor.value = response.data.articles.pageInfo.endCursor

  store.commit('articles/setArticles', {
    service: props.service.slug,
    articles: articles.value,
    categories: activeCategories.value,
    hasNextPage: hasNextPage.value,
    endCursor: endCursor.value,
  })
}

const loadMoreArticles = async () => {
  if (!hasNextPage.value) return

  loadMoreLoading.value = true
  await fetchArticles()
  loadMoreLoading.value = false
}

const updateQueryParams = () => {
  const query: any = {}
  if (activeCategories.value != null && activeCategories.value.length > 0) {
    query.categories = activeCategories.value.map((c) => c.slug).join(',')
  }

  if (search.value != null && search.value !== '') {
    query.search = search.value
  }

  if (!isEqual(route.query, query)) {
    router.replace({ query })
    queryString.value = query
  }
}

const clearArticles = () => {
  articles.value = []
  endCursor.value = null
  hasNextPage.value = true
  store.commit('articles/setArticles', {
    service: props.service.slug,
    articles: articles.value,
    categories: activeCategories.value,
    hasNextPage: hasNextPage.value,
    endCursor: endCursor.value,
  })
}

const searchArticles = async (value) => {
  clearArticles()
  loadingPage.value = true
  search.value = value
  updateQueryParams()
  await fetchArticles()
  loadingPage.value = false
}

const changeCategories = async (value) => {
  clearArticles()
  loadingPage.value = true
  activeCategories.value = value
  updateQueryParams()
  await fetchArticles()
  loadingPage.value = false
}

const formatArticles = (articles) => {
  return articles.map((article) => {
    let categorySlug = ''
    if (article[serviceCategoryName.value].nodes?.length > 0) {
      categorySlug = article[serviceCategoryName.value].nodes[0].slug
    }

    return {
      ...article,
      categorySlug,
    }
  })
}

const fetchCategories = async () => {
  const response = await $graphqlClient.getAnalysisCategories({
    service: props.service.slug,
  })

  return response.data[serviceCategoryName.value].nodes.map((category) => ({
    name: category.name,
    slug: category.slug,
  }))
}

onMounted(async () => {
  loadingPage.value = true

  categories.value = await fetchCategories()

  const categoriesQuery = route.query.categories ?? ''

  if (categoriesQuery !== '') {
    activeCategories.value = categories.value.filter((category) =>
      route.query.categories.includes(category.slug),
    )
  } else {
    activeCategories.value = categories.value
  }

  await fetchArticles()

  loadingPage.value = false
})

onBeforeUnmount(() => {
  store.commit('articles/setCursorPosition', {
    service: props.service.slug,
    cursorPosition: window.scrollY,
  })
})
</script>
