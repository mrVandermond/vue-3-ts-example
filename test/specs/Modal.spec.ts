import { nextTick } from 'vue';

import Modal from '@/components/Modal.vue';

import type { Store } from '@/store/types/overrides';

import { customCreateStore, key } from '@/store';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';
import { storeTypes } from '@/store/types';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

describe('Modal component', () => {
  let store: Store;

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });

    jest.spyOn(store, 'commit');
  });

  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Modal, {
    global: {
      plugins: [[store, key]],
    },
  });

  it('Открытая модалка', async () => {
    const wrapper = getWrapper();

    store.commit(storeTypes.EMutations.SET_MODAL_CONFIG, {
      isOpen: true,
      url: 'https://via.placeholder.com/600/771796',
    });

    await nextTick();

    expect(document.body.style.overflow).toEqual('hidden');

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Закрытие модалки', async () => {
    const wrapper = getWrapper();

    store.commit(storeTypes.EMutations.SET_MODAL_CONFIG, {
      isOpen: true,
      url: 'https://via.placeholder.com/600/771796',
    });

    await nextTick();

    const closeButton = wrapper.find('.close-icon');

    await closeButton.trigger('click');

    expect(document.body.style.overflow).toEqual('');
    expect(store.commit).toHaveBeenCalledWith(storeTypes.EMutations.SET_MODAL_CONFIG, {
      isOpen: false,
      url: '',
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
