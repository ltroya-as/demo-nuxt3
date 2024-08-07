<template>
  <div class="flex max-w-sm flex-col rounded border-4 border-[#e7e8f0]">
    <Search v-model="search" />
    <div
      v-if="filteredList.length > 0"
      class="flex max-h-[300px] flex-col overflow-y-auto border-t-4 border-[#e7e8f0] py-1"
    >
      <Checkbox
        :value="isAllSelected"
        label="Select all"
        class="text-grey-900 text-sm font-semibold"
        @input="selectAllToggle"
      />
      <Checkbox
        v-for="item in filteredList"
        :key="item.name"
        :data="{ id: item.id }"
        :value="item.selected"
        :label="item.name"
        class="text-grey-900 text-sm font-semibold"
        @change="changeSelected"
      />
    </div>
  </div>
</template>

<script>
import Search from '~/components/filters/Search.vue'
import Checkbox from '~/components/filters/Checkbox.vue'

export default {
  components: {
    Checkbox,
    Search,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    list: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    isAllSelected() {
      return this.filteredList.every((item) => item.selected)
    },
    filteredList() {
      const searchValue = this.search.toLowerCase()
      return [...this.list].filter((item) =>
        item.name.toLowerCase().startsWith(searchValue),
      )
    },
  },
  methods: {
    selectAllToggle() {
      const selected = this.filteredList.every((item) => item.selected)
      this.list = this.list.map((item) => ({ ...item, selected: !selected }))
    },
    changeSelected({ id }) {
      const item = this.list.findIndex((item) => item.id === id)
      if (item === -1) return
      this.list.splice(item, 1, {
        ...this.list[item],
        selected: !this.list[item].selected,
      })
    },
  },
}
</script>

<!-- <style scoped>
.search-conatiner {
  background: linear-gradient(0deg, rgb(255 255 255 / 15%), rgb(255 255 255 / 15%)), #071830;
}

/* width */
::-webkit-scrollbar {
  @apply w-2;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-p-blue-50;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-p-yellow-600;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-p-yellow-600;
}
</style> -->
