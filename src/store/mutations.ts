import { storeTypes } from '@/store/types';
import type { IModalConfig, IPhotoWithIsFavorite, ITitleConfig } from '@/types';
import type { IState } from '@/store/state';
import type { MutationTree } from 'vuex';
import { utlFuncs } from '@/utils';

export interface Mutations<S = IState> {
  [storeTypes.EMutations.ADD_TO_FAVORITES](state: S, payload: IPhotoWithIsFavorite[]): void;
  [storeTypes.EMutations.REMOVE_FROM_FAVORITES](state: S, payload: IPhotoWithIsFavorite): void;
  [storeTypes.EMutations.SET_MODAL_CONFIG](state: S, payload: IModalConfig): void;
  [storeTypes.EMutations.SET_TITLE_CONFIG](state: S, payload: ITitleConfig): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [storeTypes.EMutations.ADD_TO_FAVORITES](state, photos: IPhotoWithIsFavorite[]) {
    const photosWithoutExisting = photos.filter((photo) => (
      utlFuncs.getItemIndexBy(state.favoritePhotos, photo, 'id') === -1
    ));

    state.favoritePhotos.push(...photosWithoutExisting.map((photo) => ({ ...photo, isFavorite: true })));
  },
  [storeTypes.EMutations.REMOVE_FROM_FAVORITES](state, photo: IPhotoWithIsFavorite) {
    const photoIndex = utlFuncs.getItemIndexBy(state.favoritePhotos, photo, 'id');

    if (photoIndex === -1) return;

    state.favoritePhotos.splice(photoIndex, 1);
  },
  [storeTypes.EMutations.SET_MODAL_CONFIG](state, config) {
    state.modal.isOpen = config.isOpen;
    state.modal.url = config.url;
  },
  [storeTypes.EMutations.SET_TITLE_CONFIG](state, config) {
    state.title.isShow = config.isShow;
    state.title.text = config.text;
    state.title.xCoord = config.xCoord;
    state.title.yCoord = config.yCoord;
  },
};
