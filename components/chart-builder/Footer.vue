<template>
  <div
    class="footer flex flex-wrap items-center justify-between gap-x-4 gap-y-4 p-5"
  >
    <div
      class="flex w-full items-center justify-between gap-x-1 transition-colors sm:w-fit sm:justify-normal"
      :class="status.textColor"
    >
      <div
        ref="message"
        class="flex items-center gap-x-1"
        :class="{ 'cursor-pointer': isError }"
      >
        <component
          :is="status.icon"
          class="h-5 w-5"
          :class="status.iconColor"
        />
        <span class="leading-4">Selected data series:</span>
      </div>
      <span
        class="text-lg font-bold"
        data-testid="selected-data-series-quantity"
      >
        {{ dataSeries }}
      </span>
    </div>
    <div
      class="flex w-full flex-col-reverse flex-wrap items-center gap-x-6 gap-y-4 sm:w-fit sm:flex-row"
    >
      <CommonButton
        extra-classes="sm:w-36 w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90"
        skip-width-classes
        variant="tertiary"
        data-testid="reset-button"
        @click="$emit('reset')"
      >
        Reset
      </CommonButton>
      <CommonButton
        :disabled="disabledNext"
        :show-spinner="false"
        extra-classes="sm:w-36 w-full"
        skip-width-classes
        variant="primary"
        data-testid="next-button"
        @click="$emit('next')"
      >
        {{ nextTitle }}
      </CommonButton>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import CommonButton from '~/components/common/Button.vue'
import IconExclamation from '~/assets/icons/icon-exclamation.svg'
import IconCheckCircle from '~/assets/icons/icon-check-circle.svg'
import IconVoidCircle from '~/assets/icons/icon-void-circle.svg'

const statuses = {
  void: {
    textColor: 'text-black/90',
    iconColor: 'text-black',
    icon: IconVoidCircle,
  },
  success: {
    textColor: 'text-black/90',
    iconColor: 'text-green-light',
    icon: IconCheckCircle,
  },
  error: {
    textColor: 'text-warning',
    iconColor: 'text-warning',
    icon: IconExclamation,
  },
}

export default {
  components: {
    CommonButton,
    IconExclamation,
    IconCheckCircle,
  },
  props: {
    disabledNext: {
      type: Boolean,
      default: false,
    },
    dataSeries: {
      type: Number,
      default: 0,
    },
    nextTitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    isError() {
      return this.status === statuses.error
    },
    status() {
      if (this.dataSeries === 0) return statuses.void
      if (this.dataSeries > 0 && this.dataSeries <= 10) return statuses.success
      return statuses.error
    },
    tippyInstance() {
      return tippy(this.$refs.message, {
        content: '',
        allowHTML: true,
        maxWidth: 294,
        arrow: true,
        onShow(instance) {
          instance.setContent(
            `<div class="bg-black p-4 text-white font-semibold text-sm rounded-lg">
            We recommend selecting under 10 data series to view all data series clearly.
          </div>`,
          )
        },
      })
    },
  },
  watch: {
    dataSeries() {
      if (this.isError) this.tippyInstance.enable()
      else this.tippyInstance.disable()
    },
  },
}
</script>

<style scoped>
.footer {
  box-shadow: 0 2px 20px 0 rgb(0 0 0 / 10%);
}
</style>
