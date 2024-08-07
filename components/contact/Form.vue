<template>
  <client-only>
    <Form ref="observer" as="">
      <form @submit.prevent="submit">
        <div class="flex flex-col gap-12 lg:flex-row">
          <section :class="showServices && 'w-full lg:w-1/2'">
            <div class="flex w-full flex-col gap-x-3 md:flex-row">
              <CommonFormInput
                v-model="form['first-name']"
                name="First name"
                rules="required"
                class="w-full"
                data-testid="contact-form--first-name"
                label="First Name"
                help-text="* Required"
                :bg-color="bgField"
                :initial-focus="initialFocus"
              />
              <CommonFormInput
                v-model="form['last-name']"
                name="Last name"
                rules="required"
                class="w-full"
                data-testid="contact-form--last-name"
                label="Last Name"
                help-text="* Required"
                :bg-color="bgField"
              />
            </div>
            <CommonFormInput
              v-model="form['email']"
              name="Email"
              rules="required|email"
              data-testid="contact-form--email"
              label="Email"
              help-text="* Required"
              class="w-full"
              :bg-color="bgField"
            />

            <div class="w-full">
              <CommonFormPhoneInput
                v-model="form['phone']"
                name="Phone"
                rules="required"
                data-testid="contact-form--phone"
                help-text="* Required"
              />
            </div>
            <CommonFormInput
              v-model="form['company']"
              name="Company"
              rules="required"
              data-testid="contact-form--company"
              label="Company Name"
              help-text="* Required"
              class="w-full"
              :bg-color="bgField"
            />

            <CommonFormInput
              v-model="form['job-title']"
              data-testid="contact-form--job-title"
              label="Job Title"
              class="w-full"
              :bg-color="bgField"
            />
            <CommonFormSelect
              v-model="form['company-category']"
              name="company-category"
              rules="required"
              data-testid="contact-form--company-category"
              label="Company Category"
              help-text="* Required"
              class="w-full"
              :options="options['company-category']"
              :bg-color="bgField"
            />
          </section>

          <section v-if="showServices" class="w-full lg:w-1/2">
            <p class="text-xl font-bold">Select services of interest:</p>

            <p class="mb-2 mt-4 text-base font-bold uppercase">
              Price assessments
            </p>

            <div
              class="flex flex-wrap gap-x-6 gap-y-2"
              data-testid="form-price-assessments"
            >
              <CommonFormCheckbox
                v-for="(value, label) in form['price-assessments']"
                :key="label"
                v-model="form['price-assessments'][label]"
                :label="label"
              />
            </div>

            <p class="mb-2 mt-4 text-base font-bold uppercase">
              Market Assessments
            </p>
            <div
              class="flex flex-wrap gap-x-6 gap-y-2"
              data-testid="form-market-assessments"
            >
              <CommonFormCheckbox
                v-for="(value, label) in form['market-assessments']"
                :key="label"
                v-model="form['market-assessments'][label]"
                :label="label"
              />
            </div>

            <p class="mb-2 mt-4 text-base font-bold uppercase">Forecasts</p>
            <div
              class="flex flex-wrap gap-x-6 gap-y-2"
              data-testid="form-forecasts"
            >
              <CommonFormCheckbox
                v-for="(value, label) in form['forecasts']"
                :key="label"
                v-model="form['forecasts'][label]"
                :label="label"
              />
            </div>

            <p class="mb-2 mt-4 text-base font-bold uppercase">ESG</p>
            <div class="flex flex-wrap gap-x-6 gap-y-2" data-testid="form-esg">
              <CommonFormCheckbox
                v-for="(value, label) in form['esg']"
                :key="label"
                v-model="form['esg'][label]"
                :label="label"
              />
            </div>

            <p class="mb-2 mt-4 text-base font-bold uppercase"
              >Other Services</p
            >
            <div class="flex flex-wrap gap-x-6 gap-y-2">
              <CommonFormCheckbox
                v-for="(value, label) in form['other-services']"
                :key="label"
                v-model="form['other-services'][label]"
                :label="label"
              />
            </div>
          </section>
        </div>

        <div
          class="mt-11 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div class="mb-8 flex items-center gap-3.5 md:mb-0">
            <p class="text-xs uppercase">Prefer to contact us?</p>
            <a
              href="mailto:priority@benchmarkminerals.com?subject=Benchmark Minerals: Contact"
              class="text-p-500 font-bold"
              >Email us</a
            >
          </div>

          <CommonButton
            variant="primary"
            data-testid="contact-send"
            class="px-9 text-lg"
          >
            Send
          </CommonButton>
        </div>
      </form>
    </Form>
  </client-only>
</template>

<script>
import { Form } from 'vee-validate'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import { Form as FormClass } from '~/utils/form'

export default {
  components: {
    Form,
  },
  props: {
    contactFormId: {
      type: Number,
      required: true,
    },
    showServices: {
      type: Boolean,
      default: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    initialFocus: {
      type: Boolean,
      default: true,
    },
    initialValues: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      form: null,

      message: '',

      formattedPhone: '',

      options: {
        'company-category': [
          { value: 'Raw material supplier', label: 'Raw material supplier' },
          {
            value: 'Advanced material supplier',
            label: 'Advanced material supplier',
          },
          { value: 'End user', label: 'End user' },
          { value: 'Corporate investor', label: 'Corporate investor' },
          { value: 'Private investor', label: 'Private investor' },
          { value: 'Research', label: 'Research' },
          { value: 'Government', label: 'Government' },
          { value: 'Individual', label: 'Individual' },
        ],
        'country-prefixes': [],
      },
    }
  },

  computed: {
    bgField() {
      return this.$theme.colors.s['50']
    },
    initialFields() {
      return this.$store.state.modal.initialFields
    },
    modalOpen() {
      return this.$store.state.modal.contactOpen
    },
    companyCategoryValues() {
      return this.options['company-category'].map((c) => c.value)
    },
  },

  watch: {
    modalOpen() {
      this.reset()
    },
    initialFields() {
      this.reset()
    },
  },

  created() {
    this.reset()
  },

  methods: {
    setFormattedPhone({ formatInternational }) {
      this.formattedPhone = formatInternational
    },

    reset() {
      this.form = new FormClass(this.contactFormId, {
        'first-name': '',
        'last-name': '',
        email: '',
        'country-code': 'US',
        phone: '',
        'job-title': '',
        'company-category': '',
        company: '',
        'price-assessments': {
          Lithium: false,
          Cobalt: false,
          'Natural Graphite': false,
          Nickel: false,
          'Synthetic Graphite': false,
        },
        'market-assessments': {
          Cathodes: false,
          Anodes: false,
          'Battery Gigafactories': false,
        },
        forecasts: {
          Lithium: false,
          Cobalt: false,
          'Natural Graphite': false,
          Nickel: false,
          'Synthetic Graphite': false,
          Manganese: false,
          'Lithium ion Battery Database': false,
          'Solid State': false,
          Recycling: false,
        },
        esg: {
          Lithium: false,
          'ESG Consultancy': false,
          'Life Cycle Assessments': false,
        },
        'other-services': {
          Membership: false,
          Consultancy: false,
        },
      })

      if (!isEmpty(this.initialValues)) {
        merge(this.form, this.initialValues)
      }

      this.$nextTick(() => {
        if (this.$refs?.observer) {
          this.$refs.observer.reset()
        }
      })
    },

    async submit() {
      const isFormValid = await this.$refs.observer.validate()

      if (isFormValid) {
        this.form.phone = this.formattedPhone

        await this.$contactForm7.submit(this.form)

        if (this.form.successful) {
          this.reset()
          this.$emit('set-success', true)
        }
      }
    },
  },
}
</script>
