<template>
  <ListItem
    :is-loading-content="isLoadingPhotos"
    :is-fail-loading-content="isFailLoadingPhotos"
    is-internal
    @click="onClickItem"
  >
    <template #label>
      <div class="album-label">
        {{ props.album.title }}
      </div>
    </template>

    <template
      v-if="isOpenAlbum"
      #content
    >
      <div
        class="list-photo"
        @mousemove.passive="titleOptions.onMouseMove"
      >
        <Photo
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
          @added-to-favorites="onAddedToFavorites"
          @remove-from-favorites="onRemoveFromFavorites"
        />
      </div>
    </template>
  </ListItem>
</template>

<script lang="ts" setup>
import type { IAlbum, IPhotoWithIsFavorite } from '@/types';
import ListItem from '@/components/ListItem.vue';
import Photo from '@/components/Photo.vue';
import { ref, watchEffect } from 'vue';
import { storeTypes } from '@/store/types';
import { customUseStore } from '@/store';
import { useTitle } from '@/composables';

const props = defineProps<{
  album: IAlbum;
}>();

const photos = ref<IPhotoWithIsFavorite[]>([]);
const isLoadingPhotos = ref(false);
const isFailLoadingPhotos = ref(false);
const isOpenAlbum = ref(false);

const store = customUseStore();
const titleOptions = useTitle();

watchEffect(() => {
  store.commit(storeTypes.EMutations.SET_TITLE_CONFIG, {
    isShow: titleOptions.isShowTitle.value,
    xCoord: titleOptions.xCoordMouse.value,
    yCoord: titleOptions.yCoordMouse.value,
    text: titleOptions.titleText.value,
  });
});

function toggleIsFavorite(index: number): void {
  photos.value[index] = {
    ...photos.value[index],
    isFavorite: !photos.value[index].isFavorite,
  };
}

async function onClickItem(isOpen: boolean): Promise<void> {
  isOpenAlbum.value = isOpen;

  if (!isOpen) return;

  isLoadingPhotos.value = true;

  try {
    const photosWithoutIsFavorite = await store.dispatch(storeTypes.EActions.FETCH_PHOTOS_BY_ALBUM_ID, props.album.id);

    photos.value = photosWithoutIsFavorite.map((photo) => ({
      ...photo,
      isFavorite: store.getters[storeTypes.EGetters.IS_FAVORITE_PHOTO_BY_ID](photo.id),
    }));
  } catch (error) {
    isFailLoadingPhotos.value = true;
  }

  isLoadingPhotos.value = false;
}
function onAddedToFavorites(photo: IPhotoWithIsFavorite): void {
  store.commit(storeTypes.EMutations.ADD_TO_FAVORITES, [photo]);

  const photoIndex = photos.value.findIndex((item) => item.id === photo.id);

  if (photoIndex === -1) return;

  toggleIsFavorite(photoIndex);
}
function onRemoveFromFavorites(photo: IPhotoWithIsFavorite): void {
  store.commit(storeTypes.EMutations.REMOVE_FROM_FAVORITES, photo);

  const photoIndex = photos.value.findIndex((item) => item.id === photo.id);

  if (photoIndex === -1) return;

  toggleIsFavorite(photoIndex);
}
</script>

<style lang="scss">
.album-label {
  font-size: 18px;
}
.list-photo {
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
  padding: 32px 105px 32px 49px;
}
</style>
