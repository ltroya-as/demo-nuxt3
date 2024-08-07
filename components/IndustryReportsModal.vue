<template>
  <CommonModal
    modal-name="industryReports"
    modal-classes="max-w-[1190px] rounded-xl bg-white shadow-dp-01 max-h-[85vh] lg:max-h-[96vh] relative top-2"
    modal-content-classes="h-full overflow-y-auto grid grid-cols-1 gap-x-10 gap-y-5 lg:relative lg:z-10"
    button-close-classes="absolute -top-1 -right-12 lg:top-4 bg-white rounded-full z-20"
  >
    <template #content>
      <div class="flex">
        <div class="min-w-[720px] px-14 pb-[71px] pt-14">
          <div class="border-p-500 mb-6 border-b-4 text-2xl font-bold">
            Net Zero 2050 and the Battery Arms Race
          </div>
          <div class="flex flex-col gap-4 text-base font-bold">
            <p>
              The forward march of the energy transition is one of the global
              megatrends of our time.
            </p>
            <p>
              The need to transition towards non-fossil fuel energy, in
              particular wind and solar, is nothing new. The world woke up to
              this a decade ago. But the ability to store this energy on a wide
              scale, efficiently and economically, will be a revolutionary
              development.
            </p>
            <p>
              The rise of pure electric vehicles demonstrates the lithium ion
              battery is becoming better, lower cost and more abundant. This
              means it is here to stay. Yet making batteries at scale and
              building the corresponding critical mineral supply chains is a
              huge challenge.
            </p>
            <p>
              The lithium ion battery and the core supply chains that feed into
              it are under an ever intensifying spotlight.
            </p>
            <p>
              This Benchmark report outlines how big the lithium ion ecosystem,
              from mine to end-market, needs to become to reach Net Zero.
            </p>
            <div v-if="!isAuthenticated" class="mt-14 flex justify-center">
              <CommonButton
                variant="secondary"
                class="mb-3 mt-4 text-sm lg:mb-0 lg:mt-0"
                extra-classes=""
                @click="openSingInModal"
              >
                Sign up to read more
              </CommonButton>
            </div>
          </div>
        </div>
        <div
          class="min-w-[450px] rounded-br-xl rounded-tr-xl bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,f_auto/v1703176909/assets/industry%20reports/Mask_group_6_vrtkgs.png')] bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
    </template>
  </CommonModal>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonModal from '~/components/common/Modal.vue'

export default {
  components: { CommonModal },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/authenticated',
    }),
  },
  methods: {
    openSingInModal() {
      this.$modal.close('industryReports')
      this.$modal.open('signIn')
    },
  },
}
</script>
