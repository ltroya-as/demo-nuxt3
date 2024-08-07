<template>
  <div class="flex px-6 py-4">
    <div style="min-width: 70px">{{ time }}</div>
    <div>
      <div
        :class="{
          'font-bold': speakers.length > 0,
          'text-lg': speakers.length > 0,
        }"
        >{{ title }}</div
      >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="description" class="mt-4" v-html="descriptionHtml" />
      <ul v-if="speakers.length > 0" class="mt-2">
        <li
          v-for="(speaker, i) in speakers"
          :key="i"
          class="text-sm font-semibold"
        >
          {{ speaker.speaker }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    speakers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    descriptionHtml: function () {
      return this.description.replace(/(?:\r\n|\r|\n)/g, '<br>')
    },
  },
}
</script>
