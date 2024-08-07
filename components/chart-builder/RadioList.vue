<template>
  <div class="flex flex-col gap-4">
    <template v-for="item in options" :key="item.id">
      <ReadOnlyRadioButton
        v-if="item.readOnly"
        :name="item.label"
        :tooltip="item.tooltip"
      />
      <RadioButton
        v-else
        :key="item.id + '-else'"
        :model-value="item"
        :label="item.label"
        :name="name"
        :checked="item.isSelected"
        :disabled="disabled"
        @update:model-value="onInput"
      />
    </template>
  </div>
</template>

<script>
import RadioButton from '~/components/chart-builder/RadioButton.vue'
import ReadOnlyRadioButton from '~/components/chart-builder/ReadOnlyRadioButton.vue'

export default {
  components: {
    RadioButton,
    ReadOnlyRadioButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
    disabled() {
      return this.options.filter((opt) => opt.readOnly).length > 1
    },
  },
  methods: {
    onInput(value) {
      this.options = this.options.map((option) => {
        if (option.id === value.id) {
          return { ...option, isSelected: true }
        }

        return { ...option, isSelected: false }
      })
    },
  },
}
</script>
