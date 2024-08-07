<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      :aria-hidden="!modalOpen"
      class="bg-s-900 sm:px-big sm:pb-large fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-start bg-opacity-95 px-0 pb-0 pt-12 sm:justify-center md:p-0"
      @keydown="handleKeyDown"
      @click.self="handleClose"
    >
      <div
        v-if="modalOpen"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-modal-title"
        data-testid="signin-modal"
        class="md:max-w-article-container-medium relative mx-auto w-full overflow-hidden rounded-lg bg-white"
      >
        <button
          aria-label="Close modal"
          class="absolute right-3 top-3 rounded-full bg-white p-2"
          @click="handleClose"
        >
          <IconClose class="h-5 w-5" />
        </button>

        <SignInForm :image="image" />
      </div>
    </div>
  </transition>
</template>

<script>
import AccessibleModalMixin from '~/mixins/AccessibleModalMixin'
import SignInForm from '~/components/SignInForm.vue'
import IconClose from '~/assets/icons/Close.svg'
import { LOGIN_IMAGES } from '~/constants/login-images'
import { random } from '~/utils/random'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

export default {
  components: { IconClose, SignInForm },

  mixins: [AccessibleModalMixin, ScreenSizeMixin],

  data() {
    return {
      image: '',
      modalName: 'signIn',
    }
  },

  watch: {
    modalOpen(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.image = ''
        }, 500)
      } else {
        let rand = random()
        const size = LOGIN_IMAGES.length

        rand = Math.floor(rand * size)
        this.image = this.isMobile()
          ? 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,h_300'
          : 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_400,h_500'

        this.image += LOGIN_IMAGES[rand]
      }
    },
  },
}
</script>
