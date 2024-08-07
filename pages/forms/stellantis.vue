<template>
  <div
    class="mb-big max-w-content-container px-small lg:mt-big lg:px-big mx-auto mt-8 w-full flex-grow 2xl:px-0"
  >
    <div class="mb-10 font-bold lg:text-center">
      To subscribe to Benchmark services please fill out the form below and one
      of our team will get in touch.
    </div>

    <ContactFormContainer
      :form-id="$config.public.fmStellantisFormId"
      :show-return-to-form-button="false"
      :show-container="false"
      message="Thanks for submitting the form. We will contact you very soon."
    />
  </div>
</template>

<script setup lang="ts">
const { getSeoInfo } = useSeo()
const seo = getSeoInfo({ title: 'Stellantis - Form' })
useHead(seo)
</script>
