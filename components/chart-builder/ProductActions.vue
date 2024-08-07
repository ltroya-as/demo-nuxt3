<template>
  <div class="bg-s-100 flex flex-col gap-y-4 rounded px-4 py-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-lg font-semibold">
        <span>{{ counter }}</span>
        <span class="text-black/25" :class="{ '!text-black/60': isCompleted }">
          Product:
          <span v-if="isCompleted" class="text-black/90">
            {{ productName }}
          </span>
        </span>

        <IconCheck v-if="isCompleted" class="text-green-light h-6 w-6" />
      </div>
      <button
        v-if="!isCompleted && counter > 1"
        data-testid="remove-product"
        @click="remove"
      >
        <IconRemove />
      </button>
      <div v-if="isCompleted" v-click-outside="closeMenu" class="relative flex">
        <button
          class="hover:bg-s-300 flex h-6 w-6 items-center justify-center rounded-full transition-colors"
          :class="{ 'bg-s-300': isOpenMenu }"
          @click="toggleMenu"
        >
          <IconDotsVertical class="h-3.5 w-auto" />
        </button>
        <Menu
          v-if="isOpenMenu"
          class="menu mt-1"
          :is-open="isOpenMenu"
          @remove="remove"
          @edit="edit"
          @close="closeMenu"
        />
      </div>
    </div>
    <Search v-if="!isCompleted" :value="productName" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import IconRemove from '~/assets/icons/icon-remove.svg'
import IconDotsVertical from '~/assets/icons/icon-dots-vertical.svg'
import IconCheck from '~/assets/icons/IconCheck.svg'

import Search from '@/components/chart-builder/Search.vue'
import Menu from '@/components/chart-builder/Menu.vue'

export default {
  components: {
    IconRemove,
    IconDotsVertical,
    IconCheck,
    Search,
    Menu,
  },
  props: {
    isCompleted: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
      default: '',
    },
    productId: {
      type: String,
      default: '',
    },
    counter: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isOpenMenu: false,
    }
  },
  methods: {
    ...mapActions({
      updateCatalogProduct: 'chartBuilder/catalog/updateProduct',
      updateProduct: 'chartBuilder/config/updateProduct',
      removeProduct: 'chartBuilder/config/removeProduct',
    }),
    closeMenu() {
      this.isOpenMenu = false
    },
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu
    },
    remove() {
      this.removeProduct(this.productId)
      this.updateCatalogProduct({
        id: this.productId,
        product: { isSelected: false },
      })
    },
    edit() {
      this.updateCatalogProduct({
        id: this.productId,
        product: { isSelected: false },
      })

      this.updateProduct({
        id: this.productId,
        product: { completed: false },
      })
    },
  },
}
</script>
