<template>
  <div class="relative flex md:flex-row">
    <div
      class="bg-p-500 md:w-small mt-10 hidden h-[27px] md:flex lg:w-14 2xl:flex-grow"
    ></div>
    <div
      class="xl:max-w-content-container mx-auto mb-9 mt-3 flex flex-col md:mx-0 md:flex-grow md:flex-row xl:mx-auto 2xl:min-w-[1424px]"
    >
      <SharedTimelineSquareItem
        v-for="(stage, id) in stages"
        :key="id"
        :title="stage.title"
        :icon="stage.icon"
        :background-color="stage.backgroundColor"
        :container-arrow-classes="stage.containerArrowClasses"
      >
        <div
          class="md:min-h-auto"
          :class="[stages.length === id + 1 ? 'min-h-min' : 'min-h-[226px]']"
        >
          <div
            class="textsmall leading-medium lg:leading-large font-montserrat text-s-900 mb-1 font-semibold lg:mb-4 lg:text-2xl"
          >
            {{ stage.title }}
          </div>
          <ul>
            <li
              v-for="(product, index) in stage.products"
              :key="index"
              class="leading-low mb-3 flex flex-row items-center text-base font-normal md:mb-0"
            >
              <SharedCommonLinkWithAnimation
                :url="product.url"
                :text="product.label"
                :target="target(product.target)"
              />
            </li>
          </ul>
        </div>
      </SharedTimelineSquareItem>
    </div>
    <div
      class="bg-p-50 md:w-small mt-[42px] hidden h-[27px] md:flex lg:w-14 2xl:flex-grow"
    ></div>
  </div>
</template>

<script>
import { supplyChain } from '~/constants/timelines'

export default {
  data() {
    return {
      stages: supplyChain,
    }
  },
  methods: {
    target(isExternal) {
      return isExternal ? '_blank' : '_parent'
    },
  },
}
</script>
