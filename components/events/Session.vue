<template>
  <div>
    <div v-if="title" class="text-xl">{{ title }}</div>
    <ul class="mb-2 leading-tight">
      <li
        v-for="(speaker, j) in speakersFiltered"
        :key="j"
        class="mb-2 pl-2 text-xs lg:mb-0"
      >
        <small class="text-md font-bold">&middot;</small>
        {{ speakerFormatted(speaker) }}</li
      >
    </ul>
    <div v-if="closing" class="mb-4">{{ closing }}</div>
  </div>
</template>

<script>
export default {
  name: 'Session',
  props: {
    title: {
      required: true,
      validator: (prop) => typeof prop === 'string' || prop === null,
    },
    speakers: {
      required: true,
      type: Array,
    },
    closing: {
      default: '',
      type: String,
    },
  },
  computed: {
    speakersFiltered() {
      return this.speakers.filter(
        (speaker) => speaker.speakerCompany || speaker.speakerName,
      )
    },
  },
  methods: {
    speakerFormatted(speaker) {
      const name = speaker.speakerCompany ? `${speaker.speakerName}, ` : ''
      const company = speaker.speakerPosition
        ? ` - ${speaker.speakerCompany}`
        : speaker.speakerCompany
      return `${name}${speaker.speakerPosition}${company}`
    },
  },
}
</script>
