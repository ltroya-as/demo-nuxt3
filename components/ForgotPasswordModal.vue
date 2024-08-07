<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      :aria-hidden="!modalOpen"
      class="bg-s-900 fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-opacity-95"
      @keydown="handleKeyDown"
      @click.self="handleClose"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-modal-title"
        data-testid="forgot-password-modal"
        class="relative mx-auto w-11/12 max-w-sm rounded-md bg-white p-4 md:w-5/12 md:max-w-none md:p-16 lg:max-w-[500px]"
      >
        <span
          class="bg-p-500 shadow-dp-04 absolute left-0 top-2 h-px w-16"
        ></span>

        <header class="relative text-right">
          <button
            aria-label="Close modal"
            class="absolute right-0 top-0 md:-right-8 md:-top-8"
            @click="handleClose"
          >
            <img class="h-5 w-5" src="~assets/icons/Close.svg" alt="close" />
          </button>
        </header>

        <ForgotPasswordForm :show-default-title="true" module="modal" />

        <span
          class="bg-p-500 shadow-dp-04 absolute bottom-2 right-0 h-px w-16"
        ></span>
      </div>
    </div>
  </transition>
</template>

<script>
import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'

export default {
  mixins: [AccessibleModalMixin],

  data() {
    return {
      modalName: 'forgotPassword',
    }
  },
}
</script>
