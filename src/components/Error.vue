<template>
  <div
    :class="['error', {
      'error__title_right': props.isTitleFromRight,
    }]"
  >
    <img
      src="assets/error.png"
      :class="['error-image', {
        'error-image_without-margin': props.isTitleFromRight,
      }]"
      alt="error-image"
    >

    <div
      :class="{
        'title_position_right': props.isTitleFromRight,
      }"
    >
      <p class="title-text title-text__bold">
        Сервер не отвечает
      </p>

      <p class="title-text">
        Уже работаем над этим
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  isTitleFromRight?: boolean;
}>(), {
  isTitleFromRight: false,
});
</script>

<style lang="scss">
.error-image {
  margin-bottom: 32px;

  &_without-margin {
    margin-bottom: 0;
  }
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 264px;
}
.error__title_right {
  max-width: initial;
}
.title_position_right {
  margin-left: 24px;
}
</style>
