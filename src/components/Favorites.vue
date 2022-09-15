<template>
  <div
    :class="['inner-container', {
      'inner-container__align-start': !isEmptyFavorites
    }]"
  >
    <div
      v-if="isEmptyFavorites"
      class="empty-block"
    >
      <img
        src="assets/empty.png"
        class="empty-image"
        alt="empty-image"
      >

      <p class="title-text title-text__bold">
        Список избранного пуст
      </p>
      <p class="title-text">
        Добавляйте изображения, нажимая на звездочки
      </p>
    </div>

    <div
      v-else
      class="list-photo"
    >
      <Photo
        v-for="photo in favoritePhotos"
        :key="photo.id"
        :photo="photo"
        @remove-from-favorites="onRemoveFromFavorites"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { customUseStore } from '@/store';
import { storeTypes } from '@/store/types';
import type { IPhotoWithIsFavorite } from '@/types';
import Photo from '@/components/Photo.vue';

const store = customUseStore();
const favoritePhotos = computed(() => store.state.favoritePhotos);
const isEmptyFavorites = computed(() => !favoritePhotos.value.length);

onBeforeMount(async (): Promise<void> => {
  if (store.state.favoritePhotos.length) return;

  await store.dispatch(storeTypes.EActions.GET_FAVORITE_PHOTOS_FROM_LOCAL_STORAGE);
});
onBeforeUnmount(async (): Promise<void> => {
  await store.dispatch(storeTypes.EActions.SET_FAVORITE_PHOTOS_TO_LOCAL_STORAGE);
});

const onRemoveFromFavorites = (photo: IPhotoWithIsFavorite): void => {
  store.commit(storeTypes.EMutations.REMOVE_FROM_FAVORITES, photo);
};
</script>

<style lang="scss">
.inner-container {
  margin-top: 56px;
  min-height: calc(100vh - 64px - 53px - 56px);

  &__align-start {
    align-content: flex-start;
  }
}
.empty-block {
  text-align: center;
}
.empty-image {
  margin-bottom: 32px;
}
.list-photo {
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
  width: 534px;
}
</style>
