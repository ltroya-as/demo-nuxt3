<template>
  <div>
    <div
      v-for="(row, i) in data"
      :key="i"
      class="border-grey-400 odd:border-blue-light odd:bg-blue-light border-b bg-white"
    >
      <Session
        v-if="row.session_number"
        :number="row.session_number"
        :title="row.title"
        :chair="row.chair"
        :description="row.description"
      />
      <Networking
        v-else-if="row.is_networking"
        :title="row.title"
        :time="row.time"
        :description="row.description"
        :sponsor-image-url="row.sponsor_logo ? row.sponsor_logo.url : null"
      />
      <Item
        v-else
        :title="row.title"
        :time="row.time"
        :speakers="Array.isArray(row.speakers) ? row.speakers : []"
        :description="row.description"
      />
    </div>
  </div>
</template>

<script>
import Session from '~/components/events/world-tour-2023/Agenda/Session'
import Networking from '~/components/events/world-tour-2023/Agenda/Networking'
import Item from '~/components/events/world-tour-2023/Agenda/Item'
export default {
  components: {
    Session,
    Networking,
    Item,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>
