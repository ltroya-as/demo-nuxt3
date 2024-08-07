<template>
  <NuxtLayout name="default">
    <div
      class="relative flex h-auto flex-col justify-center md:h-[calc(100vh-80px)] lg:h-[calc(100vh-153px)] xl:h-[calc(100vh-100px)]"
    >
      <div
        class="max-w-content-container mx-auto mb-24 mt-14 flex grow flex-col text-center md:justify-center"
      >
        <div class="mb-5 w-full font-bold">
          <h2 class="mb-5 text-6xl md:text-9xl">
            <span v-if="!isNotFound" class="hidden md:inline-block">
              Error
            </span>
            {{ statusCode }}
          </h2>
          <div class="max-w-4xl px-2 text-2xl md:text-5xl">
            {{ descText }}
          </div>
        </div>
        <div class="w-full font-semibold">
          <CommonButton
            variant="primary"
            class="mt-6 w-auto px-9 text-sm"
            link="/"
          >
            Return to Homepage
          </CommonButton>
        </div>
      </div>
      <div
        v-if="!isNotFound"
        class="hidden h-1/5 w-full bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1679934875/assets/errors/background_500_t3kfyq.png')] bg-cover bg-center bg-no-repeat md:block 2xl:max-h-96"
      />
      <div
        v-else
        class="hidden h-2/5 w-full bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1440/v1679077255/assets/errors/background_404_n0rhlt.png')] bg-cover bg-center bg-no-repeat md:block 2xl:max-h-96"
      />
      <div
        v-if="!isNotFound"
        class="h-32 w-full bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_600/v1679934875/assets/errors/background_500_t3kfyq.png')] bg-cover bg-center bg-no-repeat md:hidden"
      />
      <div
        v-else
        class="h-32 w-full bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_600/v1679077255/assets/errors/background_404_n0rhlt.png')] bg-cover bg-center bg-no-repeat md:hidden"
      />
      <div
        v-if="!isNotFound"
        class="absolute bottom-0 h-[126px] w-[115px] -scale-x-100 bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_550/v1679934992/assets/errors/lamppost_broken_dwz6pe.png')] bg-contain bg-center bg-no-repeat sm:h-[206px] sm:w-[195px] md:h-[306px] md:w-[295px] lg:h-[436px] lg:w-[415px] 2xl:h-[536px] 2xl:w-[515px]"
      />
      <div
        v-if="!isNotFound"
        class="absolute bottom-0 right-0 h-[126px] w-[115px] bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_550/v1679934992/assets/errors/lamppost_broken_dwz6pe.png')] bg-contain bg-center bg-no-repeat sm:h-[206px] sm:w-[195px] md:h-[306px] md:w-[295px] lg:h-[436px] lg:w-[415px] 2xl:h-[536px] 2xl:w-[515px]"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
import CommonButton from '~/components/common/Button.vue'

const NOT_FOUND_CODE = 404
const NOT_FOUND_ERROR_MESSAGE = 'Page could not be found.'
const SERVER_ERROR_MESSAGE =
  "An error ocurred and your request couldn't be completed."

const props = defineProps<{
  error?: NuxtError
}>()

const statusCode = computed(() => props.error.statusCode)
const isNotFound = computed(() => statusCode.value === NOT_FOUND_CODE)
const descText = computed(() =>
  isNotFound.value ? NOT_FOUND_ERROR_MESSAGE : SERVER_ERROR_MESSAGE,
)
</script>
