<template>
  <CommonModal
    v-show="!showSignInOrContact"
    :modal-name="modalName"
    modal-overlay-classes="!z-50"
    modal-classes="h-auto w-full max-w-content-container mx-auto rounded-xl overflow-hidden bg-white shadow-dp-01 relative p-0"
    modal-content-classes="h-auto overflow-hidden p-0 m-0"
    button-close-classes="bg-white p-2 rounded-full outline-none absolute top-0 right-0 invisible"
  >
    <template #content>
      <VimeoPlayer
        v-if="vimeoSource && !showContactUs"
        ref="vimeoPlayer"
        :source="vimeoSource"
        :ratio="videoRatio"
        :autoplay="autoplay"
        @play-video="onPlayVideo"
        @ended-video="onEndedVideo"
      />

      <div
        v-if="showContactUs"
        class="bg-grey-900 flex aspect-video h-full w-full flex-col items-center justify-center gap-3 px-4 py-8 text-white md:p-0"
      >
        <span class="font-semibold">To watch the full video</span>
        <CommonButton variant="primary" @click="$modal.open('contact')">
          Contact us
        </CommonButton>
        <div class="flex items-center gap-1 text-xs">
          <span>Already a Subscriber?</span>
          <button
            class="text-p-500 cursor-pointer font-bold"
            @click="$modal.open('signIn')"
          >
            {{ signInText }}
          </button>
        </div>
        <div class="mt-1 flex flex-col text-center">
          <span class="text-xs font-bold">replay</span>
          <button class="h-auto w-auto" @click="replayVideo">
            <IconReplay class="h-10 w-10" />
          </button>
        </div>
      </div>

      <button
        aria-label="Close modal"
        class="absolute right-3 top-3 rounded-full bg-white p-2"
        @click="closeModal"
      >
        <IconClose class="h-5 w-5" />
      </button>
    </template>
  </CommonModal>
</template>

<script>
import { SIGN_IN } from '~/constants/services/constants'

import CommonButton from '~/components/common/Button.vue'
import CommonModal from '~/components/common/Modal.vue'
import VimeoPlayer from '~/components/video/VimeoPlayer.vue'
import IconClose from '~/assets/icons/Close.svg'
import IconReplay from '~/assets/icons/replay.svg'

export default {
  components: {
    IconClose,
    IconReplay,
    VimeoPlayer,
    CommonModal,
    CommonButton,
  },
  props: {
    vimeoSource: {
      type: String,
      default: null,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    videoRatio: {
      type: String,
      default: '1920:1080',
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
      isEnded: false,
      modalName: 'videoIntro',
    }
  },
  computed: {
    showContactUs() {
      return this.isEnded && this.isPreview
    },
    showSignInOrContact() {
      return this.$store.state.modal.signInOpen
    },
  },
  methods: {
    replayVideo() {
      this.isEnded = false
    },
    closeModal() {
      this.$modal.close(this.modalName)
    },
    onPlayVideo() {
      this.isEnded = false
    },
    onEndedVideo() {
      this.isEnded = true
    },
  },
}
</script>
