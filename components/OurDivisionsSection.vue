<template>
  <div
    data-testid="our-divisions-section"
    class="max-w-content-container px-small py-big lg:px-big mx-auto 2xl:px-0"
  >
    <h3 class="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
      Our Divisions
    </h3>
    <div
      class="mx-auto grid w-fit grid-cols-2 gap-3 md:mx-0 md:gap-x-4 md:gap-y-5 lg:grid-cols-4"
    >
      <component
        :is="getLink(item)"
        v-for="(item, index) in ourDivisions"
        :key="index"
        v-bind="props(item.title, item.url)"
        class="service-link max-w-[160px] md:max-w-full"
      >
        <Package
          class="bg-grey-100 md:bg-grey-50 h-full w-full pb-4 pt-6 shadow-none md:py-10"
          :service="item"
          content-classes="!font-normal"
          variant="simple"
          data-testid="ourDivision-item"
        >
          <template #default="">
            <h3
              class="flex items-center justify-between text-sm font-semibold md:mb-3 md:justify-start md:font-bold xl:text-lg 2xl:text-2xl"
            >
              {{ item.title }}
              <IconChevronRight class="icon-arrow flex-shrink-0" />
            </h3>

            <span class="hidden md:block 2xl:text-base">
              {{ item.description }}
            </span>
          </template>
        </Package>
      </component>
    </div>
  </div>
</template>

<script>
import Package from '~/components/shared/services/Package.vue'
import IconChevronRight from '~/assets/icons/angle-right.svg'
import { OUR_DIVISIONS } from '~/constants/services/constants'

export default {
  components: { Package, IconChevronRight },
  data() {
    return {
      ourDivisions: OUR_DIVISIONS,
    }
  },

  methods: {
    isBenchmarkSource(title) {
      return title === 'Benchmark Source'
    },
    getLink(item) {
      return this.isBenchmarkSource(item.title)
        ? 'a'
        : resolveComponent('NuxtLink')
    },
    props(title, url) {
      return this.isBenchmarkSource(title)
        ? { href: this.$config.public.sourceUrl, target: '__blank' }
        : { to: url }
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-arrow {
  transition: transform 0.1s ease-in-out;
}
.service-link:hover .icon-arrow {
  transform: translateX(4px);
}
</style>
