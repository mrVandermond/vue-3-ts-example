import type { StoreOptions } from 'vuex';
import { createStore, useStore as baseUseStore } from 'vuex';
import type { InjectionKey } from 'vue';
import type { Store } from '@/store/types/overrides';
import type { IState } from './state';
import { state } from './state';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

export const key: InjectionKey<Store> = Symbol('store');

export function customUseStore(): Store {
  return baseUseStore(key);
}

export function customCreateStore(options: StoreOptions<IState>): Store {
  return createStore<IState>(options);
}

export const store = customCreateStore({
  state,
  mutations,
  getters,
  actions,
});
