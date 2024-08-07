<template>
  <div>
    <div
      class="relative rounded-2xl p-4 pb-8"
      :class="[cardColor, cardTextColor]"
    >
      <div>
        <div
          class="flex flex-row items-end justify-end lg:flex-col xl:flex-row"
        >
          <Duration
            :class="{ invisible: !duration }"
            :time="duration"
            clock-color="bwo21-gray-800"
          />
        </div>
        <div
          class="mt-4 flex h-10 items-center text-lg font-extrabold uppercase"
        >
          {{ time }}
        </div>
      </div>
      <div class="my-6 text-2xl font-bold normal-case leading-tight lg:h-32">
        {{ title }}
      </div>
      <div class="text-lg font-bold normal-case leading-tight lg:h-32">
        {{ blurb }}
      </div>
      <div class="mb-8 mt-4 text-sm font-bold uppercase lg:h-64 xl:h-40">
        <span v-for="(speakerItem, i) in speakers" :key="i" class="speaker">{{
          speakerItem
        }}</span>
      </div>
      <div class="join-members flex justify-end">
        <ButtonJoin
          :link-text="linkText"
          :url="url"
          class="bg-bwo21-purple-300 text-sm font-bold text-white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Duration from '@/components/events/Duration.vue'
import ButtonJoin from '@/components/events/ButtonJoin.vue'
export default {
  name: 'Talk',
  components: {
    Duration,
    ButtonJoin,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    blurb: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '--',
    },
    duration: {
      type: String,
      default: '--',
    },
    speakers: {
      type: Array,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: null,
    },
    cardColor: {
      type: String,
      required: true,
    },
    cardTextColor: {
      type: String,
      required: true,
    },
    isMembersOnly: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
/* stylelint-disable selector-class-pattern */
.categoryWord::first-letter {
  @apply text-xl;
}

.categoryWord::after {
  content: '\a0';
}

.container-members {
  position: relative;
  display: block;
}

.join-members {
  position: absolute;
  right: 10px;
}

.content-hover {
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}

.content-hover div {
  position: relative;
  display: inline-flex;
}

.speaker:not(:last-child)::after {
  content: ', ';
}

@media (min-width: 1024px) {
  .container-members:hover .content-hover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: white;
    @apply bg-bwo21-purple-500;
  }

  .container-members:hover .join-members {
    display: none;
  }
}
</style>
