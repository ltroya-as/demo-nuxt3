import focusable from 'focusable'

/*
  Usage:
    Specify the modal name within the data.modalName
    property (e.g., 'modal', 'contact', etc.).
*/

export default {
  data() {
    return {
      focusBackup: null,
      focusableElements: [],
      lastFocusedElement: null,
    }
  },

  computed: {
    modalOpen() {
      return this.$store.state.modal[`${this.modalName}Open`]
    },
  },

  watch: {
    modalOpen(open) {
      open && this.handleOpen()

      this.toggleScrollOnBody(open)
    },
  },

  methods: {
    handleOpen() {
      if (!this.modalOpen) return

      // 1. Backup current focused element.
      this.backupFocus()
      // 2. Map all focusable elements within the modal.
      this.mapFocusableElements()
      // 3. Focus the first focusable element within the modal.
      this.setInitialFocus()
      document.addEventListener('keyup', this.handleKeyDown)
    },

    handleClose() {
      this.$modal.close(this.modalName)
      this.$store.commit('modal/setInitialFields', {})
      // 4. Restore focus position.
      this.restoreFocus()
      document.removeEventListener('keyup', this.handleKeyDown)
    },

    handleKeyDown(e) {
      if (e.key === 'Escape') this.handleClose()
      if (e.key === 'Tab') this.trapFocus(e)
    },

    backupFocus() {
      this.focusBackup = document.activeElement
    },

    mapFocusableElements() {
      this.focusableElements = this.$el.querySelectorAll(focusable)
    },

    setInitialFocus() {
      // We don't know for sure the element of the first focusable element.
      // For that reason, we try to find the first input element, and we focused
      // after that.
      let firstFocusableInput = null
      for (const element of this.focusableElements) {
        if (
          ['input', 'textarea', 'button'].includes(
            element?.tagName.toLowerCase(),
          )
        ) {
          firstFocusableInput = element
          break
        }
      }

      firstFocusableInput?.focus()
    },

    trapFocus(e) {
      if (!this.focusableElements.length) return

      const lastEl = this.focusableElements[this.focusableElements.length - 1]
      const firstEl = this.focusableElements[0]
      const activeEl = document.activeElement

      // Tab backwards
      if (e.shiftKey && activeEl === firstEl) {
        lastEl.focus()
        e.preventDefault()
      }

      // Tab forward
      if (!e.shiftKey && activeEl === lastEl) {
        firstEl.focus()
        e.preventDefault()
      }
    },

    restoreFocus() {
      this.focusBackup?.focus()
    },

    toggleScrollOnBody(open) {
      setTimeout(() => {
        document.body.classList[open ? 'add' : 'remove']('container-app')
      }, 100)
    },
  },
}
