<template>
  <div
    data-testid="section-title"
    class="border-p-500 mb-6 flex w-full justify-between border-l-4 text-xl md:pr-6 lg:mb-10 lg:text-3xl"
  >
    <h3 class="text-s-900 pl-2 font-bold capitalize">
      {{ title }}
    </h3>
    <LinkWithAnimation
      v-if="!hideButton"
      :text="viewMoreText"
      class="flex-shrink-0 text-base font-semibold"
      :url="url"
      @click="$emit('viewMoreClick')"
    />
  </div>
</template>

<script>
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: {
    LinkWithAnimation,
  },
  props: {
    viewMoreText: {
      type: String,
      default: 'View More',
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
    hideButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
