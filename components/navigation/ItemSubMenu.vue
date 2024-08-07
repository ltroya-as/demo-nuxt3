<template>
  <div class="min-w-[215px]">
    <div class="font-semiBold mb-2">
      {{ title }}
    </div>
    <div class="flex flex-col gap-1.5 font-normal">
      <div v-for="item in subMenu" :key="item.name">
        <component
          :is="setLink(item)"
          v-bind="setAdditionalAttributes(item, groupHref)"
          :class="{
            'bg-s-200': isSelected(item.href),
          }"
          class="font-montserrat hover:bg-s-200 flex items-center justify-between rounded-lg text-sm font-normal xl:text-base xl:leading-5"
        >
          <span class="max-w-[200px]">{{ item.name }}</span>
          <span v-if="hasAnyActiveMembership(item.memberships)" class="h-4 w-4">
            <Icon name="check-subscribe" class="text-p-500 h-full w-full" />
          </span>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subMenu: {
      type: Array,
      required: true,
    },
    groupHref: {
      type: String,
      default: '',
    },
  },

  methods: {
    isSelected(menuPath, base = '') {
      const { fullPath } = this.$route
      const childPath = menuPath.replace('/', '')

      if (childPath === '') return fullPath === base

      return (
        fullPath.includes(base) &&
        fullPath?.split('/')?.some((_item) => _item === childPath)
      )
    },
    isExternalLink(element) {
      return element?.href?.startsWith('https')
    },
    hasLink(element) {
      return !!element.href
    },
    hasTarget(element) {
      return 'target' in element
    },

    setLink(element) {
      if (this.isExternalLink(element)) {
        return 'a'
      }

      if (this.hasLink(element)) {
        return this.hasTarget(element) && typeof element.target === 'string'
          ? 'a'
          : resolveComponent('NuxtLink')
      }

      return 'div'
    },
    setAdditionalAttributes(element, base = '') {
      if (!this.hasLink(element)) return {}

      const OVERVIEW = 'Overview'
      let url = `${base}${element.href}`
      if (element.firstItem && element.firstItem !== OVERVIEW) {
        url += `/${element.firstItem}`
      }

      return this.isExternalLink(element)
        ? {
            href: element.href,
            target: element.target ? element.target : '_self',
          }
        : { to: url }
    },

    hasAnyActiveMembership(memberships) {
      if (memberships) {
        return memberships.find(
          (membership) => this.$store.state.memberships[membership],
        )
      }
    },
  },
}
</script>
