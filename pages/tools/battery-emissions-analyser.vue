<template>
  <div class="mb-11 flex w-full flex-col">
    <!-- Hero -->
    <ServicesHero
      :initial-fields="initialFields"
      :title="title"
      :description="description"
      :images="images"
      :file="brochureFileInfo"
      download-text="Brochure"
    />
    <!-- First Description section -->

    <div class="mx-[18px] my-10 rounded-2xl pt-5 md:mb-10">
      <div
        class="flex grid-cols-2 flex-col gap-x-16 lg:pl-12 xl:grid"
        data-testid="bea-first-section"
      >
        <div>
          <SharedCommonTitle
            class="mb-4 text-xl lg:text-2xl"
            :title="firstSection.title"
          />

          <div class="xl:mb-4" v-html="firstSection.descriptions[0]"></div>

          <div class="flex justify-center xl:hidden">
            <img
              class="my-8 h-auto w-full max-w-lg"
              :src="firstSection.image.url"
              alt="first section page"
            />
          </div>

          <p v-html="firstSection.descriptions[1]"></p>

          <ButtonContactUs
            text="More About BEA"
            :services="initialFields"
            class="mt-7 w-full py-3 text-sm font-bold"
          />
        </div>

        <div class="hidden flex-col justify-center xl:flex 2xl:justify-end">
          <img
            class="h-auto w-full max-w-lg"
            :src="firstSection.image.url"
            alt="chart BEA"
          />
        </div>
      </div>
    </div>

    <!-- Second Description section -->
    <div data-testid="bea-second-section">
      <BannerWithImages
        :images="secondSection.desktopImages"
        class="bg-s-100 hidden !flex-col !gap-y-4 rounded-xl !pr-5 md:flex md:!gap-x-4 md:!gap-y-4 lg:!py-10 xl:!flex-row 2xl:pl-12"
        image-classes="lg:!min-h-[343px] xl:!max-w-[328px] xl:!w-[328px]"
        container-image-classes="xl:!w-full md:!justify-center xl:!gap-x-4"
      >
        <div
          class="flex w-full flex-col gap-y-3 pb-4 xl:pb-0 2xl:w-[572px]"
          data-testid="banner-descriptions"
        >
          <SharedCommonTitle
            class="mb-4 text-lg lg:text-xl"
            :title="secondSection.title"
          />
          <div>
            {{ secondSection.description }}
            <ul
              class="marker:text-p-500 my-6 ml-6 list-disc"
              data-testid="lca-description-list"
            >
              <li
                v-for="(item, i) in secondSection.bullets"
                :key="i"
                v-html="item"
              >
              </li>
            </ul>

            <p>
              {{ secondSection.footerText }}
            </p>

            <div class="mt-4">
              <ButtonContactUs
                variant="secondary"
                text="Contact us"
                :services="initialFields"
                class="mb-5 w-full leading-5 md:w-fit md:text-lg md:font-bold md:leading-7"
              />
            </div>
          </div>
        </div>
      </BannerWithImages>

      <div class="bg-s-100 mx-[18px] rounded-2xl pt-5 md:hidden">
        <div class="mb-7 px-4">
          <h2 class="mb-5 text-xl font-bold">
            {{ secondSection.title }}
          </h2>
          <p class="mb-4">
            {{ secondSection.description }}
          </p>
          <ul class="marker:text-p-500 my-6 ml-6 list-disc">
            <li
              v-for="(item, i) in secondSection.bullets"
              :key="i"
              v-html="item"
            >
            </li>
          </ul>
        </div>

        <img
          :src="secondSection.mobileImage"
          alt="section"
          class="mb-7 h-80 w-full object-cover object-center"
        />

        <p class="px-4">
          {{ secondSection.footerText }}
        </p>

        <div class="mt-8">
          <ButtonContactUs
            variant="secondary"
            text="Contact us"
            :services="initialFields"
            class="w-full rounded-b-2xl py-3 text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import batteryEmissionsAnalyser from '~/constants/esg/battery-emissions-analyser'
import { ESG_BATTERY_EMISSIONS_ANALYSER } from '~/constants/services/esg'
import { BATTERY_EMISSIONS_ANALYSER, ESG } from '~/constants/services/constants'
import BannerWithImages from '~/components/shared/common/BannerWithImages.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import ServicesHero from '~/components/shared/services/Hero.vue'

definePageMeta({ layout: 'events' })

export default {
  components: {
    ButtonContactUs,
    BannerWithImages,
    ServicesHero,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      initialFields: [ESG_BATTERY_EMISSIONS_ANALYSER.checkbox, ESG.slug],
      authTitle: BATTERY_EMISSIONS_ANALYSER.name,
      title: `${BATTERY_EMISSIONS_ANALYSER.name} (BEA)`,
      description: BATTERY_EMISSIONS_ANALYSER.description,
      subscription: ESG_BATTERY_EMISSIONS_ANALYSER.subscription,
      category: BATTERY_EMISSIONS_ANALYSER.category,
      authorizedRoute: ESG_BATTERY_EMISSIONS_ANALYSER.routes.authorized,
      images: batteryEmissionsAnalyser.images,
      brochureFileInfo: {
        ID: this.$config[batteryEmissionsAnalyser.brochureFile.EnvKey],
        ...batteryEmissionsAnalyser.brochureFile,
      },
      firstSection: batteryEmissionsAnalyser.firstSection,
      services: batteryEmissionsAnalyser.services,
      secondSection: batteryEmissionsAnalyser.secondSection,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${ESG.name}: ${BATTERY_EMISSIONS_ANALYSER.name}`,
      description: ESG.seo.description,
    })
  },
  mounted() {
    this.$store.commit('breadcrumb/clearBreadcrumb')
    this.$store.commit('breadcrumb/addItemBreadcrumb', 'Tools')
    this.$store.commit(
      'breadcrumb/addItemBreadcrumb',
      'Battery Emissions Analyser',
    )
  },
}
</script>
