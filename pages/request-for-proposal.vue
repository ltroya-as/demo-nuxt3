<template>
  <div>
    <CommonSimpleHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1678209404/assets/request-for-proposal_mq7uco.jpg"
    >
      <div class="flex max-w-2xl flex-col gap-3 text-white sm:gap-4">
        <p class="text-xl font-bold sm:text-4xl">Request for Proposal</p>

        <p class="text-lg font-semibold sm:text-2xl sm:font-bold">
          How can we help your take your business further?
        </p>

        <p class="text-base font-normal sm:text-xl sm:font-medium">
          We appreciate your interest in Benchmark’s Advisory Services. Please
          complete the form below and our team will be in touch. Documents can
          also be uploaded.
        </p>

        <CommonButton
          variant="primary"
          class="!w-fit px-6 py-3 text-sm font-semibold"
        >
          Contact Us
        </CommonButton>
      </div>
    </CommonSimpleHero>
    <RequestForProposalFormContainer class="my-9" data-testid="rfp-form" />
  </div>
</template>

<script setup lang="ts">
const { getSeoInfo } = useSeo()
const seo = getSeoInfo({
  title: 'Request for proposal',
  description:
    'We appreciate your interest in Benchmark’s Advisory Services. Please complete the form below and our team will be in touch. Documents can also be uploaded.',
})
useHead(seo)
</script>
