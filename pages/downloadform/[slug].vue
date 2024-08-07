<template>
  <div class="min-h-[calc(100vh_-_4.5rem)] lg:h-full">
    <SimpleHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1678209404/assets/iosco-report-and-contact-us_gprzug.jpg"
    >
      <div class="flex max-w-2xl flex-col gap-3 text-white sm:gap-4">
        <p class="text-2xl font-bold sm:text-4xl">{{ title }}</p>
      </div>
    </SimpleHero>

    <div
      class="max-w-newsletter-form-container mx-auto w-full px-4 md:w-[70%] lg:px-14 xl:w-[50%] 2xl:px-0"
    >
      <div class="my-6 flex flex-col justify-center gap-4 md:my-24">
        <h1 v-if="emailSubject" class="text-xl font-bold md:text-3xl">
          {{ emailSubject }}
        </h1>
        <p class="text-lg font-semibold md:text-2xl">
          {{ instructions }}
        </p>
        <FormBuilder
          data-testid="download-forms-contact-form"
          :form-id="$config.public.fmDownloadFormId"
          :show-return-to-home-button="false"
          :show-return-to-form-button="false"
          :show-services="false"
          :show-container="false"
          :reverse-button-row="true"
          container-button-send-class="flex w-full md:justify-end"
          button-send-class="md:w-[150px] w-full"
          @set-success="(value) => (success = value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import downloadFormDetails from '~/queries/download-forms-details.gql'
import FormBuilder from '~/components/common/FormBuilder.vue'
import SimpleHero from '~/components/common/SimpleHero.vue'

export default {
  components: { FormBuilder, SimpleHero },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Download Form' })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      downloadForm: {},
      success: false,
    }
  },
  computed: {
    emailSubject() {
      return this.downloadForm?.fields?.emailSubject || null
    },
    title() {
      return this.downloadForm?.title || 'Loading form'
    },
    instructions() {
      return this.downloadForm?.fields?.downloadInstructions || null
    },
  },
  methods: {
    async fetch() {
      const slug = this.$route.params.slug
      this.loading = true
      try {
        const response = await this.$bmAuth.getPublicGraphqlClient().query({
          query: downloadFormDetails,
          variables: { slug },
        })

        this.downloadForm = response.data.downloadFormBy
        if (this.downloadForm == null) {
          throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
      } catch (_error) {
        throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
      }

      this.loading = false
    },
  },
}
</script>
