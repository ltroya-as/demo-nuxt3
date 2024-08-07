<template>
  <div
    v-show="showOverlay"
    class="absolute z-20 flex h-full w-full items-start justify-center rounded-lg bg-black/[.4] pt-56 lg:items-center lg:pt-0"
  >
    <div class="flex flex-col items-center gap-3 rounded-lg bg-white p-6">
      <h4 class="text-base font-semibold">Subscribe to gain access</h4>
      <CommonButtonContactUs />
      <div
        class="max-w-content-container flex items-center justify-center text-xs"
      >
        Already a subscriber?
        <button
          class="text-p-300 ml-2 cursor-pointer font-bold"
          @click="$modal.open('signIn')"
        >
          {{ signInText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import { SIGN_IN } from '~/constants/services/constants'

export default {
  components: {
    CommonButtonContactUs,
  },
  props: {
    showOverlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
    }
  },
}
</script>
