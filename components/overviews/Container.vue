<template>
  <div :class="[$attrs.class, 'scroll-custom flex min-h-full w-full flex-col']">
    <Header />

    <div
      class="content bg-grey-50 mt-[46px] flex flex-col md:mt-[82px] lg:mt-0"
    >
      <slot />
    </div>

    <Footer />

    <ContactModal v-show="$store.state.modal.contactOpen" />

    <CommonToast
      :show="toast.show"
      :position="toast.position"
      :type="toast.type"
      :message="toast.message"
      :duration="toast.duration"
      :icon="toast.icon"
      @close="closeToast"
    />
  </div>
</template>

<script>
import Header from '~/components/TheHeader.vue'
import Footer from '~/components/TheFooter.vue'
import ContactModal from '~/components/contact/Modal.vue'
import CommonToast from '~/components/common/Toast.vue'
export default {
  components: {
    CommonToast,
    ContactModal,
    Header,
    Footer,
  },
  computed: {
    toast() {
      return this.$store.state.toast
    },
  },
  methods: {
    closeToast() {
      this.$toast.clear()
    },
  },
}
</script>

<style scoped>
.content {
  min-height: calc(100vh - 48px);
}

@media (width >= 768px) {
  .content {
    min-height: calc(100vh - 84px);
  }
}

@media (width >= 1280px) {
  .content {
    min-height: calc(100vh - 153px);
  }
}
</style>
