<template>
  <div class="flex">
    <div class="bg-p-500 mr-2 h-[26px] w-1 flex-shrink"></div>
    <h3 class="font-bold">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
