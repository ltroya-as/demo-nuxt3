<template>
  <div>
    <Header
      world-tour-name="World Tour, New York"
      image-link="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,w_auto,f_auto/v1684416506/assets/events/world-tour-new-york-2023/WT_New_York_Header_Image_BG_yam2dv.jpg"
      date-world-tour="Tuesday 27th June 2023"
      location-world-tour="731 Lexington Ave, New York, NY 10022"
      register-link="https://go.bloomberg.com/attend/invite/bloomberg-intelligence-benchmark-minerals-present-world-tour-new-york-financing-the-energy-transition/?utm_medium=EventInvite&utm_source=cosponsor&utm_content=BILithiumEVConference&utm_campaign=742619&tactic=742619"
      :is-closed="isClosed"
    />

    <div
      class="max-w-content-container px-small lg:px-big mx-auto mt-6 w-full 2xl:px-0"
    >
      <h2 class="text-xl font-bold md:text-3xl lg:text-4xl">
        Benchmark World Tour - New York
      </h2>

      <div class="border-p-500 mt-6 border-b-4" />
    </div>

    <!-- Sponsor -->
    <section
      class="max-w-content-container px-small lg:px-big mx-auto mt-10 pb-10 2xl:px-0"
    >
      <div class="font-montserrat mb-10 text-2xl font-bold">
        THE BENCHMARK WORLD TOUR IS THE ORIGINAL AND WORLD’S LEADING SERIES OF
        INVESTMENT SEMINARS FOR THE LITHIUM ION BATTERY TO ELECTRIC VEHICLE (EV)
        SUPPLY CHAIN.
      </div>
      <div class="mb-4 flex w-full flex-col gap-y-4">
        <p>
          <span>Benchmark Mineral Intelligence is delighted to launch the</span>
          <span class="font-bold">Benchmark World Tour 2023</span> event in
          <span class="font-bold">New York, USA</span>
          <span>on</span>
          <span class="font-bold">Tuesday 27th June.</span>
        </p>
        <p>
          Since 2015, the Benchmark World Tour has been the foremost global
          forum for financing the energy transition.
        </p>
        <p>
          We will be announcing company speakers in due course but tickets for
          these free, one-day seminars from Team Benchmark sell out fast.
        </p>
      </div>
      <div class="my-8 mb-4 flex justify-center">
        <CommonButton
          v-show="!isClosed"
          variant="primary"
          target="_blank"
          extra-classes="rounded-full !px-16 text-center text-sm font-extrabold uppercase hover:underline focus:outline-none"
          link="https://go.bloomberg.com/attend/invite/bloomberg-intelligence-benchmark-minerals-present-world-tour-new-york-financing-the-energy-transition/?utm_medium=EventInvite&utm_source=cosponsor&utm_content=BILithiumEVConference&utm_campaign=742619&tactic=742619"
        >
          Register
        </CommonButton>
      </div>

      <div id="agenda" class="bg-indigo mb-6 text-black">
        <div
          class="bm-container flex flex-col pb-8 sm:px-20 sm:py-8 md:flex-row"
        >
          <div class="font-montserrat mb-8 md:mb-0 md:w-1/4">
            <div class="text-2xl font-bold">Agenda</div>
          </div>
          <div class="md:w-3/4">
            <Agenda :data="agenda" />
          </div>
        </div>

        <SharedCommonButtonDownload
          :download-file="downloadFile"
          variant="secondary"
          text="Browse the full agenda"
          class="w-[270px] w-fit"
        />
      </div>

      <div>
        <div class="bg-p-500">
          <div class="mb-8 py-8 text-center text-2xl font-bold uppercase">
            Speakers
          </div>
        </div>
        <SpeakersPanel :speakers="speakers" />
      </div>

      <div class="mb-12 mt-8 flex justify-center">
        <CommonButton
          v-show="!isClosed"
          variant="primary"
          target="_blank"
          class="bg-p-500 rounded-full !px-16 text-center text-sm font-extrabold uppercase hover:underline focus:outline-none"
          link="https://go.bloomberg.com/attend/invite/bloomberg-intelligence-benchmark-minerals-present-world-tour-new-york-financing-the-energy-transition/?utm_medium=EventInvite&utm_source=cosponsor&utm_content=BILithiumEVConference&utm_campaign=742619&tactic=742619"
        >
          Register
        </CommonButton>
      </div>
      <div>
        <div class="bg-p-500">
          <div class="py-8 text-center text-2xl font-bold uppercase">
            Host Partners
          </div>
        </div>
        <div class="mt-10 flex justify-center">
          <img
            alt="host-partners-image"
            class="w-[500px] max-w-full"
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_900/v1684943345/assets/events/world-tour-new-york-2023/Bloomberg_logo_logotype_emblem_1_bw6eet.png?_i=AA"
          />
        </div>
      </div>
      <div v-if="sponsors.length > 0" class="my-10 flex flex-col items-center">
        <div class="bg-p-500 w-full">
          <div class="py-8 text-center text-2xl font-bold uppercase">
            Our Sponsors
          </div>
        </div>
        <div class="sponsors w-full">
          <div
            class="w-container grid grid-cols-1 place-items-center gap-4 rounded-[40px] bg-white py-8 sm:mx-8 lg:grid-cols-2 xl:mx-0 xl:grid-cols-3"
          >
            <Sponsor
              v-for="(sponsor, j) in sponsors"
              :key="j"
              :image-url="sponsor.imageUrl"
              :website-url="sponsor.websiteUrl"
              class="sponsor max-w-[320px] px-6 py-2 lg:px-12"
            />
          </div>
        </div>
      </div>
      <div v-show="!isClosed" class="my-10 flex flex-col items-center">
        <div class="mb-6 text-center text-xl font-bold uppercase">
          SPEAKER / SPONSOR OPPORTUNITIES AVAILABLE
        </div>
        <CommonButton
          variant="primary"
          target="_blank"
          extra-classes="mb-4 rounded-full bg-p-500 !px-16 text-center text-sm font-semibold font-extrabold uppercase hover:underline focus:outline-none"
          link="mailto:sponsor@benchmarkminerals.com?subject=Benchmark%20World%20Tour%202023%20NewYork:%20Speaker%20Sponsor%20Opportunity"
        >
          Contact Us
        </CommonButton>
      </div>
    </section>
  </div>
</template>

<script>
import SharedCommonButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import CommonButton from '~/components/common/Button.vue'
import Agenda from '~/components/events/world-tour-2023/Agenda/index.vue'
import Header from '~/components/events/world-tour-2023/Header'
import SpeakersPanel from '~/components/events/world-tour-2023/SpeakersPanel'
import Sponsor from '~/components/events/world-tour-2023/Sponsor'
import * as worldTourEventData from '~/constants/events/world-tour-2023-new-york'

export default {
  components: {
    Header,
    Agenda,
    Sponsor,
    CommonButton,
    SpeakersPanel,
    SharedCommonButtonDownload,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      {
        title: 'Benchmark | World Tour 2023 Toronto',
      },
      {
        twitterImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
        opengraphImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
      },
    )
    useHead(seo)
  },
  data() {
    return {
      agenda: [],
      sponsors: [],
      speakers: [],
      downloadFile: {
        file_name: 'Benchmark World Tour New York 2023 Agenda.pdf',
        ID: this.$config.public.worldTourNewYork2023Agenda,
        category: 'public-documents',
      },
      mailInfo: {
        to: 'sponsor@benchmarkminerals.com',
        subject: 'Benchmark World Tour 2023 New York: Sponsor Inquiry',
        body: 'I would like to learn more about becoming a sponsor for Benchmark World Tour 2023 New York.',
      },
      isClosed: true,
    }
  },
  computed: {
    mailLink() {
      const encodedSubject = encodeURIComponent(this.mailInfo.subject)
      const encodedBody = encodeURIComponent(this.mailInfo.body)
      return `mailto:${this.mailInfo.to}?Subject=${encodedSubject}&body=${encodedBody}`
    },
  },
  mounted() {
    const { agenda, sponsors, speakers } = worldTourEventData

    this.agenda = agenda
    this.sponsors = sponsors
    this.speakers = speakers
  },
}
</script>
