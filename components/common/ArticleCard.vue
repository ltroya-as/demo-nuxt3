<template>
  <nuxt-link :to="`${detailPagePath}/${slug}`" data-testid="read-more">
    <article
      class="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white"
    >
      <!-- Image -->
      <section
        data-testid="video-detail-link"
        class="bg-s-100 h-64 overflow-hidden"
      >
        <div v-if="hasThumbnail" class="h-full">
          <img
            class="aspect-video min-h-full min-w-full object-cover object-top"
            :src="
              $cloudinary.resize(
                thumbnail.node.mediaItemUrl,
                'membership-thumbnail',
              )
            "
            :alt="title"
          />
        </div>
        <div v-else class="flex h-full w-full items-center justify-center">
          <ArticleIcon class="fill-s-400 h-1/2 w-1/2" />
        </div>
      </section>

      <!-- Content -->
      <section
        class="bg-grey-100 text-s-900 flex flex-grow flex-col justify-between px-5 pb-10 pt-5"
      >
        <h2
          data-testid="video-detail-link"
          class="mb-2 line-clamp-3 text-base font-bold md:mb-4 md:line-clamp-2 md:text-lg lg:text-xl"
          :title="title"
        >
          {{ title }}
        </h2>

        <p class="flex items-center gap-x-3 text-sm lg:text-base">
          <IconCalendar class="h-small w-small" />
          <time>{{ formattedDate }}</time>
        </p>
      </section>
    </article>
  </nuxt-link>
</template>

<script>
import { format, parseISO } from 'date-fns'
import ArticleIcon from '@/assets/icons/article.svg'
import IconCalendar from '~/assets/icons/icon-calendar.svg'

export default {
  components: {
    ArticleIcon,
    IconCalendar,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: [String, Number],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Object,
      default: () => null,
    },
    categories: {
      type: Object,
      default: () => null,
    },
    detailPagePath: {
      type: String,
      required: true,
    },
  },

  computed: {
    formattedDate() {
      return format(parseISO(this.date), 'do MMMM yyyy')
    },
    hasThumbnail() {
      return this.thumbnail?.node.mediaItemUrl
    },
  },
}
</script>
