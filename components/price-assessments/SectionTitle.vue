<template>
  <div>
    <div
      class="flex flex-col justify-between gap-4 lg:flex-row lg:gap-0"
      :class="[methodologyFileInfo ? 'items-center' : 'items-start']"
    >
      <div
        class="flex w-fit grow gap-4 md:items-center"
        data-testid="icon-title"
      >
        <Icon v-if="icon" class="h-[50px] w-[50px]" :name="icon" />

        <h1
          class="text-s-900 text-3xl font-bold first-letter:capitalize md:text-4xl"
          :class="titleClasses"
        >
          {{ title }}
        </h1>
      </div>
      <SummaryDownloadButton
        :methodology-file-info="methodologyFileInfo"
        class="w-[200px]"
      />
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import SummaryDownloadButton from '~/components/price-assessments/SummaryDownloadButton.vue'

export default {
  components: {
    Icon,
    SummaryDownloadButton,
  },
  props: {
    authorized: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    methodologyFileInfo: {
      type: Object,
      default: () => null,
    },
    titleClasses: {
      type: String,
      default: '',
    },
  },
}
</script>
