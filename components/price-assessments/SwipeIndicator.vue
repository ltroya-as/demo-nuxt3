<template>
  <div
    class="bg-p-500 flex max-h-6 items-center justify-center gap-2 rounded-full px-1 py-2 text-xs font-semibold"
  >
    <ChevronDown class="h-5 w-5 rotate-90" />
    <span>swipe</span>
    <ChevronDown class="h-5 w-5 -rotate-90" />
  </div>
</template>

<script>
import ChevronDown from '~/assets/icons/ChevronDown.svg'
export default {
  components: { ChevronDown },
}
</script>
