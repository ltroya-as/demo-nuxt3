<template>
  <div data-testid="report-card-footer" class="z-10">
    <div v-if="reportHasAccess" class="flex items-end justify-between">
      <div class="flex items-center gap-3">
        <ButtonDownload
          ref="forecasts-button-download"
          data-testid="report-button-download"
          :data-filename="reportName"
          class="mx-0 !w-full !max-w-[100px] py-2.5 !text-sm md:!max-w-[150px]"
          :download-file="reportFile"
          :show-icon="false"
          variant="primary"
        />
        <div
          v-if="isDownloadLinkCopyable && showCopyLink"
          class="cursor-pointer"
          :title="reportMessageTooltip"
        >
          <IconClipboardLink
            v-if="!reportCopied"
            class="h-5 w-5"
            @click="copyRouteReport(data, activeSubMenu)"
          />
          <IconCheck v-else class="h-6 w-6" />
        </div>
      </div>

      <IconCheckCircle class="stroke-p-900 h-8 w-8" />
    </div>
    <div v-else class="flex items-end justify-between">
      <ButtonContactUs
        text="Find out more"
        variant="clean"
        :services="initialFields"
        class="bg-white !text-sm !text-black"
      />
      <IconLockOutline class="stroke-p-900 h-8 w-8" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '~/utils/eventBus'
import ButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import IconCheckCircle from '~/assets/icons/check-subscribe.svg'
import IconLockOutline from '~/assets/icons/LockOutline.svg'
import IconClipboardLink from '~/assets/icons/IconClipboardLink.svg'
import IconCheck from '~/assets/icons/IconCheck.svg'

import CopyToClipboard from '~/mixins/CopyToClipboard'

export default {
  components: {
    ButtonDownload,
    ButtonContactUs,
    IconCheckCircle,
    IconLockOutline,
    IconClipboardLink,
    IconCheck,
  },
  mixins: [CopyToClipboard],
  props: {
    reportHasAccess: {
      type: Boolean,
      default: false,
    },
    reportName: {
      type: String,
      default: '',
    },
    reportFile: {
      type: Object,
      default: () => {},
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
    reportId: {
      type: Number,
      default: 0,
    },
    showCopyLink: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: null,
    },
  },
  computed: {
    data() {
      return {
        ID: this.reportId,
      }
    },
    activeSubMenu() {
      return `${window.location.origin}${this.$store.getters['menu/getActiveSubMenuPath']}`
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
     * that its payload is equal to "forecasts-button-download-all" and
     * executes the function that downloads all the reports from
     * the current forecasts page.
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
      if (this.$refs['forecasts-button-download'])
        this.$refs['forecasts-button-download'].$el.click()
    },
  },
}
</script>
