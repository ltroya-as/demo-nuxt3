<template>
  <div
    class="relative grid grid-cols-1 items-center gap-4 justify-self-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    :class="[$attrs.class]"
    data-testid="service-container-card"
  >
    <div
      v-for="service in services"
      :key="service.id"
      data-testid="service-card-item"
      class="[&_.icon-container]:odd:bg-p-400 [&_.icon-container]:even:bg-p-50"
      :class="!colorizeCards ? '[&_.icon-container]:!bg-s-200' : ''"
    >
      <ServicesCard
        :data-testid="`service-card-${service.slug}`"
        :service="service"
        :class="cardClasses"
      />
    </div>
  </div>
</template>

<script>
import ServicesCard from '~/components/shared/services/Card.vue'
export default {
  components: { ServicesCard },
  props: {
    services: {
      type: Array,
      required: true,
    },
    cardClasses: {
      type: String,
      default: '',
    },
    colorizeCards: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
