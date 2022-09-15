<template>
  <ListItem
    :is-loading-content="isLoadingAlbums"
    :is-fail-loading-content="isFailLoadingAlbums"
    @click="onClickItem"
  >
    <template #label>
      <div class="user-label">
        {{ props.user.name }}
      </div>
    </template>

    <template
      v-if="isOpenUser"
      #content
    >
      <Album
        v-for="album in albums"
        :key="album.id"
        :album="album"
      />
    </template>
  </ListItem>
</template>

<script lang="ts" setup>
import ListItem from '@/components/ListItem.vue';
import Album from '@/components/Album.vue';
import type { IAlbum, IUser } from '@/types';
import { ref } from 'vue';
import { customUseStore } from '@/store';
import { storeTypes } from '@/store/types';

const props = defineProps<{
  user: IUser;
}>();
const store = customUseStore();
const albums = ref<IAlbum[]>([]);
const isOpenUser = ref(false);
const isLoadingAlbums = ref(false);
const isFailLoadingAlbums = ref(false);

const onClickItem = async (isOpen: boolean): Promise<void> => {
  isOpenUser.value = isOpen;

  if (!isOpen) return;

  isLoadingAlbums.value = true;

  try {
    albums.value = await store.dispatch(storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID, props.user.id);
  } catch (error) {
    isFailLoadingAlbums.value = true;
  }

  isLoadingAlbums.value = false;
};
</script>

<style lang="scss">
.user-label {
  font-weight: 500;
  font-size: 22px;
  height: 22px;
}
</style>
