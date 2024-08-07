<template>
  <div class="mx-auto h-full">
    <div
      v-if="!isAuthenticated()"
      class="mt-20 flex flex-col items-center justify-center"
    >
      <h1 class="mb-10 text-4xl font-bold">
        Log in to see the article preview
      </h1>
      <CommonButton variant="primary" @click="$modal.open('signIn')">
        {{ signInText }}
      </CommonButton>
    </div>

    <div v-else class="h-full">
      <!-- Loading -->
      <div
        v-if="loading"
        class="fixed flex h-[calc(100vh_-_3.5rem)] w-full flex-col items-center justify-center overflow-hidden md:static md:h-full"
      >
        <TheLoader />
      </div>

      <div
        v-if="!loading && !article"
        class="mt-20 flex flex-col items-center justify-center"
      >
        <h1 class="mb-10 text-center text-3xl font-bold">
          Only editors, authors and administrators <br />
          can preview this article
        </h1>
      </div>

      <!-- Page -->
      <div v-if="!loading && article">
        <!-- Featured Image -->
        <div :class="articleImage ? 'flex justify-center' : 'h-48'">
          <a v-if="articleImage" :href="articleImage" class="w-full">
            <img
              class="aspect-video h-[200px] w-full object-cover object-top md:h-[356px] lg:h-[576px]"
              :src="articleImage"
              :srcset="articleImageSrcSet"
              :alt="article.title"
            />
          </a>
        </div>

        <!-- Content -->
        <div
          class="relative -top-20 flex flex-col items-center px-4 md:-top-16 md:px-28 lg:-top-32"
        >
          <article
            class="border-p-500 bg-s-50 shadow-dp-01 inline-block rounded-b-xl border-t-4 pb-16 pt-9"
          >
            <div class="px-6 lg:px-16">
              <div class="lg:w-article-container">
                <h1
                  class="spacing-title text-xl font-bold uppercase leading-tight lg:text-3xl"
                >
                  {{ article.title }}
                </h1>

                <div class="mt-6 flex flex-wrap items-center gap-4">
                  <p class="text-s-700 text-sm lg:text-xl">
                    <time>{{ articleDate }}</time>
                  </p>
                  <div
                    v-for="category in getCategories()"
                    :key="category.id"
                    class="bg-p-100 font-lato inline-block rounded-full px-4 py-1 text-base lg:text-xl"
                  >
                    {{ category.name }}
                  </div>
                </div>

                <div
                  class="prose prose-sm md:prose-base lg:prose-xl mt-12"
                  v-html="article.content"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import articleByIdQuery from '@/queries/article-by-id.gql'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import { SIGN_IN } from '~/constants/services/constants'

definePageMeta({ layout: 'article' })

export default {
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      loading: true,
      article: null,
      postId: this.$route.params.id,
      postType: this.$route.params.postType,
      signInText: SIGN_IN,
    }
  },

  head() {
    return this.generateSeoInfo({
      title: this.article.title,
    })
  },

  computed: {
    articleImage() {
      return this.article.featuredImage?.node?.mediaItemUrl
    },

    articleImageSrcSet() {
      return this.article.featuredImage?.node?.srcSet
    },

    articleDate() {
      return format(parseISO(this.article.date), 'do MMMM yyyy')
    },
  },

  async mounted() {
    await this.fetchArticle()
  },

  methods: {
    async fetchArticle() {
      if (!this.isAuthenticated) {
        return
      }

      this.loading = true

      const response = await this.$bmAuth.getAuthenticatedClient().query({
        query: articleByIdQuery,
        variables: {
          postId: this.postId,
          contentType: this.postType.toUpperCase(),
        },
        fetchPolicy: 'no-cache',
      })

      this.article = response.data.article

      this.loading = false
    },

    getCategories() {
      return this.article?.categories?.nodes || []
    },

    onInit() {
      this.fetchArticle()
    },
  },
}
</script>
