<template>
  <CommonModal
    modal-name="chartBuilderReset"
    class="z-[90]"
    modal-classes="rounded-xl bg-s-50 p-8 shadow-dp-01 max-w-[464px]"
    modal-header-classes="!p-0"
    modal-content-classes="overflow-y-auto pt-4"
    button-close-classes="hidden"
  >
    <template #header>
      <h2 class="text-lg font-semibold leading-7 text-black/90">
        Reset price chart builder?
      </h2>
    </template>
    <template #content>
      <p>
        Resetting this builder will clear all current settings/data, are you
        sure you want to proceed?
      </p>
    </template>
    <template #footer>
      <div class="mt-8 flex flex-col justify-end gap-x-4 gap-y-3 sm:flex-row">
        <CommonButton
          extra-classes="sm:w-36 w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90 min-w-[148px]"
          skip-width-classes
          variant="tertiary"
          @click="$emit('close')"
        >
          Keep editing
        </CommonButton>
        <CommonButton
          :show-spinner="false"
          extra-classes="sm:w-36 w-full min-w-[148px]"
          skip-width-classes
          variant="primary"
          @click="$emit('reset')"
        >
          Reset builder
        </CommonButton>
      </div>
    </template>
  </CommonModal>
</template>

<script>
export default {}
</script>
