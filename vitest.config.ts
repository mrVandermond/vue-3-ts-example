import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'assets'),
      '@test': path.resolve(__dirname, 'test'),
    },
  },
  test: {
    include: ['test/specs/**/*.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      reportsDirectory: './test/coverage'
    }
  },
  plugins: [vue()],
});
