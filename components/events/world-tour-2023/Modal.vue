<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal pb-4">
            <slot name="close">
              <button
                class="modal-default-button border border-solid border-black"
                @click="$emit('close')"
              >
                <IconClose class="h-7 w-7" />
              </button>
            </slot>
          </div>
          <div class="modal-header">
            <slot name="header">
              <img
                alt="profie-pic"
                style="border-radius: 10px; max-width: 150px"
                class="mb-2"
                :src="imageUrl"
              />
              <p class="text-lg font-bold">{{ name }}</p>
              <p class="text-sm">{{ position }}</p>
              <p class="text-wt2023-yellow font-bold">{{ company }}</p>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ bio }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IconClose from '@/assets/icons/Close.svg'
export default {
  components: {
    IconClose,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 300px;
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
