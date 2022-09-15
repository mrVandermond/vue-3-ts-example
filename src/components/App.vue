<template>
  <div class="wrapper-container">
    <div class="container">
      <Tabs />

      <router-view
        class="content"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabs from '@/components/Tabs.vue';
</script>

<style lang="scss">
.wrapper-container {
  display: flex;
  justify-content: center;
  padding-top: 64px;
}
.container {
  width: 744px;
}
.content {
  margin-top: 16px;
  min-height: calc(100vh - 64px - 53px - 16px);
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
