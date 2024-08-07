<template>
  <div class="mb-4">
    <p class="my-2 text-xs font-bold">Password Strength</p>

    <div v-for="key in Object.keys(passwordCriteria)" :key="key">
      <div class="mb-1 mt-2 flex items-center gap-x-1">
        <svg
          v-if="!passwordCriteria[key].passed"
          width="12"
          height="12"
          viewBox="0 0 10 11"
          stroke="#B00020"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6.5L5 5.5M5 5.5L6 4.5M5 5.5L4 4.5M5 5.5L6 6.5M9.5 5.5C9.5 7.98528 7.48528 10 5 10C2.51472 10 0.5 7.98528 0.5 5.5C0.5 3.01472 2.51472 1 5 1C7.48528 1 9.5 3.01472 9.5 5.5Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-if="passwordCriteria[key].passed"
          width="12"
          height="12"
          viewBox="0 0 14 14"
          stroke="#219653"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7L6.33333 8.33333L9 5.66667M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-sm">{{ passwordCriteria[key].label }}</p>
      </div>
    </div>

    <div
      id="password-strength-bar"
      class="bg-s-400 relative mt-2 h-5 rounded-full"
    >
      <div ref="progress" class="h-full rounded-full transition-all"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
      required: true,
    },

    confirmationValue: {
      type: String,
      required: true,
    },
  },

  data() {
    const passwordCriteria = {
      atLeastEight: {
        label: 'At least 8 characters',
        passed: false,
      },
      oneUpper: {
        label: 'One upper case letter',
        passed: false,
      },
      oneLower: {
        label: 'One lower case letter',
        passed: false,
      },
      oneNumerical: {
        label: 'One numerical character',
        passed: false,
      },
      passwordsMatch: {
        label: 'Passwords match',
        changed: false,
        passed: false,
      },
    }
    const defaultPasswordCriteriaState = JSON.parse(
      JSON.stringify(passwordCriteria),
    )
    return {
      criteriaPercentage: 0,
      passwordCriteria,
      defaultPasswordCriteriaState,
    }
  },

  watch: {
    criteriaPercentage(newValue) {
      const isValid = newValue === 100
      let barColor = ''

      if (isValid) barColor = '#2ca900'
      else if (newValue < 34) barColor = '#d94761'
      else barColor = '#fdaf00'

      this.$refs.progress.style.width = newValue + '%'
      this.$refs.progress.style.backgroundColor = barColor

      this.$emit('isValid', isValid)
    },

    inputValue(newValue) {
      if (!newValue) {
        this.resetEverything()
        return
      }

      const pass = newValue
      const len = newValue.length
      const regexOneNumber = /\d/g
      const regexOneCapitalLetter = /[A-Z]/g
      const regexOneLowerLetter = /[a-z]/g
      const charsCriteria = 8
      const oneFifth = 100 / 5

      this.criteriaPercentage = 0
      this.passwordCriteria.oneNumerical.passed = false
      this.passwordCriteria.oneUpper.passed = false
      this.passwordCriteria.atLeastEight.passed = false

      if (pass.match(regexOneNumber)) {
        this.criteriaPercentage += oneFifth
        this.passwordCriteria.oneNumerical.passed = true
      }

      if (pass.match(regexOneCapitalLetter)) {
        this.criteriaPercentage += oneFifth
        this.passwordCriteria.oneUpper.passed = true
      }

      if (pass.match(regexOneLowerLetter)) {
        this.criteriaPercentage += oneFifth
        this.passwordCriteria.oneLower.passed = true
      }

      this.checkPasswordMatchValidation(this.confirmationValue, this.inputValue)

      if (len < charsCriteria) {
        const atLeastEightCharsPercentage = oneFifth * (len / charsCriteria)
        this.criteriaPercentage += atLeastEightCharsPercentage
      } else {
        this.criteriaPercentage += oneFifth
        this.passwordCriteria.atLeastEight.passed = true
      }
    },

    confirmationValue(newPasswordConfirmationValue) {
      this.checkPasswordMatchValidation(
        newPasswordConfirmationValue,
        this.inputValue,
      )
    },
  },

  methods: {
    resetEverything() {
      this.criteriaPercentage = 0
      this.passwordCriteria = JSON.parse(
        JSON.stringify(this.defaultPasswordCriteriaState),
      )
    },

    checkPasswordMatchValidation(passwordConfirmationValue, inputValue) {
      if (
        passwordConfirmationValue &&
        passwordConfirmationValue === inputValue
      ) {
        if (!this.passwordCriteria.passwordsMatch.changed) {
          this.criteriaPercentage += 20
          this.passwordCriteria.passwordsMatch.changed = true
        }
        this.passwordCriteria.passwordsMatch.passed = true
      } else {
        if (this.passwordCriteria.passwordsMatch.changed) {
          this.criteriaPercentage -= 20
          this.passwordCriteria.passwordsMatch.changed = false
        }
        this.passwordCriteria.passwordsMatch.passed = false
      }
    },
  },
}
</script>
