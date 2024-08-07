import Player from '@vimeo/player'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      vimeo: {
        init: (element, options) => new Player(element, options),
      },
    },
  }
})
