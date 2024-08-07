<template>
  <div>
    <div
      class="relative min-h-[120px] xl:min-h-[290px]"
      data-testid="services-hero-portal"
    >
      <img
        :src="imageDesktop"
        class="absolute top-0 hidden h-full w-full object-cover object-center mix-blend-multiply filter lg:block"
        alt="desktop banner"
        data-testid="hero-image"
      />
      <img
        :src="imageMobile"
        class="absolute top-0 block h-full w-full object-cover object-center mix-blend-multiply filter lg:hidden"
        alt="mobile banner"
      />

      <Breadcrumb
        :menu="$store.state.breadcrumb.items"
        class="lg:left-big absolute left-4 top-5 z-10 mb-6 text-white"
      />

      <div
        class="px-small lg:pl-big relative flex h-full flex-col bg-black/45 p-5 pb-12 pt-16 text-white backdrop-blur-sm lg:min-h-[290px] lg:pb-11 lg:pr-6 lg:pt-16 xl:w-3/4 xl:rounded-br-xl xl:rounded-tr-xl"
      >
        <div class="mb-4 flex flex-row items-center gap-4">
          <Icon v-if="icon" class="h-[50px] w-[50px]" :name="icon" />
          <h3
            class="font-bold"
            :class="[
              isSolidState ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl',
            ]"
            data-testid="hero-title"
          >
            {{ title }}
          </h3>
        </div>
        <div class="hidden lg:block">
          <h2 data-testid="hero-subtitle" class="mb-2 text-xl font-bold">
            {{ subTitle }}
          </h2>
          <div>
            <ul
              data-testid="hero-description"
              class="list-inside list-disc text-sm font-semibold"
            >
              <li v-for="item in listItems" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="px-small h-full pb-1 pt-6 lg:hidden">
      <h2 class="mb-2 text-lg font-bold">
        {{ subTitle }}
      </h2>
      <div>
        <ul class="list-inside list-disc text-sm font-semibold">
          <li v-for="item in listItems" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import { SOLID_STATE } from '~/constants/services/constants'

export default {
  components: { Breadcrumb, Icon },
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    listItems: {
      type: Array,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageDesktop() {
      return (
        this.images?.desktop ??
        this.images?.mobile ??
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1676580843/assets/forecasts/forecasts-cobalt_kk9zei.png?_i=AA'
      )
    },
    imageMobile() {
      return (
        this.images?.mobile ??
        this.images?.desktop ??
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1676580931/assets/forecasts/forecasts-cobalt-mobile_yvek1j.png?_i=AA'
      )
    },
    isSolidState() {
      return this.title === SOLID_STATE.name
    },
  },
}
</script>
