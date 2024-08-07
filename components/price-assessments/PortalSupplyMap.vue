<template>
  <div id="map" class="relative min-h-[630px]">
    <div class="absolute bottom-9 z-10 flex flex-row gap-2 pl-5">
      <div class="heat-indicator-bar h-52 w-5 rounded-xl"></div>
      <div class="flex flex-col items-start justify-between py-1.5">
        <span class="text-xs font-medium text-black">
          {{ minProductionLabel }}
        </span>
        <span class="text-xs font-medium text-black">
          {{ maxProductionLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Map, Popup, NavigationControl } from 'mapbox-gl'
import {
  getProductionByCountry,
  getProductionByRegion,
  getOperatingMines,
  getMineSource,
  mapNumberToRGB,
} from '~/utils/map-mines'
import ClientDebounce from '@/utils/client-debounce'
import { logError } from '~/utils/log-error'

export default {
  props: {
    mines: {
      type: Array,
      required: true,
    },
    resize: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const operatingMines = getOperatingMines(this.mines)
    const countryCodesWithMines = operatingMines.map(
      (mine) => mine.country.code,
    )

    return {
      mouseLeaveDebounce: new ClientDebounce(),
      productionByCountry: getProductionByCountry(operatingMines),
      productionByRegion: getProductionByRegion(operatingMines),
      mineSource: getMineSource(operatingMines),
      countryCodesWithMines,
      RANGE_COLORS: {
        MIN: [255, 247, 224],
        MID: [253, 189, 0],
        MAX: [252, 107, 0],
      },
      map: null,
    }
  },
  computed: {
    minProduction() {
      const values = Object.entries(this.productionByCountry)
        .filter(([key]) => key !== 'unit')
        .map(([, value]) => value)

      return Math.min(...values, 0)
    },
    maxProduction() {
      const values = Object.entries(this.productionByCountry)
        .filter(([key]) => key !== 'unit')
        .map(([, value]) => value)

      return Math.max(...values)
    },
    minProductionLabel() {
      const unit = this.productionByCountry.unit

      return `${this.formatProductionValue(this.minProduction)} ${unit}`
    },

    maxProductionLabel() {
      const unit = this.productionByCountry.unit

      return `${this.formatProductionValue(this.maxProduction)} ${unit}`
    },
  },
  watch: {
    resize() {
      this.map.resize()
      this.map.setZoom(this.calculateMapZoom(document.getElementById('map')))
    },
  },

  mounted() {
    const mapboxToken = this.$config.public.mapboxToken
    if (!mapboxToken) {
      logError('Mapbox token not found')
      return
    }
    const mapElement = document.getElementById('map')
    const zoom = this.calculateMapZoom(mapElement)
    mapElement.setAttribute(
      'style',
      `height: ${mapElement.offsetWidth * 0.55}px;`,
    )
    const center = this.calculateMapCenter()
    this.map = new Map({
      container: 'map', // container ID
      style: 'mapbox://styles/chris-allan-solutions/clmhwp9lr03qu01p781aib2c3',
      zoom,
      projection: 'mercator',
      antialias: true,
      center,
      cooperativeGestures: true,
      accessToken: mapboxToken,
    })

    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.map.addControl(
      new NavigationControl({ showCompass: false }),
      'bottom-right',
    )

    let hoveredPolygonId = null
    let popup = null
    const ISO_COUNTRY_CODE_RULE_NAME = 'iso_3166_1_alpha_3'
    const DATA_SOURCE_ID = 'countries'
    const DATA_SOURCE_LAYER_ID = 'country_boundaries'
    const HOVER_LAYER_ID = 'highlight-fill'
    const BORDER_LAYER_ID = 'country-borders'
    const removePopup = () => {
      popup?.remove()
    }

    this.map.on('load', () => {
      this.map.addSource(DATA_SOURCE_ID, {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      })

      this.map.addLayer(
        {
          id: HOVER_LAYER_ID,
          type: 'fill',
          source: DATA_SOURCE_ID,
          'source-layer': DATA_SOURCE_LAYER_ID,
          layout: {},
          paint: {
            'fill-color': [
              'match',
              ['get', ISO_COUNTRY_CODE_RULE_NAME],
              ...this.getCountriesToMap(),
              '#2F3A4A',
            ],
            'fill-opacity': 1,
          },
        },
        'admin-1-boundary-bg',
      )
      this.map.setFilter(HOVER_LAYER_ID, [
        'in',
        ISO_COUNTRY_CODE_RULE_NAME,
        ...this.countryCodesWithMines,
      ])

      this.map.addLayer({
        id: BORDER_LAYER_ID,
        type: 'line',
        source: DATA_SOURCE_ID,
        'source-layer': DATA_SOURCE_LAYER_ID,
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 1,
        },
        filter: ['==', ISO_COUNTRY_CODE_RULE_NAME, ''],
      })

      this.map.addLayer({
        id: 'mines',
        type: 'circle',
        source: this.mineSource,
        paint: {
          'circle-radius': 4,
        },
      })

      this.map.setPaintProperty('admin-1-boundary', 'line-color', '#000')

      // highlight country on hover and show popup.
      this.map.on('mousemove', HOVER_LAYER_ID, (e) => {
        removePopup()
        this.mouseLeaveDebounce.clear()

        if (!e.features.length) return

        const countryName = e.features[0].properties.name_en
        const countryCode = e.features[0].properties[ISO_COUNTRY_CODE_RULE_NAME]
        let region = e.features[0].properties.region
        const subRegion = e.features[0].properties.subregion
        region = this.getSubAmericasRegion(region, subRegion)

        if (!this.countryCodesWithMines.includes(countryCode)) return

        if (hoveredPolygonId !== null) {
          this.map.setFeatureState(
            {
              source: DATA_SOURCE_ID,
              sourceLayer: DATA_SOURCE_LAYER_ID,
              id: hoveredPolygonId,
            },
            { hover: false },
          )
        }

        hoveredPolygonId = e.features[0].id

        this.map.getCanvas().style.cursor = 'pointer'
        this.map.setFeatureState(
          {
            source: DATA_SOURCE_ID,
            sourceLayer: DATA_SOURCE_LAYER_ID,
            id: hoveredPolygonId,
          },
          { hover: true },
        )
        this.map.setFilter(BORDER_LAYER_ID, [
          '==',
          ISO_COUNTRY_CODE_RULE_NAME,
          countryCode,
        ])

        popup = new Popup({
          closeButton: false,
          closeOnClick: false,
        })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div>
                  <div class="popup-title"><b>${countryName}</b></div>
                  <div class="popup-content">
                    <div class="popup-region">Region - <b>${region}</b></div>
                    <div>
                      <b>Production:</b>
                      ${this.formatProductionValue(
                        this.productionByCountry[countryCode],
                      )}${this.productionByCountry.unit}
                    </div>
                    <div>
                      <b>Regional Production:</b>
                      ${this.formatProductionValue(
                        this.productionByRegion[region],
                      )}${this.productionByRegion.unit}
                    </div>
                  </div>
                </div>`,
          )
          .addTo(this.map)
      })

      // reset country highlight and remove popup.
      this.map.on('mouseleave', HOVER_LAYER_ID, () => {
        removePopup()

        this.mouseLeaveDebounce.debounce(() => {
          if (hoveredPolygonId !== null) {
            this.map.setFeatureState(
              {
                source: DATA_SOURCE_ID,
                sourceLayer: DATA_SOURCE_LAYER_ID,
                id: hoveredPolygonId,
              },
              { hover: false },
            )
          }
          hoveredPolygonId = null
          this.map.getCanvas().style.cursor = ''
          this.map.setFilter(BORDER_LAYER_ID, [
            '==',
            ISO_COUNTRY_CODE_RULE_NAME,
            '',
          ])
        }, 50)
      })
    })
  },
  methods: {
    calculateMapZoom(mapElement) {
      let zoom = 1.35

      if (window.innerWidth < 640) {
        zoom = 1
      } else if (mapElement.offsetWidth < 900) {
        zoom = 0.75
      } else if (mapElement.offsetWidth < 1000) {
        zoom = 1
      } else if (mapElement.offsetWidth < 1100) {
        zoom = 1.25
      }
      return zoom
    },
    calculateMapCenter() {
      if (window.innerWidth < 640) return [-80, 25]
      return [0, 15]
    },
    getSubAmericasRegion(region, subRegion) {
      const americaSubRegions = {
        region: 'Americas',
        'Northern America': 'North America',
        'Latin America and the Caribbean': 'South America',
      }
      if (region === 'Americas') {
        return americaSubRegions[subRegion] || region
      }
      return region
    },
    formatProductionValue(value) {
      return value?.toLocaleString() || 0
    },
    getColorByProduction(production) {
      return mapNumberToRGB(
        production,
        this.minProduction,
        this.maxProduction,
        this.RANGE_COLORS.MIN,
        this.RANGE_COLORS.MID,
        this.RANGE_COLORS.MAX,
      )
    },
    getCountriesToMap() {
      const formatProductionValue = Object.entries(this.productionByCountry)
        .filter(([key]) => key !== 'unit')
        .map(([key, value]) => ({
          countryIsoCode: key,
          production: value,
        }))

      return formatProductionValue
        .filter((country) => country.production > 0)
        .reduce((acc, country) => {
          acc.push(
            country.countryIsoCode,
            this.getColorByProduction(country.production),
          )
          return acc
        }, [])
    },
  },
}
</script>
<style scoped>
.heat-indicator-bar {
  background: linear-gradient(
    180deg,
    theme('colors.p.50') 0%,
    theme('colors.p.600') 47.5%,
    #fc6b00 100%
  );
}
</style>
