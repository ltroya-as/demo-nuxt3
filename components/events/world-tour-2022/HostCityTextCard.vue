<template>
  <article class="mt-6">
    <component
      :is="disableLink ? 'div' : 'nuxt-link'"
      v-if="event.city"
      :to="`/events/world-tour-2022/${event.slug}`"
      class="h-full w-full"
    >
      <div class="flex items-center gap-x-3">
        <div class="grow">
          <h3
            class="text-p-500 text-base font-bold uppercase md:text-xl md:leading-9 2xl:text-3xl"
          >
            {{ event.city }}
          </h3>
          <p
            class="text-base font-light uppercase md:text-2xl md:leading-9 2xl:text-3xl"
          >
            {{ event.country }}
          </p>
          <p class="text-sm font-light md:text-xl md:leading-7">
            {{ formatedDate }}
          </p>
        </div>

        <IconArrowRight v-if="!disableLink" class="h-8 w-8" />
      </div>
    </component>
  </article>
</template>

<script>
import IconArrowRight from '@/assets/icons/icon-arrow_right.svg'
import { reformat } from '@/utils/date'

export default {
  components: { IconArrowRight },

  props: {
    event: {
      type: Object,
      required: true,
    },
    disableLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formatedDate() {
      return this.event.date
        ? reformat(this.event.date, 'dd MMM yyyy', 'yyyy-MM-dd')
        : 'Date TBC'
    },
  },
}
</script>
