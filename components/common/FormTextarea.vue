<template>
  <div class="mb-4">
    <div class="input relative w-full" :style="{ '--bg-color': bgColor }">
      <label>
        <span
          class="label font-lato text-surface-em-medium absolute ml-3 block transform cursor-text transition-transform"
          :class="labelClasses"
        >
          {{ label }}
        </span>

        <textarea
          ref="field"
          :value="value"
          :autocomplete="autocomplete"
          class="input border-s-500 focus:ring-p-500 inline-block h-52 w-full rounded bg-transparent px-4 py-4 outline-none focus:border-transparent focus:ring-2 focus:ring-inset"
          :class="{ 'border-error': errorText }"
          @input="$emit('input', $event.target.value)"
          @focus="focused = true"
          @blur="onBlur"
        />
      </label>
    </div>

    <p v-if="errorText" class="font-lato text-error pl-3 text-xs">
      {{ errorText }}
    </p>
    <p
      v-else-if="helpText"
      class="font-lato text-surface-em-medium pl-3 text-xs"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: [Number, String],
      default: '',
    },

    helpText: {
      type: String,
      default: '',
    },

    errorText: {
      type: String,
      default: () => '',
    },

    bgColor: {
      type: String,
      default: 'white',
    },

    autocomplete: {
      type: String,
      default: '',
    },

    initialFocus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
    }
  },

  computed: {
    labelClasses() {
      let classes = []

      if (this.focused || this.value !== '' || this.$browser.isApple()) {
        classes = [
          '-translate-y-2/4',
          'scale-75',
          'origin-top-left',
          'non-empty-field-label',
        ]
      } else {
        classes = ['translate-y-3/4']
      }

      return classes
    },
  },

  watch: {
    initialFocus(focus) {
      focus && this.$refs.field.focus()
    },
  },

  mounted() {
    if (this.initialFocus) this.$refs.field.focus()
  },

  methods: {
    onBlur($event) {
      this.$emit('blur', $event.target.value)
      this.focused = false
    },
  },
}
</script>

<style scoped>
.non-empty-field-label {
  top: 2px;
}

.label::after {
  content: '';
  width: calc(100% + 8px);
  height: 50%;
  position: absolute;
  z-index: -1;
  left: -4px;
  top: 0.7rem;
  background-color: var(--bg-color);
}

.input {
  background-color: var(--bg-color);
}

.input:-webkit-autofill {
  background-clip: text !important;
}

.input:-webkit-autofill:focus {
  background-clip: text !important;
}
</style>
