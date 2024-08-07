<template>
  <Carousel
    :items="articles"
    with-progress-bar
    item-class="!p-4 md:!p-6"
    class="h-full"
  >
    <template #content="{ item }">
      <div class="flex flex-col gap-y-2">
        <span
          class="text-p-500 mb-3 flex size-8 items-center justify-center rounded-lg bg-black p-1"
        >
          <ArticleSmallIcon v-if="item.url" class="h-5 w-5" />
          <BarLineChartIcon v-else class="h-4 w-5" />
        </span>
        <h3
          data-testid="carousel-title"
          class="line-clamp-2 text-xl font-bold leading-normal md:text-2xl"
        >
          {{ item?.title }}
        </h3>
        <div class="flex gap-x-1 text-xs font-semibold md:text-sm">
          <div data-testid="carousel-publish-date">
            {{ item?.publishedDate }}
          </div>
          <div>
            {{ item?.readingTime ? `· ${item.readingTime} min read` : '' }}
          </div>
        </div>
        <p class="line-clamp-1 text-xs md:text-sm" v-html="item?.excerpt" />
      </div>
    </template>
    <template #action="{ item }">
      <NavigationLink
        :url="getArticleUrl(item)"
        :type="getNavigationTypeElement(item)"
      >
        <Button variant="clean" class="fade-in text-sm"> Read More </Button>
      </NavigationLink>
    </template>
  </Carousel>
</template>

<script>
import NavigationLink from '~/components/shared/navigation/Link.vue'
import Carousel from '~/components/market-insights/Carousel.vue'
import BarLineChartIcon from '~/assets/icons/bar-line-chart.svg'
import ArticleSmallIcon from '~/assets/icons/ArticleSmall.svg'
import Button from '~/components/common/Button.vue'

export default {
  components: {
    Carousel,
    Button,
    NavigationLink,
    BarLineChartIcon,
    ArticleSmallIcon,
  },
  props: {
    market: {
      type: String,
      default: '',
    },
    articles: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getNavigationTypeElement(article) {
      return article?.url ? 'a' : 'nuxt-link'
    },
    getArticleUrl(article) {
      if (!article) return ''
      if (article?.url) return article.url
      if (this.market === '') return ''
      return article.slug ? `/market/${this.market}/${article.slug}` : ''
    },
  },
}
</script>
