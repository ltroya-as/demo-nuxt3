<template>
  <div>
    <CommonSimpleHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1678209404/assets/iosco-report-and-contact-us_gprzug.jpg"
    >
      <div class="flex max-w-2xl flex-col gap-3 text-white sm:gap-4">
        <p class="text-xl font-bold sm:text-4xl">Contact us</p>
      </div>
    </CommonSimpleHero>

    <div
      class="max-w-content-container px-small lg:px-big mx-auto mb-10 flex flex-col 2xl:px-0"
    >
      <ContactTabs
        class="max-w-contact-form-container mx-auto mb-4 mt-12 w-full"
        :current-tab="currentTab"
        @change-current-tab="changeCurrentTab"
      />

      <ContactFormContainer
        v-show="currentTab === 1"
        :show-container="false"
        data-testid="contact-page-contact-form"
        container-id="contact-page-contact-form"
        show-return-to-home-button
        :show-labels="false"
      />

      <div
        v-show="currentTab === 2"
        class="max-w-contact-form-container mx-auto w-full"
      >
        <div class="max-w-contact-form-container mr-auto w-full md:w-fit">
          <ContactGeneralContactForm :show-labels="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactFormContainer from '~/components/contact/FormContainer.vue'
import ContactGeneralContactForm from '~/components/contact/GeneralContactForm.vue'
import CommonSimpleHero from '~/components/common/SimpleHero.vue'
import ContactTabs from '~/components/contact/Tabs.vue'

export default {
  components: {
    ContactFormContainer,
    ContactGeneralContactForm,
    ContactTabs,
    CommonSimpleHero,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Contact',
      description:
        'Benchmark provides individual consultancy projects for many types of companies across the lithium ion battery supply chain, electric vehicle manufacturers, and investors. We help major actors from the mine to electric vehicle address complex commercial decisions including acquisitions, divestitures, and expansions of operations.',
    })
    useHead(seo)
  },
  data() {
    return {
      currentTab: 1,
    }
  },
  methods: {
    changeCurrentTab(tab) {
      this.currentTab = tab
    },
  },
}
</script>
