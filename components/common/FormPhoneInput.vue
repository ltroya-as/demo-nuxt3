<script setup lang="ts">
import { useField, ErrorMessage, useFieldError } from 'vee-validate'
import { VueTelInput } from 'vue-tel-input'
import type { PhoneObject } from '@/models/form'

import 'vue-tel-input/vue-tel-input.css'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: '',
  },
  errorMessages: {
    type: Object,
    default: () => ({}),
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const error = useFieldError(props.name)
const hasError = computed(() => error.value)

const { setErrors, validate, value } = useField(props.name, props.rules, {
  label: props.label,
  validateOnValueUpdate: false,
})

const currentPhoneObject = ref<PhoneObject>(null)

const handleInput = (_number, phoneObject) => {
  const { formatted, valid } = phoneObject
  currentPhoneObject.value = phoneObject

  emit('update:modelValue', formatted)

  if (valid) {
    validate()
  }
}

const handleBlur = () => {
  const { number, formatted, country, valid } = currentPhoneObject.value

  if (!valid) {
    if (!formatted) {
      validate()
    } else {
      setErrors(props.errorMessages.invalid)
    }
  } else {
    const prefixedNumber = formatted.startsWith(`+${country.dialCode}`)
      ? formatted
      : number

    emit('update:modelValue', prefixedNumber)
    validate()
  }
}

const preferredCountries = ['gb', 'us', 'ca', 'cn', 'au']
</script>

<template>
  <div>
    <span class="mb-1 block text-xs font-semibold">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </span>

    <VueTelInput
      v-model="value"
      :preferred-countries="preferredCountries"
      :input-options="{ placeholder }"
      valid-characters-only
      data-testid="phone-number-input"
      :class="{ error: hasError }"
      @on-input="handleInput"
      @blur="handleBlur"
    />

    <div class="h-4">
      <ErrorMessage class="text-xxs text-error block" :name="name" />
    </div>
  </div>
</template>

<style lang="scss">
.vue-tel-input {
  @apply border-s-600  rounded #{!important};

  &:focus-within {
    @apply border-p-500 ring-p-500 ring-1 ring-offset-0 #{!important};
  }

  input {
    @apply text-grey-900 px-3 py-1 shadow-none ring-0 #{!important};
  }

  .vti__dropdown:focus {
    @apply outline-p-500 rounded outline-2 outline-offset-0;
  }

  .vti__dropdown-item strong {
    @apply font-normal #{!important};
  }

  &.error {
    &:focus-within {
      @apply border-error #{!important};
    }

    .vti__dropdown:focus {
      @apply outline-error;
    }
  }
}
</style>
