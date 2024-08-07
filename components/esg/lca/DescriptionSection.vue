<template>
  <section
    class="max-w-content-container mx-auto flex w-full flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-4"
  >
    <div class="flex flex-col gap-6 xl:max-h-[540px]">
      <h2 class="border-p-500 border-l-4 pl-2 text-lg font-bold lg:text-xl">
        Bespoke life cycle assessments
      </h2>
      <div
        class="flex flex-col gap-4 text-sm lg:text-base xl:max-w-xl"
        data-testid="lca-description"
      >
        <div>
          Benchmark conducts <strong>bespoke LCAs</strong> tailored to companies
          and operations across the lithium ion battery supply chain, from
          explorative mining companies to battery recyclers. Our bespoke,
          <strong>ISO-compliant</strong> LCAs can be targeted at various stages
          of a project, <strong>as early as preliminary development</strong>.
        </div>
        <div>
          A bespoke LCA can help with:
          <ul
            class="marker:text-p-500 ml-6 mt-6 list-disc"
            data-testid="lca-description-list"
          >
            <li>
              <strong>communicating</strong> your environmental impact to
              investors and customers
            </li>
            <li>environmental <strong>hotspot analysis</strong></li>
            <li>product research & development</li>
            <li>procurement management</li>
            <li>developing <strong>sustainability strategy</strong></li>
          </ul>
        </div>
        <span>
          These can be achieved by comparing your environmental performance
          against <strong>Benchmark's Global LCAs</strong> as a real-time
          industry's average, evaluating environmental hotspots within a process
          and across the supply chain, and many more.
        </span>
      </div>
      <CommonButton
        class="px-11 py-3 text-sm !font-semibold md:!w-fit"
        variant="primary"
        data-testid="contact-modal-button"
        @click="openContactModal()"
      >
        Contact Us
      </CommonButton>
    </div>
    <div
      class="hidden gap-6 lg:grid lg:grid-cols-2"
      data-testid="lca-description-image"
    >
      <div class="flex flex-col gap-10">
        <img
          class="h-full min-h-[215px] rounded-2xl object-cover"
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_254_jgl7ih.png?_i=AA"
          alt="wlca-1"
        />
        <img
          class="mb-20 h-full min-h-[215px] rounded-2xl object-cover"
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_250_lqcyza.png?_i=AA"
          alt="wlca-4"
        />
      </div>
      <div class="mt-20 flex flex-col gap-14">
        <img
          class="h-full min-h-[215px] rounded-2xl object-cover"
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_254_1_v9c2d9.png?_i=AA"
          alt="wlca-2"
        />
        <img
          class="h-full min-h-[215px] rounded-2xl object-cover"
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_255_o6t8mp.png?_i=AA"
          alt="wlca-3"
        />
      </div>
    </div>
    <div class="mx-auto grid w-fit grid-cols-2 gap-x-2 lg:hidden">
      <img
        class="h-[190px] rounded-2xl object-cover sm:h-full sm:min-h-[190px]"
        src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_254_jgl7ih.png?_i=AA"
        alt="wlca-1"
      />
      <img
        class="h-[190px] rounded-2xl object-cover sm:h-full sm:min-h-[190px]"
        src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1681832767/assets/lca/image_254_1_v9c2d9.png?_i=AA"
        alt="wlca-2"
      />
    </div>
  </section>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import { getServices } from '~/constants/services'
import { ESG } from '~/constants/services/constants'
import AccessibleModalMixin from '~/mixins/AccessibleModalMixin'
export default {
  components: {
    CommonButton,
  },
  mixins: [AccessibleModalMixin],
  methods: {
    openContactModal(_service = null) {
      this.handleClose()
      this.$store.commit(
        'modal/setInitialFields',
        this.getOptionsServices(_service),
      )
      this.$modal.open('contact')
    },
    getOptionsServices(_service) {
      const services = _service ? [ESG.slug, _service] : [ESG.slug]
      return getServices(services)
    },
  },
}
</script>
