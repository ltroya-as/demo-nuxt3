export default {
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
    }
  },

  methods: {
    updatePage(currentPage) {
      this.currentPage = currentPage

      this.onPageChange()
    },

    resetPagination() {
      this.currentPage = 1
    },
  },
}
