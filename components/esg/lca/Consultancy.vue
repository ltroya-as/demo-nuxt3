<template>
  <section
    class="bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1677077661/assets/lca/Mask_group_rwugzy.png')] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="max-w-content-container px-small lg:px-big mx-auto py-10 text-white lg:pb-16 lg:pt-14 2xl:px-0"
    >
      <h2 class="text-base font-semibold lg:text-3xl lg:font-bold">
        LCA consultancy
      </h2>
      <div class="mt-6 flex flex-col gap-4 text-sm lg:text-lg">
        <p>
          Benchmark provides LCA services in the form of bespoke LCAs tailored
          to specific companies and operations across the lithium-ion battery
          supply chain, from explorative mining companies to battery recyclers.
        </p>

        <p>
          With a bespoke LCA you can compare your product or process’
          environmental impacts against the relevant Benchmark Global LCA,
          measuring your performance against the real-time industry average.
        </p>

        <p>
          Our bespoke LCAs can be targeted at different stages of a project, as
          early as preliminary development, Benchmark will then tailor the LCA
          to your specific goal and scope.
        </p>

        <p>
          Please contact us to find out more or to speak to one of our team:
          <a
            class="underline"
            href="mailto:lca@benchmarkminerals.com?subject=Benchmark Minerals: LCA"
          >
            LCA@benchmarkminerals.com
          </a>
        </p>

        <CommonButton
          class="mt-2 lg:!w-fit"
          variant="primary"
          @click="$emit('openContactModal', 'consultancy')"
        >
          Contact Us
        </CommonButton>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>
