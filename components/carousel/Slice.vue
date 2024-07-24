<template>
  <div
    class="absolute flex h-full w-full min-w-full origin-left items-center justify-between overflow-hidden transition-all duration-700 ease-in-out"
    :class="classesContainerActive"
    :style="backgroundImageGradient"
    @click="handlerClickMobile"
  >
    <!-- Image -->
    <div
      class="absolute top-0 aspect-video h-full w-full mix-blend-multiply grayscale filter md:aspect-auto"
    >
      <img
        :src="articleImage"
        class="min-h-full w-full object-cover lg:h-full"
        :alt="articleTitle"
        data-testid="image-slice"
      />
    </div>
    <div
      class="z-10 flex h-full w-full flex-col justify-between px-5 pt-7 md:px-8 md:py-5 lg:px-10 lg:pt-8"
    >
      <div class="h-fit text-white">
        <div
          class="mb-3 flex flex-col items-start justify-start md:flex-row md:items-baseline"
        >
          <BenchmarkSourceLogoWhite class="5xl:h-6 h-3.5 md:h-4" />
          <p class="font-lato ml-2 hidden text-sm font-bold uppercase md:block">
            {{ containerTitle }}
          </p>
        </div>

        <a :href="articleRoute">
          <h2
            class="line-clamp-3 text-sm font-bold md:mb-3 md:line-clamp-2 md:text-xl lg:leading-6"
            data-testid="title-slice"
          >
            {{ articleTitle }}
          </h2>
        </a>
        <div
          class="hidden text-xs md:line-clamp-2 md:text-lg"
          v-html="articleDescription"
        />
      </div>

      <CommonButton
        variant="tertiary-dark"
        extra-classes="hidden md:flex !w-fit mt-3 lg:mt-10"
        :link="articleActiveRoute"
        data-testid="read-more"
      >
        Read more
      </CommonButton>
    </div>
  </div>
</template>
<script>
import CommonButton from '~/components/common/Button.vue'
import BenchmarkSourceLogoWhite from '~/assets/icons/benchmark-source-logo-white.svg'
import { devices } from '~/constants/general'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import { SOURCE_DOMAIN } from '~/utils/constants'
import { getClassesContainerActive } from '~/utils/carousel'

export default {
  components: { CommonButton, BenchmarkSourceLogoWhite },
  mixins: [ScreenSizeMixin],
  props: {
    article: {
      type: Object,
      default: () => null,
    },
    indexMaximum: {
      type: Number,
      required: true,
    },
    carouselIndex: {
      type: Number,
      required: true,
    },
    articleIndex: {
      type: Number,
      required: true,
    },
  },

  computed: {
    articleActiveRoute() {
      return `${SOURCE_DOMAIN}/article/${this.article.slug}`
    },
    classesContainerActive() {
      return getClassesContainerActive({
        articleIndex: this.articleIndex,
        carouselIndex: this.carouselIndex,
        indexMaximum: this.indexMaximum,
      })
    },
    articleTitle() {
      return this.article.title
    },
    articleDescription() {
      return this.article.excerpt
    },
    containerTitle() {
      return 'Latest Article'
    },
    articleRoute() {
      return `https://source.benchmarkminerals.com/article/${this.article.slug}`
    },
    articleImage() {
      return this.$cloudinary.resize(
        this.article.featuredImage?.node?.mediaItemUrl,
        'hero-image',
      )
    },
    backgroundImageGradient() {
      if (this.activeDevice === devices.TABLET) {
        return { background: 'linear-gradient(#884609, #884609 80%)' }
      }
      return { background: 'linear-gradient(#884609 25%, #884609)' }
    },
  },
  methods: {
    handlerClickMobile() {
      if (this.isMobile()) {
        window.open(this.articleRoute, '_self')
      }
    },
  },
}
</script>
