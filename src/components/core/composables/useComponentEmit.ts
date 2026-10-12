/**
 * Emit Composable
 * ========================================================================
 *
 * For default UIKit emits we define useComponentEmit composable.
 * nearly all UIKit JavaScript Component expose events that are emitted when
 * their state changes.
 * for example accordion component includes: beforeshow show, shown,
 * beforehide, hide, hidden. if we want to define these events in component itself
 * This would create unnecessary duplication and make the component structure harder
 * to maintain. so if we want to prevent duplication and keep our component
 * clean we useComponentEmit.
 *
 * useComponentEmit define emit for each event of UIKit JavaScript Component and
 * remove it before component unmounted. the first step of precess is we declare emits
 * like:
 * export const accordionEmits = [
 *   'beforeshow',
 *   'show'
 *   'shown'
 *   'beforehide'
 *   'hide'
 *   'hidden'
 * ] as const
 * type AccordionEmitArgs = [...DefaultEmitArgs, value: unknown]
 * export interface AccordionEmitsType {
 *   beforeshow: AccordionEmitArgs
 *   show: AccordionEmitArgs
 *   shown: AccordionEmitArgs
 *   beforehide: AccordionEmitArgs
 *   hide: AccordionEmitArgs
 *   hidden: AccordionEmitArgs
 * }
 * DefaultEmitArgs type is: [event: Event]
 * then define it in component:
 * const emit = defineEmits<accordionEmitsType>()
 * then add handler in component (we add it cause handler for most of components is different):
 * const handler = (event: Event) => { emit(event.type as never, event, selected.value) }
 * at last call useComponentEmit:
 * useComponentEmit(el, accordionEmits, emitHandler)
 *
 * For component that not include additional value we will use DefaultEmitArgs directly.
 *
 * If each emits contains its own args its better to define the args in front of each
 * custom-emit-args.
 *
 *
 * TODO: maybe handler structure for most component be like:
 *       handler = (event: Event) => { emit(event.type as any, event) } without any extra arguments
 *       so After seeing duplication of event handler we need to define default handler function
 *       and import it to prevent of calling every time it in the component (before adding it
 *       we need to check production build and performance)
 *
 * ========================================================================
 */

import type { UseComponentEmit } from '@u/types'
import { onBeforeUnmount, onMounted } from 'vue'

export const useComponentEmit: UseComponentEmit = (el, componentEmits, handler) => {
  onMounted(() => {
    componentEmits.forEach((eventName) => {
      el.value!.addEventListener(eventName, handler)
    })
  })

  onBeforeUnmount(() => {
    componentEmits.forEach((eventName) => {
      el.value!.removeEventListener(eventName, handler)
    })
  })
}
