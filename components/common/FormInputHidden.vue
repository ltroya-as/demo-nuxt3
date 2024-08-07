<template>
  <input :id="id" type="hidden" :name="name" :value="value" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },

    id: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      required: true,
    },

    value: {
      type: [Number, String],
      default: '',
    },
  },
}
</script>
