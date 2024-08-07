<template>
  <div
    class="flex w-full flex-col gap-y-3 pb-4 xl:pb-0"
    data-testid="banner-descriptions"
  >
    <h3 v-if="title" class="text-lg font-bold lg:text-xl">
      {{ title }}
    </h3>
    <div
      v-for="(description, index) in descriptions"
      :key="index"
      class="flex w-full flex-col gap-y-3 text-base"
    >
      <span v-if="description.subtitle">{{ description.subtitle }}</span>
      <ul
        v-if="description.items"
        class="flex w-full list-disc flex-col gap-y-1 pl-5 text-base"
      >
        <li
          v-for="(item, indexItem) in description.items"
          :key="indexItem"
          v-html="item"
        >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    descriptions: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
