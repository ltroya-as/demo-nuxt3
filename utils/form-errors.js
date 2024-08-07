class FormErrors {
  errors = {}

  get(key) {
    return this.errors[key] ? this.errors[key] : null
  }

  set(errors) {
    this.errors = errors
  }

  hasErrors() {
    return Object.keys(this.errors).length
  }

  setError(key, message) {
    this.errors[key] = message
  }
}

export { FormErrors }
