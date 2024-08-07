<template>
  <div :class="[$attrs.class, 'flex gap-3']">
    <ContactTab
      :tab="1"
      :is-active="currentTab === 1"
      @select-tab="changeCurrentTab"
    >
      Product Info
    </ContactTab>
    <ContactTab
      :tab="2"
      :is-active="currentTab === 2"
      @select-tab="changeCurrentTab"
    >
      Contact
    </ContactTab>
  </div>
</template>

<script>
import ContactTab from '~/components/contact/Tab.vue'
export default {
  components: { ContactTab },
  props: {
    currentTab: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    changeCurrentTab(tab) {
      this.$emit('changeCurrentTab', tab)
    },
  },
}
</script>
