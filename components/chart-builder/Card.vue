<template>
  <div class="shadow-dp-02 flex gap-4 rounded-xl bg-white p-6">
    <div class="border-p-500 h-fit rounded-lg border p-2">
      <component :is="icon" class="h-7 w-7"></component>
    </div>
    <div class="flex flex-col">
      <h4 class="mb-3 text-lg font-bold"> {{ title }}</h4>
      <div class="flex flex-grow flex-col justify-between">
        <p class="mb-5 text-base font-normal">
          {{ description }}
        </p>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import DatabaseIcon from '~/assets/icons/database.svg'
import DotChartIcon from '~/assets/icons/dot-chart-builder.svg'
import DesktopIcon from '~/assets/icons/desktop-computer.svg'
import CopyIcon from '~/assets/icons/copy-icon.svg'

export default {
  components: {
    DatabaseIcon,
    DotChartIcon,
    DesktopIcon,
    CopyIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>
