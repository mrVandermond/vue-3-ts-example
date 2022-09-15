import { mount } from '@vue/test-utils';
import type { VueWrapper, MountingOptions } from '@vue/test-utils';
import type { DefineComponent } from 'vue';

export type TWrapperFactoryReturnType = VueWrapper<InstanceType<DefineComponent>>;

export function wrapperFactory(
  Component: DefineComponent,
  // eslint-disable-next-line @typescript-eslint/ban-types
  options?: MountingOptions<{}>,
): TWrapperFactoryReturnType {
  return mount(Component, {
    shallow: true,
    ...options,
  });
}
