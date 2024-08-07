<template>
  <div>
    <div v-if="loading" class="h-full min-h-[70dvh] w-full">
      <TheLoader class="min-h-[70dvh]" />
    </div>
    <div v-else>
      <ServicesHero
        v-if="!isAuthenticated"
        :initial-fields="initialFields"
        :title="titleHero"
        :images="bannerImages"
        :file="brochureFileInfo"
        download-text="Brochure"
      />
      <div
        class="max-w-content-container px-small mx-auto flex w-full flex-col justify-center gap-y-7 pb-20 pt-8 md:items-start xl:pb-36 xl:pl-16 xl:pr-0 xl:pt-10"
      >
        <Breadcrumb
          v-if="isAuthenticated"
          :menu="$store.state.breadcrumb.items"
        />
        <PriceAssessmentsSectionTitle
          :title="titlePage"
          :icon="icon"
          authorized
        />
        <section class="lg:shadow-pm w-full lg:rounded-xl lg:bg-white lg:p-6">
          <TheTabs
            :key="jwtToken"
            :tabs="tabs"
            @active-tab-changed="setActiveTab"
          />
          <slot></slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ServicesHero from '~/components/shared/services/Hero.vue'
import TheTabs from '~/components/common/TheTabs.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'

export default {
  components: {
    ServicesHero,
    TheTabs,
    Breadcrumb,
  },
  props: {
    initialFields: {
      type: Array,
      required: true,
    },
    titleHero: {
      type: String,
      required: true,
    },
    bannerImages: {
      type: Object,
      required: true,
    },
    brochureFileInfo: {
      type: Object,
      default: () => null,
    },
    titlePage: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
  },
  mounted() {
    this.setLoading()
  },
  methods: {
    setActiveTab(tab) {
      this.$emit('activeTabChanged', tab)
    },
    setLoading() {
      setTimeout(() => {
        this.loading = false
      }, 50)
    },
  },
}
</script>
