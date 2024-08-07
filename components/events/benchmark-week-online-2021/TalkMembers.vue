<template>
  <div>
    <div
      class="container-members relative mb-20 rounded-2xl p-4 pb-8 lg:mb-0"
      :class="[cardColorAlt, cardTextColorAlt]"
    >
      <!-- non hovered content -->
      <div class="content-non_hover">
        <div>
          <div
            class="flex flex-row items-end justify-end lg:flex-col xl:flex-row"
          >
            <Duration
              :class="{ invisible: !duration }"
              :time="duration"
              clock-color="p-500"
            />
          </div>
          <div class="mt-4 flex h-10 items-center justify-between">
            <div class="text-lg font-extrabold uppercase">
              {{ time }}
            </div>
            <img
              class="w-6 lg:w-10"
              src="~assets/icons/Padlock.svg"
              alt="padlock"
            />
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
        <div class="join-members flex justify-center">
          <ButtonJoin
            :link-text="linkText"
            class="bg-p-500 text-bwo21-gray-800 h-16 text-sm"
            @click="$modal.open('contact')"
          />
          <ButtonJoin
            :url="url"
            link-text="Already a Subscriber? Join Here"
            class="bg-bwo21-purple-300 ml-4 h-16 text-sm lg:hidden"
            :class="[{ hidden: url == '' }]"
          />
        </div>
      </div>
      <!-- hovered content -->
      <div
        class="content-hover rounded-2xl"
        :class="[cardColorAlt, cardTextColorAlt]"
      >
        <img
          class="mb-16 mt-9 block h-20 w-20"
          src="~assets/icons/PadlockOpen.svg"
          alt="padlock"
        />
        <div class="mt-20 flex-col items-center">
          <ButtonJoin
            :link-text="linkText"
            class="bg-p-500 text-bwo21-gray-800 h-16 text-sm lg:w-4/5"
            @click="$modal.open('contact')"
          />
          <ButtonJoin
            :url="url"
            link-text="Already a Subscriber? Join Here"
            class="bg-bwo21-purple-300 mt-4 text-sm lg:h-16 lg:w-4/5"
            :class="[{ hidden: url === '' }]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Duration from '~/components/events/Duration.vue'
import ButtonJoin from '~/components/events/ButtonJoin'
export default {
  name: 'TalkMembers',
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
    cardColorAlt: {
      type: String,
      required: true,
    },
    cardTextColorAlt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
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
  }

  .container-members:hover .join-members {
    display: none;
  }
}
</style>
