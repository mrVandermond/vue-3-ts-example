import Title from '@/components/Title.vue';

import type { Store } from '@/store/types/overrides';

import { customCreateStore, key } from '@/store';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';
import { storeTypes } from '@/store/types';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('Title component', () => {
  let store!: Store;
  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Title, {
    global: {
      plugins: [[store, key]],
    },
  });

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });
  });

  it('Title скрыт', () => {
    const wrapper = getWrapper();

    expect(wrapper.isVisible()).toBe(false);
  });

  it('Title показывается', () => {
    store.commit(storeTypes.EMutations.SET_TITLE_CONFIG, {
      isShow: true,
      text: 'test_title',
      xCoord: 0,
      yCoord: 0,
    });

    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
