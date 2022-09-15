<template>
  <div class="tabs-container">
    <div
      v-for="tab in tabs"
      :key="tab.text"
      :class="{
        active: tab.isActive,
      }"
      class="tab"
      @click="onClickTab(tab)"
    >
      {{ tab.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ITab } from '@/types';

const tabs = ref<ITab[]>([
  {
    text: 'Каталог',
    routeName: 'catalog',
    isActive: false,
  },
  {
    text: 'Избранное',
    routeName: 'favorites',
    isActive: false,
  },
]);
const route = useRoute();
const router = useRouter();

const resetTabs = (): void => {
  tabs.value = tabs.value.map((tab) => ({
    ...tab,
    isActive: false,
  }));
};
const setActiveTab = (): void => {
  const matchedTabIndex = tabs.value.findIndex((tab) => tab.routeName === route.name);

  if (matchedTabIndex === -1) return;

  resetTabs();
  tabs.value[matchedTabIndex].isActive = true;
};

onMounted(() => {
  setActiveTab();
});

watchEffect(() => {
  setActiveTab();
});

const onClickTab = async (tab: ITab): Promise<void> => {
  await router.push({ name: tab.routeName });
};
</script>

<style lang="scss">
.tabs-container {
  display: flex;
  width: 100%;
}
.tab {
  padding: 16px 0;
  width: 372px;
  text-align: center;
  font-size: 18px;
  border-radius: 16px;
  cursor: pointer;

  &.active,
  &:hover {
    color: $cyan;
    background-color: $cyan_light;
  }
}
</style>
