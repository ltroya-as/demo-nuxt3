<template>
  <ClientOnly>
    <component :is="iconComponent" :class="$attrs.class" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useNuxtApp } from 'nuxt/app'

const props = defineProps<{ name: string }>()
const { $assets } = useNuxtApp()

const iconComponent = defineAsyncComponent(async () => {
  const icon = $assets.getIconByName(props.name)
  if (!icon) throw new Error(`Icon ${props.name} not found`)
  return await icon()
})
</script>
