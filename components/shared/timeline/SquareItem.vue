<template>
  <div
    class="flex flex-row md:flex-grow md:basis-1/5 md:flex-col"
    data-testid="timeline-with-squares-item"
  >
    <div class="flex flex-col">
      <SharedCommonIconSquare
        :class="['mr-6', rounded]"
        :background-color="backgroundColor"
        :icon="icon"
        :icon-alt="title"
      />
      <div :class="styleArrow"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    rounded: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: 'bg-p-100',
    },
    icon: {
      type: String,
      required: true,
    },
    containerArrowClasses: {
      type: String,
      default: null,
    },
  },
  computed: {
    styleArrow() {
      return `relative left-large h-full w-[27px] after:absolute after:left-0 after:bottom-0
        after:border-l-[13.5px] after:border-r-[14px] after:border-t-[15px] after:border-b-0
        after:border-solid after:border-b-transparent after:pb-1 after:content-['']
        md:h-[27px] md:w-[calc(100%_-_115px)] md:after:left-auto md:bottom-[58px] md:left-[88px] md:after:right-[-27px] md:after:top-0
        md:after:border-l-[15px] md:after:border-r-0 md:after:border-t-[13.5px] md:after:border-b-[14px]
        md:after:border-b-red md:after:pb-0 md:after:pl-[14px]
        ${this.containerArrowClasses}`
    },
  },
}
</script>
