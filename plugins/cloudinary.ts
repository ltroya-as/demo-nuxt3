import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const IMAGE_SIZES = {
    'hero-image': ['h_300', 'w_600', 'c_fill', 'g_auto'],
    magazine: ['w_200', 'h_270', 'c_scale'],
    presentation: ['w_370', 'c_scale'],
    'video-thumbnail': ['w_500', 'c_scale'],
    'membership-thumbnail': ['w_700', 'c_scale'],
    'membership-hero': ['w_1300', 'c_scale'],
    'event-card': ['w_500', 'c_fill', 'g_auto', 'f_auto', 'q_auto'],
    'event-card-mobile': ['w_350', 'c_fill', 'g_auto', 'f_auto', 'q_auto'],
    'event-detail': ['w_950', 'c_fill', 'g_auto', 'f_auto', 'q_auto'],
    'event-detail-mobile': ['w_420', 'c_fill', 'g_auto', 'f_auto', 'q_auto'],
  }

  /**
   * Check if an url is a cloudinary url
   *
   * @param {string} imageUrl
   * @returns
   */
  const isCloudinaryUrl = (imageUrl) => {
    return imageUrl?.includes('res.cloudinary.com')
  }

  /**
   * Some images come with transformation params, in order to make a successful resize
   * we need to remove those. E.g
   * https://res.cloudinary.com/benchmarkminerals/images/w_2560,h_1362/f_auto,q_auto/v1654631307/kualo_qa_media_library/Shanghai-lockdown/Shanghai-lockdown.jpg?_i=AA
   *
   * That url will become:
   * https://res.cloudinary.com/benchmarkminerals/images/f_auto,q_auto/v1654631307/kualo_qa_media_library/Shanghai-lockdown/Shanghai-lockdown.jpg?_i=AA
   *
   * @param {string} imageUrl
   * @returns string
   */
  const removeExistingTransformationParams = (imageUrl) => {
    return imageUrl
      .split('/')
      .filter(
        (segment) =>
          !['w_', 'h_', 'q_', 'f_'].some((param) => segment.startsWith(param)),
      )
      .join('/')
  }

  /**
   * Get the params to append to the cloudinary url with some default params
   *
   * @param {string} size
   * @returns
   */
  const getSizeParams = (size) => {
    const defaultParams = ['f_auto', 'q_auto']

    return [...defaultParams, ...IMAGE_SIZES[size]]
  }
  /**
   * Add parameters to resize the image
   *
   * @param {string} imageUrl
   * @param {string} size
   * @returns
   */
  const resize = (imageUrl, size) => {
    if (!isCloudinaryUrl(imageUrl) || !IMAGE_SIZES[size]) {
      return imageUrl
    }

    const sizeParams = getSizeParams(size)
    imageUrl = removeExistingTransformationParams(imageUrl)

    return imageUrl.replace('/images', `/images/${sizeParams.join(',')}`)
  }

  /**
   *
   * @param {string} cloudinaryUrl
   * @param {string} size
   * @returns
   */
  const optimize = (cloudinaryUrl, size) => {
    const folder = cloudinaryUrl.includes('upload') ? 'image/upload' : 'images'
    const image = cloudinaryUrl.split('/v')[1]
    const query = IMAGE_SIZES[size].join(',')
    return `https://res.cloudinary.com/benchmarkminerals/${folder}/${query}/v${image}`
  }

  const cloudinary = { resize, optimize }

  return { provide: { cloudinary } }
})
