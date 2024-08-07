<template>
  <div class="w-full">
    <CommonFormPhoneCountryCode
      :value="value"
      data-testid="form-input-phone"
      help-text="* Required"
      :required="$attrs.required"
      :error-text="errorText"
      @input="$emit('input', $event)"
      @update="setFormattedPhone"
      @blur="$emit('blur', $event)"
      @change-custom-error="changeCustomError"
    />
  </div>
</template>

<script>
import CommonFormPhoneCountryCode from '~/components/common/FormPhoneInput.vue'
export default {
  components: { CommonFormPhoneCountryCode },
  props: {
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
      default: '',
    },
  },

  methods: {
    changeCustomError(error) {
      this.$emit('changeCustomError', error)
    },
    setFormattedPhone({ formatInternational }) {
      this.$emit('update', formatInternational)
    },
  },
}
</script>
