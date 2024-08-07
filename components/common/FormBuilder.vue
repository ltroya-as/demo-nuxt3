<script setup lang="ts">
import { Form, type SubmissionHandler } from 'vee-validate'
import { getAdaptedFormidableErrors } from '~/utils/adapters'
import { FormidableForm } from '~/utils/formidable-form'
import type { FormidableField } from '~/models/formidable'
import { useGoogleAnalyticsFormSubmitEvent } from '~/composables/google-analytics'
import { useFormidableForm } from '~/composables/formidable-form'

import CommonButton from '~/components/common/Button.vue'
import FormInput from '~/components/common/FormInput.vue'
import FormSelect from '~/components/common/FormSelect.vue'
import FormTextArea from '~/components/common/FormTextarea.vue'
import FormPhoneInput from '~/components/common/FormPhoneInput.vue'
import FormCheckboxGroup from '~/components/common/FormCheckboxGroup.vue'
import FormInputHidden from '~/components/common/FormInputHidden.vue'
import FileUploaderField from '~/components/common/FileUploaderField.vue'
import FileUploaderFieldPlaceholder from '~/components/common/FileUploaderFieldPlaceholder.vue'
import FormHtml from '~/components/common/FormHtml.vue'

const props = defineProps({
  allowToggleAll: {
    type: Boolean,
    default: true,
  },
  customLabelClass: {
    type: String,
    default: '',
  },
  alwaysVisibleSectionIds: {
    type: Array,
    default: () => [],
  },
  showLabels: {
    type: Boolean,
    default: true,
  },
  ignoreConditionals: {
    type: Boolean,
    default: false,
  },
  showServices: {
    type: Boolean,
    default: true,
  },
  modalName: {
    type: String,
    default: '',
  },
  formId: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  successText: {
    type: String,
    required: false,
  },
  defaultValues: {
    type: Object,
    default: () => ({}),
  },
  fieldExtraClasses: {
    type: String,
    default: '',
  },
  textButton: {
    type: String,
    default: 'Send',
  },
  showTabSection: {
    type: Boolean,
    default: true,
  },
  showCustomButton: {
    type: Boolean,
    default: false,
  },
  showLinkPrivacyPolicy: {
    type: Boolean,
    default: true,
  },
  containerDetailsClass: {
    type: String,
    default: null,
  },
  reverseButtonRow: {
    type: Boolean,
    default: false,
  },
  containerButtonSendClass: {
    type: String,
    default: null,
  },
  detailsClass: {
    type: String,
    default: null,
  },
  buttonSendClass: {
    type: String,
    default: null,
  },
  buttonFullWidth: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['setSuccess', 'page-number'])

const router = useRouter()
const { $modal } = useNuxtApp()
const config = useRuntimeConfig()
const { createForm } = useFormidableForm()
const { trackFormSubmitEvent } = useGoogleAnalyticsFormSubmitEvent()

const contactFormId = config.public.fmContactFormId
const serviceOfInterestSectionId = config.public.fmServiceOfInterestFormId

const showSuccessMessage = ref(false)
const showJoinUsSection = ref(false)
const form = ref<FormidableForm>()
const pages = ref<any[]>()
const sections = ref<any>()
const currentStep = ref<number>(1)
const myForm = ref()
const isLoading = ref(true)

const textPaginationButton = computed(() =>
  isLastPage.value ? 'Submit' : 'Next Step',
)

const isLastPage = computed(() => currentStep.value === pages.value.length)

const containerDetailsClasses = computed(() => {
  if (props.containerDetailsClass) return `${props.containerDetailsClass}`
  const classes = props.reverseButtonRow ? 'lg:!flex-row-reverse' : ''
  return `relative -top-1 flex flex-col items-center justify-center gap-y-10 gap-x-14 lg:flex-row lg:gap-y-20 xl:gap-x-10 ${classes}`
})

const containerButtonSendClasses = computed(() => {
  if (props.containerButtonSendClass) return props.containerButtonSendClass
  return `flex w-full lg:place-self-start lg:w-1/2`
})

const detailsClasses = computed(() => {
  if (props.detailsClass) return props.detailsClass
  return `w-full lg:w-1/2 ${props.showServices ? 'lg:place-self-center' : ''}`
})

const buttonSendClasses = computed(() => {
  if (props.buttonSendClass) return props.buttonSendClass
  const classesExtra = props.showServices
    ? 'mx-auto xl:w-full text-lg w-full'
    : ''
  return props.buttonFullWidth
    ? `md:w-full text-sm ${classesExtra}`
    : `md:w-auto text-sm ${classesExtra}`
})

const getSections = () => {
  if (!form.value) return []

  const sections = form.value.getSections()

  // This applies only for contact form. We remove the Service of interest section
  // if the `showServices` is set to false
  if (!props.showServices) {
    sections['item_meta[0]'] = sections['item_meta[0]']?.filter(
      (section) => section.id !== `item_meta[${serviceOfInterestSectionId}]`,
    )
    return sections
  }

  return sections
}

const parseFormidableErrors = (errors) => {
  return Object.keys(errors).reduce((_errors, key) => {
    return { ..._errors, [key]: [errors[key]] }
  }, {})
}
const clearSections = () => {
  Object.keys(sections.value).forEach((sectionKey) => {
    sections.value[sectionKey]
      .filter(
        (field) =>
          field.type !== 'divider' &&
          field.label.toLowerCase() !== FORMIDABLE_WEBSITE_URL_LABEL,
      )
      .forEach((field) => {
        field.value = ['checkbox', 'file'].includes(field.type) ? [] : ''
      })
  })
}

const handleSubmit: SubmissionHandler = async (_, { resetForm, setErrors }) => {
  try {
    await form.value.submit(getFieldsFromSections())

    trackFormSubmitEvent(props.formId as string)
  } catch (e) {
    form.value.onError()

    if (e.message && e.message instanceof Object) {
      setErrors(parseFormidableErrors(e.message))
    }
  }

  if (form.value.successful) {
    emit('setSuccess', true)
    showSuccessMessage.value = true

    nextTick(() => {
      clearSections()
      if (form.value) resetForm()
    })
  }
}

/**
 * Get the properties according to the field type.
 * This is to avoid the bug when having a group
 * of checkboxes from formidable.
 */
const getProps = (field: FormidableField) => {
  if (field.type === 'checkbox') {
    const useLargeLabel = isLabelContactUsFormServices(field.label)
    const checkboxProps = { ...field }
    delete checkboxProps.type
    return {
      ...checkboxProps,
      allowToggleAll: props.allowToggleAll,
      useLargeLabel,
    }
  }

  if (field.type === 'text' || field.type === 'hidden') {
    const fieldProps = { ...field }

    fieldProps.defaultValue = props.defaultValues
      ? props.defaultValues[fieldProps.label]
      : ''

    return fieldProps
  }

  return field
}

const verifyMainSectionDividersOnly = () => {
  const mainSection = sections.value['item_meta[0]']
  if (!mainSection) return false
  return mainSection.every((field) => field.type === 'divider')
}

const verifyOnlyOneDividerShown = () => {
  const mainSection = sections.value['item_meta[0]']
  if (!mainSection) return false
  const dividers = mainSection.filter(
    (field) => field.type === 'divider' && field.fieldManager.isVisible(),
  )
  return dividers.length <= 1
}

/**
 * Translate formidable classes to tailwind classes.
 */
const getFieldClasses = (classes: string) => {
  const isMainSectionDividersOnly = verifyMainSectionDividersOnly()
  const isOnlyOneDividerShown = verifyOnlyOneDividerShown()

  if (isMainSectionDividersOnly && isOnlyOneDividerShown) {
    return 'col-span-12'
  }

  // Use the full width on the contact form if the "Service of interest" section is not shown
  if (contactFormId === props.formId && !props.showServices) {
    return 'col-span-12'
  }

  const colSpanMapping = {
    frm6: 'lg:col-span-6',
    frm5: 'lg:col-span-5',
    frm7: 'lg:col-span-7',
  }

  // Check if any formidable class is present in the classes parameter
  const formidableClass = Object.keys(colSpanMapping).find((frmClass) =>
    classes.includes(frmClass),
  )
  if (formidableClass) {
    return `col-span-12 ${colSpanMapping[formidableClass]}`
  }

  // Use regular expression to remove formidable classes and only use tailwind classes

  return `col-span-12`
}

const getFileComponent = (field: any) => {
  if (field?.fieldOptions?.classes.includes('uploader_placeholder')) {
    return FileUploaderFieldPlaceholder
  }
  return FileUploaderField
}

/**
 * Get the component that matches a Formidable field.
 */
const getComponent = (field: FormidableField) => {
  if (field.type === 'submit') return
  const supported = {
    select: FormSelect,
    textarea: FormTextArea,
    checkbox: FormCheckboxGroup,
    phone: FormPhoneInput,
    default: FormInput,
    hidden: FormInputHidden,
    file: getFileComponent(field),
    html: FormHtml,
  }
  return supported[field.type] || supported.default
}

const returnToPage = () => {
  $modal.close(props.modalName)
}

const isFieldInRange = (field, actualOrder, nextOrder) => {
  const order = field.fieldManager.getOrder()
  return nextOrder
    ? order > actualOrder && order < nextOrder
    : order > actualOrder
}

const getSectionsForPage = (actualOrder, nextOrder) => {
  return sections.value['item_meta[0]'].filter((field) =>
    isFieldInRange(field, +actualOrder, +nextOrder),
  )
}

const generatePages = () => {
  for (const [i, actual] of pages.value.entries()) {
    const {
      hide_field: hideField,
      hide_field_cond: hideFieldCond,
      hide_opt: hideOpt,
    } = form.value.configuration.find((c) => c.id === actual.key)
      ?.field_options || {}
    const next = pages.value[i + 1]
    actual.hideField = hideField
    actual.hideFieldCond = hideFieldCond
    actual.hideOpt = hideOpt
    actual.sections = getSectionsForPage(actual.order, next?.order)
  }
}

const getOrderForTab = (key) => {
  return (
    sections.value['item_meta[0]']
      .find((field) => field.id === `item_meta[${key}]`)
      ?.fieldManager?.getOrder() || 0
  )
}

const generateTabs = () => {
  return Object.entries(form.value.rootLineTitles)
    .map(([key, value], index) => ({
      key,
      value,
      pageNumber: index + 1,
      isActive: false,
      order: getOrderForTab(key),
      sections: null,
    }))
    .sort((a, b) => a.order - b.order)
}

const getPages = () => {
  if (!form.value) return []

  pages.value = generateTabs()
  generatePages()

  if (pages.value.length > 0) {
    pages.value[0].isActive = true
  }
}

const submitPage = async () => {
  const isValid = await myForm.value?.validate()

  if (!isValid.valid) return
  if (!isLastPage.value) return moveToNextStep()

  try {
    await form.value.submit()
    trackFormSubmitEvent(props.formId as string)
    emit('setSuccess', form.value.fields)
    showSuccessMessage.value = true
  } catch (e) {
    showSuccessMessage.value = false
    const errors = getAdaptedFormidableErrors({
      errors: e?.message,
      form,
    })
    logError(errors)
  }
}

const moveToNextStep = () => {
  currentStep.value++
  deactivateAllTabs()
  activateCurrentTab()
  emit('page-number', currentStep.value)
}

const deactivateAllTabs = () => {
  pages.value.forEach((page) => {
    page.isActive = false
  })
}

const activateCurrentTab = (isBack = false) => {
  const currentPage = pages.value[currentStep.value - 1]
  if (currentPage.hideField?.length) {
    const field = form.value.fields.find(
      (f) => f.id === `field${currentPage.hideField[0]}`,
    )
    const shouldMoveToNextStep =
      currentPage.hideFieldCond[0] === '!='
        ? !field?.value.includes(currentPage.hideOpt[0])
        : field?.value.includes(currentPage.hideOpt[0])

    if (shouldMoveToNextStep) {
      if (pages.value.length > currentStep.value) {
        isBack ? moveToBackStep() : moveToNextStep()
      } else {
        submitPage()
      }
    } else {
      activatePage(currentPage)
    }
  } else {
    activatePage(currentPage)
  }
}

const activatePage = (page) => {
  page.isActive = true
}

const goToPage = async (pageNumber) => {
  if (currentStep.value === pageNumber) {
    return
  }

  const isValid = await myForm.value?.validate()

  if (isValid.valid) {
    currentStep.value = pageNumber
    deactivateAllTabs()
    activateCurrentTab()
  }
}

const moveToBackStep = () => {
  currentStep.value--
  deactivateAllTabs()
  activateCurrentTab(true)
  emit('page-number', currentStep.value)
}

const isLabelContactUsFormServices = (label: string) =>
  label.toLowerCase() === 'contact us form services'

const getFieldsFromSections = () => {
  let fields = []

  Object.keys(sections.value).forEach((sectionKey) => {
    const formFields = sections.value[sectionKey].filter(
      (field) => field.type !== 'divider',
    )
    fields = fields.concat(formFields)
  })

  return fields
}

const getCurrentFormValues = () => {
  const fields = getFieldsFromSections()

  return fields.reduce((hashTable, field) => {
    return { ...hashTable, [field.rawId]: field.rawValue || field.value }
  }, {})
}

const changeValue = (field, value) => {
  const isTypeofRequest =
    props.formId === config.public.fmGeneralContactFormId &&
    field.label === 'Type of Request' &&
    value === 'I am looking for a role at Benchmark'

  showJoinUsSection.value = isTypeofRequest

  if (isTypeofRequest) {
    sections.value['item_meta[0]'] = sections.value['item_meta[0]'].map(
      (item) => {
        if (item.label === 'Type of Request') return item
        return { ...item, visible: false }
      },
    )
    return
  }

  const formValues = getCurrentFormValues()
  sections.value['item_meta[0]'] = sections.value['item_meta[0]'].map(
    (item) => {
      item.fieldManager.setFormValues(formValues)
      return { ...item, visible: item.fieldManager.isVisible() }
    },
  )
}

const goToJoinUs = () => {
  $modal.close('contact')
  router.push('/join-us')
}

onMounted(async () => {
  isLoading.value = true
  form.value = await createForm(props.formId, props.defaultValues, {
    alwaysVisibleSectionIds: props.alwaysVisibleSectionIds,
    ignoreConditionals: props.ignoreConditionals,
  })
  sections.value = getSections()
  getPages()
  isLoading.value = false
})
</script>

<template>
  <div class="w-full">
    <TheLoader v-if="isLoading" />

    <template v-else>
      <client-only>
        <section v-if="successText && showSuccessMessage">
          <ContactSuccessMessage :message="successText" />

          <div class="flex flex-col items-center justify-center gap-y-2">
            <slot>
              <CommonButton
                v-if="modalName !== ''"
                variant="primary"
                class="text-lg"
                @click="returnToPage"
              >
                Return to page
              </CommonButton>
              <CommonButton v-else variant="primary" class="text-lg" link="/">
                Return to Homepage
              </CommonButton>
            </slot>
          </div>
        </section>

        <template v-else>
          <Form
            v-if="form && pages.length === 0"
            v-slot="{ isSubmitting, meta }"
            :initial-values="form.defaultValues"
            :class="{ 'with-services-of-interest': showServices }"
            @submit="handleSubmit"
          >
            <div
              :class="[
                'mb-5 grid w-full grid-cols-12 gap-x-0 gap-y-1',
                showServices ? 'lg:gap-x-8' : 'lg:gap-x-0',
              ]"
            >
              <div
                v-for="(field, index) in sections['item_meta[0]']"
                :key="field.id"
                class="w-full"
                :class="[
                  `form-column-${index}`,
                  {
                    hidden:
                      field.type === 'hidden' ||
                      !field.fieldManager.isVisible(),
                  },
                  getFieldClasses(field.fieldOptions.classes),
                ]"
              >
                <div
                  v-if="field.type === 'divider'"
                  :class="[
                    'grid grid-cols-12',
                    showServices ? 'gap-x-2 gap-y-1' : 'gap-2',
                  ]"
                >
                  <div
                    v-if="showLabels"
                    :class="[
                      'col-span-12 min-h-[36px]',
                      showServices ? 'mb-3 text-xl' : 'mb-4 text-2xl',
                    ]"
                  >
                    <h3
                      v-if="!isLabelContactUsFormServices(field.label)"
                      :class="[
                        'text-lg font-semibold text-black',
                        customLabelClass,
                      ]"
                    >
                      {{ field.label }}
                    </h3>
                  </div>
                  <template
                    v-for="fieldSection in sections[field.id]"
                    :key="fieldSection.id"
                  >
                    <component
                      :is="getComponent(fieldSection)"
                      v-bind="getProps(fieldSection)"
                      v-if="fieldSection.fieldManager.isVisible()"
                      v-model="fieldSection.value"
                      :class="
                        getFieldClasses(fieldSection.fieldOptions.classes)
                      "
                      @change="changeValue(fieldSection, $event)"
                    />
                  </template>
                </div>
                <div v-else class="w-full">
                  <component
                    :is="getComponent(field)"
                    v-bind="getProps(field)"
                    v-if="field.visible"
                    v-model="field.value"
                    :class="getFieldClasses(field.fieldOptions.classes)"
                    @change="changeValue(field, $event)"
                  />
                </div>
              </div>
            </div>

            <section v-if="!showJoinUsSection" :class="containerDetailsClasses">
              <div :class="containerButtonSendClasses">
                <CommonButton
                  data-testid="form-submit-button"
                  variant="primary"
                  type="submit"
                  :class="buttonSendClasses"
                  :disabled="!meta.valid || isSubmitting"
                  :show-spinner="isSubmitting"
                >
                  {{ textButton }}
                </CommonButton>
              </div>
              <div :class="detailsClasses">
                <slot name="details"></slot>
              </div>
            </section>
          </Form>
          <Form
            v-if="form && pages.length > 0"
            ref="myForm"
            v-slot="{ isSubmitting, meta }"
            :initial-values="form.defaultValues"
            :class="{ 'with-services-of-interest': showServices }"
            keep-values
            @submit="submitPage"
          >
            <h1 v-if="title" class="mb-10 text-2xl font-bold">
              {{ title }}
            </h1>

            <div
              v-if="pages.length && showTabSection"
              class="mb-4 flex justify-center gap-14 text-sm font-bold"
            >
              <div
                v-for="(page, index) in pages"
                :key="index"
                class="flex-shrink-0 basis-[114px] select-none"
                :class="{ 'cursor-pointer': !page.isActive }"
                @click="goToPage(page.pageNumber)"
              >
                <div
                  class="border-b-4 pb-1 uppercase"
                  :class="[
                    page.isActive
                      ? 'border-b-p-500 text-black'
                      : 'border-b-s-600 text-s-600',
                  ]"
                >
                  Step {{ page.pageNumber }}
                </div>
                <div
                  class="pt-2"
                  :class="[page.isActive ? 'text-black' : 'text-s-600']"
                >
                  {{ page.value }}
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(page, index) in pages"
                :key="index"
                class="font-base mb-3 mt-4 px-12"
              >
                <template v-if="page.isActive">
                  {{ page.value }}
                </template>
              </div>
            </div>

            <div v-for="page in pages" :key="page.key">
              <div
                v-if="page.isActive"
                :class="[
                  'mb-5 grid w-full grid-cols-12 gap-x-0 gap-y-1',
                  showServices ? 'lg:gap-x-8' : 'lg:gap-x-0',
                ]"
              >
                <section
                  v-for="(field, index) in page.sections"
                  :key="field.id"
                  class="mb-1 w-full"
                  :class="[
                    `form-column-${index}`,
                    {
                      hidden:
                        field.type === 'hidden' ||
                        !field.fieldManager.isVisible(),
                    },
                    getFieldClasses(field.fieldOptions.classes),
                  ]"
                >
                  <component
                    :is="getComponent(field)"
                    v-bind="getProps(field)"
                    v-model="field.value"
                    :class="getFieldClasses(field.fieldOptions.classes)"
                    :rules="
                      field.fieldManager.isVisible() && page.isActive
                        ? field.rules
                        : ''
                    "
                    @change="changeValue(field, $event)"
                  />
                </section>
              </div>
            </div>

            <section :class="containerDetailsClasses">
              <CommonButton
                data-testid="form-submit-button"
                variant="primary"
                type="submit"
                :class="buttonSendClasses"
                :disabled="!meta.valid || isSubmitting"
                :show-spinner="isSubmitting"
              >
                {{ textPaginationButton }}
              </CommonButton>
            </section>
          </Form>
          <div
            v-if="
              showJoinUsSection &&
              formId === $config.public.fmGeneralContactFormId
            "
            class="text-center"
          >
            <p class="mb-6 text-lg font-semibold">
              To find out more about Benchmark roles please visit our Careers
              page
            </p>
            <CommonButton variant="primary" @click="goToJoinUs">
              Careers Page
            </CommonButton>
          </div>
          <CommonFormLinkPrivacyPolicy
            v-if="showLinkPrivacyPolicy && !showJoinUsSection"
          />
        </template>
      </client-only>
    </template>
  </div>
</template>
