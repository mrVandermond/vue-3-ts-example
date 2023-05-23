import Error from '@/components/Error.vue';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('Error component', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWrapper = (props: any): TWrapperFactoryReturnType => wrapperFactory(Error, {
    props,
  });

  it('Проверка классов при isTitleFromRight = false', () => {
    const wrapper = getWrapper({
      isTitleFromRight: false,
    });

    expect(wrapper.classes()).toContain('error');
    expect(wrapper.classes()).not.toContain('error__title_right');
    expect(wrapper.find('.error-image').classes()).not.toContain('error-image_without-margin');
    expect(wrapper.find<HTMLDivElement>('.error div').classes()).not.toContain('title_position_right');
  });

  it('Проверка классов при isTitleFromRight = true', () => {
    const wrapper = getWrapper({
      isTitleFromRight: true,
    });

    expect(wrapper.classes()).toContain('error');
    expect(wrapper.classes()).toContain('error__title_right');
    expect(wrapper.find('.error-image').classes()).toContain('error-image_without-margin');
    expect(wrapper.find<HTMLDivElement>('.error div').classes()).toContain('title_position_right');
  });
});
