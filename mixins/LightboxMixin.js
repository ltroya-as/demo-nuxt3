export default {
  mounted() {
    this.$nextTick(() => this.$lightbox.refresh())
  },
  watch: {
    loading(value) {
      !value && this.$nextTick(() => this.$lightbox.refresh())
    },
  },
}
