<template>
  <div
    ref="section"
    class="caret transition-width-and-colors relative flex w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center px-12 duration-700"
    :class="activeClasses"
    @click="handleClick"
  >
    <!-- Icon -->
    <div class="relative z-20 flex w-full flex-col justify-between">
      <span v-if="title" :class="activeTitleClasses">
        {{ title }}
      </span>
      <Illustration :class="activeIconClasses" :name="iconName" />
    </div>

    <!-- Features -->
    <transition name="fade">
      <div class="mt-6">
        <ul>
          <li
            v-for="(feature, id) in featureList"
            :key="id"
            class="text-surface-em-high mb-3 text-center text-lg font-bold uppercase"
          >
            <nuxt-link
              v-if="feature"
              :to="feature.href"
              class="hover:underline"
            >
              {{ feature.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Illustration from '~/components/common/Illustration.vue'

export default {
  components: {
    Illustration,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    iconClasses: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    featureList: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isFirstItem: {
      type: Boolean,
      default: false,
    },
    isLastItem: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showFeatures: false,
    }
  },

  computed: {
    activeClasses() {
      return this.isActive ? ['h-10/12'] : ['h-3/12', 'is-not-active']
    },
    activeIconClasses() {
      if (this.iconClasses) {
        return `section-icon select-none ${this.iconClasses}`
      }
      return 'section-icon h-full select-none'
    },
    activeTitleClasses() {
      if (this.isFirstItem) {
        return 'small-caps mt-9 mb-4 block w-full text-center text-2xl font-bold'
      }
      if (this.isLastItem) {
        return 'small-caps mb-9 mt-24 block w-full text-center text-2xl font-bold'
      }
      return 'small-caps mt-24 mb-4 block w-full text-center text-2xl font-bold'
    },
  },

  watch: {
    isActive(active) {
      this.showFeatures = !!active
    },
  },

  methods: {
    handleClick() {
      this.isActive ? this.$emit('close') : this.$emit('open')
    },
  },
}
</script>

<style scoped>
.caret::after {
  content: '';
  height: 80px;
  width: 100%;
  position: absolute;
  right: 0;
  top: 100%;
  border-color: transparent;
  clip-path: polygon(100% 0%, 0% 0%, 50% 100%);
  z-index: 10;
}

.caret-p-500::after {
  @apply bg-p-500;
}

.caret-p-300::after {
  @apply bg-p-300;
}

.caret-p-100::after {
  @apply bg-p-100;
}

.caret-p-50::after {
  @apply bg-p-50;
}

/* The hover state will only happen
   in non-active sections (e. g.,
   when they are folded). */
.caret,
.caret::after,
.caret .section-icon {
  @apply transition-width-and-colors;
  @apply duration-700;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
