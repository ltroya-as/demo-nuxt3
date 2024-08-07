export default {
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.setMethodologyFileInfo()
    },
    async setMethodologyFileInfo() {
      const { category, tag } =
        this.general?.methodologyFileInfo ?? this.methodologyFileInfo
      const methodology = await this.findMethodologyByTag(category, tag)

      if (methodology) {
        if (this.methodologyFileInfo) {
          this.methodologyFileInfo.ID = methodology.ID
          this.methodologyFileInfo.file_name = methodology.file_name
        }
        if (this.general) {
          this.general.methodologyFileInfo.ID = methodology.ID
          this.general.methodologyFileInfo.file_name = methodology.file_name
        }
      }
    },

    async findMethodologyByTag(category, tag) {
      const methodologies = await this.$downloadManager.getFilesForCategory(
        category,
      )

      return methodologies.find((file) =>
        file.tags.find((tag_) => tag_.name === tag),
      )
    },
  },
}
