<template>
  <div class="hidden items-center md:flex" data-testid="breadcrumb">
    <component
      :is="item.url ? 'nuxt-link' : 'div'"
      v-for="(item, index) in menu"
      :key="index"
      :to="item.url"
      class="text-xs leading-6 after:relative after:px-1 after:content-['>'] last:font-bold last:underline last:after:hidden"
      data-testid="breadcrumb-item"
    >
      <span v-if="item.url">{{ item.name }}</span>
      <span v-else>{{ item.name }}</span>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
}
</script>
