<template>
  <div class="flex flex-wrap gap-y-2">
    <div
      v-for="option in options"
      :key="option"
      class="radio mr-4 flex flex-shrink-0 items-end justify-center"
    >
      <input
        :id="option"
        type="radio"
        name="radio-input"
        :value="option"
        :checked="isChecked(option)"
        @change="$emit('update:modelValue', option)"
      />
      <label class="radio-label" :class="labelClasses" :for="option">
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Array,
    },
    modelValue: {
      required: true,
      type: String,
    },
    labelClasses: {
      type: String,
      default: '',
    },
  },
  methods: {
    isChecked(option) {
      return this.modelValue === option
    },
  },
}
</script>

<style lang="scss" scoped>
$color1: #f4f4f4;
$color2: #25262a;

.radio {
  input[type='radio'] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      cursor: pointer;

      &:before {
        content: '';

        @apply border-s-900 relative top-0.5 inline-block h-4 w-4 rounded-full border;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: $color2;
          box-shadow: inset 0 0 0 2px $color1;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: $color2;
        }
      }
    }
  }
}
</style>
