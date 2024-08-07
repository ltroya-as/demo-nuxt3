<template>
  <CommonModal
    modal-name="chartBuilderDataSeriesWarning"
    class="z-[90]"
    modal-classes="rounded-xl bg-s-50 p-8 shadow-dp-01 max-w-[553px]"
    modal-header-classes="!p-0"
    modal-content-classes="overflow-y-auto pt-4"
    button-close-classes="hidden"
  >
    <template #header>
      <div class="flex items-center gap-x-3">
        <IconExclamation class="h-7 w-7 text-[#f06800]" />
        <h2 class="text-lg font-semibold leading-7 text-black/90">
          Over 10 data series selected
        </h2>
      </div>
    </template>
    <template #content>
      <p>
        This might cause the chart not to display all the selected data series.
      </p>
      <p>A table will show all the information selected instead.</p>
    </template>
    <template #footer>
      <div class="mt-8 flex justify-end gap-x-4">
        <CommonButton
          extra-classes="sm:w-fit w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90 min-w-[148px]"
          skip-width-classes
          variant="tertiary"
          @click="$emit('close')"
        >
          Back to editing
        </CommonButton>
        <CommonButton
          :show-spinner="false"
          extra-classes="sm:w-36 w-full min-w-[148px]"
          skip-width-classes
          variant="primary"
          @click="$emit('confirm')"
        >
          Continue
        </CommonButton>
      </div>
    </template>
  </CommonModal>
</template>

<script>
import IconExclamation from '~/assets/icons/icon-exclamation.svg'

export default {
  components: {
    IconExclamation,
  },
}
</script>
