<template>
  <component
    :is="typeComponent"
    v-bind="getProps"
    :class="[$attrs.class]"
    class="button button-arrow text-s-900 hover:text-s-700 flex items-center hover:underline"
    @click="$emit('click')"
  >
    {{ text }}
    <svg
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="arrow-icon"
      :class="textColor"
    >
      <g class="arrow-head">
        <path
          d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8"
          stroke="currentColor"
          stroke-width="2"
        />
      </g>
    </svg>
  </component>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_parent',
    },
    colorIcon: {
      type: String,
      default: 'p-500',
    },
  },
  computed: {
    typeComponent() {
      if (this.url === '') return 'button'
      return this.target === '_blank' ? 'a' : resolveComponent('NuxtLink')
    },
    getProps() {
      return this.target === '_blank'
        ? { href: this.url, target: this.target }
        : { to: this.url }
    },
    textColor() {
      return `text-${this.colorIcon} hover:text-${this.colorIcon}`
    },
  },
}
</script>

<style lang="scss" scoped>
$time-duration: 100ms;
.button {
  transition: all $time-duration ease-in-out;
}
.button-arrow {
  .arrow-icon {
    overflow: visible;
    margin-left: 8px;
    width: 8px;
  }
  .arrow-head {
    transform: translateX(0);
    transition: transform $time-duration ease-in-out;
  }

  &:hover {
    .arrow-head {
      transform: translateX(4px);
    }
  }
}
</style>
