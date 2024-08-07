import { logError } from '~/utils/log-error'

export default {
  data() {
    return {
      vimeoData: null,
    }
  },

  computed: {
    backgroundOverlay() {
      return { background: 'rgba(0, 0,0, 70%)' }
    },
    vimeoVideo() {
      const link = this.vimeoData?.player_embed_url
      const urls = this.vimeoData?.play?.progressive
      if (urls?.length > 0) {
        const urlsSorted = urls.sort((a, b) => b.width - a.width)
        return { ...urlsSorted[0], link }
      }
      return null
    },
    videoCover() {
      if (!this.vimeoVideo) return null
      /**
       * The first image is taken.
       */
      const picture = this.vimeoData?.pictures.sizes[0]
      if (picture) {
        /**
         * The image size is set to match the video size to avoid resizing when playing the video.
         */
        return `${picture.link.split('-d_')[0]}-d_${this.getVideoRatio(
          'x',
        )}?r=pad`
      }
      return null
    },
    vimeoSource() {
      if (this.vimeoVideo) {
        return this.vimeoVideo.link
      }
      return ''
    },
    videoType() {
      if (this.vimeoVideo) {
        return this.vimeoVideo.type
      }
      return 'video/mp4'
    },
    videoRatio() {
      if (this.vimeoVideo) {
        return this.getVideoRatio()
      }
      return '1920:1080'
    },
  },

  methods: {
    async getVimeoData(vimeoId) {
      const vimeoAuthToken = this.$config.public.vimeoAuthToken
      try {
        const response = await fetch(
          `https://api.vimeo.com/videos/${vimeoId}`,
          {
            method: 'GET',
            headers: {
              authorization: `Bearer ${vimeoAuthToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        this.vimeoData = await response?.json()
      } catch (error) {
        logError(error)
      }
    },
    getVideoRatio(character = ':') {
      if (this.vimeoVideo) {
        return `${this.vimeoVideo.width}${character}${this.vimeoVideo.height}`
      }
      return `1920${character}1080`
    },
    handlerPlay() {
      this.$modal.open('videoIntro')
    },
  },
}
