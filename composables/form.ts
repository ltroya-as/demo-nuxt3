import { type SubmissionHandler, useField, validate } from 'vee-validate'
import type { Ref } from 'vue'
import type { VueInstance } from '@vueuse/core'
import type { CheckboxGroupOption } from '~/models/formidable'

/**
 * Builds a submit callback for you to pass to Vee Validate's Form
 * component.
 *
 * @param {Function} fetcher The function that is going to be called
 *   with the form data.
 *
 * @param {Object} initialValues An object with your form fields as
 *  and their initial values.
 *
 * @param {Object} onSuccess A callback for the success event.
 *
 * @param {Object} onError A callback for the error event.
 *
 * @returns {Object} A object with:
 *    - `form`: A reactive representation of your form's data.
 *    - `handleSubmit`: a handler for you to pass to v-on:submit in
 *      Vee Validate's Form component.
 *    - `successMessage`: a reactive value that is populated if
 *      the request succedes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useForm<_, FieldsType extends {}>({
  fetcher,
  initialValues,
  onSuccess,
  onError,
}: {
  fetcher: Function
  initialValues: FieldsType
  onSuccess?: Function
  onError?: Function
}) {
  const successMessage = ref('')

  const handleSubmit: SubmissionHandler = async (
    values,
    { resetForm, setFieldError },
  ) => {
    try {
      const response = await fetcher(values)

      if (response?.message) {
        successMessage.value = response.message
      }

      resetForm({ values: initialValues })

      if (onSuccess) onSuccess()
    } catch (error) {
      if (onError) onError({ error, setFieldError, form: initialValues })
    }
  }

  return {
    form: reactive({ ...initialValues }),
    handleSubmit,
    successMessage,
  }
}

/**
 * Returns a function to toggle all the values in a Vee Validate's
 * checkbox fieldset (`toggleAll`), and a reactive variable to track whether
 * the whole checkbox fieldset is selected or not (`isToggleOn`).
 *
 * @param {String} fieldsetName A Vee Validate's checkbox field
 *    name.
 *
 * @param {String} fieldsetRules Vee Validate's checkbox field
 *    name.
 *
 * @param {Array} fieldsetOptions The list of possible options
 *    within that fieldset.
 */
export function useToggleField({
  fieldsetName,
  fieldsetRules,
  fieldsetOptions,
}: {
  fieldsetName: string
  fieldsetRules: string
  fieldsetOptions: CheckboxGroupOption[]
}) {
  const isToggleOn = ref(false)

  const { value: selectedOptions, setValue } = useField(
    fieldsetName,
    fieldsetRules,
    { type: 'checkbox' },
  )

  watch(
    () => selectedOptions.value,
    (options: string[]) => {
      if (options?.length === fieldsetOptions.length) {
        isToggleOn.value = true
      } else {
        isToggleOn.value = false
      }
    },
  )

  const toggleAll = () => {
    isToggleOn.value = !isToggleOn.value

    if (isToggleOn.value) {
      const allOptions = fieldsetOptions.map((option) => option.label)
      setValue(allOptions)
    } else {
      setValue([])
    }
  }

  return {
    toggleAll,
    isToggleOn,
  }
}

/**
 * Triggers the blur event (and therefore the onBlur validation)
 * as soon as `modelValue` becomes valid.
 *
 * @param {String} field A Vue reference of the field.
 *
 * @param {String} modelValue The model you want to watch.
 *
 * @param {Array} rules The Vee Validate rules for this field.
 */
export function useValidFieldTracker(
  field: Ref<VueInstance>,
  modelValue: Ref<unknown>,
  rules: string,
) {
  watch(modelValue, async (value) => {
    const { valid } = await validate(value, rules)

    if (valid) {
      field.value.$el.dispatchEvent(new Event('blur'))
    }
  })
}
