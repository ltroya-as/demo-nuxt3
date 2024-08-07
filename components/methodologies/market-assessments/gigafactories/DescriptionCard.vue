<template>
  <div class="flex flex-col gap-x-8 gap-y-6 md:flex-row">
    <div class="w-full flex-1 overflow-hidden rounded-lg md:min-w-fit">
      <img :src="image" :alt="title" class="md:min-h-full md:max-w-[240px]" />
    </div>
    <div class="flex flex-col">
      <h3 class="text-lg font-semibold md:text-2xl">{{ title }}</h3>
      <span class="my-6 md:mb-4 md:mt-2">
        {{ content }}
      </span>
      <CommonButton
        class="md:max-w-fit"
        variant="primary"
        data-testid="modal-subscribe-button"
        @click="$emit('openContactModal')"
      >
        Find out more
      </CommonButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: '' },
    title: { type: String, required: true },
    content: { type: String, default: '' },
  },
}
</script>
