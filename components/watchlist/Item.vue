<template>
  <div
    class="shadow-pm flex flex-col gap-y-3 rounded bg-white px-2 py-3 text-sm xl:px-5 xl:py-3 xl:text-base xl:font-semibold"
  >
    <div class="grid grid-cols-12">
      <div
        class="order-1 col-span-10 flex flex-1 flex-col justify-center gap-y-2 sm:order-1 sm:col-span-12 md:col-span-5 md:flex-row md:justify-start lg:col-span-5 xl:col-span-6"
      >
        <div class="flex w-full items-center">
          <span class="mr-2.5 xl:mr-6">{{ number }}</span>
          <span>{{ name }}</span>
        </div>
      </div>

      <div
        class="order-3 col-span-12 flex flex-wrap items-center gap-3 sm:order-2 sm:col-span-9 md:col-span-4"
      >
        <div class="h-fit">
          <span class="font-semibold">From:</span>
          <span class="font-normal"> {{ formatDate(from) }}</span>
        </div>
        <div class="h-fit">
          <span class="font-semibold">To:</span>
          <span class="font-normal">
            {{ formatDate(to) }}
          </span>
        </div>
      </div>

      <div
        class="relative order-2 col-span-2 flex items-center justify-end gap-4 sm:order-3 sm:col-span-3 sm:gap-6 md:col-span-3 xl:col-span-2"
      >
        <CommonButton
          variant="primary"
          class="hidden h-fit min-w-[100px] flex-1 !py-1 sm:block"
          @click="viewItem"
        >
          <span class="text-sm">View</span>
        </CommonButton>
        <div v-click-outside="close" class="relative">
          <button class="p-2" @click="open">
            <IconDotsVertical />
          </button>
          <WatchlistMenu
            :is-open="isOpen"
            @close="close"
            @delete="deleteItem"
            @edit="editItem"
          />
        </div>
      </div>
    </div>
    <CommonButton
      variant="primary"
      class="h-fit min-w-[100px] !py-1 sm:hidden"
      @click="viewItem"
    >
      <span class="text-sm">View</span>
    </CommonButton>
  </div>
</template>

<script>
import { reformat } from '@/utils/date'
import { WATCHLIST_URL } from '~/constants/all-prices/chart-builder'

import CommonButton from '~/components/common/Button.vue'
import WatchlistMenu from '~/components/watchlist/Menu.vue'
import IconDotsVertical from '~/assets/icons/icon-dots-vertical.svg'

export default {
  components: {
    IconDotsVertical,
    CommonButton,
    WatchlistMenu,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.watchlist.openMenu === this.id
    },
  },
  methods: {
    formatDate(date) {
      return reformat(date, 'dd MMM yyyy', 'yyyy-MM-dd')
    },
    open() {
      if (this.isOpen) return this.close()

      this.$store.commit('watchlist/setOpenMenu', this.id)
    },
    deleteItem() {
      this.$emit('delete', this.id)
    },
    editItem() {
      this.$router.push(`${WATCHLIST_URL}${this.id}/?openBuilder=true`)
    },
    viewItem() {
      this.$router.push(`${WATCHLIST_URL}${this.id}/`)
    },
    close() {
      if (!this.isOpen) return

      this.$store.commit('watchlist/closeMenu')
    },
  },
}
</script>
