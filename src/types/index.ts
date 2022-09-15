interface IUserCompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

interface IUserAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
}

export interface IUser {
  name: string;
  phone: string;
  username: string;
  website: string;
  id: number;
  email: string;
  company: IUserCompany;
  address: IUserAddress;
}

export interface IAlbum {
  id: number;
  title: string;
  userId: number;
}

export interface ITab {
  text: string;
  routeName: string;
  isActive: boolean;
}

export interface IPhoto {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface IPhotoWithIsFavorite extends IPhoto {
  isFavorite: boolean;
}

export interface IModalConfig {
  isOpen: boolean;
  url: string;
}

export interface ITitleConfig {
  isShow: boolean;
  text: string;
  xCoord: number;
  yCoord: number;
}
