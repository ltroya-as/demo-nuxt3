<template>
  <div class="relative flex flex-col gap-y-3" :class="shepherdClass">
    <div class="flex items-center gap-x-2">
      <h3 class="font-semibold text-black/90">Data Types Selected</h3>
      <IconExclamationCircle
        ref="message"
        class="h-5 w-5 cursor-pointer text-black/40"
        :class="{ '!text-warning': showWarning }"
      />
    </div>
    <div
      class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-normal"
      data-testid="units-measurement-container"
    >
      <div
        v-for="unit of units"
        :key="unit.id"
        class="flex items-center gap-x-1 rounded-full px-3 py-2"
        :class="{ 'bg-[#BFD9EF4D]': unit.isSelected }"
      >
        <span
          :class="{ '!text-black/40': !unit.isSelected }"
          class="font-semibold text-black/90"
        >
          {{ unit.name }}
        </span>
        <div class="h-5 w-5">
          <IconCheck
            v-if="unit.isSelected"
            class="text-green-light h-5 w-5"
            data-testid="icon-check"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import '@/assets/shepherd.scss'
import tippy from 'tippy.js'
import IconExclamationCircle from '~/assets/icons/icon-exclamation-circle.svg'
import IconCheck from '~/assets/icons/IconCheck.svg'

const LOCAL_STORAGE_KEY = '__do_not_show_units_of_measurement_message'
const STEP_ID = 'units-step'

export default {
  components: {
    IconExclamationCircle,
    IconCheck,
  },
  props: {
    showWarning: {
      type: Boolean,
      default: false,
    },
    units: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    const shepherdClass = 'shepherd-units'
    return {
      desktopMediaQuery: null,
      shepherdClass,
      shepherdSelector: '.' + shepherdClass,
      tour: new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          scrollTo: { behavior: 'smooth', block: 'center' },
          cancelIcon: {
            enabled: true,
          },
        },
      }),
    }
  },

  watch: {
    isOpen(newValue) {
      if (newValue) {
        const modalPosition = this.desktopMediaQuery.matches ? 'bottom' : 'left'
        this.tour.getById(STEP_ID).updateStepOptions({
          attachTo: {
            element: '.shepherd-units',
            on: modalPosition,
          },
        })
        this.tour.start()
      }
    },
  },

  mounted() {
    this.shepherdInitializeResponsiveBehavior()
    this.shepherdInitializeSteps()

    this.$nextTick(() => {
      tippy(this.$refs.message.$el, {
        content: '',
        allowHTML: true,
        maxWidth: 343,
        arrow: true,
        placement: 'bottom',
        onShow(instance) {
          instance.setContent(`
        <div class="bg-black p-4 text-white text-sm rounded-lg">
            <div class="font-semibold">Data Types Selected</div>
            <div class="text-xs">Please note, you can only select 2 Data Types across your product selection</div>
        </div>
        `)
        },
      })
    })
  },

  methods: {
    setLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
    },
    getLocalStorage() {
      return localStorage.getItem(LOCAL_STORAGE_KEY)
    },
    shepherdInitializeResponsiveBehavior() {
      this.desktopMediaQuery = window.matchMedia('(max-width: 1024px)')
      this.desktopMediaQuery.addEventListener('change', (e) => {
        const currentStep = this.tour.getCurrentStep()
        if (!currentStep) return
        if (!currentStep.isOpen()) return
        currentStep.hide()
        currentStep.updateStepOptions({
          attachTo: {
            element: this.shepherdSelector,
            on: e.matches ? 'bottom' : 'left',
          },
        })
        currentStep.show()
      })
    },
    shepherdInitializeSteps() {
      this.tour.addStep({
        id: STEP_ID,
        text: () => {
          const container = document.createElement('div')
          const heading = document.createElement('h3')
          const paragraph = document.createElement('p')
          const label = document.createElement('label')
          const checkbox = document.createElement('input')
          const span = document.createElement('span')
          const buttonContainer = document.createElement('div')
          const button = document.createElement('button')
          heading.textContent = 'Units of Measurement'
          paragraph.innerHTML = `Please note, you can only select 2 units of measurement across your product selection.<br><br>This widget will allow you to monitor how many you have selected.`
          checkbox.type = 'checkbox'
          span.textContent = 'Do not show this message again'
          button.textContent = 'Okay'

          heading.style.marginBottom = '8px'
          heading.style.fontSize = '1.125rem'
          heading.style.fontWeight = '600'
          paragraph.style.marginBottom = '8px'
          paragraph.style.fontSize = '0.875rem'
          checkbox.style.marginRight = '8px'
          checkbox.style.color = '#FDBD00'
          checkbox.style.outlineColor = '#FDBD00'
          label.style.fontSize = '0.875rem'
          label.style.display = 'flex'
          label.style.alignItems = 'center'
          label.style.marginBottom = '18px'
          buttonContainer.style.display = 'flex'
          buttonContainer.style.justifyContent = 'center'
          button.style.padding = '12px 41px'
          button.style.backgroundColor = '#FDBD00'
          button.style.margin = '0 auto'
          button.style.borderRadius = '4px'
          button.style.fontWeight = '600'

          label.addEventListener('click', () => {
            this.setLocalStorage()
            setTimeout(() => {
              this.tour.complete()
            }, 100)
          })

          button.addEventListener('click', () => {
            this.tour.complete()
          })

          label.appendChild(checkbox)
          label.appendChild(span)
          container.appendChild(heading)
          container.appendChild(paragraph)
          container.appendChild(label)
          buttonContainer.appendChild(button)
          container.appendChild(buttonContainer)
          return container
        },
        modalOverlayOpeningRadius: 12,
        modalOverlayOpeningPadding: 12,
        attachTo: {
          element: this.shepherdSelector,
          on: 'left',
        },
        showOn: () => {
          return !this.getLocalStorage()
        },
      })
    },
  },
}
</script>
