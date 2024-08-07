<template>
  <div
    v-if="filters?.length > 0"
    :class="[$attrs.class]"
    class="bg-grey-200 w-full max-w-[365px] rounded-l-xl p-6"
  >
    <div
      class="text-grey-900 mb-5 flex items-center justify-between gap-2 text-lg font-semibold"
    >
      <span>Select Filters</span>
      <button @click="$emit('close')">
        <SquareClose class="h-5 w-5 cursor-pointer" />
      </button>
    </div>
    <div class="filters border-grey-600 h-full overflow-auto border">
      <div v-for="item in filters" :key="item.name">
        <Expanded :title="item.name">
          <RangeNumberFilter
            v-if="item.type === 'number'"
            v-bind="item.props"
            :min-value="item.minValue"
            :max-value="item.maxValue"
            @change-min-value="changeMinValue(item.id, $event)"
            @change-max-value="changeMaxValue(item.id, $event)"
          />
          <SearchFilter v-if="item.type === 'list'" v-model="item.value" />
        </Expanded>
      </div>
    </div>
  </div>
</template>

<script>
import Expanded from '~/components/filters/Expanded.vue'
import RangeNumberFilter from '~/components/filters/RangeNumberFilter.vue'
import SearchFilter from '~/components/filters/SearchFilter.vue'
import SquareClose from '~/assets/icons/SquareClose.svg'

export default {
  components: {
    Expanded,
    RangeNumberFilter,
    SearchFilter,
    SquareClose,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filters: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    changeMinValue(id, minValue) {
      const index = this.filters.findIndex((item) => item.id === id)
      if (index === -1) return
      this.filters.splice(index, 1, {
        ...this.filters[index],
        minValue,
      })
    },
    changeMaxValue(id, maxValue) {
      const index = this.filters.findIndex((item) => item.id === id)
      if (index === -1) return
      this.filters.splice(index, 1, {
        ...this.filters[index],
        maxValue,
      })
    },
  },
}
</script>

<style scoped>
.filters {
  max-height: calc(100% - 48px);
}
</style>
