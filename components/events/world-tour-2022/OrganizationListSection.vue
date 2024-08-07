<template>
  <EventsWorldTour2022Section :title="title">
    <div class="mb-10 mt-12 grid grid-cols-2 gap-6 md:gap-12 lg:grid-cols-4">
      <EventsWorldTour2022OrganizationEntry
        v-for="organization in organizations"
        :key="organization.website"
        :website="organization.website"
        :logo-url="organization.logoUrl"
      />
    </div>
  </EventsWorldTour2022Section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    organizations: {
      type: Array,
      required: true,
    },
  },
}
</script>
