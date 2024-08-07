<template>
  <footer class="bg-s-900 relative px-4 py-8 md:pb-24 md:pt-20 lg:px-14">
    <div class="max-w-content-container mx-auto">
      <!-- Footer links -->
      <div
        class="text-p-500 flex flex-col gap-y-6 font-semibold md:items-baseline md:justify-between lg:flex-row lg:font-bold"
      >
        <a href="#">
          <IconBenchmarkLogo />
        </a>

        <div
          class="flex flex-col gap-y-2 text-base md:flex-row md:items-end md:justify-end md:gap-x-10 md:text-lg"
        >
          <nuxt-link to="/join-us" class="hover:underline">
            Join Team Benchmark
          </nuxt-link>
          <a
            class="cursor-pointer hover:underline"
            @click="$modal.open('contact')"
          >
            Contact Us
          </a>
          <nuxt-link to="/newsletter-signup" class="hover:underline">
            Newsletter
          </nuxt-link>
        </div>
      </div>

      <!-- Divisor -->
      <div class="border-p-500 my-4 border-b md:my-8"></div>

      <div class="flex flex-col gap-3 md:flex-row md:justify-between">
        <div class="flex gap-6">
          <a
            target="_blank"
            href="https://twitter.com/benchmarkmin"
            rel="noopener"
          >
            <IconTwitter class="text-p-400" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/benchmarkminerals/"
            rel="noopener"
          >
            <IconInstagram />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/benchmark-mineral-intelligence/"
            rel="noopener"
          >
            <IconLinkedIn />
          </a>
        </div>

        <div
          class="flex flex-col flex-wrap gap-2 gap-y-1 text-xs text-white md:flex-row md:justify-end md:text-sm"
        >
          <nuxt-link to="/terms" class="flex">
            <span>Terms & Conditions</span>
            <span class="ml-2 hidden md:block">|</span>
          </nuxt-link>
          <nuxt-link to="/privacy" class="flex">
            <span>Privacy Policy</span>
            <span class="ml-2 hidden md:block">|</span>
          </nuxt-link>
          <nuxt-link to="/cookies"> Cookies </nuxt-link>
          <div class="ml-0 mt-2 md:ml-20 md:mt-0">
            © Benchmark Mineral Intelligence
          </div>
        </div>
      </div>
      <client-only>
        <CookieConsentBanner />
      </client-only>
    </div>
  </footer>
</template>

<script>
import CookieConsentBanner from '@/components/CookieConsentBanner.vue'
import IconBenchmarkLogo from '@/assets/icons/BenchmarkLogo.svg'
import IconTwitter from '@/assets/icons/TwitterLogo.svg'
import IconInstagram from '@/assets/icons/Instagram.svg'
import IconLinkedIn from '@/assets/icons/LinkedIn.svg'

export default {
  components: {
    IconBenchmarkLogo,
    IconTwitter,
    IconInstagram,
    IconLinkedIn,
    CookieConsentBanner,
  },
}
</script>
