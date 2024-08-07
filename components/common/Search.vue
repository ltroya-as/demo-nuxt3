<template>
  <form
    v-click-outside="onBlur"
    :class="[$attrs.class]"
    class="flex max-w-full flex-col gap-y-1"
    @submit.prevent
  >
    <div
      class="border-s-600 focus-within:border-p-900 relative flex items-center gap-x-3 overflow-hidden rounded border bg-white px-3 py-1"
    >
      <label :for="`search-input-${uid}`" class="cursor-pointer border-none">
        <IconSearch />
      </label>
      <input
        :id="`search-input-${uid}`"
        type="text"
        class="placeholder:text-s-400 w-full border-transparent bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0"
        placeholder="Search..."
        data-testid="search"
        :value="modelValue"
        autocomplete="off"
        @input="changeSearch"
        @focus="onFocus"
      />
      <transition name="fade">
        <IconClear
          v-if="modelValue"
          class="cursor-pointer border-none"
          @click="cleanValue"
        />
      </transition>
    </div>
    <slot />
  </form>
</template>

<script>
import IconSearch from '@/assets/icons/SearchReportIcon.svg'
import IconClear from '@/assets/icons/Close.svg'

export default {
  components: { IconSearch, IconClear },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      uid: this._uid,
    }
  },
  methods: {
    changeSearch(e) {
      const value = e.target?.value ?? ''
      this.$emit('update:modelValue', value)
    },
    onFocus() {
      this.$emit('focus')
    },
    onBlur() {
      this.$emit('blur')
    },
    cleanValue() {
      this.$emit('update:modelValue', '')
      this.$emit('clear')
    },
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
