<template>
  <div class="bg-s-900 hidden md:block">
    <div
      class="bg-s-900 flex flex-wrap items-center justify-evenly gap-2 lg:ml-12 lg:justify-start lg:gap-4"
    >
      <NuxtLink
        v-for="link in quickLinks"
        :key="link.text"
        :to="link.url"
        class="border-r border-x-white py-1.5 pr-4 text-sm font-bold text-white last:border-r-0 last:border-x-black hover:underline"
      >
        <div class="flex items-center gap-x-2">
          <Icon class="h-5 w-5" :name="link.icon" />
          <div>{{ link.text }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      quickLinks: [
        {
          url: '/newsletter-signup',
          text: 'Benchmark Newsletter',
          icon: 'Newsletter',
        },
        {
          url: '/join-us',
          text: 'Join Team Benchmark',
          icon: 'Briefcase',
        },
        {
          url: '/lithium-ion-battery-raw-material-index',
          text: 'Lithium ion Battery Raw Material Index',
          icon: 'Curves',
        },
      ],
    }
  },
}
</script>
