<template>
  <button
    id="button-scroll-top"
    class="border-p-500 bg-s-900 text-p-500 active:border-s-900 active:bg-p-700 active:text-s-900 fixed bottom-6 right-4 z-30 hidden h-14 w-14 cursor-pointer flex-row items-center justify-center rounded-full border font-bold shadow-lg outline-none md:bottom-14 md:right-10"
    type="button"
    @click="scrollTop"
  >
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L8 0.999999L15 8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  beforeMount() {
    window.addEventListener('scroll', this.initializeScrollTop)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.initializeScrollTop)
  },
  mounted() {
    this.initializeScrollTop()
  },
  methods: {
    initializeScrollTop() {
      const buttonScrollTop = document.querySelector('#button-scroll-top')
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        buttonScrollTop.classList.remove('hidden')
        buttonScrollTop.classList.add('flex')
      } else {
        buttonScrollTop.classList.add('hidden')
        buttonScrollTop.classList.remove('flex')
      }
    },
    scrollTop() {
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>
<style scoped>
#button-scroll-top {
  transition: all 550ms;
}
</style>
