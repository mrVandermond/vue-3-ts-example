<template>
  <div
    :class="{
      'is-open': props.isOpen,
    }"
    class="list-item-button"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean;
}>();
</script>

<style lang="scss">
.list-item-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  background-color: $cyan;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $white;
  }

  &:before {
    width: 2px;
    height: 14px;
    top: calc(50% - 7px);
    left: calc(50% - 1px);
  }

  &:after {
    width: 14px;
    height: 2px;
    top: calc(50% - 1px);
    left: calc(50% - 7px);
  }

  &.is-open:before {
    display: none;
  }
}
</style>
