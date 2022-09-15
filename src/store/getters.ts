import type { GetterTree } from 'vuex';
import type { IState } from '@/store/state';
import { storeTypes } from '@/store/types';

export interface Getters {
  [storeTypes.EGetters.IS_FAVORITE_PHOTO_BY_ID](state: IState): (photoId: number) => boolean;
}

export const getters: GetterTree<IState, IState> & Getters = {
  [storeTypes.EGetters.IS_FAVORITE_PHOTO_BY_ID]: (state) => (photoId: number) => {
    const photo = state.favoritePhotos.find((item) => item.id === photoId);

    return !!photo;
  },
};
