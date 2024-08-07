import { useGtag } from 'vue-gtag-next'

export function useGoogleAnalyticsPageView(title: string): void {
  const route = useRoute()
  const { $config } = useNuxtApp()
  const { pageview } = useGtag()

  let pagePath = route.path
  let pageLocation = `${$config.public.baseUrl}/${route.fullPath}`
  if (process.client) {
    pagePath = window.location.pathname
    pageLocation = window.location.href
  }
  /**
   * This method helps measure page views.
   * More info: https://developers.google.com/analytics/devguides/collection/gtagjs/pages
   */
  pageview({
    page_path: pagePath,
    page_title: title,
    page_location: pageLocation,
  })
}

export function useGoogleAnalyticsDownloadEvent(fileName: string): void {
  const { event } = useGtag()
  event('ce_file_download', {
    event_category: 'download',
    value: fileName,
    send_to: 'default',
  })
}

export const useGoogleAnalyticsFormSubmitEvent = () => {
  const { event } = useGtag()

  const trackFormSubmitEvent = (formId: string) => {
    event('form_submit', {
      event_category: 'form',
      value: formId,
      send_to: 'default',
    })
  }

  return { trackFormSubmitEvent }
}
