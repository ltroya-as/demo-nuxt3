import {
  STEPS,
  STEPS_WITHOUT_CURRENCY,
} from '~/constants/all-prices/chart-builder'

export const state = () => ({
  currentStep: 1,
  steps: STEPS,
})

export const mutations = {
  setSteps(state, steps) {
    state.steps = steps
  },
  setOpenStep(state, { stepId, open }) {
    state.steps = state.steps.map((step) => {
      if (step.id !== stepId) return step
      return { ...step, hidden: !open }
    })
  },
  toggleOpenStep(state, stepId) {
    state.steps = state.steps.map((step) => {
      if (step.id !== stepId) return step
      return { ...step, hidden: !step.hidden }
    })
  },
  changeTitleStep(state, { stepId, title }) {
    state.steps = state.steps.map((step) => {
      if (step.id !== stepId) return step
      return { ...step, title }
    })
  },
  completeStep(state, stepId) {
    state.steps = state.steps.map((step) => {
      if (step.id !== stepId) return step
      return { ...step, completed: true }
    })
  },
  setCurrentStep(state, currentStep) {
    if (currentStep < 1 || currentStep > state.steps.length) return
    state.currentStep = currentStep
  },
  reset(state) {
    const steps = state.steps.map((step) => ({
      ...step,
      completed: false,
      hidden: true,
    }))
    steps[0].hidden = false
    state.steps = steps
    state.currentStep = 1
  },
}

export const actions = {
  setSteps({ commit }, steps) {
    commit('setSteps', steps)
  },
  toggleOpenStep({ commit }, stepId) {
    commit('toggleOpenStep', stepId)
  },
  setOpenStep({ commit }, { stepId, open }) {
    commit('setOpenStep', { stepId, open })
  },
  completeStep({ commit }, stepId) {
    commit('completeStep', stepId)
  },
  changeTitleStep({ commit }, { stepId, title }) {
    commit('changeTitleStep', { stepId, title })
  },
  setCurrentStep({ commit }, currentStep) {
    commit('setCurrentStep', currentStep)
  },
  reset({ commit }) {
    commit('reset')
  },
}

export const getters = {
  currentStep: (state) => state.currentStep,
  steps: (state, _, __, rootGetters) => {
    const hasOnlyPayable =
      rootGetters['chartBuilder/unitsMeasurement/hasOnlyPayable']

    if (!hasOnlyPayable) return state.steps

    return STEPS_WITHOUT_CURRENCY.map((step) => {
      const stepFromState = state.steps.find((s) => s.id === step.id)

      if (!stepFromState) return step

      return {
        ...step,
        completed: stepFromState.completed,
        hidden: stepFromState.hidden,
      }
    })
  },
  progress(_, getters, __, rootGetters) {
    const isEditing = rootGetters['chartBuilder/config/isEditing']
    const products = rootGetters['chartBuilder/config/products']
    const someCompleteProduct = products.every((product) => product.completed)

    if (!isEditing || !someCompleteProduct) return 0

    const stepValue = 100 / getters.steps.length
    return stepValue * getters.currentStep
  },
  nextTitle(_, getters) {
    return getters.currentStep === getters.steps.length ? 'Build chart' : 'Next'
  },
  productsStep: (_, getters) =>
    getters.steps.find((step) => step.id === 'products'),
  currencyStep: (_, getters) =>
    getters.steps.find((step) => step.id === 'currency'),
  unitStep: (_, getters) => getters.steps.find((step) => step.id === 'unit'),
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
