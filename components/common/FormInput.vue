<script setup lang="ts">
import kebabCase from 'lodash/kebabCase'
import type { VueInstance } from '@vueuse/core'
import { Field, ErrorMessage, useFieldError } from 'vee-validate'
import { useValidFieldTracker } from '~/composables/form'
import EyeOn from '~/assets/icons/EyeOn.svg'
import EyeOff from '~/assets/icons/EyeOff.svg'

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
  isFocused: {
    type: Boolean,
    default: false,
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
  defaultValue: {
    type: String,
    default: '',
  },
})

const error = useFieldError(props.name)

const modelValue = ref(props.defaultValue)
const _type = ref(props.type)
const field = ref<VueInstance>()

const hasError = computed(() => error.value)
const formInputTestId = computed(() => kebabCase(`form-input-${props.label}`))

const isEmail = computed(
  () => props.type === 'email' || props.rules.match(/email/),
)

const toggleType = () => {
  _type.value === 'password'
    ? (_type.value = 'text')
    : (_type.value = 'password')
}

if (isEmail.value) {
  useValidFieldTracker(field, modelValue, props.rules)
}

const emit = defineEmits(['update:modelValue'])

const handleUpdateValue = (value) => {
  emit('update:modelValue', value)
}

onMounted(() => {
  props.isFocused && field.value.$el.focus()

  if (props.defaultValue) {
    handleUpdateValue(props.defaultValue)
  }
})
</script>

<template>
  <div :data-testid="formInputTestId">
    <label class="mb-1 block">
      <span class="mb-1 block text-xs font-semibold">
        {{ label }} <span v-if="required" class="text-error">*</span>
      </span>

      <div class="relative">
        <Field
          ref="field"
          :name="name"
          :rules="rules"
          class="text-grey-900 focus:ring-p-500 w-full rounded py-1 shadow-none outline-none ring-0 focus:border-transparent focus:ring-2"
          :class="{
            'pr-12': type === 'password',
            'border-error': hasError,
            'border-s-600': !hasError,
          }"
          :type="_type"
          :placeholder="placeholder"
          :validate-on-blur="validateOnBlur"
          :validate-on-input="!isEmail"
          :label="label"
          :value="modelValue"
          @update:model-value="handleUpdateValue"
        />

        <!-- Password Toggle -->
        <div
          v-if="type === 'password'"
          class="text-s-900 absolute right-1 top-1/2 -translate-y-1/2"
        >
          <div
            class="flex h-7 w-7 cursor-pointer items-center"
            @click="toggleType"
          >
            <EyeOff v-show="_type === 'password'" />
            <EyeOn v-show="_type === 'text'" />
          </div>
        </div>
      </div>
    </label>

    <div class="h-4">
      <ErrorMessage class="text-xxs text-error block" :name="name" />
    </div>
  </div>
</template>
