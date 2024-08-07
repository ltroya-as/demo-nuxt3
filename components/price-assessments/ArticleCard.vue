<template>
  <article
    data-testid="article-card"
    class="shadow-pm hover:shadow-pm-hover flex flex-col overflow-hidden rounded-xl bg-white transition-shadow md:flex-row"
  >
    <div
      class="h-24 w-full shrink-0 bg-cover bg-center md:h-full md:max-w-32"
      :style="{ backgroundImage: `url('${coverUrl}')` }"
    >
    </div>
    <div
      class="relative flex flex-col justify-between gap-2 p-4 transition-all duration-300"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-x-3">
          <span
            v-if="withNewTag"
            class="bg-p-500 rounded-full px-4 py-2 text-sm font-semibold"
          >
            New
          </span>
          <p class="text-s-600 whitespace-nowrap text-xs font-semibold">
            {{ formattedDate }} |
            <span class="capitalize">{{ serviceName }}</span>
          </p>
        </div>

        <div>
          <NuxtLink :to="articleLink">
            <h3
              class="line-clamp-3 text-lg font-semibold md:line-clamp-2 lg:text-xl lg:font-bold"
            >
              {{ title }}
            </h3>
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <div class="line-clamp-4 text-sm md:text-base" v-html="excerpt" />

        <div
          class="flex flex-col items-start gap-2 lg:flex-row lg:items-center"
        >
          <div class="flex flex-wrap gap-x-2 gap-y-8 overflow-hidden">
            <CategoryPill
              v-for="category in articleCategories"
              :key="category.name"
              :category="category"
            />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { differenceInMonths, format, parseISO } from 'date-fns'
import CategoryPill from '~/components/price-assessments/CategoryPill.vue'

export default {
  components: {
    CategoryPill,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    slug: {
      type: [String, Number],
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    queryString: {
      type: Object,
      default: () => null,
    },
    coverUrl: {
      type: String,
      default: '',
    },
  },

  computed: {
    formattedDate() {
      return format(new Date(this.date), 'dd MMM yyyy')
    },

    articleLink() {
      const articleLink = {
        path: `/market/${this.service}/${this.slug}`,
      }

      if (this.queryString !== '') {
        articleLink.query = this.queryString
      }
      return articleLink
    },

    withNewTag() {
      const now = Date.now()
      const date = parseISO(this.date)

      return differenceInMonths(date, now) === 0
    },

    articleCategories() {
      if (!this.categories?.nodes.length) {
        return []
      }
      return this.categories.nodes
    },
    serviceName() {
      return this.service.replace('-', ' ')
    },
  },
}
</script>
