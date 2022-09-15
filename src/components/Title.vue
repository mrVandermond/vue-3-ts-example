<template>
  <div
    v-if="titleConfig.isShow"
    :style="{
      top: `${titleConfig.yCoord}px`,
      left: `${titleConfig.xCoord}px`,
    }"
    class="title"
  >
    {{ titleConfig.text }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { customUseStore } from '@/store';

const store = customUseStore();
const titleConfig = computed(() => store.state.title);
</script>

<style lang="scss">
.title {
  position: fixed;
  width: 150px;
  padding: 4px 8px;
  color: $white;
  font-size: 12px;
  background-color: transparentize($black, 0.3);
  border-radius: 4px;
  text-align: center;
}
</style>
