<template>
  <section class="mt-16">
    <EventsWorldTour2022SectionTitle :title="title" />
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
