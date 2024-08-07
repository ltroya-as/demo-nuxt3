<template>
  <a :href="src" :data-href="dataSource" :class="aClasses">
    <img
      :src="src"
      :alt="alt"
      :class="imgClasses"
      :style="imgStyles"
      :srcset="srcSet"
    />
  </a>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    srcSet: {
      type: [String, Array],
      default: '',
    },
    alt: {
      type: String,
      required: true,
    },

    aClasses: {
      type: [String, Array],
      default: '',
    },
    imgClasses: {
      type: [String, Array],
      default: '',
    },

    imgStyles: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    dataSource() {
      /**
       * Simplelightbox doesn't work with urls that contains query params.
       * That's the reason why we remove them.
       */
      return this.src.split('?')[0] ?? this.src
    },
  },
}
</script>
