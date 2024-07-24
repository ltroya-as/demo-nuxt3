<template>
  <div
    class="absolute bottom-0 right-0 flex flex-row justify-end gap-2.5 pb-2 pr-2 lg:pb-5 lg:pr-10"
  >
    <IconEllipse
      v-for="(item, index) in items"
      :key="item.id"
      class="h-[5px] cursor-pointer md:h-[10px]"
      :class="getClassTextColor(item.active)"
      @click="$emit('goToIndex', index)"
    />
  </div>
</template>

<script>
import IconEllipse from '~/assets/icons/ellipse.svg'

export default {
  components: {
    IconEllipse,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getClassTextColor(active) {
      return active ? 'text-p-500' : 'text-white'
    },
  },
}
</script>
