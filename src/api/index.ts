import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { IAlbum, IPhoto, IUser } from '@/types';

const BASE_URL = 'https://json.medrating.org';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export function fetchUsers(): Promise<AxiosResponse<IUser[]>> {
  return axiosInstance.get('/users/');
}

export function fetchAlbumsByUserId(userId: number): Promise<AxiosResponse<IAlbum[]>> {
  return axiosInstance.get('/albums/', {
    params: {
      userId,
    },
  });
}

export function fetchPhotosByAlbumId(albumId: number): Promise<AxiosResponse<IPhoto[]>> {
  return axiosInstance.get('/photos/', {
    params: {
      albumId,
    },
  });
}
