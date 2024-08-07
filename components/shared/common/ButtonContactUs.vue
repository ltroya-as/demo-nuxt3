<template>
  <CommonButton
    type="button"
    :variant="variant"
    class="lg:!w-fit lg:!min-w-[140px]"
    data-testid="button-contact-us"
    @click="handleClick"
  >
    {{ text }}
  </CommonButton>
</template>
<script>
import { getServices } from '~/constants/services'
import ButtonClassesAndEvent from '~/mixins/ButtonClassesAndEvent'

export default {
  mixins: [ButtonClassesAndEvent],
  props: {
    services: {
      type: [Array, Object],
      default: null,
    },
    text: {
      type: String,
      default: 'Contact us',
    },
    modalName: {
      type: String,
      default: 'contact',
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  methods: {
    handleClick() {
      if (this.services === null) return this.$modal.open(this.modalName)

      if (this.services instanceof Array && this.services?.length > 0) {
        const initialValues = getServices([...this.services])
        this.$store.commit('modal/setInitialFields', initialValues)
        return this.$modal.open(this.modalName)
      }

      this.$store.commit('modal/setInitialFields', this.services)
      return this.$modal.open(this.modalName)
    },
  },
}
</script>
