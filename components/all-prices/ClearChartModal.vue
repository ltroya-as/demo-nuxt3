<template>
  <CommonModal
    modal-name="clearChart"
    class="z-[90]"
    modal-classes="rounded-xl bg-s-50 p-8 shadow-dp-01 sm:w-[553px]"
    modal-header-classes="!p-0"
    modal-content-classes="overflow-y-auto pt-4"
    button-close-classes="hidden"
  >
    <template #header>
      <h2 class="text-lg font-semibold leading-7 text-black/90">
        Clear Chart?
      </h2>
    </template>
    <template #content>
      <div class="flex flex-col gap-y-4">
        <p>This will reset the chart to its default state.</p>
        <template v-if="!hasWatchlist">
          <FormCheckbox
            v-model="saveChart"
            class="!m-0"
            label="Save chart to Watchlist before clearing it."
          />
          <FormInput
            v-if="saveChart"
            ref="name"
            v-model="name"
            class="!m-0"
            label="Chart name"
            name="name"
            placeholder="Write price chart name"
          />
        </template>
      </div>
    </template>
    <template #footer>
      <div
        class="mt-5 flex flex-col justify-end gap-x-4 gap-y-3 sm:mt-8 sm:flex-row"
      >
        <CommonButton
          extra-classes="sm:w-fit w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90 min-w-[148px]"
          skip-width-classes
          variant="tertiary"
          @click="$emit('close')"
        >
          Cancel
        </CommonButton>
        <CommonButton
          :disabled="disabled || loading"
          :show-spinner="loading"
          extra-classes="sm:w-fit min-w-[148px]"
          skip-width-classes
          variant="primary"
          @click="confirm"
        >
          {{ buttonText }}
        </CommonButton>
      </div>
    </template>
  </CommonModal>
</template>

<script>
import FormInput from '@/components/common/FormInput.vue'
import FormCheckbox from '@/components/common/FormCheckbox.vue'

export default {
  components: {
    FormCheckbox,
    FormInput,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    hasWatchlist: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',
      saveChart: false,
    }
  },
  computed: {
    disabled() {
      return this.saveChart && !this.name
    },
    buttonText() {
      return this.saveChart ? 'Save and Clear' : 'Clear Chart'
    },
  },
  watch: {
    saveChart(value) {
      if (!value) {
        this.name = ''
      }
    },
  },
  methods: {
    confirm() {
      if (this.saveChart) {
        this.$emit('confirm', this.name)
      } else {
        this.$emit('confirm')
      }
    },
  },
}
</script>
