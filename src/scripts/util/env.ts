/**
 * Env
 * ========================================================================
 * TODO: need to change the name and move to another directory ( maybe main ).
 *       We still don't have plan for this setting to keep it here or
 *       locate these configs in another files, so until that we keep them here
 *
 * Sometimes we need some ref just run in computed mod and we don't want
 * them to be reactive or run in production build see we use isDev const and
 * devComputed to reduce bundle size refer to
 * https://vuejs.org/guide/best-practices/performance.html#bundle-size-and-tree-shaking
 *
 * For a value be reactive just in dev mode and be simple const in production build we use: devComputed
 * ex: const devReactive = devComputed(() => .....)
 *
 * FIXME: Maybe we need to remove devComputed in future and use computed, to reactive all classes instead
 *        of being non-reactive with changing the class states with props. for now we use this solution
 *        and we think classes not need to be reactive in production build.
 *
 * For a section to not be compiled in production build we use isDev with an if
 * ex: if (isDev) { ... }
 *
 * Component that's contains UIKit initialization methods for build need to
 * watch props changes (just in dev mod). which props? nearly close to all props
 * instead of some. so we use devPropsWatch to pass props for watch and filter unneeded props
 * in it.
 * ex: devPropsWatch(props, () => { ... }, ['unneededWatchProps1', 'unneededWatchProps2'])
 *
 * ========================================================================
 */

import { type MaybeRef, computed, watch } from 'vue'

/** Types */

export type DevKeyOf<T> = Extract<keyof T, string>

type DevPropsWatchKey<T> = DevKeyOf<T> | 'modelValue'

export type DevPropsWatchOptions<T extends object> =
  | { only: readonly DevKeyOf<T>[]; exclude?: never }
  | { only?: never; exclude?: readonly DevPropsWatchKey<T>[] }


/** Utils */

export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

export function devComputed<T>(getter: () => T): MaybeRef<T> {
  if (isDev) {
    return computed(getter)
  }

  return getter()
}

export function devPropsWatch<T extends object>(
  props: T,
  callback: () => void,
  options: DevPropsWatchOptions<T> = {},
) {
  const keys =
    'only' in options && options.only
      ? options.only
      : (Object.keys(props) as DevKeyOf<T>[]).filter((key) => !options.exclude?.includes(key))

  const sources = keys.map((key) => () => props[key])

  return watch(sources, callback, { flush: 'post' })
}
