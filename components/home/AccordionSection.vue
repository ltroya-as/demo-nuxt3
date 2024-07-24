<template>
  <div
    ref="section"
    class="caret transition-width-and-colors relative inline-flex flex-shrink-0 cursor-pointer items-center duration-300"
    :class="activeClasses"
    @click="handleClick"
  >
    <!-- Icon -->
    <div :class="containerIconActiveClasses">
      <span v-if="title" :class="activeTitleClasses">
        {{ title }}
      </span>
      <Icon :class="activeIconClasses" :name="iconName" />
      <span
        v-if="!isActive"
        class="click-for-more mt-4 w-full text-center text-sm font-bold lg:text-lg"
        :class="clickForMoreClasses"
      >
        Click for More
      </span>
    </div>

    <!-- Features -->
    <div
      class="relative -top-1 my-auto h-full w-1 border bg-black"
      :class="showFeatures ? 'mx-1 opacity-100' : 'opacity-0'"
    ></div>
    <div
      class="w-5 transition-opacity"
      :class="showFeatures ? 'opacity-100' : 'opacity-0'"
    >
      <ul class="relative -top-2 ml-16">
        <li
          v-for="(feature, id) in featureList"
          :key="id"
          class="text-surface-em-high mb-0.5 text-xs font-bold uppercase last:mb-0 lg:text-lg xl:text-xl"
        >
          <nuxt-link
            v-if="feature && !feature.target"
            :to="feature.href"
            class="hover:underline md:whitespace-nowrap"
          >
            {{ feature.name }}
          </nuxt-link>
          <a
            v-if="feature && feature.target"
            :href="feature.href"
            class="hover:underline md:whitespace-nowrap"
          >
            {{ feature.name }}
          </a>
          <span v-else-if="!feature" aria-hidden="true" class="opacity-0">
            .
          </span>
        </li>
      </ul>

      <button class="absolute right-8 top-8" @click.stop="$emit('close')">
        <img
          class="h-5 w-5"
          src="~assets/icons/Close.svg"
          aria-label="Close section"
          alt="icon close"
        />
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
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
    containerIconClasses: {
      type: String,
      default: null,
    },
    clickForMoreClasses: {
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
  },

  data() {
    return {
      showFeatures: false,
    }
  },

  computed: {
    activeClasses() {
      return this.isActive
        ? ['w-10/12 md:pl-24 lg:pl-40']
        : ['w-3/12', 'is-not-active']
    },
    containerIconActiveClasses() {
      if (this.containerIconClasses) {
        return this.isActive
          ? `relative -top-8 xl:-top-10 z-20 flex flex-col justify-between w-32 lg:w-80 ${this.containerIconClasses}`
          : `relative lg:-top-8 xl:-top-10 z-20 flex flex-col justify-between w-full ${this.containerIconClasses}`
      }
      return 'relative -right-12 z-20 w-32 flex-shrink-0 pl-5 lg:-right-12 lg:w-40 lg:pl-0 xl:-right-8 xl:h-64 xl:w-64'
    },
    activeIconClasses() {
      if (this.iconClasses) {
        return `section-icon select-none ${this.iconClasses}`
      }
      return 'section-icon h-full select-none'
    },
    activeTitleClasses() {
      if (this.isActive) {
        return 'small-caps mb-4 w-full text-center text-sm font-bold xl:text-2xl'
      }
      return 'small-caps mb-4 block w-full text-center text-sm font-bold md:hidden lg:block xl:text-2xl'
    },
  },

  watch: {
    isActive(active) {
      if (active) {
        // We wait for the section to be unfolded
        // (i. e., the transition has finished)
        // before showing the features.
        this.onUnfolded(() => {
          this.showFeatures = this.isActive
        })
      } else {
        // But we hide those features as soon as the
        // section is no longer active.
        this.showFeatures = false
      }
    },
  },

  methods: {
    onUnfolded(callback) {
      const listener = ({ propertyName }) => {
        if (propertyName === 'width') {
          callback()
          this.$refs.section.removeEventListener('transitionend', listener)
        }
      }
      this.$refs.section.addEventListener('transitionend', listener)
    },
    handleClick() {
      this.isActive ? this.$emit('close') : this.$emit('open')
    },
  },
}
</script>

<style scoped>
.caret::after {
  content: '';
  height: 100%;
  position: absolute;
  right: -59px;
  top: 0;
  width: 60px;
  border-color: transparent;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  z-index: 10;
}

.no-caret::after {
  clip-path: none;
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
.caret .section-icon,
.caret .click-for-more {
  @apply transition-width-and-colors;
  @apply duration-300;
}

.is-not-active.caret:hover,
.is-not-active.caret:hover::after {
  @apply bg-s-900;
  @apply text-p-500;
}

.caret:hover .click-for-more {
  @apply text-white;
}

.is-not-active.caret:hover .section-icon {
  /* This filter is equivalent to changing the color to p-500.
     Generated with: https://isotropic.co/hex-color-to-css-filter */
  filter: invert(71%) sepia(23%) saturate(2439%) hue-rotate(1deg)
    brightness(105%) contrast(103%);
}
</style>
