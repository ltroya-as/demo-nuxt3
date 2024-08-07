import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { format } from 'date-fns'
import { mapGetters } from 'vuex'
import { FORBIDDEN, UNAUTHORIZED } from '~/constants/http'
import { HttpClientProxy } from '~/utils/http'
import { getNewToken } from '~/utils/auth'
import fontUrl from '@/assets/fonts/Montserrat-Medium.ttf'

export default {
  props: {
    fileInfo: {
      type: Object,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    downloadingClasses: { type: String, default: '' },
    downloadButtonVariant: {
      type: String,
      default: 'primary',
    },
  },

  data() {
    return {
      downloading: false,
      downloadProgress: 0,
      cancellationSource: null,
      retries: 0,
    }
  },

  computed: {
    ...mapGetters({
      fullName: 'auth/fullName',
      isAlreadyAuthenticated: 'auth/authenticated',
    }),
    progressBarDownloadingStyles() {
      return {
        width: `${this.downloadProgress > 5 ? this.downloadProgress : 0}%`,
      }
    },

    progressBarDownloadingStylesForCard() {
      return {
        width: `${this.downloadProgress > 5 ? this.downloadProgress : 0}%`,
        bottom: 0,
        borderRadius: 0,
      }
    },
    userEmail() {
      return this.$store.state.auth.user.email
    },
  },

  methods: {
    async downloadReport(report, category, onErrorCallback = null) {
      if (!report.file_name) return
      const id = report.id || report.ID
      await this.downloadReportRequest(
        `${this.$config.public.apiRestEndpoint}/downloads/category/${category}/${id}`,
        report.file_name,
        onErrorCallback,
        category,
      )
    },

    async downloadReportById(id, onErrorCallback = null) {
      await this.downloadReportRequest(
        `${this.$config.public.apiRestEndpoint}/downloads/report/${id}`,
        null,
        onErrorCallback,
      )
    },

    async downloadReportByIds(ids, onErrorCallback = null) {
      await Promise.all(
        ids.map(async (id) => {
          await this.downloadReportRequest(
            `${this.$config.public.apiRestEndpoint}/downloads/report/${id}`,
            null,
            onErrorCallback,
            null,
            true,
          )
        }),
      )
    },

    extractFilenameFromHeaders(headers) {
      const rawFilename = headers['content-disposition']
      return rawFilename.split('filename=')[1]
    },

    async downloadReportRequest(
      url,
      filename = null,
      onErrorCallback = null,
      category = null,
      isMultiple = false,
    ) {
      if (this.downloading) return

      this.downloading = !isMultiple

      const options = await HttpClientProxy.buildHttpOptions(
        {},
        this.$cookies,
        this.$config,
      )
      this.abortController = new AbortController()

      await this.$axios({
        method: 'POST',
        url,
        responseType: 'blob',
        headers: options.headers,
        signal: this.abortController.signal,
        onDownloadProgress: (progressEvent) => {
          const total = parseFloat(progressEvent.total)
          const current = progressEvent.loaded
          this.downloadProgress = Math.floor((current / total) * 100)
        },
      })
        .then(async ({ data: blob, headers }) => {
          this.retries = 0
          const isPDF =
            this.extractFilenameFromHeaders(headers)?.endsWith('.pdf')
          let blobFile = blob
          if (isPDF && category !== 'public-documents') {
            const pdfWithWatermark = await this.addWatermarkInPDF(blob)
            blobFile = new Blob([pdfWithWatermark], {
              type: 'application/pdf',
            })
          }
          const blobUrl = window.URL.createObjectURL(blobFile)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = blobUrl
          a.download = filename || this.extractFilenameFromHeaders(headers)
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(blobUrl)
          document.body.removeChild(a)

          this.$gtag.event('ce_file_download', {
            event_category: 'download',
            value: filename,
            send_to: 'default',
          })
        })
        .catch(async (e) => {
          if (e.status === FORBIDDEN || e.response?.status === FORBIDDEN) {
            await this.$membershipApi.getActiveMemberships()

            if (onErrorCallback && typeof onErrorCallback === 'function') {
              onErrorCallback()
            }
          }

          if (e.response?.status === UNAUTHORIZED && this.retries < 1) {
            await getNewToken({
              $cookies: this.$cookies,
              $config: this.$config,
            })
            this.downloading = false
            this.retries++
            await this.downloadReportRequest(url, filename, onErrorCallback)
          }
        })
        .finally(() => {
          this.resetDownloadState()
        })
    },
    async addWatermarkInPDF(blob) {
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())
      const newBlob = new Blob([blob], { type: 'application/pdf' })
      const pdfBuffer = new Uint8Array(await newBlob.arrayBuffer())
      const pdfData = new Uint8Array(pdfBuffer)
      const pdfDoc = await PDFDocument.load(pdfData)
      pdfDoc.registerFontkit(fontkit)
      const font = await pdfDoc.embedFont(fontBytes)
      const pages = pdfDoc.getPages()
      const generateDate = format(new Date(), 'dd.MM.yyyy.')

      let message = 'Generated by Benchmark Mineral Intelligence'
      if (this.isAlreadyAuthenticated) {
        message = `Generated by Benchmark Mineral Intelligence for ${this.fullName} - ${this.userEmail} on ${generateDate} Not for further distribution.`
      }

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = '10px Montserrat-Medium'

      const pixelText = context.measureText(message).width + 27
      const { width: pageWidth, height } = pages[0].getSize()

      let arrayMessages = []
      if (pixelText > pageWidth) {
        arrayMessages = message.split('-').slice()
      } else {
        arrayMessages.push(message)
      }

      pages.forEach((page) => {
        arrayMessages.forEach((message, index) => {
          page.drawText(message, {
            x: 27,
            y: height - 10 * (index + 1),
            size: 8,
            font,
            color: rgb(0, 0, 0),
            opacity: 0.25,
          })
        })
      })

      return await pdfDoc.save()
    },

    async getVimeoData(vimeoId, vimeoAuthToken) {
      if (this.downloading) return
      this.downloading = true

      const response = await fetch(`https://api.vimeo.com/videos/${vimeoId}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${vimeoAuthToken}`,
          'Content-Type': 'application/json',
        },
      })
      const clonedResponse = response.clone()

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentLength = clonedResponse.headers.get('content-length')
      const total = parseInt(contentLength, 10)
      let loaded = 0
      const reader = clonedResponse.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        loaded += value.length
        this.downloadProgress = Math.floor((loaded / total) * 100)
      }
      return await response?.json()
    },

    async downloadVideoVimeo(vimeoId, vimeoAuthToken) {
      try {
        const data = await this.getVimeoData(vimeoId, vimeoAuthToken)
        const downloadUrl = data.download.find(
          (download) =>
            download.quality === 'hd' && download.rendition === '720p',
        )?.link
        if (downloadUrl) {
          this.downloadVideo(downloadUrl)
        }
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.error({ _error })
      } finally {
        this.resetDownloadState()
      }
    },

    downloadVideo(url) {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    resetDownloadState() {
      this.downloading = false
      this.downloadProgress = 0
      this.abortController = null
    },

    cancelDownload() {
      if (!this.abortController) return

      this.abortController.abort()
      this.resetDownloadState()
    },
  },
}
