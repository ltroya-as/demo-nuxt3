<template>
  <div data-testid="signin-page">
    <SignInForm
      module="page"
      :image="image"
      content-classes="px-small md:px-0"
    />
  </div>
</template>

<script>
import SignInForm from '~/components/SignInForm.vue'
import { LOGIN_IMAGES } from '@/constants/login-images'
import { random } from '~/utils/random'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

export default {
  components: { SignInForm },
  mixins: [ScreenSizeMixin],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Login',
    })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    image() {
      if (this.loading) return ''

      let rand = random()
      const size = LOGIN_IMAGES.length

      rand = Math.floor(rand * size)
      let image = this.isMobile()
        ? 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,h_500'
        : 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_700'

      image += LOGIN_IMAGES[rand]
      return image
    },
  },

  mounted() {
    if (this.$bmAuth.isAuthenticated()) {
      return this.$router.push('/')
    }

    this.loading = false
  },
}
</script>
