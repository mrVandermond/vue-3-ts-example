<template>
  <div class="photo-star">
    <img
      :src="starUrl"
      alt="star-image"
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  isActive: boolean;
}>();
const starUrl = computed((): string => {
  if (props.isActive) {
    return 'assets/star_active.png';
  }

  return 'assets/star_empty.png';
});
</script>

<style lang="scss">
.photo-star {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
