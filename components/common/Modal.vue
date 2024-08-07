<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      :aria-hidden="!modalOpen"
      class="bg-s-900 fixed left-0 top-0 z-[999] flex h-full w-[100vw] flex-col items-center justify-center bg-opacity-80 p-4 md:px-16"
      :class="modalOverlayClasses"
      @keydown="handleKeyDown"
      @click.self="handleClose"
    >
      <div
        v-if="modalOpen"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${modalName}-modal-title`"
        :data-testid="`${modalName}-modal`"
        class="container-modal-common"
        :class="modalClasses"
      >
        <div :class="[modalHeaderClasses, 'relative px-16']">
          <header class="relative w-full">
            <slot name="header"></slot>
            <div class="w-full text-right">
              <slot name="closeButton">
                <button
                  aria-label="Close modal"
                  :class="buttonCloseClasses"
                  @click.prevent="handleClose"
                >
                  <IconClose class="h-5 w-5" />
                </button>
              </slot>
              <div
                class="absolute -top-8 right-[40%] text-lg font-semibold leading-7 sm:right-[45%] lg:-top-4"
              >
                {{ title }}
              </div>
            </div>
          </header>
        </div>

        <div :class="modalContentClasses">
          <slot name="content"></slot>
        </div>

        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'
import IconClose from '~/assets/icons/Close.svg'

export default {
  components: { IconClose },
  mixins: [AccessibleModalMixin],
  props: {
    modalName: {
      type: String,
      required: true,
    },
    modalOverlayClasses: {
      type: String,
      default: '',
    },
    modalClasses: {
      type: String,
      default:
        'max-w-contact-form-container rounded-xl bg-s-50 px-4 pt-12 pb-12 shadow-dp-01',
    },
    modalContentClasses: {
      type: String,
      default: 'h-full overflow-y-auto px-4 pt-4 lg:px-16 lg:pt-8',
    },
    modalHeaderClasses: {
      type: String,
      default: '',
    },
    buttonCloseClasses: {
      type: String,
      default: 'absolute top-0 -right-0',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
