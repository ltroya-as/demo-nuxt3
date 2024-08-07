<template>
  <div ref="slider" class="custom-slider minmax bg-grey-900 relative">
    <input
      id="min"
      ref="inputMin"
      type="range"
      :min="min"
      :max="max"
      :value="minValue"
      :step="step"
      @input="onInputMin"
    />
    <input
      id="max"
      ref="inputMax"
      type="range"
      name="max"
      :min="min"
      :max="max"
      :value="maxValue"
      :step="step"
      @input="onInputMax"
    />
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    gap: {
      type: Number,
      default: 1,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      slider: null,
      inputMin: null,
      inputMax: null,
    }
  },
  computed: {
    sliderMinValue: {
      get() {
        return this.minValue
      },
      set(value) {
        this.$emit('changeMinValue', value)
      },
    },
    sliderMaxValue: {
      get() {
        return this.maxValue
      },
      set(value) {
        this.$emit('changeMaxValue', value)
      },
    },
  },
  methods: {
    getPercent(value, min, max) {
      return ((value - min) / (max - min)) * 100
    },

    onInputMax({ target }) {
      if (target.value < this.sliderMinValue + this.gap) {
        target.value = this.sliderMinValue + this.gap
        return
      }

      this.sliderMaxValue = parseFloat(target.value)
    },

    onInputMin({ target }) {
      if (target.value > this.sliderMaxValue - this.gap) {
        target.value = this.sliderMaxValue - this.gap
        return
      }

      this.sliderMinValue = parseFloat(target.value)
    },
  },
}
</script>

<style scoped>
.slider-cont {
  width: 300px;
}

.custom-slider {
  --track-height: 2px;
  --thumb-radius: 20px;
}

/* style the input element with type "range" */
input[type='range'] {
  position: absolute;
  width: calc(100% - var(--thumb-radius));
  appearance: none;
  background: none;
  border-radius: 100%;
  z-index: 0;
  height: 100%;
  pointer-events: none;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
input[type='range']::-webkit-slider-runnable-track {
  appearance: none;
  height: var(--track-height);
}

input[type='range']::-webkit-slider-thumb {
  @apply bg-p-500 pointer-events-auto cursor-pointer appearance-none rounded-full;

  position: relative;
  width: var(--thumb-radius);
  height: var(--thumb-radius);
  margin-top: calc((var(--track-height) - var(--thumb-radius)) / 2);
  z-index: 1;
}

.custom-slider.minmax {
  @apply rounded-full;

  height: var(--track-height);
  margin: 0.5rem 0;

  --progress-left: 0%;
  --progress-right: 0%;
}

input[type='range'][name='max'] {
  left: var(--thumb-radius);
}
</style>
