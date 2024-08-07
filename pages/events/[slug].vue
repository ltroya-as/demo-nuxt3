<template>
  <div>
    <div v-if="loading" class="flex min-h-[80vh] items-center justify-center">
      <TheLoader />
    </div>
    <div v-else>
      <NavigationBreadcrumb :menu="menu" />
      <EventsPageTitle :show-icon-back="true" />
      <div class="mx-auto flex max-w-[943px] flex-col gap-y-4 md:gap-y-6">
        <EventsFeaturedImage
          :image="eventImage"
          :alt="eventTitle"
          :type="eventType"
        />
        <h1 class="text-xl font-bold md:text-4xl">
          {{ eventTitle }}
        </h1>
        <div class="bg-p-500 h-[3px] w-full"></div>

        <div class="grid w-full gap-6 lg:grid-cols-12">
          <div class="flex w-full flex-col lg:col-span-3">
            <div class="flex w-full flex-col gap-y-4">
              <h4 class="text-lg font-semibold">Time and location</h4>
              <div class="flex w-full flex-col gap-y-5 text-black">
                <CommonDate
                  :date="eventDate"
                  icon-classes="!min-w-[12px] !max-w-[12px] md:!min-w-[20px] md:!max-w-[20px]"
                  class="!items-center"
                />
                <CommonLocation
                  :location="eventLocation"
                  icon-classes="!min-w-[12px] !max-w-[12px] md:!min-w-[20px] md:!max-w-[20px]"
                  class="!items-center"
                />
              </div>
            </div>
          </div>
          <div
            v-if="eventDescription"
            class="prose lg:col-span-9 lg:ml-6"
            v-html="eventDescription"
          >
          </div>
          <div
            v-if="showForm && eventDescription"
            class="hidden md:col-span-3 md:grid"
          ></div>
          <div
            v-if="showForm"
            :class="[
              eventDescription ? 'md:col-span-9 lg:ml-6' : 'lg:col-span-9',
            ]"
          >
            <CommonFormBuilder
              :default-values="defaultValues"
              :form-id="event.formId"
              :initial-focus="false"
              :show-link-privacy-policy="false"
              field-bg-color="white"
              container-details-class="flex flex-col items-center justify-center"
              container-button-send-class="w-full md:ml-auto"
              button-send-class="!w-full"
              @success="onSuccess"
            />
          </div>
        </div>
        <div v-if="!showForm" class="mt-8 flex w-full flex-col gap-y-8">
          <div
            class="grid place-content-center gap-y-5 md:place-content-stretch"
          >
            <Session
              v-for="(session, index) in eventWebinars"
              :key="index"
              :session="session"
              :order="index + 1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatEvent } from '~/utils/events'
import eventDetail from '~/queries/event-details.gql'
import TheLoader from '~/components/TheLoader.vue'
import EventsPageTitle from '~/components/shared/events/PageTitle.vue'
import NavigationBreadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import EventsFeaturedImage from '~/components/shared/events/FeaturedImage.vue'
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import CommonDate from '~/components/shared/common/Date.vue'
import CommonLocation from '~/components/shared/common/Location.vue'
import Session from '~/components/shared/events/Session.vue'

const emit = defineEmits(['success'])

const { $bmAuth } = useNuxtApp()
const { getSeoInfo } = useSeo()
const route = useRoute()

const loading = ref(true)
const title = ref('')
const event = ref<any>({})
const seo = ref<any>({})
const defaultValues = ref({})
const success = ref(false)
const menu = ref([{ title: 'Events', url: '/events' }])

const {
  isEventDetail,
  eventType,
  eventWebinars,
  eventTitle,
  eventDescription,
  eventImage,
  eventDate,
  eventLocation,
} = useValidatedEvent(event)

const showForm = computed(() => {
  return (
    !event.value.webinars?.some((_webinar) => _webinar.url) &&
    event.value.formId
  )
})
const computedSeo = computed(() => {
  const defaultImage =
    'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1500,c_fill,g_auto/v1689289325/assets/events/benchmark-webinar_tickie.png?_i=AA'
  const image =
    event.value.backgroundImage?.sourceUrl ??
    seo.value.backgroundImage?.sourceUrl ??
    defaultImage

  return getSeoInfo(
    {
      title: seo.value.title ?? 'Event',
      description: seo.value.blurb || 'Online event',
    },
    {
      twitterImage: image,
      opengraphImage: image,
    },
  )
})

const fetchData = async () => {
  try {
    const response = await $bmAuth.getPublicGraphqlClient().query({
      query: eventDetail,
      variables: { slug: route.params.slug },
    })
    const data = response?.data
    if (!data?.event) return

    seo.value = formatEvent(data.event.events)
  } catch (_error) {
    // eslint-disable-next-line no-console
    console.log({ _error })
  } finally {
    loading.value = false
  }
}

const onSuccess = () => {
  success.value = true
  setTimeout(() => {
    emit('success')
    success.value = false
  }, 2000)
}

definePageMeta({ layout: 'events' })

useHead(computedSeo)

onMounted(async () => {
  try {
    loading.value = true
    await fetchData()
    const response = await $bmAuth.getPublicGraphqlClient().query({
      query: eventDetail,
      variables: { slug: route.params.slug },
    })
    const data = response?.data
    if (!data?.event) {
      throw showError({ statusCode: 404, statusMessage: 'event not found' })
    }

    event.value = formatEvent(data?.event.events)

    if (data?.event?.title) {
      title.value = `${data.event.title} | ${title.value}`
      menu.value = [...menu.value, data.event.title?.toLowerCase()]
    }
  } catch (_error) {
    // eslint-disable-next-line no-console
    console.log({ _error })
  } finally {
    loading.value = false
  }

  isEventDetail.value = true
})
</script>
