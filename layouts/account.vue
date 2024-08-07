<template>
  <TheLayout class="bg-s-50">
    <AccountHeader :key="$route.fullPath" />

    <div class="max-w-contact-form-container mx-auto w-full p-4">
      <div class="mb-20 flex-grow">
        <slot />
      </div>
    </div>
  </TheLayout>
</template>

<script>
import AccountHeader from '~/components/account/Header.vue'
import TheLayout from '~/components/TheLayout.vue'

export default {
  components: { AccountHeader, TheLayout },
}
</script>
