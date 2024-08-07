export default {
  head() {
    if (this.article) {
      const seoProperties = this.article.seo || {}
      return this.generateSeoInfo({ title: this.article.title }, seoProperties)
    }
  },
}
