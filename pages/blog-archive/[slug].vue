<template>
  <div class="mx-auto block h-full">
    <!-- Loading -->
    <div v-if="loading" class="absolute inset-0">
      <div class="absolute left-0 top-1/2 w-full -translate-y-1/2">
        <TheLoader />
      </div>
    </div>

    <!-- Page -->
    <div v-else>
      <div class="max-w-content-container mx-auto px-4 lg:px-14 2xl:px-0">
        <SharedCommonBackButton
          show-icon-back
          title="Back to Blog Archive"
          class="mb-10 mt-11"
          route="/blog-archive"
          @go-to-back="goToBack"
        />
      </div>

      <div class="px-small lg:px-big mx-auto mb-20 h-full">
        <article>
          <div class="max-w-article-container mx-auto">
            <div v-if="featuredImage" class="mb-6">
              <img
                :src="featuredImage"
                alt="article-banner"
                class="max-h-[400px] w-full max-w-full object-cover object-top"
              />
            </div>

            <div>
              <h1
                class="spacing-title mb-3 text-2xl font-bold uppercase leading-tight lg:text-4xl"
              >
                {{ article.title }}
              </h1>

              <span class="text-base">
                {{ articleDate }}
              </span>

              <div class="border-p-500 mb-6 mt-3 w-full border-t-[3px]"></div>

              <div class="max-w-[80vw] md:max-w-[60vw] lg:max-w-full">
                <div
                  class="prose md:prose-base lg:prose-xl max-w-none"
                  v-html="article.content"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { format, parseISO } from 'date-fns'
import { services } from '~/constants/services'

const route = useRoute()
const router = useRouter()
const store = useStore()
const { $graphqlClient } = useNuxtApp()
const { getSeoInfo } = useSeo()

const article = ref<any>({})
const loading = ref(true)

const featuredImage = computed(
  () => article.value?.featuredImage?.node?.mediaItemUrl,
)

const articleDate = computed(() =>
  format(parseISO(article.value.date), 'do MMMM yyyy'),
)

const fetchData = async () => {
  const slug = route.params.slug

  try {
    const response = await $graphqlClient.getBlogArchiveArticleDetail({
      slug,
    })

    article.value = response.data.blogArchive
    if (article.value == null) {
      showError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
  } catch (err) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  } finally {
    loading.value = false
  }
}

await fetchData()

const goToBack = () => {
  router.push('/blog-archive')
}

onMounted(() => {
  store.commit('modal/setInitialFields', services.membership)
})

definePageMeta({ layout: 'article' })
const seo = getSeoInfo({ title: article.value.title }, article.value.seo || {})
useHead(seo)
</script>
