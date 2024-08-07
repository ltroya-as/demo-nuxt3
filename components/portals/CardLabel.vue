<template>
  <div
    data-testid="card-label"
    class="inline-flex items-center gap-x-2 rounded bg-[#25262a] text-white"
    :class="[showLabel ? 'px-3 py-1' : 'p-1']"
  >
    <Icon
      :name="selectedLabel.icon"
      :style="{ color: selectedLabel.iconColor }"
    />
    <span v-show="showLabel" class="text-sm font-semibold">
      {{ label || selectedLabel.text }}
    </span>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return [
          'mp4',
          'pdf',
          'xlsx',
          'ppt',
          'in-person',
          'featured-price-analysis',
        ].includes(value)
      },
    },
    label: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      labels: {
        mp4: {
          icon: 'file-mp4',
          iconColor: '#fff',
          text: 'MP4',
        },
        pdf: {
          icon: 'file-pdf',
          iconColor: '#fff',
          text: 'PDF',
        },
        xlsx: {
          icon: 'file-xlsx',
          iconColor: '#fff',
          text: 'XLSX',
        },
        'in-person': {
          icon: 'in-person',
          iconColor: '#fff',
          text: 'In Person',
        },
        'featured-price-analysis': {
          icon: 'stars',
          iconColor: '#FDBD00',
          text: 'Featured - Price Analysis',
        },
        ppt: {
          icon: 'icon-pptx',
          iconColor: '#fff',
          text: 'PPT',
        },
      },
    }
  },
  computed: {
    selectedLabel() {
      return this.labels[this.type] || {}
    },
  },
}
</script>
