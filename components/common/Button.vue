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
      $attrs.class,
    ]"
    :data-testid="$attrs['data-testid']"
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

<script setup lang="ts">
import { VARIANT_CLASSES } from '@/constants/variant-button-classes'
import IconSpinner from '@/assets/icons/Spinner.svg'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const props = defineProps({
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
})

const isMail = computed(() =>
  !props.link ? undefined : props.link.startsWith('mailto'),
)

const isAbsoluteLink = computed(() =>
  !props.link
    ? undefined
    : props.link.startsWith('https') || props.link.startsWith('http'),
)

const additionalAttributes = computed(() => {
  const attrsWithoutType = Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'onClick'),
  )
  if (isAbsoluteLink.value || isMail.value) {
    return { href: props.link, ...attrsWithoutType }
  }

  return props.link
    ? { ...attrsWithoutType }
    : { type: props.type, ...attrsWithoutType }
})

const widthClasses = computed(() =>
  props.skipWidthClasses ? [] : ['w-fit', 'md:w-auto'],
)

const baseClasses = computed(() => {
  return VARIANT_CLASSES.BASE[props.variant]
})

const disabledBaseClasses = computed(() => {
  return props.showSpinner
    ? VARIANT_CLASSES.DISABLED.WITH_SPINNER[props.variant]
    : VARIANT_CLASSES.DISABLED.WITHOUT_SPINNER[props.variant]
})

const disabledHoverClasses = computed(() => {
  if (props.disabled) {
    if (props.showSpinner) {
      return VARIANT_CLASSES.DISABLED.HOVER[props.variant] || ''
    } else {
      return VARIANT_CLASSES.DISABLED.HOVER_WITHOUT_SPINNER[props.variant] || ''
    }
  }

  return ''
})

const spinnerClasses = computed(() => VARIANT_CLASSES.SPINNER[props.variant])

const element = computed(() => {
  if (isAbsoluteLink.value || isMail.value) {
    return 'a'
  }

  if (props.link) {
    return resolveComponent('NuxtLink')
  }

  return 'button'
})
</script>
