<script setup lang="ts">
import snakeCase from 'lodash/snakeCase'
import kebabCase from 'lodash/kebabCase'
import type { PropType } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

import type { CheckboxGroupOption } from '@/models/formidable'
import { useToggleField } from '@/composables/form'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array as PropType<string[]>,
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
  validateOnBlur: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Number,
    default: 2,
    validator(value: number) {
      return [1, 2, 3].includes(value)
    },
  },
  options: {
    type: Array as PropType<CheckboxGroupOption[]>,
  },
  showToggle: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: Array as PropType<string[]> | any,
    default: null,
  },
  useLargeLabel: {
    type: Boolean,
    default: false,
  },
})

const NEWSLETTER_LABEL = 'Subscribe to the Benchmark Newsletter'

const { $store } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])

const gridColsClass = computed(() =>
  props.options?.length > 2 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1',
)

const initialValues = computed(() => $store.state.modal.initialFields || {})

const { toggleAll, isToggleOn } = useToggleField({
  fieldsetName: props.name,
  fieldsetRules: props.rules,
  fieldsetOptions: props.options as any,
})

const fieldSetTestId = computed(() =>
  kebabCase(`form-checkbox-fieldset-${props.label}`),
)

const handleUpdateValue = (value) => {
  emit('update:modelValue', value)
}

const getDisableCheckboxNewsletter = (_option) => {
  return (
    _option.label === NEWSLETTER_LABEL &&
    Object.values(props.defaultValue)?.some(
      (_value) => _value === NEWSLETTER_LABEL,
    )
  )
}

const checkboxLabel = (option) => snakeCase(`${props.label}_${option.label}`)

const labelBasedClass = (option) => `${kebabCase(option.label)}-checkbox-label`

const preselectCheckboxes = () => {
  const { checkboxes = [] } = initialValues.value

  const defaults = props.options
    .filter((option) => checkboxes.includes(checkboxLabel(option)))
    .map(({ value }) => value)
  if (defaults?.length) {
    handleUpdateValue(defaults)
  }
}

watch(
  initialValues,
  () => {
    preselectCheckboxes()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div>
    <fieldset class="mb-1 block" :data-testid="fieldSetTestId">
      <legend v-if="label" class="mb-6 flex items-center gap-x-2.5 md:mb-3">
        <CommonFormToggle
          v-if="showToggle"
          :show-label="false"
          :value="isToggleOn"
          @click="toggleAll"
        />
        <span
          :class="[
            'text-lg font-semibold sm:font-bold',
            {
              'ml-2': showToggle,
              'text-s-900': useLargeLabel,
            },
          ]"
        >
          {{ label }} <span v-if="required" class="text-error">*</span>
        </span>
      </legend>

      <section class="grid gap-x-2 gap-y-2" :class="gridColsClass">
        <div
          v-for="(option, id) in options"
          :key="id"
          :class="['flex items-center', { 'w-full': useLargeLabel }]"
        >
          <label :data-testid="checkboxLabel(option)" class="flex items-center">
            <Field
              :name="name"
              :label="label"
              :rules="rules"
              class="no-outline-on-click form-checkbox focus:ring-p-500 mr-1.5 h-5 w-5 cursor-pointer rounded focus:ring-2"
              :class="[
                getDisableCheckboxNewsletter(option)
                  ? 'text-s-400'
                  : 'text-p-500',
              ]"
              type="checkbox"
              :value="option.value"
              :validate-on-blur="validateOnBlur"
              :disabled="getDisableCheckboxNewsletter(option)"
              @update:model-value="handleUpdateValue"
            />

            <span
              :class="labelBasedClass(option)"
              class="text-grey-900 cursor-pointer pl-2 text-sm font-normal sm:text-xs"
              v-html="option.label"
            />
          </label>
        </div>
      </section>
    </fieldset>
    <div class="h-4">
      <ErrorMessage :name="name">
        <span class="text-xxs text-error-light block">
          Please check at least one option from the list.
        </span>
      </ErrorMessage>
    </div>
  </div>
</template>
