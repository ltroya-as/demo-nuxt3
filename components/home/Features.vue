<template>
  <div class="text-surface-em-high flex flex-col">
    <!-- Features Summary -->
    <div class="mt-8 hidden lg:mt-14 lg:block">
      <h2
        class="text-s-900 text-2xl font-bold leading-8 md:text-3xl md:leading-9"
        data-testid="features-title"
      >
        Bringing clarity to opaque future facing commodities
      </h2>
      <p
        class="text-s-600 mt-4 max-w-[1200px] text-xl font-normal leading-7 md:text-2xl md:leading-8"
      >
        Unrivalled prices, data & insight from critical mineral mine to platform
        technology: lithium ion batteries, electric vehicles, energy storage,
        rare earth permanent magnets
      </p>
    </div>
    <!-- Features -->
    <div class="mx-auto mt-6 flex flex-col gap-3 lg:mt-14 lg:flex-row lg:gap-4">
      <div
        v-for="(feature, index) in features"
        :key="feature.title"
        data-testid="features-item"
        class="bg-s-50 relative flex max-w-[324px] flex-col rounded-lg p-6 lg:max-w-none lg:basis-1/3 lg:flex-row lg:px-6 lg:py-10"
      >
        <div
          v-if="index !== 2"
          class="absolute -bottom-8 right-10 z-[1] lg:-right-8 lg:bottom-0 lg:top-[100px]"
        >
          <IconCommunityPlus />
        </div>
        <!-- Icon -->
        <div class="mb-3 w-12 lg:mb-0 lg:mr-4">
          <component :is="feature.icon.name" />
        </div>
        <!-- Content -->
        <div
          class="border-p-500 z-10 flex-1 border-t-[3px] pt-3 lg:border-l-[3px] lg:border-t-0 lg:pl-4 lg:pt-0"
        >
          <h3
            class="text-s-900 mb-2 text-xl font-bold capitalize leading-7 lg:mb-4 lg:text-2xl lg:leading-8"
          >
            {{ feature.title }}
          </h3>
          <p class="font-lato text-s-900 text-base font-normal leading-7">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import IconCommunity from '~/assets/icons/Community.svg'
import IconCommunityPlus from '~/assets/icons/Community-plus.svg'
import IconTransparency from '~/assets/icons/Transparency.svg'
import IconDynamic from '~/assets/icons/Dynamic.svg'

export default {
  components: {
    IconCommunity,
    IconCommunityPlus,
    IconTransparency,
    IconDynamic,
  },

  data() {
    return {
      features: [
        {
          title: 'Prices & data creation, not just collection',
          description:
            'Industry’s most rigorous IOSCO-assured lithium and battery raw material prices',
          button: null,
          icon: {
            name: markRaw(IconCommunity),
          },
        },
        {
          title: 'Unrivalled Knowledge',
          description:
            'Unrivalled experience to truly understand why something is happening and where we are heading',
          button: null,
          icon: {
            name: markRaw(IconTransparency),
          },
        },
        {
          title: 'Influence & Community',
          description:
            'Benchmark influence leads the narrative and aids decision makers from the top of government to industry and world finance',
          button: null,
          icon: {
            name: markRaw(IconDynamic),
          },
        },
      ],
      videoId: '488883375',
      videoProvider: 'vimeo',
    }
  },
}
</script>
<style>
.plyr {
  --plyr-color-main: #fdbd00;

  border-radius: 16px;
}

@media (min-width: 1024px) {
  .plyr {
    border-radius: 12px;
  }
}
</style>
