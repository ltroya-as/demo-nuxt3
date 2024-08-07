<template>
  <div class="grid-cols-5 md:grid">
    <div
      :style="{ backgroundImage: `url(${image})` }"
      :class="{ 'login-background': witMinHeight }"
      class="bg-grey-50 col-span-2 h-full min-h-[200px] bg-cover bg-center"
    />
    <div class="max-w-login-form-container col-span-3 m-auto w-full py-10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    witMinHeight: { type: Boolean, default: true },
    image: { type: String, required: true },
  },
}
</script>

<style scoped>
.login-background {
  min-height: 400px;
}
@media (min-width: 768px) {
  .login-background {
    min-height: calc(100vh - 110px);
  }
}
</style>
