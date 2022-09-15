import Loader from '@/components/Loader.vue';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('Loader component', () => {
  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Loader);

  it('Верстка', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
