<template>
  <div>
    <CommonSimpleHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1678209404/assets/iosco-report-and-contact-us_gprzug.jpg"
    >
      <div class="flex max-w-2xl flex-col gap-3 text-white sm:gap-4">
        <p class="text-xl font-bold text-white sm:text-4xl">IOSCO Report</p>

        <p class="mt-3 text-base font-normal sm:mt-6 sm:text-xl sm:font-medium">
          Please complete your details to receive a copy of Benchmark’s IOSCO
          independent assurance audit report
        </p>
      </div>
    </CommonSimpleHero>

    <div class="flex justify-center py-16">
      <ContactFormContainer
        data-testid="iosco-report-contact-form"
        container-id="iosco-report-contact-form"
        :form-id="$config.public.fmIOSCOReportsFormId"
        :show-return-to-home-button="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSeoInfo } = useSeo()
const seo = getSeoInfo({
  title: 'IOSCO Report',
  description:
    'Please complete your details to receive a copy of Benchmark’s IOSCO independent assurance audit report',
})
useHead(seo)
</script>
