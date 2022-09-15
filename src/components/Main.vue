<template>
  <router-view />

  <Modal />
  <Title />
</template>

<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import Title from '@/components/Title.vue';
</script>
