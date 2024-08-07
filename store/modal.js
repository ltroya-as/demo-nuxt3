export const state = () => ({
  signInOpen: false,
  forgotPasswordOpen: false,
  contactOpen: false,
  subscribeOpen: false,
  fileUploaderOpen: false,
  requestForProposalOpen: false,
  esgReportsOpen: false,
  eventsModalOpen: false,
  priceAssessmentFiltersOpen: false,
  priceAssessmentControlDocumentsOpen: false,
  mobileMenuOpen: false,
  mobileAccountMenuOpen: false,
  tableIndexShareOpen: false,
  callback: null,
  initialFields: null,
  modalParams: null,
  newsletterOpen: false,
  capexTrackerOpen: false,
  trialConversionsOpen: false,
  subscriptionRenewData: {},
  updateAccountDetailRequestOpen: false,
  changePasswordOpen: false,
  eventOpen: false,
  videoIntroOpen: false,
  capexTrackerContactOpen: false,
  industryReportsOpen: false,
  chartBuilderResetOpen: false,
  chartBuilderCloseOpen: false,
  deleteWatchlistOpen: false,
  chartBuilderDataSeriesWarningOpen: false,
  clearChartOpen: false,
})

export const mutations = {
  open(state, { modalName, callback }) {
    state[`${modalName}Open`] = true
    state.callback = callback
  },

  close(state, { modalName }) {
    state[`${modalName}Open`] = false
  },

  setRenewData(state, data) {
    state.subscriptionRenewData = data
  },

  setInitialFields(state, initialFields) {
    state.initialFields = initialFields
  },

  setModalParams(state, params) {
    state.modalParams = params
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
