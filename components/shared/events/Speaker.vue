<template>
  <span>
    {{ speaker.name }}, {{ speaker.position }} - {{ speaker.company }}
  </span>
</template>

<script>
export default {
  props: {
    speaker: {
      type: Object,
      required: true,
    },
  },
}
</script>
