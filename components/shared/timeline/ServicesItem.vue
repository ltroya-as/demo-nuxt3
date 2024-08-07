<template>
  <div
    data-testid="timeline-service-item"
    class="relative flex w-full flex-row items-baseline justify-start gap-4 bg-transparent lg:flex-col lg:items-center lg:justify-center"
  >
    <!-- circle large -->
    <div
      class="circle-large relative flex h-full w-full items-center justify-center rounded-full bg-transparent"
      :class="[circleLargeClasses]"
    >
      <div
        class="flex h-full max-h-[110px] min-h-[110px] w-full min-w-[110px] max-w-[110px] items-center justify-center rounded-full bg-transparent"
      >
        <Icon
          :name="icon"
          class="h-full max-h-[17px] min-h-[17px] w-full min-w-[17px] max-w-[17px] xl:max-h-[40px] xl:min-h-[40px] xl:min-w-[40px] xl:max-w-[40px]"
          :class="[iconClasses]"
        />
      </div>
    </div>
    <!-- circle small -->
    <div
      class="circle-small relative mt-0 flex h-full max-h-[18px] min-h-[18px] w-full min-w-[18px] max-w-[18px] items-center justify-center rounded-full border-[2px] bg-transparent lg:top-0 lg:mt-2 xl:max-h-[40px] xl:min-h-[40px] xl:min-w-[40px] xl:max-w-[40px] xl:border-[5px]"
      :class="[circleSmallAndTextClasses, circleSmallClasses]"
    >
      <div
        class="flex h-full max-h-[14px] min-h-[14px] w-full min-w-[14px] max-w-[14px] items-center justify-center rounded-full border-[2px] border-white bg-white xl:max-h-[30px] xl:min-h-[30px] xl:min-w-[30px] xl:max-w-[30px] xl:border-[5px]"
      >
        <div
          class="flex h-full max-h-[8px] min-h-[8px] w-full min-w-[8px] max-w-[8px] items-center justify-center rounded-full xl:max-h-[20px] xl:min-h-[20px] xl:min-w-[20px] xl:max-w-[20px]"
          :class="[backgroundClasses]"
        >
        </div>
      </div>
    </div>
    <div
      class="relative flex w-full flex-col text-left lg:top-0 lg:text-center"
      :class="[circleSmallAndTextClasses]"
    >
      <h4 class="text-lg font-bold">{{ subtitle }}</h4>
      <div class="bg-p-500 mb-4 mt-3 h-full max-h-[3px] min-h-[3px] w-full">
      </div>
      <span class="text-sm">{{ description }}</span>
    </div>
  </div>
</template>
<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconClasses: {
      type: String,
      default: '',
    },
    circleSmallAndTextClasses: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isLastItem: {
      type: Boolean,
      default: false,
    },
    indexItem: {
      type: Number,
      default: null,
    },
  },
  computed: {
    circleLargeClasses() {
      if (this.indexItem === 1) return 'circle-large-one'
      if (this.indexItem === 2) return 'circle-large-two'
      if (this.indexItem === 3) return 'circle-large-three'
      if (this.indexItem === 4) return 'circle-large-four'
      return ''
    },
    circleSmallClasses() {
      if (this.indexItem === 1) return 'circle-small-one border-p-700'
      if (this.indexItem === 2) return 'circle-small-two border-p-500'
      if (this.indexItem === 3) return 'circle-small-three border-p-300'
      if (this.indexItem === 4) return 'circle-small-four border-p-100'
      return ''
    },
    backgroundClasses() {
      if (this.indexItem === 1) return 'bg-p-700'
      if (this.indexItem === 2) return 'bg-p-500'
      if (this.indexItem === 3) return 'bg-p-300'
      if (this.indexItem === 4) return 'bg-p-100'
      return ''
    },
  },
}
</script>
<style scoped lang="scss">
$dimensionCircleLargeDesktop: 150px;
$dimensionCircleLargeMobile: 64px;

$borderCircleLargeOneDesktop: 20px solid #fd8b00;
$borderCircleLargeTwoDesktop: 20px solid #fdaf00;
$borderCircleLargeThreeDesktop: 20px solid #fdc723;
$borderCircleLargeFourDesktop: 20px solid #fede80;

$borderCircleLargeOneBeforeDesktop: 17px solid #fd8b00;
$borderCircleLargeTwoBeforeDesktop: 17px solid #fdaf00;
$borderCircleLargeThreeBeforeDesktop: 17px solid #fdc723;
$borderCircleLargeFourBeforeDesktop: 17px solid #fede80;

$borderCircleLargeOneMobile: 9px solid #fd8b00;
$borderCircleLargeTwoMobile: 9px solid #fdaf00;
$borderCircleLargeThreeMobile: 9px solid #fdc723;
$borderCircleLargeFourMobile: 9px solid #fede80;

$borderCircleLargeOneBeforeMobile: 10px solid #fd8b00;
$borderCircleLargeTwoBeforeMobile: 10px solid #fdaf00;
$borderCircleLargeThreeBeforeMobile: 10px solid #fdc723;
$borderCircleLargeFourBeforeMobile: 10px solid #fede80;

.circle-large::before {
  content: '';
  position: absolute;
}

.circle-large-one {
  border: $borderCircleLargeOneDesktop;
}

.circle-large-two {
  border: $borderCircleLargeTwoDesktop;
}

.circle-large-three {
  border: $borderCircleLargeThreeDesktop;
}

.circle-large-four {
  border: $borderCircleLargeFourDesktop;
}

.circle-small::before {
  content: '';
  border-bottom: 2px dashed black;
  position: absolute;
  width: calc(68vw / 3);
  left: 120%;
  z-index: 0;
}

.circle-small-four {
  overflow: hidden;
}

@media (min-width: 1536px) {
  .circle-large {
    max-width: $dimensionCircleLargeDesktop;
    min-width: $dimensionCircleLargeDesktop;
    max-height: $dimensionCircleLargeDesktop;
    min-height: $dimensionCircleLargeDesktop;
  }

  .circle-large::before {
    border-top: $borderCircleLargeOneBeforeDesktop;
    border-bottom: 17px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    bottom: -50px;
    left: calc(50% - 10px);
  }

  .circle-large-one::before {
    border-top: $borderCircleLargeOneBeforeDesktop;
  }

  .circle-large-two::before {
    border-top: $borderCircleLargeTwoBeforeDesktop;
  }

  .circle-large-three::before {
    border-top: $borderCircleLargeThreeBeforeDesktop;
  }

  .circle-large-four::before {
    border-top: $borderCircleLargeFourBeforeDesktop;
  }

  .circle-small::before {
    width: 325px;
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .circle-large {
    max-width: $dimensionCircleLargeDesktop;
    min-width: $dimensionCircleLargeDesktop;
    max-height: $dimensionCircleLargeDesktop;
    min-height: $dimensionCircleLargeDesktop;
  }

  .circle-large::before {
    border-top: $borderCircleLargeOneBeforeDesktop;
    border-bottom: 17px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    bottom: -50px;
    left: calc(50% - 10px);
  }

  .circle-large-one::before {
    border-top: $borderCircleLargeOneBeforeDesktop;
  }

  .circle-large-two::before {
    border-top: $borderCircleLargeTwoBeforeDesktop;
  }

  .circle-large-three::before {
    border-top: $borderCircleLargeThreeBeforeDesktop;
  }

  .circle-large-four::before {
    border-top: $borderCircleLargeFourBeforeDesktop;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .circle-large {
    max-width: $dimensionCircleLargeMobile;
    min-width: $dimensionCircleLargeMobile;
    max-height: $dimensionCircleLargeMobile;
    min-height: $dimensionCircleLargeMobile;
  }

  .circle-large-one {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-two {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-three {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-four {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large::before {
    border-top: $borderCircleLargeOneBeforeMobile;
    border-bottom: 10px solid transparent;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -28px;
    left: calc(50% - 5px);
  }

  .circle-large-one::before {
    border-top: $borderCircleLargeOneBeforeMobile;
  }

  .circle-large-two::before {
    border-top: $borderCircleLargeTwoBeforeMobile;
  }

  .circle-large-three::before {
    border-top: $borderCircleLargeThreeBeforeMobile;
  }

  .circle-large-four::before {
    border-top: $borderCircleLargeFourBeforeMobile;
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .circle-large {
    max-width: $dimensionCircleLargeMobile;
    min-width: $dimensionCircleLargeMobile;
    max-height: $dimensionCircleLargeMobile;
    min-height: $dimensionCircleLargeMobile;
  }

  .circle-large-one {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-two {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-three {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-four {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large::before {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid transparent;
    right: -28px;
  }

  .circle-large-one::before {
    border-left: $borderCircleLargeOneBeforeMobile;
  }

  .circle-large-two::before {
    border-left: $borderCircleLargeTwoBeforeMobile;
  }

  .circle-large-three::before {
    border-left: $borderCircleLargeThreeBeforeMobile;
  }

  .circle-large-four::before {
    border-left: $borderCircleLargeFourBeforeMobile;
  }

  .circle-small::before {
    content: '';
    border-left: 2px dashed black;
    position: absolute;
    width: 1px;
    left: 50%;
    top: 125%;
    z-index: 0;
  }

  .circle-small-one::before {
    height: 135px;
  }

  .circle-small-two::before {
    height: 145px;
  }

  .circle-small-three::before {
    height: 160px;
  }

  .circle-small-four::before {
    overflow: hidden;
  }
}

@media (min-width: 426px) and (max-width: 768px) {
  .circle-large {
    max-width: $dimensionCircleLargeMobile;
    min-width: $dimensionCircleLargeMobile;
    max-height: $dimensionCircleLargeMobile;
    min-height: $dimensionCircleLargeMobile;
  }

  .circle-large::before {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid transparent;
    right: -28px;
  }

  .circle-large-one {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-two {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-three {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-four {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-one::before {
    border-left: $borderCircleLargeOneBeforeMobile;
  }

  .circle-large-two::before {
    border-left: $borderCircleLargeTwoBeforeMobile;
  }

  .circle-large-three::before {
    border-left: $borderCircleLargeThreeBeforeMobile;
  }

  .circle-large-four::before {
    border-left: $borderCircleLargeFourBeforeMobile;
  }

  .circle-small::before {
    content: '';
    border-left: 2px dashed black;
    position: absolute;
    width: 1px;
    left: 50%;
    top: 125%;
    z-index: 0;
  }

  .circle-small-one::before {
    height: 135px;
  }

  .circle-small-two::before {
    height: 145px;
  }

  .circle-small-three::before {
    height: 160px;
  }

  .circle-small-four::before {
    overflow: hidden;
  }
}

@media (max-width: 425px) {
  .circle-large {
    max-width: $dimensionCircleLargeMobile;
    min-width: $dimensionCircleLargeMobile;
    max-height: $dimensionCircleLargeMobile;
    min-height: $dimensionCircleLargeMobile;
  }

  .circle-large::before {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid transparent;
    right: -28px;
  }

  .circle-large-one {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-two {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-three {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-four {
    border: $borderCircleLargeOneMobile;
  }

  .circle-large-one::before {
    border-left: $borderCircleLargeOneBeforeMobile;
  }

  .circle-large-two::before {
    border-left: $borderCircleLargeTwoBeforeMobile;
  }

  .circle-large-three::before {
    border-left: $borderCircleLargeThreeBeforeMobile;
  }

  .circle-large-four::before {
    border-left: $borderCircleLargeFourBeforeMobile;
  }

  .circle-small::before {
    content: '';
    border-left: 2px dashed black;
    position: absolute;
    width: 1px;
    left: 50%;
    top: 125%;
    z-index: 0;
  }

  .circle-small-one::before {
    height: 135px;
  }

  .circle-small-two::before {
    height: 185px;
  }

  .circle-small-three::before {
    height: 220px;
  }

  .circle-small-four::before {
    overflow: hidden;
  }
}
</style>
