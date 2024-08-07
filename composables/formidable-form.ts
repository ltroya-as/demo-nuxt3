export function useFormidableForm() {
  const { $formidableFormBuilder } = useNuxtApp()

  const createForm = (formId, defaultValues, componentConfig) => {
    return $formidableFormBuilder.create(formId, defaultValues, componentConfig)
  }

  return { createForm }
}
