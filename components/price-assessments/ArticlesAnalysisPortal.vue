<template>
  <div class="mb-6 mt-7 flex flex-col gap-2">
    <h3
      class="border-p-500 text-s-900 border-l-4 pl-2 text-3xl font-bold capitalize"
    >
      {{ titleSection }}
    </h3>
    <div
      v-if="loading"
      class="flex h-full min-h-[365px] w-full flex-col items-center justify-center"
    >
      <TheLoader />
    </div>
    <div v-else class="min-h-[365px]">
      <ArticleSection
        v-if="showArticleSection"
        :articles="articles"
        :mineral="category"
        authorized
        :slug="slug"
        :title="title"
        :page-service="serviceNameAnalysis"
        :page-slug="serviceSlugAnalysis"
      />
    </div>
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import ArticleSection from '~/components/price-assessments/ArticleSectionPortal.vue'

export default {
  components: {
    ArticleSection,
    TheLoader,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    articles: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    serviceNameAnalysis: {
      type: String,
      required: true,
    },
    serviceSlugAnalysis: {
      type: String,
      required: true,
    },
  },
  computed: {
    showArticleSection() {
      return (
        this.articles.length > 0 &&
        this.serviceNameAnalysis &&
        this.serviceSlugAnalysis
      )
    },
    titleSection() {
      return `${this.serviceNameAnalysis} Analysis`
    },
  },
}
</script>
