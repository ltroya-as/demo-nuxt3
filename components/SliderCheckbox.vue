<template>
  <svg
    width="37"
    height="26"
    viewBox="0 0 37 26"
    xmlns="http://www.w3.org/2000/svg"
    :class="svgClasses"
  >
    <rect
      y="5"
      width="34"
      height="14"
      rx="7"
      fill="currentColor"
      fill-opacity="0.38"
    />
    <g
      filter="url(#filter0_ddd_0_1118)"
      class="transition-all duration-300 ease-in-out"
      :class="positionClasses"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 22C29.5228 22 34 17.5228 34 12C34 6.47715 29.5228 2 24 2C18.4772 2 14 6.47715 14 12C14 17.5228 18.4772 22 24 22Z"
        fill="#212121"
        fill-opacity="0.08"
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 22C29.5228 22 34 17.5228 34 12C34 6.47715 29.5228 2 24 2C18.4772 2 14 6.47715 14 12C14 17.5228 18.4772 22 24 22Z"
      fill="currentColor"
      class="transition-all duration-300 ease-in-out"
      :class="positionClasses"
    />
    <defs>
      <filter
        id="filter0_ddd_0_1118"
        x="11"
        y="0"
        width="26"
        height="26"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_0_1118"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_0_1118"
          result="effect2_dropShadow_0_1118"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_dropShadow_0_1118"
          result="effect3_dropShadow_0_1118"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect3_dropShadow_0_1118"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    svgClasses() {
      return this.isChecked ? '' : '!text-s-500'
    },
    positionClasses() {
      return this.isChecked ? 'translate-x-0' : '-translate-x-[14px]'
    },
  },
}
</script>
