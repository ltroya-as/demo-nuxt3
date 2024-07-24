<template>
  <component
    :is="element"
    :to="link"
    :target="target"
    :class="[
      'relative inline-flex cursor-pointer items-center justify-center rounded border text-center',
      widthClasses,
      baseClasses,
      disabledBaseClasses,
      disabledHoverClasses,
      extraClasses,
    ]"
    v-bind="additionalAttributes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <div
      v-if="disabled && showSpinner"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
    >
      <IconSpinner class="w-5 animate-spin" :class="spinnerClasses" />
    </div>

    <div :class="{ invisible: disabled && showSpinner }">
      <slot></slot>
    </div>
  </component>
</template>

<script>
import { VARIANT_CLASSES } from '@/constants/variant-button-classes'
import IconSpinner from '@/assets/icons/Spinner.svg'

export default {
  components: {
    IconSpinner,
  },

  props: {
    link: {
      type: String,
      default: () => undefined,
    },

    disabled: Boolean,

    showSpinner: {
      type: Boolean,
      default: true,
    },

    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return !!VARIANT_CLASSES.BASE[value]
      },
    },

    extraClasses: {
      type: String,
      default: () => '',
    },

    target: {
      type: String,
      default: () => '_self',
    },

    type: {
      type: String,
      default: 'submit',
    },

    skipWidthClasses: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isMail() {
      if (!this.link) return undefined
      return this.link.startsWith('mailto')
    },

    isAbsoluteLink() {
      if (!this.link) return undefined
      return this.link.startsWith('https') || this.link.startsWith('http')
    },

    additionalAttributes() {
      if (this.isAbsoluteLink || this.isMail) {
        return { href: this.link }
      }

      return this.link ? {} : { type: this.type }
    },

    widthClasses() {
      if (this.skipWidthClasses) return []

      return ['w-fit', 'md:w-auto']
    },

    baseClasses() {
      return VARIANT_CLASSES.BASE[this.variant]
    },

    disabledBaseClasses() {
      return this.showSpinner
        ? VARIANT_CLASSES.DISABLED.WITH_SPINNER[this.variant]
        : VARIANT_CLASSES.DISABLED.WITHOUT_SPINNER[this.variant]
    },

    disabledHoverClasses() {
      if (this.disabled) {
        if (this.showSpinner) {
          return VARIANT_CLASSES.DISABLED.HOVER[this.variant] || ''
        } else {
          return (
            VARIANT_CLASSES.DISABLED.HOVER_WITHOUT_SPINNER[this.variant] || ''
          )
        }
      }

      return ''
    },

    spinnerClasses() {
      return VARIANT_CLASSES.SPINNER[this.variant]
    },

    element() {
      if (this.isAbsoluteLink || this.isMail) {
        return 'a'
      }

      if (this.link) {
        return resolveComponent('NuxtLink')
      }

      return 'button'
    },
  },
}
</script>
