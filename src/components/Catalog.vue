<template>
  <div>
    <Loader v-if="isLoading" />

    <Error v-else-if="!isLoading && isFailLoading" />

    <template v-else>
      <User
        v-for="user in users"
        :key="user.id"
        :user="user"
        class="user"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import User from '@/components/User.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import type { IUser } from '@/types';
import * as types from '@/store/types';
import { customUseStore } from '@/store';
import { storeTypes } from '@/store/types';

const isLoading = ref(false);
const isFailLoading = ref(false);
const users = ref<IUser[]>([]);
const store = customUseStore();

onBeforeMount(async (): Promise<void> => {
  await store.dispatch(types.EActions.GET_FAVORITE_PHOTOS_FROM_LOCAL_STORAGE);

  isLoading.value = true;

  try {
    users.value = await store.dispatch(storeTypes.EActions.FETCH_USERS);
  } catch (error) {
    isFailLoading.value = true;
  }

  isLoading.value = false;
});
onBeforeUnmount(async (): Promise<void> => {
  await store.dispatch(types.EActions.SET_FAVORITE_PHOTOS_TO_LOCAL_STORAGE);
});

</script>

<style lang="scss">
.user {
  width: 100%;
}
</style>
