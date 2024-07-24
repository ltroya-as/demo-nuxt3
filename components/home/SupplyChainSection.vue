<template>
  <div class="flex flex-row md:flex-grow md:basis-1/4 md:flex-col">
    <div class="flex md:hidden">
      <div class="flex flex-col">
        <div
          class="container min-h-[54px] w-[324px] max-w-[324px] rounded-2xl"
          :class="backgroundColor"
        >
          <div class="flex" @click="onClick">
            <div class="ml-6 flex h-[54px] items-center justify-center">
              <div
                class="h-[28px] w-[28px] bg-contain bg-center bg-no-repeat"
                :class="backgroundImage"
              ></div>
            </div>
            <div
              class="ml-6 mr-3 flex flex-grow items-center justify-center text-lg font-semibold"
            >
              <div class="flex-grow">
                {{ title }}
              </div>
              <IconChevronDown
                class="w-full min-w-[22px] max-w-[22px] duration-500"
                :class="{
                  'rotate-180': isOpen,
                }"
              />
            </div>
          </div>

          <div class="flex justify-center">
            <ul class="min-h-[60px]">
              <li
                v-for="(feature, id) in featureList"
                :key="id"
                class="inner font-montserrat mb-3 flex items-center text-base font-normal md:mb-0"
              >
                <LinkWithAnimation
                  :url="feature.href"
                  :text="feature.name"
                  :target="getTarget(feature)"
                  color-icon="s-900"
                />
              </li>
            </ul>
          </div>
        </div>
        <div :class="styleArrow"></div>
      </div>
    </div>
    <div class="hidden flex-col md:flex">
      <div
        class="mr-6 h-[88px] min-h-[88px] w-[88px] min-w-[88px] rounded-[32px] bg-center bg-no-repeat"
        :class="backgroundColorWithImage"
      ></div>
      <div :class="styleArrow"></div>
    </div>
    <div class="hidden md:block">
      <div
        class="font-montserrat text-s-900 mb-1 flex min-h-[88px] items-center text-lg font-semibold md:block md:min-h-0 lg:mb-4 lg:text-2xl"
        data-testid="supplyChain-item-title"
      >
        {{ title }}
      </div>
      <ul
        data-testid="supplyChain-item-list"
        class="min-h-[60px]"
        :class="{ 'hidden md:block': isLast }"
      >
        <li
          v-for="(feature, id) in featureList"
          :key="id"
          class="font-montserrat mb-3 flex items-center text-base font-normal md:mb-0"
        >
          <LinkWithAnimation
            :url="feature.href"
            :text="feature.name"
            :target="getTarget(feature)"
          />
        </li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import IconChevronDown from '~/assets/icons/ChevronDown.svg'

export default {
  components: { LinkWithAnimation, IconChevronDown },
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    containerArrowClasses: {
      type: String,
      default: null,
    },
    backgroundImage: {
      type: String,
      default: '',
    },
    featureList: {
      type: Array,
      default: () => [],
      required: false,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    backgroundColor() {
      const isOpen = this.isOpen ? 'unfold-animation' : 'fold-animation'
      return `bg-${this.color} ${isOpen}`
    },
    backgroundColorWithImage() {
      return `bg-${this.color} ${this.backgroundImage}`
    },
    styleArrow() {
      return `relative left-6 h-5 w-7 after:absolute after:left-0 after:bottom-0
        after:border-l-[14px] after:border-r-[14px] after:border-t-[21px] after:border-b-0
        after:border-solid after:border-b-transparent after:pb-0 after:content-['']
        md:h-7 md:w-[calc(100%_-_115px)] md:after:left-auto md:bottom-[60px] md:left-[88px]
        md:after:right-[-27px] md:after:top-0 md:after:border-l-[15px] md:after:border-r-0
        md:after:border-t-[14px] md:after:border-b-[14px]
        md:after:border-b-red md:after:pb-0 md:after:pl-[14px]
        ${this.containerArrowClasses}`
    },
  },
  methods: {
    getTarget(feature) {
      return feature?.target ? '_blank' : '_self'
    },
    onClick() {
      this.$emit('click', this.title)
    },
  },
}
</script>

<style scoped>
.container {
  transition: max-height 1s ease-out;
  overflow: hidden;
}

.fold-animation {
  max-height: 0;
}

.unfold-animation {
  max-height: 300px;
}
</style>
