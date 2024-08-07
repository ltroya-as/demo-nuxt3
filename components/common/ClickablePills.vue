<template>
  <div v-if="hasCategories" class="flex flex-grow flex-wrap items-end">
    <NuxtLink
      v-for="categoryName in categoriesName"
      :key="categoryName.name"
      class="mb-2 mr-2"
      :to="linkForCategoryPage(categoryName.name)"
    >
      <div
        class="bg-p-100 font-lato inline-block rounded-full px-3 py-1 text-sm md:px-5 md:py-1.5 md:text-base xl:text-xl"
        :title="formattedName(categoryName.name)"
      >
        <p class="line-clamp-1">
          {{ formattedName(categoryName.name) }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize'
import kebabCase from 'lodash/kebabCase'
import upperCase from 'lodash/upperCase'

export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
    limit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasCategories() {
      return this.categories?.nodes?.length > 0
    },
    categoriesName() {
      const length = this.limit ? 3 : this.categories?.nodes?.length
      return this.hasCategories ? this.categories.nodes.slice(0, length) : []
    },
  },
  methods: {
    formattedName(categoryName) {
      const words = categoryName?.split(' ')
      if (words.length >= 2) {
        return words
          .map((_word) =>
            _word.length > 2 ? capitalize(_word) : upperCase(_word),
          )
          .join(' ')
      }
      return categoryName.length >= 4
        ? capitalize(categoryName)
        : upperCase(categoryName)
    },

    linkForCategoryPage(categoryName) {
      const isCategoryPage = window.location.pathname.includes(
        '/membership/category/',
      )

      if (isCategoryPage) return `./${kebabCase(categoryName)}`

      return `./category/${kebabCase(categoryName)}`
    },
  },
}
</script>
