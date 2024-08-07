<template>
  <article
    v-if="event.city"
    class="bg-s-900 relative flex h-32 w-full items-center justify-center rounded-xl text-white md:h-52 lg:h-52 2xl:h-56"
  >
    <!-- Confirmed event -->
    <component
      :is="disableLink ? 'div' : 'nuxt-link'"
      :to="`/events/world-tour-2022/${event.slug}`"
      class="h-full w-full p-5 md:p-6 2xl:p-8"
    >
      <div class="h-full w-full">
        <h3
          class="text-p-500 text-base font-bold uppercase md:text-2xl md:leading-9 2xl:text-3xl"
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

        <div
          v-if="event.hostPartners.length"
          class="border-s-300 absolute bottom-0 right-0 h-20 w-20 translate-x-[12%] translate-y-[12%] rounded-full border-2 bg-white p-1 md:h-28 md:w-28 md:translate-x-[35%] md:translate-y-[35%]"
        >
          <no-ssr>
            <a :href="event.hostPartners[0].website">
              <img
                :src="event.hostPartners[0].logoUrl"
                alt=""
                class="h-full w-full object-contain"
              />
            </a>
          </no-ssr>
        </div>
      </div>
    </component>
  </article>
</template>

<script>
import { reformat } from '@/utils/date'

export default {
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
