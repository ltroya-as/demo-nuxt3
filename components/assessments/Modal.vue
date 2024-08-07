<template>
  <CommonModal
    :modal-name="modalName"
    title="Filters"
    modal-classes="rounded-xl bg-s-50 pt-12 pb-14 w-full shadow-dp-01 max-w-[540px] overflow-y-clip h-[85vh]"
    button-close-classes="absolute -top-8 -left-12"
    modal-content-classes="h-[calc(100%_-_30px)] overflow-y-auto px-4 pt-4 lg:px-16 lg:pt-8"
  >
    <template #content>
      <slot name="content"></slot>
    </template>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </CommonModal>
</template>

<script>
import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'
export default {
  mixins: [AccessibleModalMixin],
  data() {
    return {
      modalName: 'priceAssessmentFilters',
    }
  },
}
</script>
