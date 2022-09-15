import Tabs from '@/components/Tabs.vue';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

let mockNameRoute = 'test';
const mockPushRouter = jest.fn();

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({
    name: mockNameRoute,
  })),
  useRouter: jest.fn(() => ({
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
