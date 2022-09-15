import { storeTypes } from '@/store/types';
import { utlCst } from '@/utils';
import type { Mutations } from '@/store/mutations';
import type { ActionContext, ActionTree } from 'vuex';
import type { IState } from '@/store/state';
import type { IAlbum, IPhoto, IPhotoWithIsFavorite, IUser } from '@/types';
import * as api from '@/api';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<IState, IState>, 'commit'>;

export interface Actions {
  [storeTypes.EActions.GET_FAVORITE_PHOTOS_FROM_LOCAL_STORAGE](
    ctx: AugmentedActionContext,
  ): void;
  [storeTypes.EActions.SET_FAVORITE_PHOTOS_TO_LOCAL_STORAGE](
    ctx: AugmentedActionContext,
  ): void;
  [storeTypes.EActions.FETCH_USERS](
    ctx: AugmentedActionContext,
  ): Promise<IUser[]>;
  [storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID](
    ctx: AugmentedActionContext,
    payload: number,
  ): Promise<IAlbum[]>;
  [storeTypes.EActions.FETCH_PHOTOS_BY_ALBUM_ID](
    ctx: AugmentedActionContext,
    payload: number,
  ): Promise<IPhoto[]>;
}

export const actions: ActionTree<IState, IState> & Actions = {
  async [storeTypes.EActions.FETCH_USERS]() {
    const { data } = await api.fetchUsers();

    return data;
  },
  async [storeTypes.EActions.FETCH_ALBUMS_BY_USER_ID](ctx, userId) {
    const { data } = await api.fetchAlbumsByUserId(userId);

    return data;
  },
  async [storeTypes.EActions.FETCH_PHOTOS_BY_ALBUM_ID](ctx, albumId) {
    const { data } = await api.fetchPhotosByAlbumId(albumId);

    return data;
  },
  [storeTypes.EActions.GET_FAVORITE_PHOTOS_FROM_LOCAL_STORAGE]({ commit }) {
    const jsonFavoritePhotos = localStorage.getItem(utlCst.LOCAL_STORAGE_KEY);

    if (!jsonFavoritePhotos) return;

    const favoritePhotos = (JSON.parse(jsonFavoritePhotos) as IPhotoWithIsFavorite[]);

    commit(storeTypes.EMutations.ADD_TO_FAVORITES, favoritePhotos);
  },
  [storeTypes.EActions.SET_FAVORITE_PHOTOS_TO_LOCAL_STORAGE]({ state }) {
    const { favoritePhotos } = state;
    const jsonFavoritePhotos = JSON.stringify(favoritePhotos);

    localStorage.setItem(utlCst.LOCAL_STORAGE_KEY, jsonFavoritePhotos);
  },
};
