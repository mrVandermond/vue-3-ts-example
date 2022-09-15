import ListItem from '@/components/ListItem.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import ListItemButton from '@/components/ListItemButton.vue';

import type { TWrapperFactoryReturnType } from '../utils';

import { wrapperFactory } from '../utils';

describe('ListItem component', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWrapper = (props: any = {}, slots: any = {}): TWrapperFactoryReturnType => wrapperFactory(ListItem, {
    props,
    slots,
  });

  it('Рендеринг на дефолтных props', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Рендеринг, когда isInternal = true', () => {
    const wrapper = getWrapper({
      isInternal: true,
    });

    expect(wrapper.element.classList).toContain('internal');
  });

  it('Рендеринг, когда isLoadingContent = true', () => {
    const wrapper = getWrapper({
      isLoadingContent: true,
    });

    expect(wrapper.find('.list-item-content').classes('is-loading')).toBe(true);
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });

  it.each([
    true,
    false,
  ])('Рендеринг, когда isFailLoadingContent = true и isLoadingContent = %s', (expected) => {
    const wrapper = getWrapper({
      isFailLoadingContent: true,
      isLoadingContent: !expected,
    });
    const error = wrapper.findComponent(Error);

    expect(error.exists()).toBe(expected);

    if (expected) {
      expect(error.props('isTitleFromRight')).toBe(true);
    }
  });

  it('Проверка слота label', () => {
    const wrapper = getWrapper(undefined, {
      label: '<div class="slot-label"></div>',
    });

    expect(wrapper.find('.slot-label').exists()).toBe(true);
  });

  it('Проверка слота content', () => {
    const wrapper = getWrapper(undefined, {
      content: '<div class="slot-content"></div>',
    });

    expect(wrapper.find('.slot-content').exists()).toBe(true);
  });

  it('Клик по хедеру', async () => {
    const wrapper = getWrapper();
    const header = wrapper.find('.list-item-header');

    await header.trigger('click');

    expect(wrapper.classes('is-open')).toBe(true);
    expect(wrapper.findComponent(ListItemButton).props('isOpen')).toBe(true);
    expect(wrapper.emitted<boolean[]>('click')?.[0][0]).toBe(true);
  });

  it('Два клика по хедеру', async () => {
    const wrapper = getWrapper();
    const header = wrapper.find('.list-item-header');

    await header.trigger('click');
    await header.trigger('click');

    expect(wrapper.classes('is-open')).toBe(false);
    expect(wrapper.findComponent(ListItemButton).props('isOpen')).toBe(false);
    expect(wrapper.emitted<boolean[]>('click')?.[1][0]).toBe(false);
  });
});
