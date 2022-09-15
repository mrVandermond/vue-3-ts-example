import type { Mutations } from '@/store/mutations';
import type { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';
import type { Actions } from '@/store/actions';
import type { IState } from '@/store/state';
import type { Getters } from '@/store/getters';

interface IStoreCommit {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

type TKeysActionsWithPayload = keyof {
  [key in keyof Actions as Parameters<Actions[key]>['length'] extends 2 ? key : never]: Actions[key];
};
type TKeysActionsWithoutPayload = keyof {
  [key in keyof Actions as Parameters<Actions[key]>['length'] extends 2 ? never : key]: Actions[key];
};

interface IStoreDispatch {
  dispatch<K extends TKeysActionsWithPayload>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): Promise<ReturnType<Actions[K]>>;
  dispatch<K extends TKeysActionsWithoutPayload>(
    key: K,
    options?: DispatchOptions,
  ): Promise<ReturnType<Actions[K]>>;
}

interface IStoreGetters {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  };
}

export type Store = (
  Omit<VuexStore<IState>, 'commit' | 'getters' | 'dispatch'> &
  IStoreCommit &
  IStoreGetters &
  IStoreDispatch
);
