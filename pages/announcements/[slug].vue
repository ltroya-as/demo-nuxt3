<template>
  <div class="mx-auto h-full w-full">
    <!-- Loading -->
    <div v-if="loading" class="absolute inset-0">
      <div class="absolute left-0 top-1/2 w-full -translate-y-1/2">
        <TheLoader />
      </div>
    </div>

    <!-- Page -->
    <div v-else>
      <div class="mx-auto px-4 lg:px-14 2xl:px-0">
        <SharedCommonBackButton
          show-icon-back
          title="Back"
          class="mb-2 mt-2 text-base lg:hidden"
          icon-class="w-4"
          route="/announcements"
        />
      </div>

      <div class="relative mx-auto mb-4 lg:mb-7">
        <div
          class="max-w-content-container absolute left-1/2 top-12 w-full -translate-x-1/2 lg:px-14 2xl:px-0"
        >
          <SharedCommonBackButton
            show-icon-back
            title="Back"
            class="hidden text-base text-white lg:flex"
            icon-class="w-4"
            route="/announcements"
          />
        </div>
        <BenchmarkLogo
          class="absolute left-1/2 top-1/2 z-10 h-10 w-[265px] -translate-x-1/2 -translate-y-1/2 text-white lg:block lg:h-[127px] lg:w-[800px] xl:w-[863px]"
        />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1699972312/assets/announcements/cover-page_o8qyxz.png?_i=AA"
          alt="article-banner"
          class="h-[150px] max-h-[150px] w-full max-w-full object-cover object-top lg:h-[400px] lg:max-h-[400px]"
        />
      </div>

      <div
        class="max-w-content-container px-small lg:px-big mx-auto mb-20 h-full"
      >
        <article>
          <div class="max-w-article-container mx-auto">
            <div>
              <h1
                data-testid="announcement-title-slug"
                class="mb-2 text-left text-2xl font-bold leading-tight first-letter:uppercase lg:mb-3 lg:text-4xl"
              >
                {{ announcement.title }}
              </h1>
              <div
                data-testid="announcement-date-slug"
                class="flex justify-between gap-2 text-base"
              >
                <span class="hidden lg:block">
                  {{ announcementDate }}
                </span>
                <span class="lg:hidden">
                  {{ announcementDateMobile }}
                </span>
              </div>

              <div class="border-p-500 mb-5 mt-3 w-full border-t-[3px]"></div>

              <div class="max-w-full">
                <div
                  data-testid="announcement-content-slug"
                  class="prose md:prose-base max-w-none"
                  v-html="announcement.content"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import SeoUtilsMixin from '@/mixins/SeoUtilsMixin'
import PageSeoMixin from '@/mixins/PageSeoMixin'
import getAnnouncement from '~/queries/get-announcement-by-slug.gql'
import BenchmarkLogo from '@/assets/icons/benchmark-logo.svg'

definePageMeta({ layout: 'article' })

export default {
  components: {
    BenchmarkLogo,
  },

  mixins: [SeoUtilsMixin, PageSeoMixin],
  data() {
    return {
      loading: true,
      announcement: {},
    }
  },

  head() {
    const seoProperties = this.announcement?.seo || {}
    return this.generateSeoInfo(
      {
        title: this.announcement.title || 'Announcement Article',
      },
      seoProperties,
    )
  },

  computed: {
    announcementDate() {
      return format(parseISO(this.announcement.date), 'do MMMM yyyy')
    },
    announcementDateMobile() {
      return format(parseISO(this.announcement.date), 'dd/MM/yyyy')
    },
    announcementAuthor() {
      return this.announcement.announcements?.author
    },
  },

  async mounted() {
    try {
      await this.fetch()
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetch() {
      const { data } = await this.$bmAuth.getPublicGraphqlClient().query({
        query: getAnnouncement,
        variables: {
          slug: this.$route.params.slug,
        },
      })

      const { announcementBy } = data || {}
      const announcement = announcementBy

      if (announcement == null) {
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
      }

      this.announcement = announcement
    },
  },
}
</script>
