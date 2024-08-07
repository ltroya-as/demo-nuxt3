<template>
  <div class="z-10 flex items-center justify-between">
    <CommonButton
      class="self-start py-3"
      :variant="variantButton"
      skip-width-classes
      @click="$emit('play')"
    >
      <div
        class="m-0 flex w-full flex-row items-center justify-between gap-x-1 p-0"
      >
        <IconOutlinePlayCircle
          v-if="isAuthorized || hasPreview"
          class="h-4 w-4"
        />
        <span class="w-max text-sm font-semibold">
          {{ textButton }}
        </span>
      </div>
    </CommonButton>
    <CheckSubscriptionIcon
      v-if="isAuthorized"
      class="text-p-900 h-8 w-8"
      data-testid="video-card-item-check"
    />
    <CloseLockIcon
      v-else
      class="text-p-900 h-8 w-8"
      data-testid="video-card-item-lock"
    />
  </div>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import IconOutlinePlayCircle from '~/assets/icons/outline-play-circle.svg'
import CheckSubscriptionIcon from '~/assets/icons/check-subscribe.svg'
import CloseLockIcon from '~/assets/icons/close-lock.svg'

export default {
  components: {
    CommonButton,
    IconOutlinePlayCircle,
    CheckSubscriptionIcon,
    CloseLockIcon,
  },
  props: {
    isAuthorized: {
      type: Boolean,
      required: true,
    },
    hasPreview: {
      type: Boolean,
      default: false,
    },
    textButton: {
      type: String,
      default: 'Find out more',
    },
  },
  computed: {
    variantButton() {
      return this.isAuthorized ? 'primary' : 'clean'
    },
  },
}
</script>
