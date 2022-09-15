import Catalog from '@/components/Catalog.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import User from '@/components/User.vue';
import { key, customCreateStore } from '@/store';
import { storeTypes } from '@/store/types';

import { nextTick } from 'vue';
import type { DefineComponent } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import type { Store } from '@/store/types/overrides';
import type { IUser } from '@/types';

import { flushPromises } from '@vue/test-utils';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';
import { wrapperFactory } from '../utils';

describe('Catalog component', () => {
  let store!: Store;
  const exampleUsers: IUser[] = [
    {
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
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ];

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });
  });

  const getWrapper = (): VueWrapper<InstanceType<DefineComponent>> => wrapperFactory(Catalog, {
    global: {
      plugins: [[store, key]],
      stubs: {
        User,
        Loader,
        Error,
      },
    },
  });

  it('Отображение списка пользователей', async () => {
    jest.spyOn(store, 'dispatch').mockImplementation(() => new Promise((res) => {
      res(Promise.resolve(exampleUsers));
    }));

    const wrapper = getWrapper();

    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Отображение во время загрузки', async () => {
    jest.spyOn(store, 'dispatch').mockImplementation((type): Promise<void> => new Promise((resolve) => {
      if (type === storeTypes.EActions.FETCH_USERS) {
        setTimeout(() => {
          resolve();
        }, 10000);
      } else {
        resolve();
      }
    }));

    const wrapper = getWrapper();

    await nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Отображение во время ошибки при загрузке пользователей', async () => {
    const wrapper = getWrapper();

    jest.spyOn(store, 'dispatch').mockImplementation(() => Promise.reject(new Error('Ошибка')));

    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
