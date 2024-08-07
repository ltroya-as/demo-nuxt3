<script setup lang="ts">
import kebabCase from 'lodash/kebabCase'
import { Field, ErrorMessage, useFieldError } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  options: {
    type: [Array, Object],
    required: true,
  },
  defaultValue: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])

const error = useFieldError(props.name)
const hasError = computed(() => error.value)

const onInput = (event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}

const formSelectTestId = computed(() => kebabCase(`form-select-${props.label}`))
</script>

<template>
  <label :data-testid="formSelectTestId">
    <span class="mb-1 block text-xs font-semibold">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </span>

    <Field
      as="select"
      :name="name"
      :rules="rules"
      :label="label"
      class="text-grey-900 focus:ring-p-500 w-full rounded py-1 shadow-none outline-none ring-0 focus:border-transparent focus:ring-2 focus:ring-inset"
      :value="props.modelValue"
      :class="{
        'border-error': hasError,
        'border-s-600': !hasError,
      }"
      @input="onInput"
    >
      <option value="" selected disabled hidden>
        {{ placeholder || '' }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </Field>

    <div class="h-4">
      <ErrorMessage class="text-xxs text-error block" :name="name" />
    </div>
  </label>
</template>
