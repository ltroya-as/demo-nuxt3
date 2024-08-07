<template>
  <div class="absolute bottom-0 left-0 top-0 z-10 m-2 flex">
    <div
      class="bg-s-900/60 flex flex-col items-start gap-3 rounded p-3 text-xl font-bold text-white backdrop-blur-sm"
    >
      <component :is="selectedLabel.icon" class="h-5 w-4 text-white" />
      <span class="text-center">
        {{ dateReport }}
      </span>
    </div>
  </div>
</template>

<script>
import mp4Icon from '@/assets/icons/file-mp4.svg'
import pdfIcon from '@/assets/icons/file-pdf.svg'
import xlsxIcon from '@/assets/icons/file-xlsx.svg'
import inPersonIcon from '@/assets/icons/in-person.svg'
import featuredPriceAnalysisIcon from '@/assets/icons/stars.svg'

export default {
  components: {
    mp4Icon,
    pdfIcon,
    xlsxIcon,
    inPersonIcon,
    featuredPriceAnalysisIcon,
  },
  props: {
    dateReport: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return [
          'mp4',
          'pdf',
          'xlsx',
          'in-person',
          'featured-price-analysis',
        ].includes(value)
      },
    },
  },
  data() {
    return {
      labels: {
        mp4: {
          icon: mp4Icon,
          iconColor: '#fff',
          text: 'MP4',
        },
        pdf: {
          icon: pdfIcon,
          iconColor: '#fff',
          text: 'PDF',
        },
        xlsx: {
          icon: xlsxIcon,
          iconColor: '#fff',
          text: 'XLSX',
        },
        'in-person': {
          icon: inPersonIcon,
          iconColor: '#fff',
          text: 'In Person',
        },
        'featured-price-analysis': {
          icon: featuredPriceAnalysisIcon,
          iconColor: '#FDBD00',
          text: 'Featured - Price Analysis',
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
