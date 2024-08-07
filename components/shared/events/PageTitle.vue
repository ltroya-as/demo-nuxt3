<template>
  <div class="flex w-full">
    <BackButton
      v-if="showIconBack"
      :show-icon-back="showIconBack"
      :title="pageTitle"
      :class="['my-5']"
      :route="route"
    />
    <div
      v-else
      class="my-5 flex flex-row gap-x-4 text-xl font-semibold lg:text-3xl"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
import BackButton from '~/components/shared/common/BackButton.vue'
export default {
  components: { BackButton },
  props: {
    title: {
      type: String,
      default: 'Events',
    },
    showIconBack: {
      type: Boolean,
      default: false,
    },
    route: {
      type: String,
      default: '/events',
    },
  },
  computed: {
    pageTitle() {
      return this.showIconBack ? 'Back to events' : this.title
    },
  },
}
</script>
