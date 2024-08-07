import { domToCanvas } from 'modern-screenshot'
import watermarkjs from 'watermarkjs'
import benchmarkChartLogo from '~/assets/icons/BenchmarkChartLogo.svg?url'

export default {
  props: {
    chartImageName: {
      type: String,
      default: () => 'gigafactories.png',
    },
  },
  data() {
    return {
      downloadingChart: false,
    }
  },
  methods: {
    async downloadChart({
      name = this.chartImageName,
      watermarkLocations = ['center'],
      watermarkLocationsPosition = [
        {
          x(target, mark) {
            return (target.width - mark.width) / 2
          },
          y() {
            return 10
          },
        },
        {
          x(target, mark) {
            return (target.width - mark.width) / 2
          },
          y(target, mark) {
            return target.height - (mark.height + 10)
          },
        },
      ],
    } = {}) {
      this.downloadingChart = true

      const canvas = await domToCanvas(
        document.querySelector('#chart-canvas'),
        {
          filter: this.filter,
          backgroundColor: '#fff',
        },
      )

      canvas.toBlob((blob) => {
        let watermark = watermarkjs([blob, benchmarkChartLogo])
        for (const location of watermarkLocations) {
          watermark = watermark
            .dataUrl(watermarkjs.image[location](0.3))
            .load([benchmarkChartLogo])
        }

        if (canvas.height >= 1000) {
          for (const location of watermarkLocationsPosition) {
            watermark = watermark
              .dataUrl(watermarkjs.image.atPos(location.x, location.y, 0.3))
              .load([benchmarkChartLogo])
          }
        }
        watermark
          .dataUrl((target, _logo) => target)
          .then((url) => {
            const link = document.createElement('a')
            link.setAttribute('download', name)
            link.href = url
            link.click()

            this.downloadingChart = false
          })
      }, 'image/png')
    },
    filter(node) {
      const exclusionClasses = ['remove-me']
      return !exclusionClasses.some((classname) =>
        node.classList?.contains(classname),
      )
    },
  },
}
