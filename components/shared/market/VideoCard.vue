<template>
  <div
    v-if="report"
    :class="{ 'border-grey-600 border': !report.hide_border }"
    class="shadow-pm mx-auto flex h-full w-full flex-row justify-between rounded-lg bg-white"
    data-testid="report-card"
  >
    <div class="bg-s-300 relative h-full w-[125px] flex-shrink-0 rounded-l-lg">
      <img
        :src="videoImage"
        class="flex h-[150px] max-h-[150px] w-full rounded-l-lg object-cover"
        alt="Report ESG"
        data-testid="esg-video-card-image"
      />
      <CardLabel
        type="mp4"
        :show-label="false"
        class="absolute left-3 top-3 z-10"
      />
    </div>
    <div class="flex w-full flex-col justify-between p-3">
      <div>
        <div class="flex flex-col items-start justify-between gap-1">
          <h3
            class="line-clamp-2 text-sm font-semibold xl:text-lg"
            data-testid="forecasts-report-card-title"
          >
            {{ videoTitle }}
          </h3>
        </div>
      </div>
      <div
        class="flex w-full flex-col"
        :class="{ 'justify-between gap-y-1 lg:gap-y-4': reportHasAccess }"
      >
        <div
          v-if="reportHasAccess"
          class="container-button flex flex-row items-center justify-between gap-2"
          data-testid="services-group-buttons"
        >
          <CommonButton
            v-if="!videoIsValidate"
            class="mx-0 !w-full !cursor-default !text-sm lg:!min-w-[150px] 2xl:!max-w-[150px]"
            data-testid="esg-button-link"
            variant="primary"
            :show-spinner="false"
            disabled
          >
            Coming soon
          </CommonButton>
          <div v-if="videoIsValidate" class="flex gap-2">
            <CommonButton
              data-testid="esg-button-link"
              variant="primary"
              :link="link"
            >
              <div
                class="m-0 flex w-full flex-row items-center gap-x-1 p-0 lg:gap-x-1"
              >
                <IconPlay class="w-full min-w-[20px] max-w-[20px]" />
                <span
                  v-if="showLabel"
                  class="hidden text-sm font-semibold xl:block"
                >
                  Watch Now
                </span>
              </div>
            </CommonButton>
            <ButtonDownload
              v-if="videoIsValidate"
              ref="esg-button-download"
              class="!w-fit"
              data-testid="esg-button-download"
              :data-filename="videoTitle"
              :download-file="vimeoData"
              variant="secondary"
              :show-label="false"
            />
          </div>
          <IconCheckCircle
            v-if="reportHasAccess"
            class="stroke-p-900 h-8 w-8"
          />
        </div>
        <div v-else class="flex items-end justify-between">
          <ButtonContactUs
            text="Find out more"
            variant="clean"
            :services="initialFields"
            class="!text-sm !text-black"
          />
          <IconLockOutline class="stroke-p-900 h-8 w-8" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '~/utils/eventBus'
import CommonButton from '~/components/common/Button.vue'
import ButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import CardLabel from '~/components/portals/CardLabel.vue'
import IconPlay from '~/assets/icons/play-circle.svg'
import IconCheckCircle from '~/assets/icons/check-subscribe.svg'
import IconLockOutline from '~/assets/icons/LockOutline.svg'

export default {
  components: {
    ButtonDownload,
    CommonButton,
    IconPlay,
    CardLabel,
    IconCheckCircle,
    IconLockOutline,
    ButtonContactUs,
  },
  props: {
    report: {
      type: Object,
      default: () => null,
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
    product: {
      type: String,
      default: '',
    },
  },
  computed: {
    showLabel() {
      return !this.report?.hide_label
    },
    videoTitle() {
      return this.report?.title
    },
    reportId() {
      return this.report?.id
    },
    vimeoData() {
      return {
        vimeoId: this.report?.file_name,
        vimeoAuthToken: this.$config.public.vimeoAuthToken,
        isVideoVimeo: true,
      }
    },
    videoImage() {
      return this.report?.images?.desktop
    },
    videoImageMobile() {
      return this.report?.images?.mobile
    },
    videoIsValidate() {
      return !!this.report?.file_name
    },
    reportHasAccess() {
      return this.report?.has_access || false
    },
    link() {
      const queryParams = window.location.search || ''
      return `/market/${this.product}/data-reports/video/${this.reportId}${queryParams}`
    },
  },
  created() {
    /**
     * This method was added to be able to interact with global events because
     * it was necessary to listen for an event from a sibling component and the
     * traditional way to listen for events is between parent and child components.
     *
     * What this does is add a listener of the clickButtonCommon event
     * and when it detects that this event has been issued, it verifies
     * that its payload is equal to "esg-button-download-all" and
     * executes the function that downloads all the reports from
     * the current esg page.
     */
    EventBus.$on('clickButtonCommon', (_payload) => {
      if (_payload === 'button-download-all') this.handlerDownload(_payload)
    })
  },
  beforeUnmount() {
    /**
     * What this does are remove the listener from the clickButtonCommon event
     * before the component is destroyed.
     */
    EventBus.$off('clickButtonCommon')
  },
  methods: {
    handlerDownload(_payload) {
      if (this.$refs['esg-button-download'])
        this.$refs['esg-button-download'].$el.click()
    },
  },
}
</script>

<style>
@media (width <= 359px) {
  .container-button {
    flex-direction: column;
    row-gap: 4px;
  }
}
</style>
