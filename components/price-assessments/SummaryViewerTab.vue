<template>
  <button
    class="tab border-s-400 relative border-b-2 p-2 text-base font-semibold"
    :class="[isActive ? 'active-tab text-s-900' : 'text-[#a3a5ae]']"
    @click="$emit('click')"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    mobileText: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      buttonText: this.text,
    }
  },

  mounted() {
    this.initializeButtonTextChanger()
  },

  methods: {
    initializeButtonTextChanger() {
      if (!this.mobileText) return
      const mql = window.matchMedia('(max-width: 1024px)')
      if (mql.matches) {
        this.buttonText = this.mobileText
      }
      mql.onchange = (e) => {
        if (e.matches) {
          this.buttonText = this.mobileText
        } else {
          this.buttonText = this.text
        }
      }
    },
  },
}
</script>

<style scoped>
.tab::after {
  display: block;
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  background: theme('colors.p.500');
  height: 4px;
  width: 100%;
  transform: scaleX(0);
  transition: transform 150ms ease-in-out;
}

.tab.active-tab::after {
  transform: scaleX(1);
}
</style>
