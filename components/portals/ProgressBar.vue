<template>
  <div class="bg-s-200 h-1.5 rounded-b-lg">
    <div
      ref="progressBar"
      class="animate-bar bg-p-500 h-full w-full origin-left rounded-full rounded-tl-none"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.$refs.progressBar.style.animation = `bar-animation ${this.duration} infinite linear`
  },
}
</script>

<style>
@keyframes bar-animation {
  0% {
    transform: scaleX(0);
  }

  99% {
    transform: scaleX(0.99);
    border-top-right-radius: 9999px;
  }

  100% {
    transform: scaleX(1);
    border-top-right-radius: 0;
  }
}
</style>
