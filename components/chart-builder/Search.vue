<template>
  <Search
    v-model="search"
    class="search"
    @focus="changeFocus(true)"
    @blur="changeFocus(false)"
    @clear="clearSearch"
  >
    <ul
      v-if="showMenu"
      class="border-s-500 max-h-[395px] overflow-y-auto overflow-x-hidden rounded border bg-white"
    >
      <li
        v-for="item in filteredOptions"
        :key="item.id"
        class="hover:bg-p-100 flex cursor-pointer items-center justify-between border-b border-b-black/10 p-5 font-semibold leading-6 text-black/90 transition-colors last:border-b-0"
        :class="{
          'pointer-events-none !text-black/40':
            item.isSelected || item.isDisabled,
        }"
        @click="selectItem(item)"
      >
        <div
          class="flex w-full items-center justify-between gap-2"
          :data-testid="`product-${item.id}`"
        >
          <span>
            {{ item.name }}
            <span v-if="item.isSelected"> (selected)</span>
            <span v-if="item.isDisabled"> (Blocked)</span>
          </span>
          <CloseLock v-if="!item.authorized" class="!h-6 !w-6" />
        </div>
        <IconCheckCircle
          v-if="item.isSelected"
          class="text-green-light h-4 w-4"
        />
      </li>
    </ul>
  </Search>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { snakeCaseToKebabCase } from '~/utils/string'
import { getServices } from '~/constants/services'

import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'

import CloseLock from '~/assets/icons/close-lock.svg'
import IconCheckCircle from '~/assets/icons/icon-check-circle.svg'

import Search from '@/components/common/Search.vue'

export default {
  components: {
    IconCheckCircle,
    CloseLock,
    Search,
  },
  mixins: [AccessibleModalMixin],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      showMenu: false,
    }
  },
  computed: {
    ...mapGetters({
      options: 'chartBuilder/catalog/products',
    }),
    filteredOptions() {
      if (this.search === '') return this.options
      return this.options.filter((option) =>
        option.name.toLowerCase().startsWith(this.search.toLowerCase()),
      )
    },
  },
  mounted() {
    this.search = this.value
  },
  methods: {
    ...mapActions({
      selectProduct: 'chartBuilder/config/selectProduct',
      unSelectProduct: 'chartBuilder/config/unSelectProduct',
    }),
    changeFocus(isFocus) {
      if (isFocus) {
        this.search = ''
      } else {
        this.search = this.value
      }
      this.showMenu = isFocus
    },
    clearSearch() {
      this.search = ''
      this.showMenu = false
      this.unSelectProduct(this.value)
    },
    openContactModal(slug) {
      const options = getServices([
        'price-dashboard',
        snakeCaseToKebabCase(slug),
      ])
      this.$store.commit('modal/setInitialFields', options)
      this.$modal.open('contact')
      this.showMenu = false
    },
    selectItem(item) {
      if (!item.authorized) {
        this.openContactModal(item.id)
        return
      }

      this.search = item.name

      this.selectProduct({
        id: item.id,
        config: item?.children,
        name: item.name,
      })

      this.showMenu = false
    },
  },
}
</script>

<style scoped>
:deep(.search) {
  @apply text-black/60 transition-colors;
}

:deep(.search > div) {
  @apply focus-within:!border-p-500 border-black/40 px-4 py-3;
}

:deep(.search input) {
  @apply text-lg leading-6 placeholder:font-semibold placeholder:text-black/60;
}

:deep(.search svg) {
  @apply h-5 w-5;
}
</style>
