<template>
  <div
    class="flex flex-grow flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between"
  >
    <div
      class="flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-semibold"
      data-testid="checkboxes"
    >
      <CommonFormCheckbox v-model="allCategories" label="All" />
      <CommonFormCheckbox
        v-for="category in categories"
        :key="category.slug"
        :data="category"
        :label="category.name"
        :model-value="isActiveCategory(category)"
        @change="changeActiveCategories"
      />
    </div>

    <CommonSearch
      v-if="withSearch"
      v-model="searchValue"
      data-testid="search"
      class="md:max-w-[200px]"
      @input="changeSearch"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    withSearch: { type: Boolean, default: false },
    activatedCategories: { type: Array, default: () => [] },
    search: { type: String, default: '' },
    categories: { type: Array, required: true },
  },

  data() {
    return {
      searchValue: '',
      loading: false,
      selectedCategories: [],
    }
  },

  computed: {
    allCategories: {
      get() {
        return this.selectedCategories.length === this.categories.length
      },
      set(value) {
        this.selectedCategories = []
        if (value) {
          this.selectedCategories = [...this.categories]
        }
        this.$emit('changeCategories', this.selectedCategories)
      },
    },
    activeCategories() {
      if (!this.selectedCategories.length) {
        return this.categories.map((c) => c.slug)
      }

      return this.selectedCategories.map((c) => c.slug)
    },
  },

  mounted() {
    this.selectedCategories = this.activatedCategories
    this.searchValue = this.search
  },

  methods: {
    changeSearch: debounce(function () {
      this.$emit('search', this.searchValue)
    }, 1000),
    isActiveCategory(category) {
      return this.selectedCategories.some((item) => item.slug === category.slug)
    },
    changeActiveCategories(category) {
      const found = this.selectedCategories.findIndex(
        (item) => item.slug === category.slug,
      )

      if (found >= 0) {
        this.selectedCategories = this.selectedCategories.filter(
          (item) => item.slug !== category.slug,
        )
        this.$emit('changeCategories', this.selectedCategories)
        return
      }

      this.selectedCategories = [...this.selectedCategories, category]
      this.$emit('changeCategories', this.selectedCategories)
    },
  },
}
</script>
