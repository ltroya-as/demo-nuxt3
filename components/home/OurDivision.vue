<template>
  <div class="bg-s-50 flex rounded-xl p-6 xl:px-[35px] xl:py-10">
    <div
      class="border-p-500 mr-4 hidden flex-shrink-0 pr-5 lg:block lg:border-r-[3px]"
    >
      <Icon :name="icon" class="h-[60px] w-[60px]" />
    </div>
    <div>
      <div
        class="border-p-500 text-surface-em-high mb-5 flex items-center gap-x-6 border-b-[3px] pb-5 text-xl font-bold lg:mb-5 lg:border-none lg:pb-0 lg:text-2xl"
      >
        <Icon :name="icon" class="h-[60px] w-[60px] lg:hidden" />
        <component
          :is="titleLink ? getLinkComponent() : 'div'"
          v-bind="getAdditionalAttributes()"
          :class="titleLink ? 'cursor-pointer hover:underline' : ''"
        >
          {{ title }}
        </component>
      </div>
      <div
        v-if="elements.length > 0"
        class="mb-5 flex max-w-[80%] flex-row flex-wrap gap-x-2 sm:max-w-none md:mb-2"
      >
        <div v-for="element in elements" :key="element" class="h-10 w-10">
          <Icon :name="`${element}-logo`" class="h-full w-full" />
        </div>
      </div>
      <div
        v-if="subTitle"
        class="font-Montserrat text-s-900 mb-5 text-sm font-semibold md:mb-3 lg:text-base"
      >
        {{ subTitle }}
      </div>
      <div
        class="font-montserrat text-surface-em-high mb-5 text-sm font-normal md:mb-3 lg:text-base"
        v-html="description"
      />

      <div
        v-if="links.length > 0"
        class="flex max-w-[520px] flex-wrap gap-x-2 gap-y-2 text-sm md:gap-x-6 lg:text-base"
      >
        <LinkWithAnimation
          v-for="(link, index) in links"
          :key="index"
          :url="link.link"
          :text="link.name"
          :target="getTarget(link)"
          class="mr-2 font-semibold"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: { Icon, LinkWithAnimation },
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    elements: {
      type: Array,
      default() {
        return []
      },
    },
    imageBackground: {
      type: String,
      default: '',
    },
    links: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: '',
    },
    titleLink: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'Pricing.svg',
    },
  },
  methods: {
    isExternalLink: (link) => link?.startsWith('https'),
    getLinkComponent() {
      if (this.isExternalLink(this.titleLink)) {
        return 'a'
      }

      return resolveComponent('NuxtLink')
    },
    getAdditionalAttributes() {
      return this.isExternalLink(this.titleLink)
        ? {
            href: this.titleLink,
            target: '_blank',
          }
        : { to: `/${this.titleLink}` }
    },
    getTarget(route) {
      return route?.target ? '_blank' : '_self'
    },
  },
}
</script>
