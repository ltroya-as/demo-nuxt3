<template>
  <div v-if="source" class="responsive-height-aspect-ratio-16-9">
    <div class="absolute h-full w-full">
      <div class="flex h-full w-full">
        <iframe
          ref="player"
          :src="urlVideo"
          allowfullscreen
          class="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
          :title="title"
        />
      </div>
    </div>
  </div>
</template>

<script>
const defaultOptions = {
  loop: false,
  autoplay: true,
  muted: false,
  playsinline: true,
  byline: false,
  portrait: false,
  title: false,
  speed: true,
  transparent: false,
  captions: false,
  pip: false,
  color: 'FDBD00',
  endscreen: 'void',
  fields: 'play.progressive',
}

export default {
  props: {
    source: {
      type: [String, Number],
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    ratio: {
      type: String,
      default: '1920:1080',
    },
  },
  computed: {
    urlVideo() {
      const url = new URL(this.source)
      Object.entries(defaultOptions).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
      return url.toString()
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.player) return

      const vimeoPlayer = this.$vimeo.init(this.$refs.player, {
        ratio: this.videoRatio,
      })

      vimeoPlayer.on('ended', () => this.$emit('endedVideo'))
      vimeoPlayer.on('play', () => this.$emit('playVideo'))
    })
  },
}
</script>

<style scoped lang="scss">
.responsive-height-aspect-ratio-16-9 {
  position: relative;
  margin: 0 auto;
  aspect-ratio: 16/9;
  max-width: 100vw;
}
</style>
