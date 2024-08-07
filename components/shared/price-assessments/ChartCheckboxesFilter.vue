<template>
  <div>
    <div
      class="border-s-300 lg:border-s-500 mb-3 border-b pb-3 text-sm font-semibold"
      :class="[isModal ? 'w-full' : 'w-auto']"
    >
      <div
        class="flex w-auto flex-row-reverse items-center gap-x-2 lg:flex-row"
      >
        <input
          :id="filter.name"
          v-model="filterValue"
          :disabled="filter.disabled"
          type="checkbox"
          class="form-checkbox border-s-900 text-s-900 disabled:bg-s-400 lg:border-s-500 lg:text-p-500 mr-2 h-4 w-4 cursor-pointer border-2 border-solid focus:shadow-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed"
        />
        <div class="font-montserrat text-s-900 w-full lg:w-max lg:text-white">
          {{ filter.label || filter.name }}
        </div>
      </div>
    </div>
    <div class="space-y-5 lg:mb-4 lg:space-y-1">
      <div v-for="option in filter.options" :key="option.data.name">
        <div class="flex items-center">
          <label
            class="flex w-max flex-grow cursor-pointer flex-row-reverse items-center lg:flex-grow-0 lg:flex-row"
          >
            <input
              :id="option.data.name"
              v-model="option.checked"
              :disabled="option.disabled"
              type="checkbox"
              class="form-checkbox border-s-500 text-s-900 disabled:bg-s-400 lg:text-p-500 mr-2 h-4 w-4 cursor-pointer border-2 border-solid focus:shadow-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed"
              @change="$emit('updated-filters')"
            />
            <span
              class="text-s-900 w-full text-sm font-semibold lg:ml-3 lg:text-white"
            >
              {{ option.data.label || option.data.name }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Component names match the initialFilter names

  props: {
    filter: {
      type: Object,
      required: true,
    },

    isModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filterValue: {
      get() {
        return this.filter.checked
      },
      set(value) {
        this.$emit('updated-header', {
          name: this.filter.label ?? this.filter.name,
          value,
        })
      },
    },
  },
}
</script>
