import { defineNuxtPlugin } from 'nuxt/app'
import { FormidableForm } from '@/utils/formidable-form'

export default defineNuxtPlugin((nuxtApp) => {
  const { $config, $httpClient, $store }: any = nuxtApp

  const create = (formId, defaultValues = {}, componentConfig = {}) => {
    return FormidableForm.create(
      formId,
      defaultValues,
      componentConfig,
      $config,
      $httpClient,
      $store,
    )
  }

  return {
    provide: {
      formidableFormBuilder: {
        create,
      },
    },
  }
})
