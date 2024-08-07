<template>
  <div
    :class="`${$attrs.class} ${contentSimpleClasses}`"
    class="max-h-auto shadow-pm md:w-half-minus-p-2 mx-auto flex h-auto w-full flex-row overflow-hidden rounded-xl bg-white p-4 text-sm lg:mx-0"
  >
    <Icon
      class="h-12 w-12 min-w-[48px]"
      :name="service.icon"
      :class="imgSimpleClasses"
    />
    <div
      class="bg-p-500 ml-4 mr-3 h-full w-full min-w-[3px] max-w-[3px]"
      :class="lineSimpleClasses"
    >
    </div>
    <span class="text-pretty" :class="[contentClasses]">
      <strong class="font-semibold">{{ service.title }}</strong>
      <span>{{ service.description }}</span>
    </span>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    contentClasses: {
      type: String,
      default: '',
    },
    service: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      default: 'default',
    },
  },

  computed: {
    isSimple() {
      return this.variant === 'simple'
    },
    contentSimpleClasses() {
      return this.isSimple ? 'flex-col md:flex-row' : ''
    },
    imgSimpleClasses() {
      return this.isSimple
        ? 'mx-auto md:mx-0 h-[58px] w-[58px] md:h-12 md:w-12'
        : ''
    },
    lineSimpleClasses() {
      return this.isSimple
        ? 'mt-5 mb-3 !h-[3px] !max-w-full md:mt-0 md:mb-0 md:!h-full md:!max-w-[3px]'
        : ''
    },
  },
}
</script>
