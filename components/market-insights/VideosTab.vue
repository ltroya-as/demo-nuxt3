<template>
  <div class="relative w-full">
    <div v-if="loading" class="absolute left-0 top-10 w-full">
      <TheLoader />
    </div>
    <template v-else>
      <div v-if="!isViewMoreActive" class="flex flex-col gap-y-5">
        <FiltersSection
          class="lg:hidden"
          data-testid="video-filters"
          :categories="filters"
          :activated-categories="filters"
          @change-categories="changeCategories"
        />
        <VideosByTagsSection
          v-if="webinarsData.videos.length"
          class="lg:block"
          :class="{ hidden: !isSectionFilterSelected(webinarsData.title) }"
          :section-data="webinarsData"
          @play="handleVideoClick"
          @view-more-click="viewMoreClick"
        />
        <VideosByTagsSection
          v-if="oneToOneData.videos.length"
          class="lg:block"
          :class="{ hidden: !isSectionFilterSelected(oneToOneData.title) }"
          :section-data="oneToOneData"
          @play="handleVideoClick"
          @view-more-click="viewMoreClick"
        />
        <VideosByTagsSection
          v-if="interviewData.videos.length"
          class="lg:block"
          :class="{ hidden: !isSectionFilterSelected(interviewData.title) }"
          :section-data="interviewData"
          @play="handleVideoClick"
          @view-more-click="viewMoreClick"
        />
        <VideosByTagsSection
          v-if="relatedData.videos.length"
          class="lg:block"
          :class="{ hidden: !isSectionFilterSelected(relatedData.title) }"
          :section-data="relatedData"
          @play="handleVideoClick"
          @view-more-click="viewMoreClick"
        />
      </div>

      <div v-else class="flex flex-col items-center">
        <div class="mb-6 flex w-full flex-col items-start">
          <div
            class="mb-[18px] flex cursor-pointer items-center gap-x-1.5 text-lg font-semibold"
            @click="backAction"
          >
            <IconArrowBack class="h-[18px] w-[18px]" />
            Back
          </div>
          <div class="text-sm font-semibold">
            Showing {{ viewMoreData.total }} results for
            {{ viewMoreData.title }}
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <VideoCard
            v-for="(video, i) in viewMoreData.videos"
            :key="video.id"
            class="max-w-full shrink-0 md:max-w-full"
            :index="i"
            :slug="video.slug"
            :title="video.title"
            :excerpt="video.excerpt"
            :duration="video.duration"
            :published-date="video.publishedDate"
            :cover-url="video.coverUrl"
            :vimeo-id="video.vimeoId"
            :preview-vimeo-id="video.previewVimeoId"
            @play="handleVideoClick(video)"
          />
        </div>
        <CommonButton
          v-if="viewMoreData.hasNextPage"
          class="mt-6 !w-fit py-3"
          :show-spinner="true"
          :disabled="loadingMore"
          @click="loadMore"
        >
          Load more
        </CommonButton>
      </div>
    </template>
  </div>
</template>

<script>
import { logError } from '~/utils/log-error'
import VideoCard from '~/components/portals/VideoCard.vue'
import VideosByTagsSection from '~/components/market-insights/VideosByTagsSection.vue'
import TheLoader from '~/components/TheLoader.vue'
import CommonButton from '~/components/common/Button.vue'
import FiltersSection from '~/components/price-assessments/FiltersSection.vue'

import IconArrowBack from '~/assets/icons/icon-arrow-back.svg'

export default {
  components: {
    VideoCard,
    VideosByTagsSection,
    TheLoader,
    CommonButton,
    FiltersSection,
    IconArrowBack,
  },

  props: {
    product: {
      type: String,
      required: true,
    },
    categoriesVideos: {
      type: [Array, null],
      default: null,
    },
  },

  data() {
    const WEBINARS = 'Webinars'
    const ONE_TO_ONE_VIDEOS = '101 Videos'
    const INTERVIEWS = 'Interviews'
    const RELATED_CONFERENCE = 'Related Conference'
    const filters = [
      {
        name: WEBINARS,
        slug: 'webinars',
      },
      {
        name: ONE_TO_ONE_VIDEOS,
        slug: 'benchmark-101',
      },
      {
        name: INTERVIEWS,
        slug: 'interviews',
      },
      {
        name: RELATED_CONFERENCE,
        slug: 'related-conference',
      },
    ]

    return {
      filters,
      isPreview: false,
      selectedFilters: filters,
      viewMoreData: {
        title: '',
        videos: [],
        tags: [],
        excludeTags: false,
        nextPageHash: null,
        total: 0,
      },
      webinarsData: {
        title: WEBINARS,
        videos: [],
        tags: ['benchmark-webinars'],
        excludeTags: false,
        total: 0,
      },
      oneToOneData: {
        title: ONE_TO_ONE_VIDEOS,
        videos: [],
        tags: ['benchmark-101'],
        excludeTags: false,
        total: 0,
      },
      interviewData: {
        title: INTERVIEWS,
        videos: [],
        tags: ['power-players', 'analyst-insights'],
        excludeTags: false,
        total: 0,
      },
      relatedData: {
        title: RELATED_CONFERENCE,
        videos: [],
        tags: [
          'benchmark-webinars',
          'benchmark-101',
          'power-players',
          'analyst-insights',
        ],
        excludeTags: true,
        total: 0,
      },
      loading: true,
      loadingMore: false,
    }
  },
  computed: {
    isViewMoreActive() {
      this.$emit('isViewMoreActive', !!this.viewMoreData.total)
      return !!this.viewMoreData.total
    },
    categories() {
      return this.categoriesVideos ?? [this.product]
    },
  },
  async mounted() {
    this.$emit('isViewMoreActive', !!this.viewMoreData.total)
    await this.fetchVideos()
  },
  methods: {
    async fetchVideos() {
      try {
        this.loading = true
        const { webinars, oneToOne, interviews, related } =
          await this.$graphqlClient.getMarketInsightsVideos(
            this.webinarsData.tags,
            this.oneToOneData.tags,
            this.interviewData.tags,
            this.categories,
          )
        this.assignVideoData(this.webinarsData, webinars)
        this.assignVideoData(this.oneToOneData, oneToOne)
        this.assignVideoData(this.interviewData, interviews)
        this.assignVideoData(this.relatedData, related)
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    handleVideoClick(vimeoData) {
      this.$emit('play', vimeoData)
    },
    async viewMoreClick(selectedData) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      this.viewMoreData.title = selectedData.title || ''
      this.viewMoreData.tags = selectedData.tags
      // each Query return the total as the remaining items
      // so total is remaining items
      // and should be updated only on the first Query
      this.viewMoreData.total = selectedData.total
      this.viewMoreData.excludeTags = selectedData.excludeTags
      this.$emit('isViewMoreActive', !!this.viewMoreData.total)
      this.loading = true
      await this.loadMore()
      this.loading = false
    },
    async loadMore() {
      this.loadingMore = true
      const { nodes, pageInfo } = await this.$graphqlClient.getVideosByTags(
        12,
        this.viewMoreData.tags,
        this.product,
        this.viewMoreData.excludeTags,
        this.viewMoreData.nextPageHash,
      )
      this.viewMoreData.videos = [...this.viewMoreData.videos, ...nodes]
      this.viewMoreData.nextPageHash = pageInfo.endCursor
      this.viewMoreData.hasNextPage = pageInfo.hasNextPage
      this.loadingMore = false
    },
    assignVideoData(target, source) {
      target.videos = source.nodes
      target.total = source.pageInfo.total
      target.nextPageHash = source.pageInfo.endCursor
    },
    backAction() {
      this.viewMoreData = {
        title: '',
        videos: [],
        tags: [],
        excludeTags: false,
        nextPageHash: null,
        total: 0,
      }
    },
    changeCategories(selectedFilters) {
      this.selectedFilters = selectedFilters
    },
    isSectionFilterSelected(sectionName) {
      if (!this.selectedFilters.length) return true
      return this.selectedFilters.some((filter) => filter.name === sectionName)
    },
  },
}
</script>
