<template>
  <div class="relative">
    <div v-if="loading" class="mt-11 flex justify-center">
      <TheLoader />
    </div>
    <div v-else class="mt-6 flex flex-col" :class="[$attrs.class]">
      <div class="mb-6 hidden pb-3 text-base font-semibold md:block lg:pb-0">
        Benchmark’s flexible pricing tool provides estimated delivered costs of
        several assessed battery raw materials via shipping container to
        selected geographic locations. Our market assessed prices as well as
        third party information and market research is combined to create
        indicative prices.
      </div>

      <div class="shadow-pm rounded-xl bg-white p-5 pb-0">
        <div v-if="!jwtToken" class="flex justify-end">
          <ButtonContactUs
            text="Find out more"
            :services="initialFields"
            class="mb-2 !w-full flex-shrink-0 text-sm font-semibold leading-5"
          />
        </div>
        <div class="flex flex-col xl:flex-row">
          <div>
            <h3 class="border-b-p-500 border-b-2 px-3 py-2 font-bold">
              Assessment
            </h3>

            <div
              class="group relative my-2 inline-block w-full xl:my-7 xl:w-[400px]"
            >
              <button
                data-testid="select-assessment"
                class="bg-s-900 group-hover:bg-s-500 inline-flex w-full items-center justify-center rounded-xl p-3 font-semibold text-white xl:justify-between"
              >
                <span class="font-montserrat mr-3.5 line-clamp-1 font-semibold">
                  {{ selectAssessment?.label }}
                </span>
                <ChevronDown
                  class="h-6 min-h-[24px] w-6 min-w-[24px] group-hover:rotate-180"
                />
              </button>
              <div class="absolute z-20 hidden w-full pt-1 group-hover:block">
                <div
                  class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-[0.97] p-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                >
                  <div
                    class="flex max-h-[180px] flex-col gap-1 overflow-y-auto"
                  >
                    <div
                      v-for="(assessment, index) in assessmentData"
                      :key="`${index}-${assessment.label}`"
                    >
                      <label
                        :for="`${index}-${assessment.label}`"
                        class="cursor-pointer text-sm font-semibold text-white"
                      >
                        <input
                          :id="`${index}-${assessment.label}`"
                          v-model="selectAssessment"
                          type="radio"
                          :value="assessment"
                          class="text-p-500 mr-2 h-4 w-4 cursor-pointer rounded-full focus:shadow-none focus:ring-0 focus:ring-offset-0"
                        />
                        {{ assessment.label }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow">
            <h4
              class="xl:border-b-p-500 px-3 py-2 font-bold xl:border-b-2 xl:pl-28"
            >
              Terms
            </h4>
            <div class="flex flex-col xl:my-7 xl:flex-row">
              <span class="p-3 xl:pl-28">
                {{ selectAssessment?.term }}
              </span>
              <div
                data-testid="total-assessment"
                class="p-3 text-right xl:flex-grow"
              >
                <div v-if="selectAssessment?.value">
                  {{ assessmentValue }}
                </div>
                <SummaryTableBlockedData v-else />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col xl:flex-row">
          <div>
            <h3 class="xl:border-b-p-500 px-3 py-2 font-bold xl:border-b-2">
              Container Transport
            </h3>
            <div class="flex w-full flex-col">
              <div
                class="group relative my-2 inline-block xl:my-7 xl:w-[400px]"
              >
                <button
                  data-testid="select-container"
                  class="bg-s-900 group-hover:bg-s-500 inline-flex w-full items-center justify-center rounded-xl p-3 font-semibold text-white xl:justify-between"
                >
                  <span
                    class="font-montserrat mr-3.5 line-clamp-1 font-semibold"
                  >
                    {{ selectContainer?.label }}
                  </span>
                  <ChevronDown
                    class="h-6 min-h-[24px] w-6 min-w-[24px] group-hover:rotate-180"
                  />
                </button>
                <div class="absolute z-20 hidden w-full pt-1 group-hover:block">
                  <div
                    class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-[0.97] p-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                  >
                    <div
                      class="flex max-h-[180px] flex-col gap-1 overflow-y-auto"
                    >
                      <div
                        v-for="(
                          container, index
                        ) in selectAssessment?.containersTransport"
                        :key="`${index}-${container.label}`"
                      >
                        <label
                          :for="`${index}-${container.label}`"
                          class="cursor-pointer text-sm font-semibold text-white"
                        >
                          <input
                            :id="`${index}-${container.label}`"
                            v-model="selectContainer"
                            type="radio"
                            :value="container"
                            class="text-p-500 mr-2 h-4 w-4 cursor-pointer rounded-full focus:shadow-none focus:ring-0 focus:ring-offset-0"
                          />
                          {{ container.label }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow">
            <h3 class="border-b-p-500 border-b-2 px-3 py-2 font-bold xl:pl-28">
              Shipping Details
            </h3>
            <div class="flex flex-col xl:my-7 xl:flex-row">
              <span class="p-3 xl:pl-28">Inland & Container Rate</span>
              <div class="p-3 text-right xl:flex-grow">
                <div v-if="selectContainer?.value">
                  {{ containerValue }}
                </div>
                <SummaryTableBlockedData v-else />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="border-b-p-500 border-b-2 px-3 py-2 font-bold"> Total </h3>
          <div class="flex justify-between xl:mt-7 xl:justify-normal">
            <span class="px-3 py-2 font-semibold xl:min-w-[400px]">
              Implied Cost
            </span>
            <div class="px-3 py-2 text-right font-semibold xl:ml-28 xl:pl-0">
              $/tonne
            </div>
            <div
              data-testid="total-container"
              class="px-3 py-2 text-right font-semibold xl:flex-grow"
            >
              <div v-if="selectContainer?.total">
                {{ containerTotal }}
              </div>
              <SummaryTableBlockedData v-else />
            </div>
          </div>
        </div>
        <div class="pb-3 text-end text-xs text-[#a3a5ae] lg:pt-1">
          Price does not include taxes and fees
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

import SummaryTableBlockedData from '~/components/price-assessments/SummaryTableBlockedData.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'

import ChevronDown from '@/assets/icons/ChevronDown.svg'

import { logError } from '~/utils/log-error'
import { numberFormatter } from '@/utils/number'

export default {
  components: {
    SummaryTableBlockedData,
    ButtonContactUs,
    ChevronDown,
  },
  props: {
    mineral: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: true,
      assessmentData: [],
      selectAssessment: null,
      selectContainer: null,
      initialFields: [this.mineral, PRICE_ASSESSMENTS.slug],
    }
  },
  computed: {
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
    assessmentValue() {
      return `$${numberFormatter(this.selectAssessment?.value, 2)}`
    },
    containerValue() {
      return `$${numberFormatter(this.selectContainer?.value, 2)}`
    },
    containerTotal() {
      return `$${numberFormatter(this.selectContainer?.total, 2)}`
    },
  },
  watch: {
    selectAssessment() {
      this.selectContainer = this.selectAssessment.containersTransport.find(
        (container) => container.label === this.selectContainer.label,
      )
    },
  },
  async mounted() {
    await this.getCustomisationTool()
    this.selectAssessment = this.assessmentData[0]
    this.selectContainer = this.selectAssessment.containersTransport[0]
  },
  methods: {
    async getCustomisationTool() {
      try {
        this.loading = true
        const response =
          await this.$restClient.getPricesCustomisationToolByProduct(
            this.mineral,
          )
        this.assessmentData = response
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
