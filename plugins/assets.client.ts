export default defineNuxtPlugin(() => {
  const getIconByName = (iconName: string): any => {
    const iconUrls = import.meta.glob('../assets/icons/**/*.svg')
    const icons = Object.entries(iconUrls).reduce((acc, [key, value]) => {
      const name = key
        .split('../')[1]
        .replace('assets/icons/', '')
        .replace('.svg', '')
      return { ...acc, [name]: value }
    }, {})
    return icons[iconName]
  }

  const getIllustrationByName = (illustrationName: string): any => {
    const illustrationUrls = import.meta.glob(
      '../assets/vector-illustrations/**/*.svg',
    )
    const illustrations = Object.entries(illustrationUrls).reduce(
      (acc, [key, value]) => {
        const name = key
          .split('../')[1]
          .replace('assets/vector-illustrations/', '')
          .replace('.svg', '')
        return { ...acc, [name]: value }
      },
      {},
    )
    return illustrations[illustrationName]
  }

  return {
    provide: {
      assets: {
        getIconByName,
        getIllustrationByName,
      },
    },
  }
})
