<template>
  <div
    class="min-h-[500px] bg-cover bg-center bg-no-repeat pb-8 md:pb-10"
    :style="backgroundImage"
  >
    <div
      class="max-w-content-container px-small lg:px-big relative mx-auto flex flex-col items-center justify-center pt-20 text-white 2xl:px-0"
    >
      <div
        class="max-w-content-container px-small lg:px-big absolute left-0 top-0 hidden w-full pt-4 md:block 2xl:px-0"
      >
        <SharedNavigationBreadcrumb
          :menu="breadcrumbs"
          class="mb-3 text-white"
        />
        <BackButton route="/events" title="Back to events" class="text-white" />
      </div>

      <img
        src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,w_auto,f_auto/v1680106970/assets/events/world-tour-toronto-2023/header/99feac6_f2q92x.png"
        alt="logo"
        class="border-p-500 mb-4 w-full max-w-[550px] border-b pb-7"
      />
      <h1 class="text-center text-xl md:text-2xl lg:text-4xl">
        Financing the Energy Transition
      </h1>
      <div
        class="mt-6 flex flex-col items-center justify-center gap-y-2 text-sm font-bold md:gap-y-3 md:text-base lg:text-lg"
      >
        <span>{{ dateWorldTour }}</span>
        <span class="bg-p-500 h-0.5 w-16" />
        <span>{{ locationWorldTour }}</span>
      </div>
      <span
        v-if="isClosed"
        class="mb-2 mt-4 text-center text-xl font-bold md:text-2xl lg:text-4xl"
      >
        Registration is now Closed
      </span>

      <CommonButton
        v-if="isClosed"
        variant="primary"
        extra-classes="!px-16 py-2.5 md:!py-3 font-extrabold text-sm text-black hover:underline focus:outline-none md:!w-fit"
        link="/events"
      >
        Back to Events
      </CommonButton>
      <CommonButton
        v-else
        variant="primary"
        target="_blank"
        extra-classes="mt-7 !px-16 py-2.5 md:!py-3 font-extrabold text-sm uppercase text-black hover:underline focus:outline-none md:!w-fit"
        :link="registerLink"
      >
        Register
      </CommonButton>
    </div>
  </div>
</template>

<script>
import SharedNavigationBreadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import BackButton from '~/components/shared/common/BackButton.vue'
import CommonButton from '~/components/common/Button.vue'
export default {
  components: { CommonButton, BackButton, SharedNavigationBreadcrumb },
  props: {
    worldTourName: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    dateWorldTour: {
      type: String,
      required: true,
    },
    locationWorldTour: {
      type: String,
      required: true,
    },
    registerLink: {
      type: String,
      required: true,
    },
    isClosed: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      breadcrumbs: ['Events', this.worldTourName],
    }
  },
  computed: {
    backgroundImage() {
      return `background-image: url(${this.imageLink})`
    },
  },
}
</script>
