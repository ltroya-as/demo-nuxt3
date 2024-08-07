<template>
  <div
    class="relative min-h-[238px] bg-black/35 lg:min-h-[380px]"
    data-testid="services-hero"
  >
    <img
      :src="imageDesktop"
      class="absolute top-0 hidden h-full w-full object-cover object-center mix-blend-multiply filter lg:block"
      alt="desktop banner"
      data-testid="hero-image"
    />
    <img
      :src="imageMobile"
      class="absolute top-0 block h-full w-full object-cover object-center mix-blend-multiply filter lg:hidden"
      alt="mobile banner"
    />

    <Breadcrumb
      :menu="$store.state.breadcrumb.items"
      class="lg:left-big absolute left-4 top-5 mb-6 text-white"
    />

    <div
      class="px-small lg:p-big relative z-10 flex h-full w-full flex-col items-center justify-center p-5 pb-12 pt-16 text-white lg:pb-20 lg:pt-28"
      :class="{ '!items-start': description }"
      data-testid="subscribe-call-to-action"
    >
      <div class="">
        <h3 class="text-2xl font-bold md:text-4xl">
          {{ title }}
        </h3>

        <div v-if="description" class="mb-3 mt-4 max-w-[702px] text-lg">
          {{ description }}
        </div>
      </div>

      <ServicesGroupButtons
        :file="file"
        :initial-fields="initialFields"
        :download-text="downloadText"
        class="max-w-content-container w-full flex-wrap gap-x-4"
        :class="{ 'mt-6': !description, 'lg:!justify-start': description }"
      />
      <div
        v-if="showSignIn && !loggedIn"
        class="max-w-content-container mt-3 flex items-center justify-center text-sm font-semibold"
        data-testid="hero-sign-in"
        :class="{ 'mx-auto lg:mx-0': description }"
      >
        Already a subscriber?
        <button
          class="ml-2 cursor-pointer underline decoration-1"
          @click="$modal.open('signIn')"
        >
          {{ signInText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ServicesGroupButtons from '~/components/shared/services/GroupButtons.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import { SIGN_IN } from '~/constants/services/constants'

export default {
  components: { Breadcrumb, ServicesGroupButtons },
  mixins: [AuthenticationMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    textAlign: {
      type: String,
      required: false,
      default: 'center',
    },
    images: {
      type: Object,
      required: true,
    },
    initialFields: {
      type: Array,
      required: true,
    },
    file: {
      type: Object,
      default: () => null,
    },
    downloadText: {
      type: String,
      default: 'Methodology',
    },
    showSignIn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
    }
  },
  computed: {
    imageDesktop() {
      return (
        this.images?.desktop ??
        this.images?.mobile ??
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1676580843/assets/forecasts/forecasts-cobalt_kk9zei.png?_i=AA'
      )
    },
    imageMobile() {
      return (
        this.images?.mobile ??
        this.images?.desktop ??
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1676580931/assets/forecasts/forecasts-cobalt-mobile_yvek1j.png?_i=AA'
      )
    },
  },
}
</script>
