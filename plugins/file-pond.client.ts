import { defineNuxtPlugin } from 'nuxt/app'
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js'

// Import styles
import 'filepond/dist/filepond.min.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Create FilePond component
  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
  ) as any

  nuxtApp.vueApp.component('FilePond', FilePond)
})
