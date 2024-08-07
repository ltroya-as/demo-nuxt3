<template>
  <div
    v-if="location"
    class="flex w-full flex-row items-center justify-start gap-x-2.5"
    :class="$attrs.class"
  >
    <IconLocation
      class="w-full min-w-[12px] max-w-[12px]"
      :class="[iconClasses]"
    />
    <span
      class="relative text-sm leading-5"
      :class="[{ '-top-[3px] md:-top-[6px]': position }, textClasses]"
      data-testid="event-location"
    >
      {{ location }}
    </span>
  </div>
</template>

<script>
import IconLocation from '~/assets/icons/icon-location.svg'
export default {
  components: { IconLocation },
  props: {
    location: {
      type: String,
      default: null,
    },
    baseline: {
      type: Boolean,
      default: false,
    },
    iconClasses: {
      type: String,
      default: '',
    },
    textClasses: {
      type: String,
      default: '',
    },
  },
  computed: {
    position() {
      if (this.baseline) return this.baseline
      return this.location.length > 45
    },
  },
}
</script>
