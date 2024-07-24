<template>
  <div
    data-testid="hero-article"
    class="relative flex aspect-video h-[105px] w-full flex-1 cursor-pointer overflow-hidden md:h-72 md:w-[50vw] lg:w-full"
    @click="goToArticlePath"
  >
    <!-- Image -->
    <div
      class="absolute top-0 aspect-video h-full w-full mix-blend-multiply grayscale filter md:aspect-auto"
    >
      <img
        :src="articleImage"
        class="min-h-full w-full min-w-full object-cover lg:h-full lg:w-full"
        :alt="articleTitle"
      />
    </div>

    <!-- Content -->
    <div
      v-if="!loading"
      class="relative flex flex-col items-center justify-center px-5 py-2 text-white md:aspect-auto md:items-start md:justify-between md:px-8 md:py-5 lg:px-11 lg:pb-7 lg:pt-12"
    >
      <div class="5xl:mt-0 h-20 lg:mt-10 lg:h-auto">
        <div
          class="mb-4 flex flex-col items-baseline justify-start md:flex-row"
        >
          <BenchmarkSourceLogoWhite class="h-[17px]" />
          <p
            class="font-lato text-[8px] font-bold uppercase md:text-sm lg:ml-2"
          >
            {{ containerTitle }}
          </p>
        </div>

        <div v-if="articleValid" class="hidden md:flex">
          <h2
            class="line-clamp-4 text-xs font-bold md:text-2xl"
            :title="articleTitle"
          >
            {{ articleTitle }}
          </h2>
        </div>

        <div v-if="articleValid" class="mt-1 flex md:hidden">
          <a
            class="line-clamp-3 text-xs font-bold md:mt-0 md:text-2xl xl:text-4xl"
            :href="articlePath"
          >
            {{ articleTitle }}
          </a>
        </div>
      </div>

      <div class="mt-4 hidden space-x-6 md:flex">
        <CommonButton
          variant="tertiary-dark"
          :link="articlePath"
          data-testid="read-more"
        >
          Read more
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import { SOURCE_DOMAIN } from '~/utils/constants'
import BenchmarkSourceLogoWhite from '~/assets/icons/benchmark-source-logo-white.svg'
export default {
  components: { BenchmarkSourceLogoWhite },
  props: {
    article: {
      type: Object,
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fallbackImage:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_jpg,q_auto,h_300,w_800,c_fill,g_auto,fl_progressive:semi/v1664904775/assets/home/image-follback-article_ddhwyv.png?_i=AA',
    }
  },

  computed: {
    articlePath() {
      return this.articleValid
        ? `${SOURCE_DOMAIN}/article/${this.article?.slug}`
        : SOURCE_DOMAIN
    },
    articleImage() {
      if (
        !this.loading &&
        this.articleValid &&
        this.article?.featuredImage?.node?.mediaItemUrl
      )
        return this.$cloudinary.resize(
          this.article.featuredImage.node.mediaItemUrl,
          'hero-image',
        )
      return this.fallbackImage
    },
    articleTitle() {
      return this.articleValid ? this.article.title : 'memberships articles'
    },
    containerTitle() {
      return this.articleValid ? 'Latest Article' : 'Latest Articles'
    },
    articleValid() {
      return this.article?.slug && this.article?.title
    },
  },

  methods: {
    goToArticlePath() {
      window.location = this.articlePath
    },
  },
}
</script>
