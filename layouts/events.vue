<template>
  <TheLayout>
    <div
      class="max-w-content-container px-small mx-auto w-full pb-24 pt-8 lg:px-14 lg:pb-32 lg:pt-10 2xl:px-0"
    >
      <slot />
    </div>
  </TheLayout>
</template>
<script>
import TheLayout from '~/components/TheLayout.vue'

export default {
  components: { TheLayout },
}
</script>
