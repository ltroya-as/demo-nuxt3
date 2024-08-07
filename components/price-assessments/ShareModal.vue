<template>
  <CommonModal
    v-if="$store.state.modal.tableIndexShareOpen"
    modal-name="tableIndexShare"
    modal-header-classes="!px-0"
    modal-classes="py-8 px-10 max-w-contact-form-container rounded-xl bg-s-50 shadow-dp-01"
    modal-content-classes="pt-8"
  >
    <template #header>
      <span class="text-left font-semibold">Share</span>
    </template>
    <template #content>
      <div class="flex gap-x-8">
        <a
          target="_blank"
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=google.com&title=${post}`"
          rel="noopener"
          class="flex flex-col items-center gap-y-1.5"
        >
          <LinkedInIcon />
          <span class="text-sm">Linkedin</span>
        </a>
        <a
          target="_blank"
          :href="`https://twitter.com/intent/tweet?text=${post}`"
          rel="noopener"
          class="flex flex-col items-center gap-y-1.5"
        >
          <TwitterIcon />
          <span class="text-sm">Twitter</span>
        </a>
        <div
          class="relative flex cursor-pointer flex-col items-center gap-y-1.5"
          @click="copy"
        >
          <div class="bg-s-800 h-10 w-10 rounded-md p-2 text-white">
            <LinkIcon />
          </div>
          <span class="text-sm">Copy</span>
          <transition
            enter-class="opacity-0"
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-500"
            leave-to-class="opacity-0"
          >
            <span
              v-if="copied"
              class="bg-s-800 absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-lg px-2 text-white"
            >
              copied!
            </span>
          </transition>
        </div>
      </div>
    </template>
  </CommonModal>
</template>
<script>
import LinkIcon from '@/assets/icons/icon-link.svg'
import LinkedInIcon from '@/assets/icons/LinkedInBlue.svg'
import TwitterIcon from '@/assets/icons/TwitterLogo.svg'

export default {
  components: { LinkIcon, LinkedInIcon, TwitterIcon },
  data() {
    return {
      copied: false,
      post: '',
    }
  },
  computed: {},
  methods: {
    async copy() {
      this.copied = true
      await navigator.clipboard.writeText('')
      setTimeout(() => {
        this.copied = false
      }, 800)
    },
  },
}
</script>
