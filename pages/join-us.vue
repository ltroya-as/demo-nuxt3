<template>
  <client-only>
    <div class="bg-grey-50 flex w-full flex-col pb-32 sm:bg-white md:pb-36">
      <!-- Hero -->
      <div class="relative h-[360px] lg:h-[560px]">
        <img
          :src="heroImageUrl"
          class="absolute inset-0 h-full w-full object-cover"
          alt="Join us"
        />

        <div
          class="max-w-content-container mx-auto flex h-full w-full flex-col justify-center px-4 md:px-14"
        >
          <div class="relative z-10 pt-20 text-white lg:w-3/5 lg:pt-0">
            <h3 class="mb-12 text-2xl font-bold md:text-3xl">
              Benchmark is in hyper-growth mode.
            </h3>

            <div class="text-base md:text-lg">
              Interested in joining the team? We are welcoming new team members
              from around the world. Our mantra is personality first, experience
              second.
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-content-container mx-auto mt-16 px-5 md:px-14">
        <div class="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
          <div
            class="shadow-pm flex h-[200px] rounded-xl bg-white md:h-[220px] lg:h-[300px] xl:h-[220px]"
          >
            <img
              :src="`https://res.cloudinary.com/benchmarkminerals/image/upload/${imageParams}/v1676653718/assets/join-us/we-are-seeking_osklmf.png?_i=AA`"
              alt="We are seeking"
              class="w-[52px] rounded-bl-xl rounded-tl-xl object-cover lg:w-[125px]"
            />
            <div
              class="flex w-[calc(100%_-_52px)] flex-col justify-center p-4 lg:w-[calc(100%_-_125px)] lg:p-7"
            >
              <h4 class="mb-6 text-base font-semibold lg:text-2xl lg:font-bold">
                We are seeking
              </h4>
              <div class="text-sm lg:text-lg">
                Selfless, hard working, social people from all backgrounds to
                join Benchmark, a company at the heart of the energy storage
                revolution.
              </div>
            </div>
          </div>

          <div
            class="shadow-pm flex h-[200px] rounded-xl bg-white md:h-[220px] lg:h-[300px] xl:h-[220px]"
          >
            <img
              :src="`https://res.cloudinary.com/benchmarkminerals/image/upload/${imageParams}/v1676653719/assets/join-us/what-binds-our-team-members_oc8gqz.png?_i=AA`"
              alt="What binds our team"
              class="w-[52px] rounded-bl-xl rounded-tl-xl object-cover lg:w-[125px]"
            />
            <div
              class="flex w-[calc(100%_-_52px)] flex-col justify-center p-4 lg:w-[calc(100%_-_125px)] lg:p-7"
            >
              <h4 class="mb-6 text-base font-semibold lg:text-2xl lg:font-bold">
                What binds our team members
              </h4>
              <div class="text-sm lg:text-lg">
                Is a hunger to constantly learn about our rapidly evolving
                industry and a selflessness to help others, especially fellow
                team members and customers.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="max-w-content-container mx-auto flex h-full w-full flex-col justify-center px-4 md:px-14"
      >
        <div
          class="mt-16 flex justify-center lg:mx-14 lg:mt-24"
          :class="{ 'min-h-[650px] items-center': success }"
        >
          <CommonFormBuilder
            :initial-focus="false"
            :form-id="$config.public.joinUsFormId"
            container-button-send-class="lg:w-1/2 w-full flex justify-end lg:relative -top-4 mb-4 lg:mb-0"
            button-send-class="lg:w-[200px] w-full md:w-full text-base h-fit lg:-top-[3.2rem]"
            container-details-class="w-full lg:flex-row-reverse flex flex-col"
            details-class="lg:w-1/2 w-full"
            text-button="Submit"
            custom-label-class="text-3xl"
            @set-success="setSuccess"
          >
            <template #details>
              <div>
                <h2 class="text-base font-semibold sm:text-xl">
                  HAVE ANY QUESTIONS?
                </h2>
                <div class="mt-1 flex flex-col md:flex-row md:gap-2">
                  Email us at
                  <LinkWithAnimation
                    class="font-semibold underline"
                    text="careers@benchmarkminerals.com"
                    url="mailto:careers@benchmarkminerals.com"
                    target="_blank"
                  />
                </div>
              </div>
            </template>
          </CommonFormBuilder>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import OnViewportChangeMixin from '~/mixins/OnViewportChangeMixin'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: { LinkWithAnimation },
  mixins: [OnViewportChangeMixin],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Join Us',
      description:
        'Interested in joining the team? We are welcoming new team members from around the world. Our mantra is personality first, experience second.',
    })
    useHead(seo)
  },
  data() {
    const heroImageUrls = {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,c_fill/v1676653750/assets/join-us/join-us_m0p4s7.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,c_fill/v1676658999/assets/join-us/join-us-mobile_jloh0c.png?_i=AA',
    }

    const imageSizes = {
      desktop: 'f_auto,q_auto,w_125,c_fill',
      mobile: 'f_auto,q_auto,w_52,h_200,c_fill,g_north_west',
    }

    return {
      imageSizes,
      heroImageUrls,
      imageParams: 'f_auto,q_auto,w_125,h_201',
      heroImageUrl: heroImageUrls.desktop,
      success: false,
    }
  },

  methods: {
    setupImageSizes() {
      if (this.matchMedia(this.breakpoints.lg)) {
        this.imageParams = this.imageSizes.desktop
        this.heroImageUrl = this.heroImageUrls.desktop
        return
      }
      this.heroImageUrl = this.heroImageUrls.mobile
      this.imageParams = this.imageSizes.mobile
    },
    onViewportChange() {
      this.setupImageSizes()
    },
    setSuccess(value) {
      this.success = value
    },
  },
}
</script>
