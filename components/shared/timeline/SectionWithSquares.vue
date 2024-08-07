<template>
  <div class="relative mx-auto flex w-[323px] md:w-full md:flex-row">
    <div
      class="bg-p-700 md:w-small mt-10 hidden h-[27px] md:flex lg:w-14 2xl:flex-grow"
    />
    <div
      class="xl:max-w-content-container mx-auto mb-9 mt-3 flex flex-col md:mx-0 md:flex-grow md:flex-row xl:mx-auto 2xl:min-w-[1424px]"
      data-testid="timeline-with-squares"
    >
      <SharedTimelineSquareItem
        v-for="(stage, id) in stages"
        :key="id"
        :icon="stage.icon"
        :background-color="stage.backgroundColor"
        :container-arrow-classes="stage.containerArrowClasses"
        rounded="!rounded-[32px]"
      >
        <div
          class="mr-9 md:min-h-min"
          :class="[stages.length === id + 1 ? 'min-h-min' : 'min-h-[152px]']"
        >
          <span class="leading-low text-base">
            {{ stage.description }}
          </span>
        </div>
      </SharedTimelineSquareItem>
    </div>
    <div
      class="bg-p-50 md:w-small mt-10 hidden h-[27px] md:flex lg:w-14 2xl:flex-grow"
    ></div>
  </div>
</template>
<script>
import { consultancyOurProcess } from '~/constants/timelines'

export default {
  data() {
    return {
      stages: consultancyOurProcess,
    }
  },
}
</script>
