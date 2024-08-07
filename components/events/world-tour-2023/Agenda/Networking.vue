<template>
  <div class="flex px-6 py-4">
    <div style="min-width: 70px">{{ time }}</div>
    <div class="flex flex-col items-center lg:flex-row">
      <div>
        <div class="text-gray-800">{{ title }}</div>
        <div v-if="description" class="mt-4" v-html="descriptionHtml" />
      </div>
      <img
        v-if="sponsorImageUrl"
        class="h-20 object-contain lg:ml-10 lg:w-1/3"
        :src="sponsorImageUrl"
        alt="Sponsors"
      />
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
    description: {
      type: String,
      required: true,
    },
    sponsorImageUrl: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      required: true,
    },
  },
  computed: {
    descriptionHtml: function () {
      return this.description.replace(/(?:\r\n|\r|\n)/g, '<br>')
    },
  },
}
</script>
