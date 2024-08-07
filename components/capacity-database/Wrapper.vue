<template>
  <div>
    <div v-if="loading" class="h-full min-h-[70dvh] w-full">
      <TheLoader class="min-h-[70dvh]" />
    </div>
    <div v-else>
      <Hero
        v-if="hero && !isAuthorized"
        :initial-fields="hero.checkboxes"
        :title="hero.title"
        :images="hero.images"
        :file="hero.methodology"
        download-text="Methodology"
      />
      <div
        class="max-w-content-container px-small mx-auto flex w-full flex-col justify-center gap-y-7 pb-20 pt-8 md:items-start xl:pb-36 xl:pl-16 xl:pr-0 xl:pt-10"
      >
        <Breadcrumb v-if="isAuthorized" :menu="$store.state.breadcrumb.items" />
        <TitleWithIcon v-if="title" :icon="title.icon" :title="title.text" />
        <section class="w-full">
          <div class="flex flex-row items-baseline justify-between">
            <TheTabs
              v-if="tabs"
              :key="jwtToken"
              :tabs="tabs"
              class="mb-4"
              @active-tab-changed="setActiveTab"
            />
            <slot name="next-tabs" />
          </div>
          <slot name="content" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/** @components */
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import Hero from '~/components/shared/services/Hero.vue'
import TheTabs from '~/components/common/TheTabs.vue'
import TitleWithIcon from '~/components/price-assessments/SectionTitle.vue'

export default {
  components: {
    TitleWithIcon,
    Hero,
    TheTabs,
    Breadcrumb,
  },
  props: {
    hero: {
      type: Object,
      default: () => null,
    },
    title: {
      type: Object,
      default: () => null,
    },
    tabs: {
      type: Array,
      default: () => null,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
  },
  methods: {
    setActiveTab(tab) {
      this.$emit('productChanged', tab)
    },
  },
}
</script>
