import ListItemButton from '@/components/ListItemButton.vue';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('ListItemButton', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWrapper = (props: any): TWrapperFactoryReturnType => wrapperFactory(ListItemButton, {
    props,
  });

  it('Рендер в закрытом состоянии', () => {
    const wrapper = getWrapper({
      isOpen: false,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Рендер в открытом состоянии', () => {
    const wrapper = getWrapper({
      isOpen: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
