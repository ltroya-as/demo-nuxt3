<template>
  <component :is="illustrationComponent" :class="$attrs.class" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useNuxtApp } from 'nuxt/app'

const props = defineProps<{ name: string }>()
const { $assets } = useNuxtApp()

const illustrationComponent = defineAsyncComponent(async () => {
  const illustration = $assets.getIllustrationByName(props.name)
  if (!illustration) throw new Error(`Illustration ${props.name} not found`)
  return await illustration()
})
</script>
