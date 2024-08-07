<template>
  <div class="inline-flex items-center">
    <button
      class="disabled:text-s-500 mr-3 hidden text-xs font-semibold lg:block"
      :disabled="currentPage === 1"
      @click="firstPage"
    >
      First
    </button>
    <div class="flex items-center rounded px-2 lg:border lg:bg-white">
      <button
        class="mr-1 disabled:opacity-30"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        <ChevronCircleLeft class="h-6 w-6" />
      </button>
      <span
        v-for="page in totalPages"
        :key="page"
        class="mx-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded border p-1 font-semibold lg:h-auto lg:w-auto lg:rounded-none lg:border-none"
        :class="{
          'border-p-200 lg:bg-p-200': page === currentPage,
          'border-[#a3a5ae]': page !== currentPage,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </span>
      <button
        class="disabled:opacity-30"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <ChevronCircleRight class="h-6 w-6" />
      </button>
    </div>
    <button
      class="disabled:text-s-500 ml-3 hidden text-xs font-semibold lg:block"
      :disabled="currentPage === totalPages"
      @click="lastPage"
    >
      Last
    </button>
  </div>
</template>

<script>
import ChevronCircleRight from '@/assets/icons/ChevronCircleRight.svg'
import ChevronCircleLeft from '@/assets/icons/ChevronCircleLeft.svg'

export default {
  components: { ChevronCircleRight, ChevronCircleLeft },

  props: {
    totalRecords: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRecords / this.pageSize)
    },
  },
  methods: {
    changePage(page) {
      this.$emit('page-change', page)
    },
    lastPage() {
      this.$emit('page-change', this.totalPages)
    },
    firstPage() {
      this.$emit('page-change', 1)
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-change', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.currentPage + 1)
      }
    },
  },
}
</script>
