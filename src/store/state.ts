import type { IModalConfig, IPhotoWithIsFavorite, ITitleConfig } from '@/types';

export interface IState {
  favoritePhotos: IPhotoWithIsFavorite[];
  modal: IModalConfig;
  title: ITitleConfig;
}

export const state = (): IState => ({
  favoritePhotos: [],
  modal: {
    isOpen: false,
    url: '',
  },
  title: {
    isShow: false,
    text: '',
    xCoord: 0,
    yCoord: 0,
  },
});
