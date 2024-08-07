import { defineRule, configure } from 'vee-validate'
import { required, email, confirmed, min } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { blackListEmails } from '~/constants/blackListEmail'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('confirmed', confirmed)
  defineRule('min', min)
  defineRule('email', email)
  defineRule('minmax', (value, [min, max]) => value >= +min && value <= +max)
  defineRule(
    'businessEmail',
    (value) =>
      !blackListEmails.some((blacklisted) => value.includes(blacklisted)),
  )

  configure({
    generateMessage: localize('en', {
      messages: {
        email: 'The email is invalid',
        required: '{field} cannot be empty',
        minmax: '{field} must be between {min} and {max}',
        min: '{field} must has a minimum length of {length}',
        confirmed: '{field} must match',
        businessEmail: 'Please enter a valid company email',
      },
      fields: {
        'company-category': {
          required: 'A company category must be selected',
        },
        industry: {
          required: 'An Industry must be selected',
        },
        revenue: {
          required: 'A year revenue range must be selected',
        },
      },
    }),
  })
})
