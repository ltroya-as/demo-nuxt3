<template>
  <client-only>
    <Form ref="proposal" as="">
      <form @submit.prevent="submit">
        <div class="flex flex-col gap-4 lg:flex-row lg:gap-12">
          <section class="w-full lg:w-1/2">
            <div class="flex w-full flex-col gap-x-3 lg:flex-row">
              <CommonFormInput
                v-model="form['first-name']"
                name="First name"
                rules="required"
                data-testid="rfp-form--first-name"
                label="First name"
                help-text="* Required"
                class="w-full"
                :bg-color="bgField"
                :initial-focus="true"
              />

              <CommonFormInput
                v-model="form['last-name']"
                name="Last name"
                rules="required"
                data-testid="rfp-form--last-name"
                label="Last Name"
                help-text="* Required"
                class="w-full"
                :bg-color="bgField"
              />
            </div>

            <CommonFormInput
              v-model="form['email']"
              name="Email"
              rules="required|email"
              data-testid="rfp-form--email"
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
                data-testid="rfp-form--phone"
                help-text="* Required"
                @update="setFormattedPhone"
              />
            </div>

            <CommonFormInput
              v-model="form['country']"
              data-testid="rfp-form--country"
              label="Country"
              class="w-full"
              :bg-color="bgField"
            />
          </section>

          <section class="w-full lg:w-1/2">
            <CommonFormInput
              v-model="form['position']"
              name="Position"
              rules="required"
              data-testid="rfp-form--position"
              label="Position"
              help-text="* Required"
              class="w-full"
              :bg-color="bgField"
            />

            <CommonFormInput
              v-model="form['company-name']"
              name="Company"
              rules="required"
              data-testid="rfp-form--company-name"
              label="Company/Organization Name"
              help-text="* Required"
              class="w-full"
              :bg-color="bgField"
            />

            <div
              class="flex w-full flex-col gap-x-3 space-y-4 lg:flex-row lg:space-y-0"
            >
              <CommonFormSelect
                v-model="form['industry']"
                name="industry"
                rules="required"
                data-testid="rfp-form--industry"
                label="Industry"
                help-text="* Required"
                class="w-full"
                :options="options['industry']"
                :bg-color="bgField"
              />

              <CommonFormSelect
                v-model="form['revenue']"
                name="revenue"
                rules="required"
                data-testid="rfp-form--revenue"
                label="Year Revenue"
                help-text="* Required"
                class="w-full"
                :options="options['revenue']"
                :bg-color="bgField"
              />
            </div>

            <div class="mt-4">
              <RequestForProposalFileUploaderField
                ref="file-uploader"
                v-model="files"
                help-text="Add up to 3 files. Please note that the total
                         size of your attachment(s) must not exceed 10 MB."
              />
            </div>
          </section>
        </div>

        <div class="mt-7 flex items-center gap-3.5">
          <CommonFormTextarea
            v-model="form['comments']"
            data-testid="rfp-form--comments"
            label="Comments"
            help-text="* Required"
            class="w-full"
            :bg-color="bgField"
          />
        </div>

        <div class="text-right">
          <CommonButton variant="primary" class="px-9 text-lg">
            Send
          </CommonButton>
        </div>
      </form>
    </Form>
  </client-only>
</template>

<script>
import { Form } from 'vee-validate'
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
  },

  data() {
    return {
      form: null,

      message: '',

      formattedPhone: '',

      files: [],

      options: {
        industry: [
          {
            value: 'Business and Profesional Services',
            label: 'Business and Profesional Services',
          },
          { value: 'Consumer Business', label: 'Consumer Business' },
          { value: 'Energy and Resources', label: 'Energy and Resources' },
          { value: 'Financial Services', label: 'Financial Services' },
          { value: 'Infrastructure', label: 'Infrastructure' },
          {
            value: 'Life Sciences and Health Care',
            label: 'Life Sciences and Health Care',
          },
          { value: 'Industrial Products', label: 'Industrial Products' },
          {
            value: 'Government and Public Services',
            label: 'Government and Public Services',
          },
          { value: 'Real Estate', label: 'Real Estate' },
          {
            value: 'Technology, Media and Telecommunications',
            label: 'Technology, Media and Telecommunications',
          },
          { value: 'Other', label: 'Other' },
        ],
        revenue: [
          { value: 'less than £1 million', label: 'less than £1 million' },
          {
            value: '£1 million - £5 million',
            label: '£1 million - £5 million',
          },
          {
            value: '£5 million - £10 million',
            label: '£5 million - £10 million',
          },
          {
            value: '£10 million - £99 million',
            label: '£10 million - £99 million',
          },
          {
            value: '£100 million - £500 million',
            label: '£100 million - £500 million',
          },
          {
            value: '£500 million - £999 million',
            label: '£500 million - £999 million',
          },
          {
            value: '£1 billion - £5 billion',
            label: '£1 billion - £5 billion',
          },
          {
            value: 'Greater than £5 billion',
            label: 'Greater than £5 billion',
          },
        ],
      },
    }
  },

  computed: {
    bgField() {
      return this.$theme.colors.s['50']
    },
    modalOpen() {
      return this.$store.state.modal.contactOpen
    },
  },

  watch: {
    modalOpen() {
      this.reset()
    },
  },

  created() {
    this.reset()
  },

  methods: {
    setFiles(files) {
      this.files = files
    },

    setFormattedPhone({ formatInternational }) {
      this.formattedPhone = formatInternational
    },

    reset() {
      this.form = new FormClass(this.contactFormId, {
        'first-name': '',
        'last-name': '',
        email: '',
        phone: '',
        country: '',
        'country-code': '',
        position: '',
        'company-name': '',
        industry: '',
        revenue: '',
        comments: '',
        'attachment-1': null,
        'attachment-2': null,
        'attachment-3': null,
      })

      this.$nextTick(() => {
        if (this.$refs['file-uploader']) {
          this.$refs['file-uploader'].reset()
        }

        if (this.$refs?.proposal) {
          this.$refs.proposal.reset()
        }
      })
    },

    async submit() {
      const isFormValid = await this.$refs.proposal.validate()

      if (isFormValid) {
        this.form.phone = this.formattedPhone

        this.files.forEach(({ file }, index) => {
          this.form[`attachment-${index + 1}`] = file
        })

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
