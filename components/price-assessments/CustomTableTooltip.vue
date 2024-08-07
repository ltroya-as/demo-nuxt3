<template>
  <div
    :id="uid"
    :class="params.class"
    class="line-clamp-2 min-w-full whitespace-normal break-words text-right leading-normal"
  >
    {{ value }}
  </div>
</template>

<script>
import tippy from 'tippy.js'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      value: null,
    }
  },
  computed: {
    uid() {
      return `cell-exchange-${uuidv4()}`
    },
  },
  beforeMount() {
    this.value = this.params.valueFormatted ?? this.params.value
  },
  mounted() {
    const { value } = this
    if (value) {
      this.$nextTick(() => {
        tippy(`#${this.uid}`, {
          placement: 'bottom',
          arrow: true,
          allowHTML: true,
          onShow(instance) {
            const div = document.createElement('div')
            div.classList.add('table-tooltip')
            div.textContent = value
            instance.setContent(div)
          },
        })
      })
    }
  },
}
</script>
