import type { Ref } from 'vue';
import { ref } from 'vue';

export interface IUseTitleOptions {
  isShowTitle: Ref<boolean>;
  xCoordMouse: Ref<number>;
  yCoordMouse: Ref<number>;
  titleText: Ref<string>;
  onMouseMove(event: MouseEvent): void;
}

export default function useTitle(): IUseTitleOptions {
  const THRESHOLD_BY_X = -75;
  const THRESHOLD_BY_Y = 20;

  const isShowTitle = ref(false);
  const xCoordMouse = ref(0);
  const yCoordMouse = ref(0);
  const titleText = ref('');

  function hasPhotoInParent(element: HTMLElement, rootElement: EventTarget): string {
    if (!element.parentElement) return '';

    if (element === rootElement) return '';

    if (element.classList.contains('photo')) return element.dataset.title ?? '';

    return hasPhotoInParent(element.parentElement, rootElement);
  }

  function onMouseMove(event: MouseEvent): void {
    isShowTitle.value = false;

    if (!event.target || !event.currentTarget || !(event.target instanceof HTMLElement)) return;

    titleText.value = hasPhotoInParent(event.target, event.currentTarget);

    if (!titleText.value) return;

    xCoordMouse.value = event.clientX + THRESHOLD_BY_X;
    yCoordMouse.value = event.clientY + THRESHOLD_BY_Y;
    isShowTitle.value = true;
  }

  return {
    isShowTitle,
    xCoordMouse,
    yCoordMouse,
    titleText,
    onMouseMove,
  };
}
