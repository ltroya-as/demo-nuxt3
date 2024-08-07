import { defineNuxtPlugin } from 'nuxt/app'
import SimpleLightbox from 'simplelightbox'

const IMAGE_LINK_SELECTORS = `
  body a[href*="images"],
  body a[href*="uploads"],
  body a[href*="png"],
  body a[href*="gif"],
  body a[href*="jpeg"],
  body a[href*="jpg"],
  body a[href*="res.cloudinary.com" i]
`

export default defineNuxtPlugin(() => {
  const lightbox = new SimpleLightbox(IMAGE_LINK_SELECTORS, {
    sourceAttr:
      'data-href' /** attribute used to take the information from the image */,
    scrollZoom: false,
    nav: false,
    showCounter: false,
    doubleTapZoom: 1,
    disableScroll: false,
    alertError: false,
    preloading: false,
    loop: false,
  })

  return { provide: { lightbox } }
})
