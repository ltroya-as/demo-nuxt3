<template>
  <div class="flex w-full justify-between">
    <div>{{ params.displayName }}</div>
    <IconPlus
      v-if="hide"
      class="h-3 w-3 cursor-pointer object-contain text-white"
      @click="onHide()"
    />
    <IconMinus
      v-else
      class="h-3 w-3 cursor-pointer object-contain"
      @click="onHide()"
    />
  </div>
</template>
<script>
import IconPlus from '~/assets/icons/plus.svg'
import IconMinus from '~/assets/icons/minus.svg'
export default {
  components: {
    IconPlus,
    IconMinus,
  },
  data() {
    return {
      hide: false,
    }
  },
  mounted() {
    this.hide = !this.params?.columnApi
      .getColumn(this.params.childrenColumns[0])
      .isVisible()
  },
  methods: {
    onHide() {
      this.hide = !this.hide

      this.params.columnApi.setColumnsVisible(
        this.params.childrenColumns,
        !this.hide,
      )
    },
  },
}
</script>
