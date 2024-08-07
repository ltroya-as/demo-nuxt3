<template>
  <div
    class="flex w-full flex-row items-center justify-start gap-x-2.5 break-all md:gap-x-3"
    :class="[$attrs.class]"
  >
    <IconLink
      class="w-full min-w-[12px] max-w-[12px] md:min-w-[20px] md:max-w-[20px]"
      :class="[iconClasses]"
    />
    <a :href="url" target="_blank" rel="noopener" :class="[textClasses]">
      {{ text }}
    </a>
  </div>
</template>

<script>
import IconLink from '~/assets/icons/icon-link.svg'
export default {
  components: { IconLink },
  props: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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
}
</script>
