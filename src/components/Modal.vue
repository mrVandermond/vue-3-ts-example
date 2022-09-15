<template>
  <div
    v-if="isOpen"
    class="modal-wrapper"
  >
    <div class="modal-overlay" />

    <div
      class="close-icon"
      @click="onClickClose"
    />

    <div class="modal">
      <img
        :src="url"
        alt="modal-photo-image"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { customUseStore } from '@/store';
import { storeTypes } from '@/store/types';
import { computed, watchEffect } from 'vue';

const store = customUseStore();
const isOpen = computed(() => store.state.modal.isOpen);
const url = computed(() => store.state.modal.url);

watchEffect(() => {
  if (isOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const onClickClose = (): void => {
  store.commit(storeTypes.EMutations.SET_MODAL_CONFIG, {
    url: '',
    isOpen: false,
  });
};
</script>

<style lang="scss">
.modal-wrapper {
  z-index: 1000;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: $black;
  opacity: 0.47;
  width: 100vw;
  height: 100vh;
}
.modal {
  z-index: 1002;
}
.close-icon {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    background-color: $white;
    content: '';
    transform: rotateZ(45deg);
  }

  &:before {
    top: 0;
    left: calc(50% - 1px);
    height: 100%;
    width: 2px;
  }

  &:after {
    top: calc(50% - 1px);
    left: 0;
    width: 100%;
    height: 2px;
  }
}
</style>
