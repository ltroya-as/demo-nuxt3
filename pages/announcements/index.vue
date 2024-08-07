<template>
  <div class="relative h-full w-full">
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>
    <div
      v-else
      class="max-w-content-container mx-auto w-full px-4 lg:px-14 2xl:px-0"
    >
      <div class="mx-auto">
        <SharedCommonBackButton
          show-icon-back
          title="Back"
          class="mb-5 mt-2 text-base lg:hidden"
          icon-class="w-4"
          route="/"
          @go-to-back="goToBack"
        />
      </div>

      <h1
        class="mb-3 text-2xl font-bold lg:mb-2 lg:mt-10 lg:text-4xl"
        data-testid="announcement-title-slug"
      >
        Announcements Archive
      </h1>
      <div class="mb-5 gap-3 text-right lg:mb-7 lg:flex lg:items-center">
        <div class="flex-grow text-sm">Filter by date</div>
        <div class="z-20 flex h-full justify-end gap-x-3">
          <v-date-picker
            ref="picker"
            v-model="startDate"
            :first-day-of-week="2"
            :min-date="minDate"
            :max-date="endDate"
            :locale="localeLanguage"
            :select-attribute="attribute"
            :popover="{ showDelay: 500, visibility: 'focus' }"
            @dayclick="updateDateRange()"
          >
            <template #default="{ inputValue, inputEvents }">
              <div>
                <div class="relative flex w-full flex-wrap items-stretch">
                  <span
                    class="absolute z-10 flex h-full w-8 items-center justify-center rounded bg-transparent pb-1 pl-3 pt-1 text-center text-base font-normal leading-snug text-gray-400 lg:pb-3 lg:pt-3"
                  >
                    <dates-chart-icon class="h-4 w-4" />
                  </span>
                  <input
                    :value="inputValue"
                    class="border-s-300 relative w-full rounded border p-2 pl-10 hover:cursor-pointer focus:outline-none lg:w-[8.5rem]"
                    data-testid="chart-start-date-picker"
                    v-on="inputEvents"
                  />
                </div>
              </div>
            </template>
          </v-date-picker>
          <v-date-picker
            ref="picker"
            v-model="endDate"
            :first-day-of-week="2"
            :min-date="startDate"
            :max-date="maxDate"
            :locale="localeLanguage"
            :select-attribute="attribute"
            :popover="{ showDelay: 500, visibility: 'focus' }"
            @dayclick="updateDateRange()"
          >
            <template #default="{ inputValue, inputEvents }">
              <div>
                <div class="relative flex w-full flex-wrap items-stretch">
                  <span
                    class="absolute z-10 flex h-full w-8 items-center justify-center rounded bg-transparent pb-1 pl-3 pt-1 text-center text-base font-normal leading-snug text-gray-400 lg:pb-3 lg:pt-3"
                  >
                    <dates-chart-icon class="h-4 w-4" />
                  </span>
                  <input
                    :value="inputValue"
                    class="border-s-300 relative w-full rounded border p-2 pl-10 hover:cursor-pointer focus:outline-none lg:w-[8.5rem]"
                    data-testid="chart-end-date-picker"
                    v-on="inputEvents"
                  />
                </div>
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
      <div
        v-if="noResultsFound"
        class="text-s-700 mx-auto flex w-full max-w-full flex-col items-center justify-center gap-5 pt-20 text-center text-xl font-semibold md:max-w-[580px]"
      >
        <ArticleAnalysisIcon
          class="h-full max-h-[112px] min-h-[112px] w-full min-w-[126px] max-w-[126px]"
        />
        <span>
          There are currently no announcements published, please check back next
          month for newly posted announcements!
        </span>
      </div>
      <div v-else class="mb-8 flex flex-col gap-8">
        <CommonAnnouncementCard
          v-for="announcement in announcements"
          :key="announcement.slug"
          data-testid="announcement-cards"
          :title="announcement.title"
          :slug="announcement.slug"
          :date="announcement.date"
          :excerpt="announcement.excerpt"
        />
      </div>
      <div v-if="hasNextPage" class="mb-3 flex items-center justify-center">
        <CommonButton
          class="!text-black lg:!w-fit"
          variant="tertiary-dark"
          @click="loadMoreAnnouncements"
        >
          Load more
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import { sub, getDate, getMonth, getYear, add } from 'date-fns'
import uniqBy from 'lodash/uniqBy'
import getAnnouncementsArchive from '~/queries/announcements-archive.gql'
import DatesChartIcon from '@/assets/icons/mobile/charts/Dates.svg'
import { logError } from '~/utils/log-error'
import ArticleAnalysisIcon from '~/assets/icons/article-analysis.svg'

export default {
  components: {
    'dates-chart-icon': DatesChartIcon,
    ArticleAnalysisIcon,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Announcements Archive' })
    useHead(seo)
  },
  data() {
    return {
      announcements: [],
      endCursor: null,
      hasNextPage: true,
      startDate: new Date(new Date().getFullYear() - 1, 0, 1),
      endDate: new Date(),
      minDate: new Date(2023, 0, 1),
      maxDate: new Date(),
      localeLanguage: 'en-US',
      attribute: {
        highlight: {
          start: {
            style: {
              backgroundColor: this.$theme.colors.p['500'],
            },
            contentStyle: {
              color: this.$theme.colors.s['900'],
            },
          },
        },
      },
      loading: true,
    }
  },
  computed: {
    noResultsFound() {
      return this.announcements.length === 0 && !this.loading
    },
  },

  beforeUnmount() {
    this.$store.commit('announcements/setCursorPosition', {
      cursorPosition: window.scrollY,
    })
  },

  async mounted() {
    this.localeLanguage = navigator.language
    if (this.$store.state.announcements.announcements.list) {
      const {
        list: announcements,
        startDate,
        endDate,
        hasNextPage,
        endCursor,
        cursorPosition,
      } = this.$store.state.announcements.announcements

      this.announcements = announcements
      this.hasNextPage = hasNextPage
      this.endCursor = endCursor
      this.startDate = startDate
      this.endDate = endDate
      setTimeout(() => {
        window.scrollTo({
          top: cursorPosition,
          left: 0,
          behavior: 'smooth',
        })
      }, 100)
      this.loading = false
    } else {
      await this.fetchAnnouncements()
    }
  },

  methods: {
    async loadMoreAnnouncements() {
      if (this.hasNextPage) {
        await this.fetchAnnouncements()
      }
    },

    async fetchAnnouncements() {
      try {
        this.loading = true
        const startDate = sub(new Date(this.startDate), { days: 1 })
        const endDate = add(new Date(this.endDate), { days: 1 })
        const response = await this.$bmAuth.getPublicGraphqlClient().query({
          query: getAnnouncementsArchive,
          variables: {
            dayInitial: getDate(startDate),
            monthInitial: getMonth(startDate) + 1,
            yearInitial: getYear(startDate),
            dayFinal: getDate(endDate),
            monthFinal: getMonth(endDate) + 1,
            yearFinal: getYear(endDate),
            after: this.endCursor,
          },
        })

        const announcements = response.data.announcements ?? []

        this.announcements = uniqBy(
          [...this.announcements, ...announcements.nodes],
          'slug',
        )

        this.hasNextPage = announcements.pageInfo.hasNextPage
        this.endCursor = announcements.pageInfo.endCursor

        this.$store.commit('announcements/setAnnouncements', {
          announcements: this.announcements,
          startDate: this.startDate,
          endDate: this.endDate,
          hasNextPage: this.hasNextPage,
          endCursor: this.endCursor,
        })
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },

    clearArticles() {
      this.announcements = []
      this.endCursor = null
      this.hasNextPage = true
      this.$store.commit('announcements/setAnnouncements', {
        announcements: this.announcements,
        hasNextPage: this.hasNextPage,
        endCursor: this.endCursor,
        startDate: null,
        endDate: null,
      })
    },

    updateDateRange() {
      this.clearArticles()
      this.fetchAnnouncements()
    },

    goToBack() {
      this.$router.push('/')
    },
  },
}
</script>
