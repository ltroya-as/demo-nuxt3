<template>
  <div
    class="group flex h-full items-center justify-end gap-1 px-2.5"
    :class="{ 'cursor-pointer': isClickable }"
    @click="openContactForm"
  >
    <SummaryTableBlockedData :initial-fields="initialFields">
      <CloseLock class="block h-6 w-6 shrink-0 group-hover:hidden" />
      <OpenLock class="hidden h-6 w-6 shrink-0 group-hover:block" />
    </SummaryTableBlockedData>
  </div>
</template>

<script>
import { getServices } from '~/constants/services'
import SummaryTableBlockedData from '~/components/price-assessments/SummaryTableBlockedData.vue'
import CloseLock from '~/assets/icons/close-lock.svg'
import OpenLock from '~/assets/icons/open-lock.svg'

export default {
  components: {
    SummaryTableBlockedData,
    CloseLock,
    OpenLock,
  },
  computed: {
    initialFields() {
      return this.params.initialFields
    },
    isClickable() {
      return this.initialFields.length > 0
    },
  },
  methods: {
    openContactForm() {
      if (!this.isClickable) return
      const initialValues = getServices([...this.initialFields])
      this.$store.commit('modal/setInitialFields', initialValues)
      this.$modal.open('contact')
    },
  },
}
</script>
