import PhotoStar from '@/components/PhotoStar.vue';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('PhotoStar', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWrapper = (props: any): TWrapperFactoryReturnType => wrapperFactory(PhotoStar, {
    props,
  });

  it('Рендер в активном состоянии', () => {
    const wrapper = getWrapper({
      isActive: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Рендер в неактивном состоянии', () => {
    const wrapper = getWrapper({
      isActive: false,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
