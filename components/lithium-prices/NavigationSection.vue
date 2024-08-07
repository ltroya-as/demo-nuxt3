<template>
  <div class="mb-10 flex flex-col items-stretch gap-y-5 xl:max-w-md">
    <p class="text-2xl font-bold text-white">{{ name }}</p>

    <nuxt-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.href"
      class="font-monserrat bg-p-500 hover:border-p-500 hover:bg-s-900 hover:text-p-500 active:border-p-500 active:bg-p-500 active:text-p-em-high flex items-center justify-center rounded-md border px-4 py-2 text-lg font-bold"
    >
      <span class="mr-3 flex-grow text-center text-lg font-bold">
        {{ link.label }}
      </span>
      <RightAngle />
    </nuxt-link>
  </div>
</template>

<script>
import RightAngle from '~/assets/icons/RightAngle.svg'
export default {
  components: { RightAngle },
  props: {
    name: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>
