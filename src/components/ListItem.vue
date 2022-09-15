<template>
  <div
    :class="{
      internal: props.isInternal,
      'is-open': isOpen
    }"
    class="list-item"
  >
    <div
      class="list-item-header"
      @click="onClickHeader"
    >
      <ListItemButton
        :is-open="isOpen"
        class="list-item-button"
      />

      <slot name="label" />
    </div>

    <div
      :class="{
        'is-loading': props.isLoadingContent,
      }"
      class="list-item-content"
    >
      <Loader v-if="props.isLoadingContent" />

      <Error
        v-else-if="!props.isLoadingContent && props.isFailLoadingContent"
        :is-title-from-right="true"
      />

      <slot
        v-else
        name="content"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ListItemButton from '@/components/ListItemButton.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';

const isOpen = ref(false);

const props = withDefaults(defineProps<{
  isInternal?: boolean;
  isLoadingContent?: boolean;
  isFailLoadingContent?: boolean;
}>(), {
  isInternal: false,
  isLoadingContent: false,
  isFailLoadingContent: false,
});
const emit = defineEmits<{
  (event: 'click', isOpen: boolean): void;
}>();

const onClickHeader = (): void => {
  isOpen.value = !isOpen.value;
  emit('click', isOpen.value);
};
</script>

<style lang="scss">
.list-item {
  padding: 24px 0;

  &.internal {
    margin-left: 56px;
  }

  &.is-open {
    padding-bottom: 0;
  }
}
.list-item-button {
  margin-right: 24px;
}
.list-item-header {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.list-item-content.is-loading {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
