<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const THREE_MINUTES = 3 * 60 * 1000
const { $backendVersionWatcher } = useNuxtApp()

onMounted(async () => {
  await $backendVersionWatcher.invalidateSession()
  setInterval(async () => {
    await $backendVersionWatcher.invalidateSession()
  }, THREE_MINUTES)
})
</script>
