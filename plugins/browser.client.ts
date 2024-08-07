import { defineNuxtPlugin } from 'nuxt/app'
import Bowser from 'bowser'

export default defineNuxtPlugin(() => {
  // eslint-disable-next-line import/no-named-as-default-member
  const parser = Bowser.getParser(window.navigator.userAgent)
  const platform = parser.getPlatform()

  const isIphone = () => platform.model === 'iPhone'
  const isApple = () => platform.vendor === 'Apple'
  const isSafari = () => parser.getBrowserName() === 'Safari'
  const isMobile = () =>
    window.matchMedia('only screen and (max-width: 1024px)').matches

  const browser = { isIphone, isApple, isMobile, isSafari }

  return { provide: { browser } }
})
