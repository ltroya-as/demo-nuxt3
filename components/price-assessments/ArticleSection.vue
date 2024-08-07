<template>
  <section class="price-assessments-articles mt-12">
    <div class="mb-8 justify-between gap-x-5 lg:flex">
      <!-- Section Title -->
      <h2 class="text-p-em-high text-xl font-bold lg:text-3xl">
        {{ title }} Articles
      </h2>
    </div>

    <section class="mb-4">
      <div class="grid grid-cols-10 gap-x-4" :data-testid="`${slug}-analysis`">
        <!-- Articles -->
        <div
          class="col-span-12 flex flex-col gap-4 lg:col-span-6"
          :data-testid="`${slug}-analysis-news`"
        >
          <PriceAssessmentsArticleCard
            v-for="article in leftArticles"
            :key="article.slug"
            is-new
            :title="article.title"
            :date="article.date"
            :excerpt="article.excerpt"
            :categories="article[serviceCategoryName]"
            :slug="article.slug"
            :authorized="authorized"
            :service="pageService"
          />
        </div>
        <div
          class="col-span-12 flex flex-col gap-4 pr-4 pt-4 lg:col-span-4 lg:max-h-[780px] lg:overflow-y-auto lg:pt-0"
          :data-testid="`${slug}-analysis-old`"
        >
          <PriceAssessmentsArticleCard
            v-for="article in rightArticles"
            :key="article.slug"
            :title="article.title"
            :date="article.date"
            :categories="article[serviceCategoryName]"
            :slug="article.slug"
            :authorized="authorized"
            :service="pageService"
          />
        </div>
      </div>
    </section>
    <CommonButton
      v-if="authorized && viewMoreLink"
      :link="viewMoreLink"
      variant="tertiary"
      data-testid="article-read-more"
    >
      View more Analysis
    </CommonButton>
  </section>
</template>

<script>
import PriceAssessmentsArticleCard from '~/components/price-assessments/ArticleCard.vue'
import CommonButton from '~/components/common/Button.vue'
import {
  ANODE,
  CATHODE,
  COBALT,
  LITHIUM,
  LITHIUM_ION_BATTERIES,
  NATURAL_GRAPHITE,
  PRICE_ASSESSMENTS,
  SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'
import { camelAndPascalCase } from '~/utils/string'

export default {
  components: { PriceAssessmentsArticleCard, CommonButton },
  props: {
    pageService: {
      type: String,
      default: null,
    },
    pageSlug: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    authorized: {
      type: Boolean,
      required: true,
    },
    articles: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      leftArticles: [],
      rightArticles: [],
    }
  },

  computed: {
    serviceCategoryName() {
      const { strLower } = camelAndPascalCase(this.pageService)
      return `${strLower}Categories`
    },
    viewMoreLink() {
      const links = {
        [ANODE.slug]: `/${PRICE_ASSESSMENTS.slug}/${ANODE.slug}/analysis`,
        [CATHODE.slug]: `/${PRICE_ASSESSMENTS.slug}/${CATHODE.slug}/analysis`,
        [COBALT.slug]: `/${PRICE_ASSESSMENTS.slug}/${COBALT.slug}/analysis`,
        [LITHIUM.slug]: `/${PRICE_ASSESSMENTS.slug}/${LITHIUM.slug}/analysis`,
        [LITHIUM_ION_BATTERIES.slug]: `/${PRICE_ASSESSMENTS.slug}/${LITHIUM_ION_BATTERIES.slug}/analysis`,
        [NATURAL_GRAPHITE.slug]: `/${PRICE_ASSESSMENTS.slug}/${NATURAL_GRAPHITE.slug}/analysis`,
        [SYNTHETIC_GRAPHITE.slug]: `/${PRICE_ASSESSMENTS.slug}/${SYNTHETIC_GRAPHITE.slug}/analysis`,
      }
      return links[this.slug] ?? null
    },
  },

  mounted() {
    this.formatArticles()
  },

  methods: {
    formatArticles() {
      if (this.pageService && this.pageSlug) {
        const articles = this.articles.map((article) => {
          let categorySlug = ''
          if (article[this.serviceCategoryName].nodes?.length > 0) {
            categorySlug = article[this.serviceCategoryName].nodes[0].slug
          }

          return {
            ...article,
            categorySlug,
          }
        })

        this.leftArticles = articles.slice(0, 2)
        this.rightArticles = articles.slice(2)
      }
    },
  },
}
</script>
