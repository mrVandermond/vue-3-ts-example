import Favorites from '@/components/Favorites.vue';
import Photo from '@/components/Photo.vue';

import type { Store } from '@/store/types/overrides';
import type { IPhotoWithIsFavorite } from '@/types';

import { key, customCreateStore } from '@/store';
import { storeTypes } from '@/store/types';
import { flushPromises } from '@vue/test-utils';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

const EXAMPLE_PHOTO: IPhotoWithIsFavorite = {
  isFavorite: true,
  albumId: 1,
  url: 'test_url',
  id: 1,
  title: 'test_title',
  thumbnailUrl: 'test_thumbnail_url',
};

describe('Favorites component', () => {
  let store!: Store;
  const getWrapper = (): TWrapperFactoryReturnType => wrapperFactory(Favorites, {
    global: {
      plugins: [[store, key]],
    },
  });
  const setPhotosToStore = (): void => {
    store.commit(storeTypes.EMutations.ADD_TO_FAVORITES, [EXAMPLE_PHOTO]);
  };
  let dispatchSpy: jest.SpyInstance<ReturnType<Store['dispatch']>, jest.ArgsType<Store['dispatch']>>;
  let commitSpy: jest.SpyInstance<ReturnType<Store['commit']>, jest.ArgsType<Store['commit']>>;

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });

    dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => new Promise((res) => {
      res(Promise.resolve([]));
    }));
    commitSpy = jest.spyOn(store, 'commit');
  });

  it('Отображение картинки, когда список пуст', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Подгрузка избранных из store', async () => {
    setPhotosToStore();

    const wrapper = getWrapper();

    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('Подгрузка избранных из локального хранилища', async () => {
    const wrapper = getWrapper();

    await flushPromises();

    expect(wrapper.find<HTMLImageElement>('img').exists()).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(storeTypes.EActions.GET_FAVORITE_PHOTOS_FROM_LOCAL_STORAGE, undefined);
  });

  it('Назначается класс, когда список не пустой', async () => {
    setPhotosToStore();

    const wrapper = getWrapper();

    await flushPromises();

    expect(wrapper.element.classList).toContain('inner-container__align-start');
  });

  it('Проверка обработки события removeFromFavorites', () => {
    setPhotosToStore();

    const wrapper = getWrapper();
    const photo = wrapper.findComponent(Photo);

    photo.vm.$emit('removeFromFavorites', EXAMPLE_PHOTO);

    expect(commitSpy).toHaveBeenCalledWith(storeTypes.EMutations.REMOVE_FROM_FAVORITES, EXAMPLE_PHOTO);
  });

  it('Сохранение избранных в локальное хранилище', () => {
    const wrapper = getWrapper();

    wrapper.unmount();

    expect(dispatchSpy).toHaveBeenCalledWith(storeTypes.EActions.SET_FAVORITE_PHOTOS_TO_LOCAL_STORAGE, undefined);
  });
});
