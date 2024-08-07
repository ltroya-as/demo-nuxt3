<template>
  <div v-click-outside="closeModal" class="relative w-fit">
    <CommonButton
      v-if="!isSaved"
      class="w-fit flex-grow"
      variant="tertiary"
      :disabled="disabled"
      :show-spinner="false"
      extra-classes="!px-2.5 !py-2"
      @click="toggleModal"
    >
      <div class="flex items-center gap-3 text-sm">
        <StarIcon class="h-6 w-6" />
        <span class="hidden xl:block">Save to Watchlist</span>
        <span class="xl:hidden">Watchlist</span>
      </div>
    </CommonButton>
    <CommonButton
      v-else
      class="w-fit flex-grow"
      variant="tertiary"
      :disabled="loading"
      :show-spinner="loading"
      extra-classes="!px-2.5 !py-2 h-full"
      @click="editWatchlist"
    >
      <div class="flex items-center gap-3 text-sm">
        <span class="hidden xl:block">Update Watchlist</span>
        <span class="xl:hidden">Update</span>
      </div>
    </CommonButton>
    <Transition name="fade">
      <div
        v-if="show"
        class="absolute inset-0 !top-[60px] z-50 w-[93vw] max-w-[370px] lg:inset-auto lg:left-1/2 lg:-translate-x-1/2"
      >
        <form
          class="save-watchlist shadow-dp-04 relative flex w-full flex-col gap-y-6 rounded bg-white p-7"
          @submit.prevent="saveWatchlist"
        >
          <h1 class="font-semibold">Save to Watchlist</h1>
          <span class="text-sm">
            Assign a name to your chart and save it to your Watchlist
          </span>
          <FormInput
            ref="name"
            v-model="name"
            class="!m-0"
            label="Name"
            required
            name="name"
          />
          <div
            class="mt-1.5 items-center justify-end gap-x-4 space-y-2 md:flex md:space-y-0"
          >
            <CommonButton
              variant="tertiary"
              type="button"
              extra-classes="sm:w-fit w-full !border-p-500 hover:!bg-p-100 hover:!text-black/90"
              @click="closeModal"
            >
              Cancel
            </CommonButton>
            <CommonButton
              :disabled="disabledSave || loading"
              :show-spinner="loading"
              variant="primary"
              extra-classes="w-full"
              type="submit"
            >
              Save to Watchlist
            </CommonButton>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script>
import StarIcon from '~/assets/icons/star-icon.svg'
import CommonButton from '@/components/common/Button.vue'
import FormInput from '@/components/common/FormInput.vue'

export default {
  components: {
    StarIcon,
    FormInput,
    CommonButton,
  },
  props: {
    isSaved: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',
    }
  },
  computed: {
    disabledSave() {
      return !this.name
    },
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        this.name = ''
      },
    },
  },
  methods: {
    toggleModal() {
      this.$emit('changeShow', !this.show)
    },
    closeModal() {
      this.$emit('changeShow', false)
    },
    saveWatchlist() {
      this.$emit('saveWatchlist', this.name)
    },
    editWatchlist() {
      this.$emit('editWatchlist')
    },
  },
}
</script>

<style scoped>
.save-watchlist {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 1px 10px 0 rgb(0 0 0 / 12%),
    0 4px 5px 0 rgb(0 0 0 / 14%);
}

.save-watchlist::after {
  content: '';
  position: absolute;
  top: -28px;
  right: 50%;
  border-width: 15px;
  border-style: solid;
  transform: translate(50%, 0);
  border-color: transparent transparent white;
}

@media only screen and (max-width: 1023px) {
  .save-watchlist::after {
    right: 80%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
