import groupBy from 'lodash/groupBy'
import axios from 'axios'
import FieldManager from '~/utils/field-manager'
import { FORMIDABLE_WEBSITE_URL_LABEL } from '~/utils/constants'

export class FormidableForm {
  busy = false
  successful = false
  configuration
  formId
  errors = {}
  defaultValues
  componentConfig
  rootLineTitles
  fields
  $config
  $httpClient

  /**
   * Constructor to create a new Formidable Form instance.
   * This is a private constructor, you shouldn't use this
   * directly. Instead, create a form via $this.$formidableFormBuilder.create(FORM_ID)
   * because we need some nuxt context to setup up the form.
   *
   * @param {String|Number} formId - Formidable form id
   * @param {Object} defaultValues
   * @param componentConfig
   */
  constructor(
    formId,
    defaultValues,
    componentConfig,
    rootLineTitles,
    $config,
    $httpClient,
  ) {
    this.formId = formId
    this.componentConfig = componentConfig
    this.rootLineTitles = rootLineTitles
    this.defaultValues = defaultValues
    this.$config = $config
    this.$httpClient = $httpClient
  }

  /**
   * Get url to get the form configuration
   *
   * @returns String
   */
  getFormSettingsUrl() {
    return `${this.$config.public.apiRestBasedEndpoint}/frm/v2/forms/${this.formId}`
  }

  /**
   * Get url to get the form configuration
   *
   * @returns String
   */
  getFormConfigurationUrl() {
    return `${this.$config.public.apiRestBasedEndpoint}/frm/v2/forms/${this.formId}/fields`
  }

  /**
   * Get url to create a new entry
   *
   * @returns String
   */
  getNewEntryUrl() {
    return `${this.$config.public.apiRestBasedEndpoint}/frm/v2/entries`
  }

  /**
   * Create the rules for the vee-validate's Validation Provider
   *
   * @param {*} fieldConfiguration - field configuration with all the properties such name, type, and so on....
   * @returns
   */
  buildRules(fieldConfiguration) {
    const rules = []

    if (+fieldConfiguration.required) {
      rules.push('required')
    }

    if (fieldConfiguration.type === 'number') {
      rules.push(
        `minmax:${fieldConfiguration.field_options.minnum},${fieldConfiguration.field_options.maxnum}`,
      )
    }

    if (fieldConfiguration.type === 'email') {
      rules.push('email')
    }

    if (fieldConfiguration.field_options.classes.includes('business-email')) {
      rules.push('businessEmail')
    }

    return rules.join('|')
  }

  isWebsiteUrlField(label) {
    return label.toLowerCase() === FORMIDABLE_WEBSITE_URL_LABEL
  }

  /**
   * Get the default value for the input. It uses the
   * property `defaultValues` to know if the is a default
   * value for the form input
   *
   * @param {String} name - form name
   * @param type
   * @param label
   * @returns string|[]|any
   */
  getValue(name, type, label) {
    const key = Object.keys(this.defaultValues || {}).find((k) => k === name)

    // Website/url should always have the current path without any other query params
    // E.g, /blog/this-is-a-post instead of /blog/this-is-a-post?utm_source=benchmarkminerals
    if (this.isWebsiteUrlField(label)) {
      return window.location.pathname
    }

    if (key) {
      return this.defaultValues[key]
    }

    if (['checkbox', 'file'].includes(type)) {
      return []
    }

    return ''
  }

  /**
   * Build the configuration for each field based on the response
   * of the formidable entries' request.
   */
  buildFieldConfiguration() {
    this.fields = this.configuration
      .filter((config) => {
        return config.type !== 'end_divider' && config.type !== 'submit'
      })
      .map((config) => {
        const fieldManager = new FieldManager(
          this.configuration,
          window.location.pathname,
          config,
          this.componentConfig,
        )
        const { field_options: fieldOptions } = config
        const name = `item_meta[${config.id}]`
        return {
          name,
          id: name,
          rawId: config.id,
          for: name,
          description: config.description,
          in_section: `item_meta[${fieldOptions.in_section}]`,
          value: this.getValue(name, config.type, config.name),
          rawValue: undefined,
          label: config.name,
          type: config.type,
          key: `field${config.id}`,
          // Sometimes formidable return array-like objects,
          // for that reason, we check if the options value is an array
          options:
            config.options instanceof Array
              ? config.options
              : Object.values(config.options),
          fieldOptions,
          required: !!+config.required,
          placeholder: fieldOptions.placeholder,
          rules: this.buildRules(config),
          visible: fieldManager.isVisible(),
          fieldManager,
        }
      })
  }

  getSections() {
    return groupBy(this.fields, (f) => f.in_section)
  }

  /**
   * Upload the files from the file's component to the wordpress media library
   *
   * @param {array} files
   * @returns
   */
  async uploadToMediaLibrary(files) {
    const formData = new FormData()
    files.forEach(({ file }, index) => {
      formData.append(`file-${index}`, file, file.name)
    })

    const { data: attachmentIds } = await axios({
      method: 'post',
      url: `${this.$config.public.apiRestEndpoint}/formidable/${this.formId}/upload`,
      data: formData,
    })

    return attachmentIds
  }

  /**
   * Set some flags before submitting the form, such as,
   * `busy` which means the form is being sent to the
   * backend
   */
  startProcessing() {
    this.successful = false
    this.busy = true
  }

  /**
   * Reset some fields when a error happens when submitting the form
   */
  onError() {
    this.successful = false
    this.busy = false
  }

  /**
   * Set some flags after the form is being submitted
   */
  finishProcessing() {
    this.busy = false
    this.successful = true
    this.errors = {}

    this.reset()

    // Reset the `successful` field in case you are using
    // it to display a successful message
    setTimeout(() => (this.successful = false), 4000)
  }

  /**
   * Reset all field's values
   */
  reset() {
    this.fields = this.fields.map((field) => {
      if (this.isWebsiteUrlField(field.label)) {
        return field
      }

      return {
        ...field,
        value: ['checkbox', 'file'].includes(field.type) ? [] : '',
      }
    })
  }

  /**
   * Create a formData with the data of all fields
   * to be sent to the backend
   *
   * @returns FormData
   */
  formData(fields = null) {
    const formData = new FormData()
    formData.append('form_id', this.formId)
    const formFields = fields || this.fields

    formFields.forEach((field) => {
      if (['checkbox', 'file'].includes(field.type)) {
        field.value.forEach((option) => {
          formData.append(`${field.name}[]`, option)
        })
        return
      }

      let value = field.rawValue || field.value
      if (field.type === 'phone') {
        // We remove whitespace in the phone number because formidable form
        // throws an error if the phone number has whitespace
        value = value.replace(/ /g, '')
      }

      // We use rawValue on the Phone Component because it uses
      // two values one for the v-model and the other for the phone number plus extension
      formData.append(field.name, value || '')
    })

    return formData
  }

  /**
   * This method upload the files to the media library before sending the information to Formidable
   *
   * Notes:
   *  - We assume there's only on file input field per form
   *  - Formidable expects a list of attachments id's
   */
  async uploadFiles() {
    const fileInput = this.fields.find((field) => field.type === 'file')
    if (fileInput) {
      fileInput.value = await this.uploadToMediaLibrary(fileInput.value)
    }
  }

  /**
   * Send the information to the backend.
   */
  async submit(fields = null) {
    this.startProcessing()

    await this.uploadFiles()
    this.formData(fields)
    await this.$httpClient.post(this.getNewEntryUrl(), this.formData(fields))
    this.finishProcessing()
  }

  /**
   * Create a Formidable Form's form instance. You should always
   * use the formidable form nuxt plugin to create new instances.
   *
   * @param {String|Number} formId
   * @param defaultValues
   * @param componentConfig
   * @returns
   */
  static async create(
    formId,
    defaultValues,
    componentConfig,
    $config,
    $httpClient,
    $store,
  ) {
    const form = new FormidableForm(
      formId,
      defaultValues,
      componentConfig,
      {},
      $config,
      $httpClient,
    )

    let configuration = $store.getters['forms/retrieve'](formId)

    const {
      options: { rootline_titles: rootLineTitles },
    } = await axios
      .get(form.getFormSettingsUrl())
      .then((response) => response.data)

    if (!configuration) {
      configuration = await axios
        .get(form.getFormConfigurationUrl())
        .then((response) => response.data)
    }

    form.configuration = Object.values(configuration)
    form.rootLineTitles = rootLineTitles
    form.buildFieldConfiguration()

    $store.commit('forms/save', { formId, configuration })

    return form
  }
}
