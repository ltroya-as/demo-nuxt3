<script setup lang="ts">
const { $cookies } = useNuxtApp()

const showBanner = ref(false)

onMounted(() => {
  if (!$cookies.getConsentCookie()) {
    showBanner.value = true
  }
})

const AcceptCookies = () => {
  $cookies.setConsentCookie(true)
  showBanner.value = false
}
</script>

<template>
  <Transition name="banner">
    <div
      v-if="showBanner"
      data-testid="cookies-bar"
      class="bg-s-800 fixed bottom-0 left-0 right-0 z-[9999] w-full py-5"
    >
      <div
        class="flex flex-col items-center justify-between gap-4 px-5 md:flex-row"
      >
        <p class="text-white">
          We use cookies, pixels, and other technologies (collectively,
          "cookies") to recognise your browser or device and collect other basic
          data
        </p>
        <button
          data-testid="cookies-bar-accept-button"
          class="bg-p-500 text-s-900 h-10 w-28 text-lg font-bold"
          @click="AcceptCookies"
        >
          OK
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: transform 0.5s;
}

.banner-enter-from,
.banner-leave-to {
  transform: translateY(100%);
}

.banner-enter-to,
.banner-leave-from {
  transform: translateY(0);
}
</style>
