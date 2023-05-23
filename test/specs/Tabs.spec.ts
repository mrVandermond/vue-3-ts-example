import Tabs from '@/components/Tabs.vue';

import { vi } from 'vitest';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

let mockNameRoute = 'test';
const mockPushRouter = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    name: mockNameRoute,
  })),
  useRouter: vi.fn(() => ({
    push: mockPushRouter,
  })),
}));

describe('Tabs component', () => {
  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Tabs);

  it('Рендеринг', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();

    const tabs = wrapper.findAll<HTMLDivElement>('.tab');

    expect(tabs.map((item) => item.classes()).join(',')).not.toContain('active');
  });

  it('Рендеринг на одном из активных табов', () => {
    mockNameRoute = 'catalog';

    const wrapper = getWrapper();
    const tabs = wrapper.findAll<HTMLDivElement>('.tab');

    expect(tabs.map((item) => item.classes()).join(',')).toContain('active');
  });

  it('Проверка обработки клика по табу', async () => {
    const wrapper = getWrapper();
    const tab = wrapper.find<HTMLDivElement>('.tab');

    await tab.trigger('click');

    expect(mockPushRouter).toHaveBeenCalledWith({ name: 'catalog' });
  });
});
