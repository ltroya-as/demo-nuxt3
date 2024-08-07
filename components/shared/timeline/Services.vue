<template>
  <div
    class="relative mx-auto flex w-full max-w-full flex-col items-center justify-between gap-x-0 gap-y-4 sm:max-w-[60%] lg:max-w-full lg:flex-row lg:items-start lg:gap-x-8 lg:gap-y-0 xl:gap-x-16"
    data-testid="timeline-services"
  >
    <ServicesItem
      v-for="(service, index) in services"
      :key="index"
      :icon="service.icon"
      :icon-classes="service.iconClasses"
      :circle-small-and-text-classes="service.circleSmallAndTextClasses"
      :subtitle="service.subtitle"
      :description="service.description"
      :index-item="index + 1"
    />
  </div>
</template>
<script>
import ServicesItem from '~/components/shared/timeline/ServicesItem.vue'

export default {
  components: { ServicesItem },
  data() {
    return {
      services: [
        {
          icon: 'consultancy/icon-chart',
          circleSmallAndTextClasses: 'top-[-3px]',
          subtitle: 'Primary data',
          description:
            'Iosco - compliant audited data for setting reference prices on key battery materials',
        },
        {
          icon: 'consultancy/icon-connections',
          iconClasses:
            'xl:!min-w-[60px] xl:!max-w-[60px] xl:!min-h-[60px] xl:!max-h-[60px] !min-w-[26px] !max-w-[26px] !min-h-[26px] !max-h-[26px]',
          circleSmallAndTextClasses: 'top-[-7px]',
          subtitle: 'Deep supply chain relationships',
          description:
            'Multiple supply chain leaders are Benchmark clients, and could be asked to contribute relevant details to aid this study',
        },
        {
          icon: 'consultancy/icon-idea',
          iconClasses:
            'xl:!min-w-[76px] xl:!max-w-[76px] xl:!min-h-[76px] xl:!max-h-[76px] !min-w-[32px] !max-w-[32px] !min-h-[32px] !max-h-[32px]',
          circleSmallAndTextClasses: 'top-[-10px]',
          subtitle: 'Co-managed problem solving',
          description:
            'Combining our deep supply chain expertise with on-the-ground relevant knowledge from local governments to produce appropriate plans for future strategy',
        },
        {
          icon: 'consultancy/icon-people',
          iconClasses:
            'xl:!min-w-[54px] xl:!max-w-[54px] xl:!min-h-[66px] xl:!max-h-[66px] !min-w-[22px] !max-w-[22px] !min-h-[28px] !max-h-[28px]',
          circleSmallAndTextClasses: 'top-[-9px]',
          subtitle: 'Experienced team',
          description:
            "Team members who have had multiple commercial and technical roles' int he battery supply chain industry, and has interacted with senior government officials globally",
        },
      ],
    }
  },
}
</script>
