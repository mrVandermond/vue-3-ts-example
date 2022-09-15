import type { VueWrapper } from '@vue/test-utils';
import { flushPromises } from '@vue/test-utils';

import User from '@/components/User.vue';
import ListItem from '@/components/ListItem.vue';
import Album from '@/components/Album.vue';

import type { Store } from '@/store/types/overrides';
import type { IUser } from '@/types';

import { customCreateStore, key } from '@/store';
import { storeTypes } from '@/store/types';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

const user: IUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('User component', () => {
  let store!: Store;

  const getWrapper = (propsUser: IUser = user): TWrapperFactoryReturnType => wrapperFactory(User, {
    props: {
      user: propsUser,
    },
    global: {
      plugins: [[store, key]],
      stubs: {
        ListItem,
        Album,
      },
    },
  });

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });

    jest.spyOn(store, 'dispatch').mockImplementation(() => new Promise((resolve) => {
      resolve(Promise.resolve());
    }));
  });

  it('Рендеринг по дефолту', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Открытие юзера', () => {
    let wrapper: TWrapperFactoryReturnType;
    let listItem: VueWrapper;

    const openListItem = async (userWrapper: TWrapperFactoryReturnType): Promise<void> => {
      listItem = userWrapper.findComponent(ListItem);

      listItem.vm.$emit('click', true);

      await flushPromises();
    };

    beforeEach(() => {
      wrapper = getWrapper();
    });

    it('Запрос прошел', async () => {
      await openListItem(wrapper);

      expect(store.dispatch).toHaveBeenCalledWith(storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID, 1);
      expect(listItem.props().isLoadingContent).toEqual(false);
      expect(listItem.props().isFailLoadingContent).toEqual(false);
    });

    it('Запрос загружается', async () => {
      jest.spyOn(store, 'dispatch').mockImplementation(() => new Promise((resolve) => {
        setTimeout(resolve, 10000);
      }));

      await openListItem(wrapper);

      expect(store.dispatch).toHaveBeenCalledWith(storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID, 1);
      expect(listItem.props().isLoadingContent).toEqual(true);
      expect(listItem.props().isFailLoadingContent).toEqual(false);
    });

    it('Запрос упал', async () => {
      jest.spyOn(store, 'dispatch').mockImplementation(() => new Promise((resolve, reject) => {
        reject(new Error('Ошибка'));
      }));

      await openListItem(wrapper);

      expect(store.dispatch).toHaveBeenCalledWith(storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID, 1);
      expect(listItem.props().isLoadingContent).toEqual(false);
      expect(listItem.props().isFailLoadingContent).toEqual(true);
    });
  });

  it('Отображение, при закрытии юзера', async () => {
    const wrapper = getWrapper();

    const listItem = wrapper.find('.user-label');

    await listItem.trigger('click');

    await listItem.trigger('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
