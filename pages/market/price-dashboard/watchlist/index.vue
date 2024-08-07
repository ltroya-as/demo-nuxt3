<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>
  <div v-else>
    <h1 class="mb-4 text-2xl font-bold xl:mb-0 xl:text-4xl">Watchlist</h1>
    <div
      class="mb-4 flex flex-col gap-4 xl:mb-5 xl:flex-row xl:items-end xl:justify-between xl:gap-0"
    >
      <span class="font-semibold">
        Here you can find a collection of the prices you have built.
      </span>
      <CommonSearch v-model="search" class="w-full lg:mt-0 lg:w-auto" />
    </div>
    <div>
      <div
        class="bg-s-200 mb-2 grid grid-cols-12 rounded-lg px-2 py-3 text-sm font-semibold xl:px-5 xl:py-4 xl:text-base"
      >
        <div class="col-span-10 flex md:col-span-5 lg:col-span-5 xl:col-span-6">
          <span class="mr-2.5 hidden md:block xl:mr-6"> Nº </span>
          <span>Name</span>
        </div>
        <div class="hidden md:col-span-4 md:block xl:col-span-4">
          Date range
        </div>
        <div class="md:col-span-3 xl:col-span-2">Actions</div>
      </div>

      <div v-if="!isEmpty" class="flex flex-col gap-y-1">
        <WatchlistItem
          v-for="(watchlist, index) in watchlistsFilter"
          :id="watchlist.id"
          :key="watchlist.id"
          :number="index + 1"
          :name="watchlist.title"
          :from="watchlist.from"
          :to="watchlist.to"
          @delete="openDeleteModal"
        />
      </div>
      <div v-else class="mt-8 text-center text-sm font-semibold">
        You currently have not saved items in your watchlist
      </div>
    </div>

    <WatchlistDeleteModal
      v-if="$store.state.modal.deleteWatchlistOpen"
      :loading="loadingDelete"
      @close="closeDeleteModal"
      @confirm="confirmDeleteWatchlist"
    />
  </div>
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'
import { logError } from '~/utils/log-error'
import WatchlistDeleteModal from '~/components/watchlist/DeleteModal.vue'
import WatchlistItem from '~/components/watchlist/Item.vue'
import TheLoader from '~/components/TheLoader.vue'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

definePageMeta({
  layout: 'price-assessments',
})

export default {
  components: {
    TheLoader,
    WatchlistItem,
    WatchlistDeleteModal,
  },
  mixins: [AuthenticationMixin],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      {
        title: 'Price Assessments Save Watchlist',
        description: PRICE_ASSESSMENTS.seo.description,
      },
      {
        keywords: 'benchmark price assessments, benchmark',
      },
    )
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      loadingDelete: false,
      search: '',
      savedWatchlists: [],
      deleteId: null,
    }
  },
  computed: {
    isEmpty() {
      return !this.watchlistsFilter.length
    },
    watchlistsFilter() {
      if (!this.search) return this.savedWatchlists
      return this.savedWatchlists.filter((watchlist) =>
        watchlist.title.toLowerCase().includes(this.search?.toLowerCase()),
      )
    },
  },
  async mounted() {
    try {
      this.loading = true
      await this.fetchWatchlist()
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchWatchlist() {
      const response = await this.$allPrices.getWatchlist()
      this.savedWatchlists = response
    },
    openDeleteModal(id) {
      this.deleteId = id
      this.$modal.open('deleteWatchlist')
    },
    closeDeleteModal() {
      this.deleteId = null
      this.$modal.close('deleteWatchlist')
    },
    async confirmDeleteWatchlist() {
      if (!this.deleteId) return
      this.loadingDelete = true
      try {
        await this.$allPrices.removeWatchlistById(this.deleteId)
        const index = this.savedWatchlists.findIndex(
          (watchlist) => watchlist.id === this.deleteId,
        )
        this.savedWatchlists.splice(index, 1)
        this.deleteId = null
        this.$modal.close('deleteWatchlist')
        this.$toast.show({
          type: 'error',
          message: 'Chart successfully deleted',
        })
      } catch (error) {
        logError(error)
      } finally {
        this.loadingDelete = false
        this.$modal.close('deleteWatchlist')
      }
    },
  },
}
</script>
