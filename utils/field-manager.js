/**
 * Field Manager allow to handle formidable form configuration
 * per field.
 *
 * It will be easier if we centralize all of that management in one place.
 */
export default class FieldManager {
  fieldConfigurations
  fieldConfiguration
  path
  websiteUrlId
  formValues = {}

  /**
   * Field Manager constructor
   *
   * @param {*} fieldConfigurations       - since conditions are based on field values. That's the reason why we receive all of them
   * @param {*} currentPath               - [server param="REQUEST_URI"] doesn't work through API. That's why we received it on page loads.
   * @param {*} currentFieldConfiguration - current file configuration to evaluate
   * @param componentConfig
   */
  constructor(
    fieldConfigurations,
    currentPath,
    currentFieldConfiguration,
    componentConfig = {},
  ) {
    this.path = currentPath
    this.fieldConfiguration = currentFieldConfiguration
    this.componentConfig = componentConfig
    this.alwaysVisibleSectionIds =
      this.componentConfig.alwaysVisibleSectionIds || []
    this.ignoreConditionals = this.componentConfig.ignoreConditionals || false

    this.fieldConfigurationsToHashTable(fieldConfigurations)
    this.findWebsiteUrlId()
  }

  /**
   * Find the id of the website/url, that field is special because its
   * value depends on the current url the user is on.
   */
  findWebsiteUrlId() {
    const websiteUrlConfiguration = Object.values(
      this.fieldConfigurations,
    ).find((fieldConfiguration) => {
      return fieldConfiguration.name.toLowerCase() === 'website/url'
    })

    if (websiteUrlConfiguration) {
      this.websiteUrlId = websiteUrlConfiguration.id
    }
  }

  /**
   * Convert field configurations to hash table, so it is easy to access them
   * when checking the visibility of the field
   *
   * @param {*} fieldConfigurations
   */
  fieldConfigurationsToHashTable(fieldConfigurations) {
    this.fieldConfigurations = fieldConfigurations.reduce(
      (hashTable, configuration) => ({
        ...hashTable,
        [configuration.id]: configuration,
      }),
      {},
    )
  }

  /**
   * Check if the file is hidden based on a field condition\
   *
   * @returns
   */
  isHidden() {
    if (this.noConditions || !this.isHidingField || this.ignoreConditionals) {
      return false
    }

    return this.checkConditions()
  }

  /**
   * Check if a section is shown or not.
   *
   * @returns boolean
   */
  isShown() {
    if (this.noConditions || !this.isShownField) {
      return true
    }

    return this.checkConditions()
  }

  /**
   * Check if a section is visible or not.
   *
   * @returns boolean
   */
  isVisible() {
    const isAlwaysVisible = this.alwaysVisibleSectionIds.find((id) => {
      return id === +this.fieldConfiguration.id
    })

    if (isAlwaysVisible || this.ignoreConditionals) {
      return true
    }

    return !this.isHidden() && this.isShown()
  }

  /**
   * Check if the formidable form condition is true based on:
   * - Form values
   * - Formidable form conditions
   * - Url of the site if the field visibility depends on that.
   *
   * @returns boolean
   */
  checkConditions() {
    const fieldIds = this.fieldOptions.hide_field
    const conditions = this.fieldOptions.hide_field_cond
    const values = this.fieldOptions.hide_opt
    const method = this.fieldOptions.any_all === 'any' ? 'some' : 'every'

    return fieldIds?.[method]((fieldId, index) => {
      const fieldValue = this.getValue(
        fieldId,
        this.fieldConfiguration.default_value,
      )
      const conditionValue = values[index]
      const operator = conditions[index]

      if (Array.isArray(fieldValue)) {
        return this.checkArrayValues(fieldValue, conditionValue, operator)
      }

      return this.checkValues(fieldValue, conditionValue, operator)
    })
  }

  /**
   * Check if the value is included on the array.
   *
   * @param {Array} fieldValue
   * @param {String} conditionValue
   * @param {String} operator
   * @returns
   */
  checkArrayValues(fieldValue, conditionValue, operator) {
    operator = operator.toLowerCase()

    if (operator === 'like' || operator === '==') {
      return fieldValue.includes(conditionValue)
    }

    return !fieldValue.includes(conditionValue)
  }

  /**
   * Check if the value matches the string configured on formidable form
   *
   * @param {String} fieldValue
   * @param {String} conditionValue
   * @param {String} operator
   * @returns
   */
  checkValues(fieldValue, conditionValue, operator) {
    operator = operator.toLowerCase()

    if (operator === 'like') {
      return fieldValue.includes(conditionValue)
    }

    if (operator === 'not like') {
      return !fieldValue.includes(conditionValue)
    }

    if (operator === '!=') {
      return fieldValue !== conditionValue
    }

    return fieldValue === conditionValue
  }

  /**
   * Set form values. The structure received is: {[key]: value}
   *
   * @param {Object} formValues
   * @returns
   */
  setFormValues(formValues) {
    this.formValues = formValues
    return this
  }

  /**
   * Get the value of the form field.
   *
   * @param {String} fieldId
   * @param {String|Array} defaultValue
   * @returns
   */
  getValue(fieldId, defaultValue) {
    if (fieldId === this.websiteUrlId) {
      return this.path
    }

    if (this.formValues[fieldId]) {
      return this.formValues[fieldId]
    }

    return defaultValue
  }

  getOrder() {
    return this.fieldOrder
  }

  /**
   * Check if the current field has conditions
   *
   * @returns
   */
  get noConditions() {
    return this.fieldOptions?.hide_field?.length === 0
  }

  /**
   * Check if the condition of the field is set up to hide the field
   */
  get isHidingField() {
    return this.fieldOptions.show_hide === 'hide'
  }

  /**
   * Check if the condition of the field is set up to show the field
   */
  get isShownField() {
    return this.fieldOptions.show_hide === 'show'
  }

  /**
   * File options of the current field configuration
   */
  get fieldOptions() {
    return this.fieldConfiguration.field_options
  }

  /**
   * order of current field
   */
  get fieldOrder() {
    return Number(this.fieldConfiguration.field_order)
  }
}
