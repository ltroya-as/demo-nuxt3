<template>
  <div
    class="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <div
      v-for="(speaker, i) in speakers"
      :key="i"
      class="flex h-full w-44 flex-col items-center"
    >
      <div class="flex h-full flex-col items-center text-center">
        <img
          :alt="`profile-picture-${speaker.name}`"
          style="border-radius: 10px"
          class="mb-2 h-[120px] max-h-[120px] w-[120px] max-w-[120px]"
          :src="speaker.imageUrl"
        />
        <p class="text-lg font-bold">{{ speaker.name }}</p>
        <p class="text-sm">{{ speaker.position }}</p>
        <p class="text-p-500 font-bold">{{ speaker.company }}</p>
      </div>
      <CommonButton
        id="show-modal"
        variant="tertiary"
        class="mt-2 hidden rounded-lg border border-solid border-black !px-4 !py-0 text-sm font-bold sm:block"
        :data-id="i"
        @click="setSpeaker(i)"
      >
        View Profile
      </CommonButton>
    </div>
    <Modal
      v-if="showModal"
      :name="activeSpeaker.name"
      :position="activeSpeaker.position"
      :company="activeSpeaker.company"
      :image-url="activeSpeaker.imageUrl"
      :bio="activeSpeaker.bio"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import Modal from '~/components/events/world-tour-2023/Modal'
export default {
  name: 'SpeakersPanel',
  components: {
    CommonButton,
    Modal,
  },
  props: {
    speakers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      activeSpeaker: {},
    }
  },
  methods: {
    setSpeaker(id) {
      this.activeSpeaker = {
        name: this.speakers[id].name,
        position: this.speakers[id].position,
        company: this.speakers[id].company,
        imageUrl: this.speakers[id].imageUrl,
        bio: this.speakers[id].bio,
      }
      this.showModal = true
    },
  },
}
</script>
