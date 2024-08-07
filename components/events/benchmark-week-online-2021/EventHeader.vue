<template>
  <div class="event-header">
    <div class="max-w-content-container mx-auto">
      <div
        class="flex flex-col items-center px-4 pb-4 pt-6 uppercase text-white lg:px-10 lg:pb-10 lg:pt-32 xl:pt-40"
      >
        <img
          class="event-logo"
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185120/assets/events/benchmark-week-online-2021/logo-benchmark_week_online_2021_fb5chi.svg?_i=AA"
          alt="event logo"
        />
        <div
          class="mt-4 text-center font-bold leading-tight lg:mt-16 lg:text-2xl"
        >
          <p class="mb-4">
            Where the Lithium ion Battery to Electric Vehicle Supply Chain meet
          </p>
          <p class="mb-4">Monday 6th December - Wednesday 8th December 2021</p>
        </div>
        <div class="mt-8 grid w-full grid-cols-3 gap-4">
          <div class="flex justify-center lg:w-auto">
            <img
              class="topic-logo"
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185120/assets/events/benchmark-week-online-2021/logo-graphite_uddykb.svg?_i=AA"
              alt="topic logo"
            />
          </div>
          <div class="flex justify-center lg:w-auto">
            <img
              class="topic-logo"
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185121/assets/events/benchmark-week-online-2021/logo-cathodes_ilxdjz.svg?_i=AA"
              alt="topic logo"
            />
          </div>
          <div class="flex justify-center lg:w-auto">
            <img
              class="topic-logo"
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185120/assets/events/benchmark-week-online-2021/logo-battery_sustainability_dglpcd.svg?_i=AA"
              alt="topic logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventHeader',
}
</script>

<style scoped>
.event-header {
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185122/assets/events/benchmark-week-online-2021/bg_kjr7kf.jpg?_i=AA');
  background-position: bottom;
  background-size: cover;
}

.event-logo {
  max-width: 100%;
  width: 900px;
}

.topic-logo {
  @apply mb-6;
}

@media (min-width: 1024px) {
  .topic-logo {
    @apply mb-0;
  }
}
</style>
