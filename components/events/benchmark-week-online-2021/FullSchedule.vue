<template>
  <div class="flex">
    <div>
      <DaysHeader :talks="talks" class="mb-8" :logos="logos" />
      <div class="flex">
        <div v-for="(talk, i) in talks" :key="i" :class="`w-1/${talks.length}`">
          <DaySchedule :talks="talk" :day-id="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysHeader from './DaysHeader'
import DaySchedule from './DaySchedule'
export default {
  name: 'FullSchedule',
  components: {
    DaysHeader,
    DaySchedule,
  },
  props: {
    talks: {
      type: Array,
      required: true,
    },
    logos: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
