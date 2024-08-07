<template>
  <CommonModal
    modal-name="deleteWatchlist"
    class="z-[90]"
    modal-classes="rounded-xl bg-s-50 p-8 shadow-dp-01 max-w-[464px]"
    modal-header-classes="!p-0"
    modal-content-classes="overflow-y-auto pt-4"
    button-close-classes="hidden"
  >
    <template #header>
      <h2 class="text-lg font-semibold leading-7 text-black/90">
        Delete chart from your Watchlist?
      </h2>
    </template>

    <template #content>
      <p>Deleting this chart will permanently remove it from your Watchlist.</p>
    </template>
    <template #footer>
      <div class="mt-8 flex justify-end gap-x-4">
        <CommonButton
          extra-classes="sm:w-fit w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90 min-w-[148px]"
          skip-width-classes
          variant="tertiary"
          @click="$emit('close')"
        >
          Cancel
        </CommonButton>
        <CommonButton
          :disabled="loading"
          :show-spinner="loading"
          extra-classes="sm:w-36 w-full min-w-[148px]"
          skip-width-classes
          variant="primary"
          @click="$emit('confirm')"
        >
          Delete Chart
        </CommonButton>
      </div>
    </template>
  </CommonModal>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
