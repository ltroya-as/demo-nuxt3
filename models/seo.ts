export interface Link {
  hid: string
  rel: string
  href: string
}

export interface Meta {
  title?: string
  meta?: any[]
  link?: Link[]
  [key: string]: any
}

export interface SeoProperties {
  description?: string
  twitterDescription?: string
  opengraphDescription?: string
  opengraphTitle?: string
  opengraphImage?: string
  mediaItemUrl?: string
  [key: string]: any
}

export interface SeoProps {
  metaProps: Meta
  seoProperties?: SeoProperties
  url?: string
}

export interface BuildMeta {
  seoProperties: SeoProperties
  url: string
}
