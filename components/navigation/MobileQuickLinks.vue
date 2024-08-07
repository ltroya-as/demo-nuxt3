<template>
  <div class="block md:hidden">
    <div class="bg-s-50 flex flex-row flex-wrap px-4 py-1">
      <NuxtLink
        v-for="link in quickLinks"
        :key="link.text"
        :to="link.url"
        class="text-s-900 text-xs font-bold hover:underline"
        :class="link.classes"
      >
        <div class="flex items-center gap-x-1">
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
          classes: 'w-1/2 pb-1 justify-center flex pr-2',
        },
        {
          url: '/join-us',
          text: 'Join Team Benchmark',
          icon: 'Briefcase',
          classes: 'w-1/2 pb-1 justify-center flex pl-2',
        },
        {
          url: '/lithium-ion-battery-raw-material-index',
          text: 'Lithium ion Battery Raw Material Index',
          icon: 'Curves',
          classes: 'w-full justify-center flex',
        },
      ],
    }
  },
}
</script>
