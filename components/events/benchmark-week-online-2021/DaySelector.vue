<template>
  <div>
    <div class="flex justify-around border-b border-t border-white">
      <Day
        v-for="(day, i) in days"
        :key="i"
        :day-of-week="day"
        :active="activeday.label === day"
        @click="$emit('update:activeday', { id: i, label: day })"
      />
    </div>
  </div>
</template>

<script>
import Day from './Day'
export default {
  name: 'DaySelector',
  components: {
    Day,
  },
  props: {
    activeday: {
      type: Object,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
  },
}
</script>
