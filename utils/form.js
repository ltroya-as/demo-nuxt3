import extend from 'lodash/extend'
import { FormErrors } from '~/utils/form-errors'

class Form {
  busy = false
  successful = false
  errors = new FormErrors()

  constructor(contactFormId, data) {
    this.contactFormId = contactFormId
    this.dataKeys = Object.keys(data)

    extend(this, data)
  }

  startProcessing() {
    this.busy = true
    this.successful = false
    this.errors = new FormErrors()
  }

  finishProcessing() {
    this.busy = false
    this.successful = true

    setTimeout(() => {
      this.successful = false
    }, 3000)
  }

  setError(key, message) {
    this.errors.setError(key, message)
  }

  setErrors(errors) {
    this.errors.set(errors)
    this.busy = false
  }

  hasErrors() {
    return this.errors.hasErrors()
  }

  resetStatus() {
    this.busy = false
    this.errors = new FormErrors()
  }

  reset() {
    this.dataKeys.forEach((key) => (this[key] = ''))
  }

  json() {
    return this.dataKeys.reduce((object, key) => {
      return { ...object, [key]: this[key] }
    }, {})
  }

  formData() {
    const formData = new FormData()
    this.dataKeys.forEach((key) => {
      // Add multi-value fields (e.g., checkboxes,
      // multiselect dropdowns).
      if (typeof this[key] === 'object' && !(this[key] instanceof File)) {
        for (const option in this[key]) {
          if (this[key][option]) {
            formData.append(`${key}[]`, option)
          }
        }
      } else {
        // Add single-value fields (e.g., regular
        // input fields).
        formData.append(key, this[key])
      }
    })
    return formData
  }
}

export { Form }
