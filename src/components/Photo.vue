<template>
  <div
    class="photo"
    :data-title="props.photo.title"
    @click="onClickOpenModal"
  >
    <PhotoStar
      :is-active="props.photo.isFavorite"
      class="photo-star"
      @click.stop="onClickStar"
    />

    <img
      :src="props.photo.thumbnailUrl"
      alt="photo-image"
    >
  </div>
</template>

<script lang="ts" setup>
import PhotoStar from '@/components/PhotoStar.vue';
import type { IPhotoWithIsFavorite } from '@/types';
import { customUseStore } from '@/store';
import { storeTypes } from '@/store/types';

const props = defineProps<{
  photo: IPhotoWithIsFavorite;
}>();
const emit = defineEmits<{
  (event: 'addedToFavorites', photo: IPhotoWithIsFavorite): void;
  (event: 'removeFromFavorites', photo: IPhotoWithIsFavorite): void;
}>();
const store = customUseStore();

const onClickStar = (): void => {
  if (props.photo.isFavorite) {
    emit('removeFromFavorites', props.photo);

    return;
  }

  emit('addedToFavorites', props.photo);
};
const onClickOpenModal = (): void => {
  store.commit(storeTypes.EMutations.SET_MODAL_CONFIG, {
    isOpen: true,
    url: props.photo.url,
  });
};
</script>

<style lang="scss">
.photo {
  overflow: hidden;
  border-radius: 4px;
  width: 150px;
  height: 150px;
  cursor: pointer;
  position: relative;
}
.photo-star {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
