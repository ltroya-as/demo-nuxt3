<template>
  <div>
    <div v-if="loading" class="absolute left-0 top-1/2 w-full -translate-y-1/2">
      <TheLoader />
    </div>
    <div v-else>
      <div class="max-w-content-container px-small lg:px-big mx-auto">
        <SharedCommonBackButton
          show-icon-back
          :title="titleBackButton"
          class="my-5"
          :route="getRouteArchive()"
        />
      </div>

      <div class="px-small lg:px-big mx-auto mb-7 h-full md:mb-8">
        <article data-testid="lithium-article">
          <div class="max-w-article-container mx-auto">
            <div v-if="featuredImage" class="mb-6 max-h-[400px] max-w-full">
              <img :src="featuredImage" alt="article-banner" />
            </div>

            <h1
              class="spacing-title mb-3 text-2xl font-bold uppercase leading-tight lg:text-4xl"
            >
              {{ article.title }}
            </h1>

            <span class="text-base">
              {{ formattedDate }}
            </span>

            <div class="border-p-500 mb-6 mt-3 w-full border-t-[3px]"></div>

            <div
              ref="content"
              data-testid="article-content"
              class="prose prose-sm md:prose-base max-w-none"
              v-html="articleContent"
            />
          </div>

          <section
            v-if="!article.viewerCanRead"
            data-testid="article-signin-form"
            class="max-w-article-container bg-p-50 mx-auto mb-6 mt-14 px-8 py-7 lg:px-16"
          >
            <div class="lg:w-article-container">
              <div
                v-if="!loggedIn"
                class="mb-5 flex flex-col items-start gap-x-2 md:flex-row md:items-center"
              >
                <CommonButton
                  class="mb-4 md:mb-0"
                  variant="primary"
                  @click="$modal.open('signIn')"
                >
                  {{ signInText }}
                </CommonButton>
                <p class="text-surface-em-high text-lg font-bold">
                  to continue reading
                </p>
              </div>

              <p
                class="text-surface-em-high text-sm"
                :class="{ 'font-bold': loggedIn }"
              >
                This article is for Benchmark Lithium subscribers
              </p>

              <p class="text-surface-em-high mt-2 text-sm">
                Not a subscriber? Contact us below
              </p>
            </div>
          </section>

          <div
            v-if="!article.viewerCanRead"
            class="max-w-article-container mx-auto px-8 pt-8 lg:px-16"
          >
            <div class="lg:w-article-container relative rounded-md">
              <!-- Message -->
              <div
                class="absolute left-0 top-0 flex h-full w-full items-center justify-center transition-all duration-500"
                :class="{
                  'invisible opacity-0': !success,
                  'opacity-100': success,
                }"
              >
                <div class="mx-14 my-20 text-center">
                  <div class="flex justify-center">
                    <CommonButton
                      variant="secondary"
                      class="text-lg"
                      @click="success = false"
                    >
                      Return to form
                    </CommonButton>
                  </div>
                </div>
              </div>

              <!-- Form -->
              <div
                class="transition-all duration-500"
                :class="{
                  'invisible opacity-0': success,
                  'opacity-100': !success,
                }"
              >
                <CommonFormBuilder
                  data-testid="article-contact-form"
                  :form-id="$config.public.fmContactFormId"
                  :show-success-message="false"
                  reverse-button-row
                  @set-success="(value) => (success = value)"
                >
                  <template #details>
                    <div class="mb-8 flex items-center gap-3.5 md:mb-0">
                      <p class="text-xs uppercase">Prefer to contact us?</p>
                      <a
                        href="mailto:priority@benchmarkminerals.com?subject=Benchmark Minerals: Contact"
                        class="text-p-500 font-bold"
                      >
                        Email us
                      </a>
                    </div>
                  </template>
                </CommonFormBuilder>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div
        class="max-w-content-container px-small lg:px-big mx-auto flex justify-between"
        :class="{
          '!justify-end': previousArticle === null,
        }"
      >
        <NavigationLink
          v-if="previousArticle"
          :url="previousArticle.link"
          type="nuxt-link"
        >
          <div class="mb-7 flex gap-2 text-base font-semibold md:mb-2">
            <IconArrowBack class="w-4" />
            <h3>Previous Article</h3>
          </div>
          <p class="hidden w-56 text-xs md:mb-14 md:line-clamp-2 md:block">
            {{ previousArticle.title }}
          </p>
        </NavigationLink>
        <NavigationLink
          v-if="nextArticle"
          :url="nextArticle.link"
          type="nuxt-link"
        >
          <div
            class="mb-7 flex justify-end gap-2 text-base font-semibold md:mb-2"
          >
            <h3>Next Article</h3>
            <IconArrowBack class="w-4 rotate-180" />
          </div>
          <p class="hidden w-56 text-xs md:mb-14 md:line-clamp-2 md:block">
            {{ nextArticle.title }}
          </p>
        </NavigationLink>
      </div>
    </div>

    <div class="hidden">
      <CommonDownloadButtonLinkById
        v-for="({ id, text }, index) in downloadIds"
        :id="`${index}_${id}`"
        ref="downloadIdRefs"
        :key="index"
        :file-id="id"
        data-testid="download-report-by-id"
        :data-download-id="id"
        variant="link"
        :text="text"
        extra-classes="flex"
      >
      </CommonDownloadButtonLinkById>
    </div>
  </div>
</template>

<script>
import { format, parseISO, getYear, getDate, getMonth } from 'date-fns'
import SeoUtilsMixin from '@/mixins/SeoUtilsMixin'
import PageSeoMixin from '@/mixins/PageSeoMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import TheLoader from '~/components/TheLoader.vue'
import {
  LITHIUM,
  PRICE_ASSESSMENTS,
  SIGN_IN,
} from '~/constants/services/constants'
import { getServices } from '~/constants/services'
import SharedCommonBackButton from '~/components/shared/common/BackButton.vue'
import CommonButton from '~/components/common/Button.vue'
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import CommonDownloadButtonLinkById from '~/components/common/DownloadButtonLinkById.vue'
import NavigationLink from '~/components/shared/navigation/Link.vue'
import IconArrowBack from '~/assets/icons/icon-arrow-back.svg'

const DOWNLOAD_LINK_HREF_REGEX = /\/download\/\d+\/$/
const REPORTS_LINK_HREF_REGEX = /\/reports\/\d+\/$/
const DOWNLOAD_LINK_ID_REGEX = /\d+/

export default {
  components: {
    CommonButton,
    CommonDownloadButtonLinkById,
    CommonFormBuilder,
    SharedCommonBackButton,
    TheLoader,
    NavigationLink,
    IconArrowBack,
  },
  mixins: [SeoUtilsMixin, PageSeoMixin, AuthenticationMixin],
  props: {
    service: {
      type: Object,
      required: true,
    },
    servicePage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: true,
      success: false,
      downloadIds: [],
      downloadLinks: [],
      signInText: SIGN_IN,
      seo: {},
      nextArticle: null,
      previousArticle: null,
    }
  },
  async fetch() {
    try {
      const response = await this.$graphqlClient.getAnalysisArticleDetail({
        service: this.service.slug,
        slug: this.$route.params.slug,
        usePublicClient: true,
      })
      this.seo = response?.data?.article
    } catch (_error) {
      // eslint-disable-next-line no-console
      console.log({ _error })
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${PRICE_ASSESSMENTS.name}: ${this.seo?.title}`,
      description: this.seo?.excerpt,
    })
  },
  computed: {
    titleBackButton() {
      return `Back to ${this.service.name} Market Insights`
    },
    title() {
      return this.article?.title || LITHIUM.name
    },
    articleContent() {
      return this.article.viewerCanRead
        ? this.article.content
        : this.article.excerpt
    },
    featuredImage() {
      return this.article.featuredImage?.node?.mediaItemUrl
    },
    formattedDate() {
      if (!this.article?.date) return

      return format(parseISO(this.article.date), 'do MMMM yyyy')
    },
  },
  async mounted() {
    this.$store.commit(
      'modal/setInitialFields',
      getServices([this.servicePage.checkbox, PRICE_ASSESSMENTS.slug]),
    )
    await this.fetchArticle()
  },
  methods: {
    getRouteArchive() {
      const analysisLink = {
        path: `${this.servicePage.sidebar.to}/market-insights`,
      }

      if (Object.keys(this.$route.query).length > 0) {
        analysisLink.query = this.$route.query
      }

      return analysisLink
    },
    async fetchArticle() {
      this.loading = true
      const response = await this.$graphqlClient.getAnalysisArticleDetail({
        service: this.service.slug,
        slug: this.$route.params.slug,
      })
      if (!response?.data?.article) {
        this.$nuxt.context.error({
          status: 404,
        })
      }

      this.article = response.data.article
      await this.fetchNextArticle()
      await this.fetchPreviousArticle()
      this.loading = false

      this.article && this.extractDownloadLinks()
    },
    extractDownloadLinks() {
      this.$nextTick(() => {
        this.downloadLinks = this.$refs.content?.querySelectorAll('a')
        this.downloadLinks?.forEach((anchor) => {
          const href = anchor.getAttribute('href')
          if (this.isDownloadLink(href)) {
            const id = DOWNLOAD_LINK_ID_REGEX.exec(href)[0]
            anchor.setAttribute('id', `download_link_${id}`)
            this.downloadIds.push({ id, text: anchor.textContent })
          }
        })
        this.renderDownloadButtons()
      })
    },
    renderDownloadButtons() {
      this.$nextTick(() => {
        if (this.$refs.downloadIdRefs?.length) {
          this.$refs.downloadIdRefs.forEach((ref) => {
            const id = ref.$attrs['data-download-id']
            const anchor = this.$refs.content?.querySelector(
              `#download_link_${id}`,
            )
            if (!anchor) return

            anchor.insertAdjacentElement('afterend', ref.$el)
            anchor.remove()
          })
        }
      })
    },
    isDownloadLink(href) {
      try {
        const url = new URL(href)

        return (
          DOWNLOAD_LINK_HREF_REGEX.test(url.pathname) ||
          REPORTS_LINK_HREF_REGEX.test(url.pathname)
        )
      } catch (e) {
        return false
      }
    },
    onInit() {
      this.fetchArticle()
    },
    async fetchPaginationArticle(order, date, orderDate) {
      const categories = ['mining', 'demand', 'prices', 'processing-refining']
      const response = await this.$graphqlClient.getAnalysisArticlesByDate({
        service: this.service.slug,
        categories,
        order,
        day: getDate(date),
        month: getMonth(date) + 1,
        year: getYear(date),
        orderDate,
      })

      return response.data.articles.nodes[0]
    },
    async fetchNextArticle() {
      if (!this.article?.date) return

      const date = parseISO(this.article.date)
      const nextArticle = await this.fetchPaginationArticle(
        'ASC',
        date,
        'after',
      )
      if (!nextArticle) return

      this.nextArticle = {
        ...nextArticle,
        link: `/market/${this.service.category}/${nextArticle.slug}`,
      }
    },
    async fetchPreviousArticle() {
      if (!this.article?.date) return

      const date = parseISO(this.article.date)
      const previousArticle = await this.fetchPaginationArticle(
        'DESC',
        date,
        'before',
      )
      if (!previousArticle) return

      this.previousArticle = {
        ...previousArticle,
        link: `/market/${this.service.category}/${previousArticle.slug}`,
      }
    },
  },
}
</script>
