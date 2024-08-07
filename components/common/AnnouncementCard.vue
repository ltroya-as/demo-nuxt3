<template>
  <article class="border-t-s-400 flex h-full flex-col border-t pt-8">
    <time class="text-base" data-testid="announcement-card-date">
      {{ formattedDate }}
    </time>
    <!-- Content -->
    <section
      class="text-s-900 flex flex-grow flex-col items-start justify-between gap-3 pt-3 lg:max-w-5xl"
    >
      <h2
        data-testid="announcement-card-title"
        class="line-clamp-3 text-xl font-semibold lg:text-2xl"
        :title="title"
      >
        {{ title }}
      </h2>

      <p
        data-testid="announcement-card-description"
        class="flex items-center gap-x-3 text-base font-normal"
        v-html="excerpt"
      >
      </p>
      <SharedCommonLinkWithAnimation
        data-testid="announcement-card-link"
        :url="url"
        text="Read more"
        class="font-semibold"
      />
    </section>
  </article>
</template>

<script>
import { format, parseISO } from 'date-fns'
export default {
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
  },

  computed: {
    formattedDate() {
      return format(parseISO(this.date), 'do MMMM yyyy')
    },
    url() {
      return `/announcements/${this.slug}`
    },
  },
}
</script>
