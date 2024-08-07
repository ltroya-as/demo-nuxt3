<template>
  <label :for="uid" class="flex items-center gap-2 bg-white px-3 py-2 text-sm">
    <SearchIcon class="h-4 w-4 !text-[#cacbd3]" :class="iconClasses" />
    <input
      :id="uid"
      type="text"
      :value="value"
      class="text-p-yellow-600 flex-1 appearance-none border-none bg-transparent p-0 focus:outline-none focus:ring-0"
      :placeholder="placeholder"
      @input="onInput"
    />
  </label>
</template>

<script>
import SearchIcon from '~/assets/icons/SearchReportIcon.svg'

export default {
  components: {
    SearchIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search...',
    },
    variant: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      uid: `search-${this._uid}`,
    }
  },
  computed: {
    iconClasses() {
      return {
        'text-white/90': this.variant === 'default',
        'text-p-yellow-600': this.variant === 'country-search',
      }
    },
  },
  methods: {
    onInput(event) {
      const target = event.target
      this.$emit('input', target.value)
    },
  },
}
</script>

<style scoped>
.input {
  background: linear-gradient(
      0deg,
      rgb(255 255 255 / 9%) 0%,
      rgb(255 255 255 / 9%) 100%
    ),
    #071830;
}
</style>
