<template>
  <div :class="[$attrs.class, 'group relative inline-block']">
    <button
      class="bg-s-900 group-hover:bg-s-500 inline-flex items-center gap-x-2.5 rounded px-6 py-2 font-semibold text-white duration-300"
    >
      <span class="text-sm font-semibold"> Filters </span>
      <ChevronDown class="h-6 w-6 duration-300 group-hover:rotate-180" />
    </button>

    <div class="absolute right-0 z-20 hidden pt-1 group-hover:block">
      <div
        class="bg-s-900 flex flex-col gap-y-3 rounded bg-opacity-80 px-7 py-5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      >
        <div v-for="option in options" :key="option.name" class="capitalize">
          <div v-if="option.isDivider" class="border-s-500 w-full border-b" />
          <div v-else class="flex items-center">
            <label
              class="flex w-max flex-grow cursor-pointer select-none items-center lg:flex-grow-0"
            >
              <input
                :id="option.name"
                v-model="option.checked"
                :disabled="option.disabled"
                type="checkbox"
                class="form-checkbox border-s-500 text-p-500 disabled:bg-s-400 mr-2 h-4 w-4 cursor-pointer border-2 border-solid focus:shadow-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed"
                @change="$emit('updateOption', option)"
              />
              <span
                class="text-s-900 w-full text-sm font-semibold capitalize text-white lg:ml-3"
              >
                {{ option.name }}
              </span>
            </label>
          </div>
        </div>

        <CommonButton
          variant="primary"
          extra-classes="text-sm"
          @click="$emit('updateOptions')"
        >
          {{ okText }}
        </CommonButton>

        <button class="text-sm font-semibold text-white">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronDown from '~/assets/icons/ChevronDown.svg'
import CommonButton from '~/components/common/Button.vue'
export default {
  components: { ChevronDown, CommonButton },
  props: {
    okText: {
      type: String,
      default: 'Update',
    },
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>
