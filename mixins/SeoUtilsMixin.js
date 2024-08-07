export default {
  methods: {
    /**
     * Method to generate the seo properties required
     * by each page or post
     *
     * @param {Object} metas - Meta tags you want to add or override, for example: {title, link, etc}
     * @param {Object} seoProperties - Seo properties like {opengraphTitle, twitterCard, twitterTitle, ...and so on}
     * @returns Nuxt head() method required the following structure: {title, meta: [], link: []}
     */
    generateSeoInfo(metas, seoProperties = {}) {
      const {
        title = TITLE,
        description = seoProperties.description ||
          seoProperties.opengraphDescription ||
          META_DESCRIPTION,
        ...remainingMetas
      } = metas
      return {
        title: formatTitle(title),
        meta: uniqBy(
          this.buildMetas({
            description,
            twitterDescription: description,
            opengraphDescription: description,
            opengraphTitle: formatTitle(title),
            ...seoProperties,
          }),
          'hid',
        ),
        link: this.generateCanonicalLink(),
        ...remainingMetas,
      }
    },
    addAdditionalSeoProperties(seoProperties) {
      if (seoProperties.opengraphImage) {
        // If there is an opengraph:image, it should be an opengraph:secure:image as well.
        // That's why we append the opengraphImage:secure_url to the seoProperties
        seoProperties['opengraphImage:secure_url'] =
          seoProperties.opengraphImage
        seoProperties.twitterImage =
          seoProperties.twitterImage || seoProperties.opengraphImage
      }
      if (seoProperties.opengraphDescription) {
        seoProperties.twitterDescription =
          seoProperties.twitterDescription || seoProperties.opengraphDescription
      }
      seoProperties.opengraphUrl = this.getUrl()
      return seoProperties
    },
    getSeoProperties(seoProperties) {
      return Object.keys(seoProperties).filter((key) => !!seoProperties[key])
    },
    getUrl() {
      return `${this.$config?.baseFrontendUrl}${this.$route?.fullPath}`
    },
    getSeoValue(seoProperties, key) {
      // Only twitterImage and opengraphImage are objects and
      // has a property called mediaItemUrl that is the image url
      // for the page, post, or custom post type
      if (isObject(seoProperties[key])) {
        return seoProperties[key].mediaItemUrl
      }
      return seoProperties[key]
    },
    generateCanonicalLink() {
      return [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.getUrl(),
        },
      ]
    },
    buildMetas(seoProperties) {
      const allSeoProperties = this.addAdditionalSeoProperties(seoProperties)
      return this.getSeoProperties(allSeoProperties).map((key) => ({
        hid: this.formatSeoPropertyName(key),
        [this.isOpengraphProperty(key) ? 'property' : 'name']:
          this.formatSeoPropertyName(key),
        content: this.getSeoValue(seoProperties, key),
      }))
    },
    isOpengraphProperty(propertyName) {
      return propertyName.startsWith('opengraph')
    },
    isTwitterProperty(propertyName) {
      return propertyName.startsWith('twitter')
    },
    formatSeoPropertyName(propertyName) {
      const firstUpperLetterIndex = propertyName
        .split('')
        .findIndex((letter) => /[A-Z]/.test(letter))
      const name = propertyName.substr(firstUpperLetterIndex).toLowerCase()

      if (this.isOpengraphProperty(propertyName)) {
        return `og:${name}`
      }

      return this.isTwitterProperty(propertyName)
        ? `twitter:${name}`
        : propertyName
    },
  },
}
