<template>
  <component
    :is="clientOnly ? 'client-only' : 'div'"
    class="flex grow flex-col"
  >
    <section
      v-if="$config.public.isPreviewSite && !userCanPreviewContent"
      class="mx-auto flex max-w-xl grow flex-col justify-center px-36 py-40 text-center text-lg"
    >
      <client-only>
        <div v-if="$store.state.auth === undefined">
          <TheLoader />
        </div>
        <div>
          <button
            data-testid="login-button"
            class="underline"
            @click.prevent="$modal.open('signIn')"
          >
            Login
          </button>
          with an author, editor, or administrator account to see the content
          preview.
        </div>
      </client-only>
    </section>

    <slot v-else />
  </component>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
export default {
  components: { TheLoader },
  props: {
    clientOnly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    userCanPreviewContent() {
      return this.$store.state.auth.user?.canPreviewContent
    },
  },
}
</script>
