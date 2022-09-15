import Album from '@/components/Album.vue';
import ListItem from '@/components/ListItem.vue';
import Photo from '@/components/Photo.vue';

import type { Store } from '@/store/types/overrides';
import type { IAlbum, IPhoto } from '@/types';
import type { IUseTitleOptions } from '@/composables/title';

import { nextTick, ref } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { customCreateStore, key } from '@/store';
import { storeTypes } from '@/store/types';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

const album: IAlbum = {
  id: 1,
  title: 'test',
  userId: 2,
};
const examplePhotos: IPhoto[] = [
  {
    id: 1,
    title: 'photo',
    url: 'https://url',
    albumId: 1,
    thumbnailUrl: 'https://thumbnailUrl',
  },
];
const onMouseMoveMock = jest.fn();

jest.mock('@/composables/title.ts', () => {
  const originalModule = jest.requireActual<() => IUseTitleOptions>('@/composables/title.ts');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn((): IUseTitleOptions => ({
      onMouseMove: onMouseMoveMock,
      isShowTitle: ref(false),
      xCoordMouse: ref(0),
      yCoordMouse: ref(0),
      titleText: ref(''),
    })),
  };
});

describe('Album component', () => {
  let store!: Store;
  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Album, {
    props: {
      album,
    },
    global: {
      plugins: [[store, key]],
      stubs: {
        ListItem,
      },
    },
  });
  let commitSpy: jest.SpyInstance<ReturnType<Store['commit']>, jest.ArgsType<Store['commit']>>;
  let dispatchSpy: jest.SpyInstance<ReturnType<Store['dispatch']>, jest.ArgsType<Store['dispatch']>>;

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });
    commitSpy = jest.spyOn(store, 'commit');
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.unmock('@/composables/title.ts');
  });

  it('Отображение в закрытом состоянии', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Отображение в открытом состоянии', () => {
    beforeEach(() => {
      dispatchSpy.mockResolvedValue(Promise.resolve(examplePhotos));
    });

    const openListItem = async (wrapper: TWrapperFactoryReturnType): Promise<void> => {
      const listItem = wrapper.findComponent(ListItem);

      listItem.vm.$emit('click', true);

      await flushPromises();
    };

    it('Фотографии отображаются при клике на ListItem', async () => {
      const wrapper = getWrapper();

      await openListItem(wrapper);

      expect(store.dispatch).toHaveBeenCalledWith(storeTypes.EActions.FETCH_PHOTOS_BY_ALBUM_ID, expect.any(Number));
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findAllComponents(Photo).length).toBe(1);
    });

    it('При движении мыши вызывается commit', async () => {
      const wrapper = getWrapper();

      await openListItem(wrapper);

      const photo = wrapper.findComponent(Photo);

      await photo.trigger('mousemove');

      expect(onMouseMoveMock).toHaveBeenCalled();
    });

    it('Проверка обработки события addedToFavorites', async () => {
      const wrapper = getWrapper();

      await openListItem(wrapper);

      const photo = wrapper.findComponent(Photo);

      photo.vm.$emit('addedToFavorites', examplePhotos[0]);

      await nextTick();

      expect(photo.props()).toMatchSnapshot();
      expect(commitSpy.mock.calls[1]).toMatchSnapshot();
    });

    it('Проверка обработки события removeFromFavorites', async () => {
      store.commit(storeTypes.EMutations.ADD_TO_FAVORITES, [{
        ...examplePhotos[0],
        isFavorite: true,
      }]);

      const wrapper = getWrapper();

      await openListItem(wrapper);

      const photo = wrapper.findComponent(Photo);

      photo.vm.$emit('removeFromFavorites', examplePhotos[0]);

      await nextTick();

      expect(photo.props()).toMatchSnapshot();
      expect(commitSpy.mock.calls[2]).toMatchSnapshot();
    });
  });

  it('Отображение при закрытии', async () => {
    dispatchSpy.mockResolvedValue(Promise.resolve(examplePhotos));

    const wrapper = getWrapper();
    const listItem = wrapper.findComponent(ListItem);

    listItem.vm.$emit('click', true);

    await flushPromises();

    listItem.vm.$emit('click', false);

    await flushPromises();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.findAllComponents(Photo).length).toBe(0);
  });
});
