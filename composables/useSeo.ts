import type { Meta, SeoProperties } from '~/models/seo'
import { generateSeoInfo } from '~/utils/seo'

export const useSeo = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const url = `${config.public?.baseFrontendUrl}${route?.fullPath}`

  const getSeoInfo = (metaProps: Meta, seoProperties?: SeoProperties): any =>
    generateSeoInfo({ metaProps, seoProperties, url })

  return { getSeoInfo }
}
