import { VARIANT_CLASSES } from '@/constants/variant-button-classes'
import { EventBus } from '~/utils/eventBus'

export default {
  props: {
    eventId: {
      type: String,
      default: 'common',
    },
    text: {
      type: String,
      default: 'Button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  emits: ['clickButtonCommon'],
  computed: {
    baseClasses() {
      return VARIANT_CLASSES.BASE[this.variant]
    },
    backgroundColorDownload() {
      return VARIANT_CLASSES.DOWNLOAD[this.variant]
    },
  },
  methods: {
    handleClickButtonCommon() {
      EventBus.$emit('clickButtonCommon', this.eventId)
    },
  },
}
