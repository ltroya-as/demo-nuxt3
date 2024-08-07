<template>
  <div
    data-testid="pagination"
    class="pagination flex w-full flex-col items-center justify-between gap-2 px-7 py-4 md:flex-row"
  >
    <div
      class="flex w-full max-w-sm items-center justify-between gap-3 md:w-fit md:justify-normal"
    >
      <span class="font-bold">Rows per page</span>
      <select
        data-testid="pagination-page-size-select"
        class="!border-p-500 focus:ring-p-500 appearance-none rounded border bg-transparent py-1 pl-2 pr-7 font-bold outline-none focus:border-transparent"
        :value="rowPerPage"
        @change="$emit('changeRowPerPage', $event.target.value)"
      >
        <option v-for="item in rowsPerPageList" :key="item" :value="item">
          {{ item }}
        </option>
        <option :value="total"> All </option>
      </select>
    </div>

    <div
      class="flex w-full max-w-sm items-center justify-between gap-2 md:w-fit md:justify-normal"
    >
      <ChevronFirst
        data-testid="pagination-first-page"
        :class="allowedClasses(currentPage !== 1)"
        @click="onFirstPage"
      />
      <ChevronLeft
        data-testid="pagination-previous-page"
        :class="allowedClasses(currentPage !== 1)"
        @click="onPreviousPage"
      />
      <div class="flex items-center gap-4">
        <span
          :data-testid="`pagination-page-${currentPage}`"
          class="border-p-500 flex h-7 w-7 select-none items-center justify-center rounded border font-bold"
        >
          {{ currentPage }}
        </span>
        <span class="font-bold">of {{ pages }}</span>
      </div>
      <ChevronRight
        data-testid="pagination-next-page"
        :class="allowedClasses(currentPage !== pages)"
        @click="omNextPage"
      />
      <ChevronLast
        data-testid="pagination-last-page"
        :class="allowedClasses(currentPage !== pages)"
        @click="onLastPage"
      />
    </div>
  </div>
</template>

<script>
import ChevronRight from '~/assets/icons/angle-right.svg'
import ChevronLeft from '~/assets/icons/chevron-left-black.svg'
import ChevronLast from '~/assets/icons/chevron-last.svg'
import ChevronFirst from '~/assets/icons/chevron-first.svg'
export default {
  components: {
    ChevronRight,
    ChevronLeft,
    ChevronLast,
    ChevronFirst,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    rowPerPage: {
      type: Number,
      required: true,
    },
    rowsPerPageList: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    from() {
      return (this.currentPage - 1) * this.rowPerPage + 1
    },
    to() {
      return this.currentPage === this.pages
        ? this.total
        : this.rowPerPage * this.currentPage
    },
  },
  methods: {
    onPreviousPage() {
      if (this.currentPage > 1) this.$emit('changePage', this.currentPage - 1)
    },
    omNextPage() {
      if (this.currentPage < this.pages)
        this.$emit('changePage', this.currentPage + 1)
    },
    onFirstPage() {
      if (this.currentPage !== 1) this.$emit('changePage', 1)
    },
    onLastPage() {
      if (this.currentPage !== this.pages) this.$emit('changePage', this.pages)
    },
    allowedClasses(isAllowed) {
      return isAllowed ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
    },
  },
}
</script>

<style scoped>
.pagination {
  background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.pagination option {
  background: #fff;
}
</style>
