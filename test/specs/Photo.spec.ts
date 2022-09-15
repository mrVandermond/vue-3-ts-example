import Photo from '@/components/Photo.vue';
import PhotoStar from '@/components/PhotoStar.vue';

import type { IPhotoWithIsFavorite } from '@/types';
import type { Store } from '@/store/types/overrides';

import { customCreateStore, key } from '@/store';
import { storeTypes } from '@/store/types';
import { state } from '@/store/state';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';
import { actions } from '@/store/actions';

import type { TWrapperFactoryReturnType } from '../utils';
import { wrapperFactory } from '../utils';

const EXAMPLE_PHOTO: IPhotoWithIsFavorite = {
  id: 1,
  title: 'test_title',
  url: 'https://test_url',
  albumId: 1,
  thumbnailUrl: 'https://test_thumbnail_url',
  isFavorite: false,
};

describe('Photo component', () => {
  let store!: Store;
  const getWrapper = (photo = EXAMPLE_PHOTO): TWrapperFactoryReturnType => wrapperFactory(Photo, {
    props: {
      photo,
    },
    global: {
      plugins: [[store, key]],
    },
  });
  let commitSpy: jest.SpyInstance<ReturnType<Store['commit']>, jest.ArgsType<Store['commit']>>;

  beforeEach(() => {
    store = customCreateStore({
      state,
      mutations,
      getters,
      actions,
    });
    commitSpy = jest.spyOn(store, 'commit');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Рендеринг', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Открытие модалки', async () => {
    const wrapper = getWrapper();
    const div = wrapper.find<HTMLDivElement>('.photo');

    await div.trigger('click');

    expect(commitSpy).toHaveBeenCalledWith(storeTypes.EMutations.SET_MODAL_CONFIG, expect.any(Object));
    expect(commitSpy.mock.calls[0][1]).toMatchSnapshot();
  });

  it('Клик по звездочке, когда фото не в избранном', async () => {
    const wrapper = getWrapper({
      ...EXAMPLE_PHOTO,
      isFavorite: false,
    });

    const photoStar = wrapper.findComponent(PhotoStar);

    await photoStar.trigger('click');

    expect(wrapper.emitted<IPhotoWithIsFavorite>().addedToFavorites).toBeTruthy();
    expect(commitSpy).not.toHaveBeenCalled();
  });

  it('Клик по звездочке, когда фото в избранном', async () => {
    const wrapper = getWrapper({
      ...EXAMPLE_PHOTO,
      isFavorite: true,
    });

    const photoStar = wrapper.findComponent(PhotoStar);

    await photoStar.trigger('click');

    expect(wrapper.emitted<IPhotoWithIsFavorite>().removeFromFavorites).toBeTruthy();
    expect(commitSpy).not.toHaveBeenCalled();
  });
});
