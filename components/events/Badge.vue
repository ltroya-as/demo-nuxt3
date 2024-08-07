<template>
  <div
    :class="[
      'align-text-center bg-p-100 inline-flex items-center justify-between rounded-2xl px-3.5 py-0.5',
      getIcon === 'IconClock'
        ? 'md:text-md mb-4 text-sm lowercase lg:text-[0.85rem] lg:text-xl'
        : 'text-xs font-semibold capitalize md:text-[0.6rem] lg:text-base',
    ]"
  >
    <Icon
      :name="getIcon"
      :class="[
        'mr-1 h-[15px] w-[15px] p-0  xl:h-[18px] xl:w-[18px]',
        getIcon === 'IconClock'
          ? 'lg:h-[14px] lg:w-[14px]'
          : 'md:h-[12px] md:w-[12px]',
      ]"
    />
    <span class="align-bottom">{{ eventType }}</span>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    eventType: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    getIcon() {
      if (this.eventType.toLowerCase() === 'online') {
        return 'IconOnline'
      }
      if (this.eventType.toLowerCase() === 'in person') {
        return 'IconPerson'
      }
      return 'IconClock'
    },
  },
}
</script>
