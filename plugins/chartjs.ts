import { defineNuxtPlugin } from 'nuxt/app'
// chartjs-plugin-crosshair (annoyingly) registers itself globally for all chartjs charts
// best to import here once and explicitly disable in all charts that do not need it
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarController,
  BarElement,
  ArcElement,
  registerables,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

export default defineNuxtPlugin(() => {
  /**
   * For mobile, we use the 2.8% of the width for the font-size
   *
   * See:
   * https://stackoverflow.com/questions/44540746/how-i-can-prevent-of-labels-overlapping-on-mobile-screen-chart-js#0.4382986626680647
   * https://stackoverflow.com/questions/50475563/making-the-labels-responsive-in-chart-js
   */
  ChartJS.register(...registerables)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    BarController,
    BarElement,
    ArcElement,
    {
      id: 'responsiveFontSize',
      beforeDraw(c) {
        if (c.scales['y-axis-0']?.options) {
          c.scales['y-axis-0'].options.ticks.fontSize =
            window.innerWidth >= 1024 ? 12 : 10
        }
      },
    },
  )

  ChartJS.defaults.plugins.crosshair = false // globally disable crosshair
})
