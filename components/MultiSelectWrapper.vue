<template>
  <div class="market-assessments-select-wrapper">
    <Multiselect
      data-testid="multiselect"
      :value="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      placeholder="Type to search"
      label="name"
      class="form-select"
      track-by="name"
      :taggable="false"
      :searchable="true"
      :show-labels="false"
      open-direction="bottom"
      @input="$emit('input', $event)"
    >
      <template #selection="{ values, remove, isOpen }">
        <div v-if="values.length" class="flex flex-wrap items-center">
          <div
            v-for="v in values.slice(0, maxElements)"
            :key="v.name"
            data-testid="multiselect-tags"
            class="bg-p-100 my-1 ml-3 flex items-center rounded-2xl px-4 py-1"
            :class="{ flex: !isOpen, hidden: isOpen }"
          >
            <div class="font-lato" @mousedown.prevent>{{ v.name }}</div>
            <div
              :class="[
                'bg-p-500 ml-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full',
                v.name.length > 26 ? 'max-w-[12%]' : '',
              ]"
              @click="remove(v, true)"
              @mousedown.prevent
            >
              <span class="inline-table h-4 w-4 text-center text-white">x</span>
            </div>
          </div>
          <span
            v-if="values.length > maxElements"
            :class="{ flex: !isOpen, hidden: isOpen }"
            class="ml-2 font-bold"
          >
            and {{ values.length - maxElements }} other
            {{
              values.length - maxElements === 1
                ? optionLabels.singular
                : optionLabels.plural
            }}
          </span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<script>
import { Multiselect } from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionLabels: {
      type: Object,
      default: () => {
        return { singular: 'company', plural: 'companies' }
      },
    },
    maxElements: {
      type: Number,
      default: 6,
    },
  },
}
</script>
