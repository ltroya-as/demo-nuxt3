<template>
  <div v-if="filteredOptions?.length > 0">
    <div
      class="border-t-s-500 flex flex-col gap-y-4 border-t border-dashed pt-6"
      data-testid="checkbox-container"
    >
      <div class="flex items-center">
        <h4 class="flex-1 font-semibold leading-6 text-black/90">
          {{ checkList.label }}
        </h4>

        <Checkbox
          :checked="isSelectAll"
          label="Select all"
          :disabled="disabledSelectAll"
          @change="selectAll"
        />
      </div>
      <div class="flex flex-col gap-y-4">
        <template v-for="option in filteredOptions">
          <Checkbox
            v-if="!option.isHidden"
            :key="option.id"
            :label="option.label"
            :checked="option.isSelected"
            :disabled="option.isDisabled"
            class="hover:bg-p-50 transition-colors"
            @change="changeSelected($event, option)"
          />
        </template>
      </div>
    </div>
    <div v-if="children" class="pt-6">
      <CheckList
        :selected-parents="selectedParentsIds"
        :check-list="children"
        @change-options="changeCheckList"
      />
    </div>
  </div>
</template>

<script>
import countBy from 'lodash/countBy'
import unionBy from 'lodash/unionBy'

import Checkbox from '@/components/chart-builder/Checkbox.vue'

export default {
  name: 'CheckList',
  components: { Checkbox },
  props: {
    checkList: {
      type: Object,
      default: () => ({}),
    },
    selectedParents: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    disabledSelectAll() {
      return (
        Object.hasOwn(this.checkList, 'canSelectAll') &&
        !this.checkList?.canSelectAll
      )
    },
    selectedParentsIds() {
      return this.checkList?.options
        .filter((option) => option.isSelected)
        .map((option) => option.id)
    },
    isSelectAll() {
      return this.filteredOptions.every((option) => option.isSelected)
    },
    filteredOptions() {
      const options = this.checkList?.options

      if (!options) return []

      const visibleOptions = options.filter((option) => !option.isHidden)
      const hasVisibleOptions = visibleOptions.length > 0

      if (!hasVisibleOptions) return []

      const uniqOptions = unionBy(visibleOptions, 'label')

      return uniqOptions.sort((a, b) => a.label.localeCompare(b.label))
    },
    children() {
      const children = this.checkList.options
        .map((option) => option?.children)
        .filter((child) => child)

      if (children.length <= 0) return null

      const name = children.find((child) => child?.name)?.name || ''
      const label = children.find((child) => child?.label)?.label || ''
      const id = children.find((child) => child?.id)?.id || ''
      const options = children.map((child) => child.options).flat()

      return { name, id, label, options }
    },
  },
  watch: {
    checkList: {
      handler(newValue) {
        let isEdit = false
        const frequencies = countBy(newValue.options, 'name')
        const duplicates = newValue.options.filter(
          (option) => frequencies[option.name] > 1 && option.isSelected,
        )
        const duplicateNames = duplicates.map((option) => option.name)

        if (duplicates.length <= 0) return

        const newOptions = newValue.options.map((option) => {
          if (!duplicateNames.includes(option.name)) return option

          const duplicated = duplicates.find(
            (item) => item.name === option.name,
          )

          if (duplicated.isSelected === option.isSelected) return option
          if (option.isHidden) return option

          isEdit = true

          return { ...option, isSelected: true }
        })

        if (!isEdit) return

        this.$emit('change-options', newOptions)
      },
      deep: true,
    },
  },
  methods: {
    selectAll(checked) {
      const newOptions = this.checkList.options
        .map((option) => {
          if (!this.selectedParents.includes(option.parent)) return option

          return { ...option, isSelected: checked }
        })
        .map((item) => {
          if (!item.children) return item

          const children = {
            ...item.children,
            options: this.unSelectedChildren(item.children.options, checked),
          }

          return { ...item, children }
        })

      this.$emit('change-options', newOptions)
    },
    unSelectedChildren(options, checked) {
      const newOptions = options.map((option) => {
        const isSelected = !checked ? false : option.isSelected

        if (!option.children) return { ...option, isSelected }

        return {
          ...option,
          isSelected,
          children: {
            ...option.children,
            options: this.unSelectedChildren(
              option.children.options,
              isSelected,
            ),
          },
        }
      })

      return newOptions
    },

    changeSelected(checked, option) {
      const newOptions = this.checkList.options.map((item) => {
        if (item.name !== option.name) return item
        if (!this.selectedParents.includes(item.parent)) return item

        const isSelected = checked

        if (!item.children) return { ...item, isSelected }

        const children = {
          ...item.children,
          options: checked
            ? item.children.options
            : this.unSelectedChildren(item.children.options, checked),
        }

        return { ...item, isSelected, children }
      })

      this.$emit('change-options', newOptions)
    },
    changeCheckList(options) {
      const newOptions = this.checkList.options.map((option) => {
        if (!option.children) return option

        const children = {
          ...option.children,
          options: option.children.options.map((child) => {
            const newChild = options.find(
              (item) => item.name === child.name && item.parent === option.id,
            )

            if (!newChild) return child

            return newChild
          }),
        }

        return { ...option, children }
      })

      this.$emit('change-options', newOptions)
    },
  },
}
</script>
