import { defineNuxtPlugin } from 'nuxt/app'
import buildBlogArchiveDetailQuery from '@/queries/blog-archive-article-detail'
import buildEventsQuery from '@/queries/events'
import buildMembershipArticlesQuery from '~/queries/membership-articles'
import buildAnalysisArticlesQuery from '~/queries/analysis-articles'
import buildAnalysisArticleDetailBySlugQuery from '~/queries/analysis-article-detail-by-slug'
import buildAnalysisArticleDetailByIdQuery from '~/queries/analysis-article-detail-by-id'
import buildAnalysisArticlesByDateQuery from '~/queries/analysis-articles-by-date'
import buildAnalysisCategoriesQuery from '~/queries/analysis-articles-categories'
import buildArticlesPortalQuery from '~/queries/analysis-articles-portal'
import { buildMarketInsightsQuery } from '~/queries/market-insights'
import buildNewsArticlesQuery from '~/queries/news-articles'
import buildVideosQuery from '~/queries/videos'
import buildMarketInsightsVideosQuery from '~/queries/market-insights-videos'
import buildVideosByTagsQuery from '~/queries/videos-by-tags'
import {
  getAdaptedVideos,
  getAdaptedPosts,
  getAdaptedArticles,
  getAdaptedMarketInsights,
} from '~/utils/adapters'
import buildEventsWithDateQuery from '~/queries/events-with-date-query'

export default defineNuxtPlugin({
  name: 'graphql-client',
  enforce: 'post',
  dependsOn: ['bmAuth'],
  setup(nuxtApp) {
    const { $bmAuth, $config }: any = nuxtApp

    const includeNonPublished = $config.public.isPreviewSite

    const graphqlClient = $config.public.isPreviewSite
      ? $bmAuth.getAuthenticatedClient()
      : $bmAuth.getPublicGraphqlClient()

    const getBlogArchiveArticleDetail = async ({ slug }) => {
      return await $bmAuth.getPublicGraphqlClient().query({
        query: buildBlogArchiveDetailQuery(),
        variables: { slug },
      })
    }

    const getAnalysisArticles = async ({
      service,
      first,
      after,
      search,
      categories,
    }) => {
      const response = await $bmAuth.getGraphqlClient().query({
        query: buildAnalysisArticlesQuery({ service, includeNonPublished }),
        variables: {
          first,
          after,
          search,
          categories,
        },
      })

      response.data.articles.nodes = getAdaptedPosts(response.data.articles)
      return response
    }

    const getAnalysisArticleDetail = async ({
      service,
      slug,
      usePublicClient = false,
    }) => {
      const hasSlug = slug.match(/[a-zA-Z]/)
      const isDraft = !hasSlug

      if (isDraft && !$config.public.isPreviewSite) {
        return null
      }

      const graphqlClient = usePublicClient
        ? $bmAuth.getPublicGraphqlClient()
        : $bmAuth.getGraphqlClient()

      if (hasSlug) {
        return await graphqlClient.query({
          query: buildAnalysisArticleDetailBySlugQuery({ service }),
          variables: { slug },
        })
      }

      return await graphqlClient.query({
        query: buildAnalysisArticleDetailByIdQuery({ service }),
        variables: { id: slug },
      })
    }

    const getEvents = async () => {
      const response = await graphqlClient.query({
        query: buildEventsQuery({ includeNonPublished }),
      })

      response.data.events.nodes = getAdaptedPosts(response.data.events)
      return response
    }

    const getEventsWithDateQuery = async () => {
      const response = await graphqlClient.query({
        query: buildEventsWithDateQuery({ includeNonPublished }),
      })

      response.data.events.nodes = getAdaptedPosts(response.data.events)
      return response
    }

    const getMembershipArticles = async ({
      first,
      after,
      search,
      showOnlyFeaturedPosts = false,
      categoryName = '',
    }) => {
      const response = await graphqlClient.query({
        query: buildMembershipArticlesQuery({
          includeNonPublished,
        }),
        variables: {
          first,
          after,
          search,
          showOnlyFeaturedPosts,
          categoryName,
        },
      })

      response.data.memberships.nodes = getAdaptedPosts(
        response.data.memberships,
      )
      return response
    }

    const getAnalysisArticlesByDate = async ({
      service,
      categories,
      order,
      day,
      month,
      year,
      orderDate,
    }) => {
      const response = await $bmAuth.getGraphqlClient().query({
        query: buildAnalysisArticlesByDateQuery({
          service,
          includeNonPublished,
          orderDate,
        }),
        variables: {
          categories,
          order,
          day,
          month,
          year,
        },
      })
      response.data.articles.nodes = getAdaptedPosts(response.data?.articles)
      return response
    }

    const getAnalysisCategories = async ({ service }) => {
      return await $bmAuth.getGraphqlClient().query({
        query: buildAnalysisCategoriesQuery({
          service,
        }),
      })
    }

    const getVideos = async (product) => {
      const videos = await $bmAuth.getGraphqlClient().query({
        query: buildVideosQuery(),
        variables: {
          first: 10,
          after: null,
          categoryName: product,
        },
      })
      return getAdaptedVideos(videos.data.videos.nodes)
    }

    const getMarketInsightsVideos = async (
      webinarsTags,
      oneToOneTags,
      interviewsTags,
      categories,
    ) => {
      const { data } = await $bmAuth.getGraphqlClient().query({
        query: buildMarketInsightsVideosQuery(
          webinarsTags,
          oneToOneTags,
          interviewsTags,
        ),
        variables: { categories },
      })

      Object.keys(data).forEach((key) => {
        data[key].nodes = getAdaptedVideos(data[key].nodes)
      })
      return data
    }

    const getVideosByTags = async (
      first,
      tags,
      categories,
      excludeTags = false,
      after = null,
    ) => {
      const { data } = await $bmAuth.getGraphqlClient().query({
        query: buildVideosByTagsQuery(first, tags, excludeTags, after),
        variables: { categories },
      })
      data.videos.nodes = getAdaptedVideos(data.videos.nodes)
      return data.videos
    }

    const getPortalArticles = async ({ service, categories, first }) => {
      const response = await $bmAuth.getGraphqlClient().query({
        query: buildArticlesPortalQuery({
          service,
          includeNonPublished,
        }),
        variables: {
          categories,
          first,
        },
      })
      response.data.articles.nodes = getAdaptedPosts(response.data?.articles)
      return response
    }

    const getMarketInsightsArticles = async ({ market, articles = null }) => {
      const { data } = await $bmAuth.getGraphqlClient().query({
        query: buildMarketInsightsQuery({ market, articles }),
      })
      const marketInsights = getAdaptedMarketInsights(data)
      const articlesMarket = marketInsights?.articles.map((article) => ({
        ...article,
        url: article.url ? `${$config.public.sourceUrl}/${article.url}` : null,
      }))
      return { ...marketInsights, articles: articlesMarket }
    }

    const getNewsArticles = async ({ market, articles = null }) => {
      const { data } = await $bmAuth.getGraphqlClient().query({
        query: buildNewsArticlesQuery({ market, articles }),
        variables: {
          first: 12,
        },
      })

      return getAdaptedArticles(data.memberships.nodes, 'dd MMM yyyy').map(
        (article) => ({
          ...article,
          url: article.url
            ? `${$config.public.sourceUrl}/${article.url}`
            : null,
        }),
      )
    }

    return {
      provide: {
        graphqlClient: {
          getAnalysisArticleDetail,
          getAnalysisArticles,
          getAnalysisArticlesByDate,
          getAnalysisCategories,
          getBlogArchiveArticleDetail,
          getEvents,
          getMembershipArticles,
          getPortalArticles,
          getVideos,
          getMarketInsightsArticles,
          getMarketInsightsVideos,
          getNewsArticles,
          getVideosByTags,
          getEventsWithDateQuery,
        },
      },
    }
  },
})
