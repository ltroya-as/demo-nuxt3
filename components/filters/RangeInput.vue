<template>
  <div class="flex">
    <input
      type="number"
      class="input w-full min-w-[40px] max-w-[60px] appearance-none rounded p-1 text-center font-bold outline-none"
      :value="value"
      :min="min"
      :max="max"
      @input="onInput"
      @focusout="onFocusOut"
      @keypress="onOnlyNumbers"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    onOnlyNumbers(e) {
      const charCode = e.which ? e.which : e.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault()
      }
    },
    onInput(e) {
      const value = parseInt(e.target.value)

      if (isNaN(value)) return
      if (value < 0) return

      this.$emit('input', e)
    },
    onFocusOut(e) {
      const value = e.target.value
      if (value === '') {
        e.target.value = this.value
      }
    },
  },
}
</script>

<style scoped>
.input {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%), 0 2px 1px 0 rgb(0 0 0 / 12%),
    0 1px 1px 0 rgb(0 0 0 / 14%);
  background-color: #d9d9d9;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}
</style>
