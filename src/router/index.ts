import { createRouter, createWebHashHistory } from 'vue-router';
import type { Component } from 'vue';

const App = (): Promise<Component> => import(/* webpackChunkName: "App" */'@/components/App.vue');
const Catalog = (): Promise<Component> => import(/* webpackChunkName: "Catalog" */'@/components/Catalog.vue');
const Favorites = (): Promise<Component> => import(/* webpackChunkName: "Favorites" */'@/components/Favorites.vue');

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: App,
      redirect: 'catalog',
      children: [
        {
          path: 'catalog',
          name: 'catalog',
          component: Catalog,
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: Favorites,
        },
      ],
    },
  ],
});

export default router;
