<template>
  <div :class="[$attrs.class, 'scroll-custom flex min-h-full w-full flex-col']">
    <TheHeader />

    <div class="content mt-[46px] flex flex-col md:mt-[82px] lg:mt-0">
      <slot />
    </div>

    <TheFooter />

<!--    <ContactModal v-show="$store.state.modal.contactOpen" />-->

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
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import CommonToast from '~/components/common/Toast.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    CommonToast,
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
