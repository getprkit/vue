/**
 * Emits
 * ========================================================================
 *
 * We are helping from UIKit to create components in vue
 * so for main component that'ts every UI Framework must have
 * we're get help from UIKit to defined them.
 *
 * TODO: We must find a way to use emits name once, but we are duplicating them
 *       like: accordionEmits = ['beforeshow', 'show', ...]
 *       interface AccordionEmitsType {beforeshow: type, show: type, ....}
 *
 * So when we use a component like: accordion (base from UIKit) it has
 * some emits like: show, beforeshow, beforehide, hide and ...
 * so we have base structure for all component (not those just use CSS classes, those
 * must define with uk- prefix in HTML element tags like <ul uk-accordion> or has
 * UIkit JavaScript Component) and heres the emits help us we define component
 * emits here and import them into propose component and pass them to
 * composable component (useComponentEmit) and then we can use
 * emit when Event happened at component action
 *
 * We're using composable component for emits because
 * its much more lean for production build, and component will be clean
 *
 * For define emits we declare emitted events using pure type annotations
 * refer to: https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
 *
 * We also define type for each component Emits
 *
 * Structure:
 * emits.ts:
 * const xEmits = [UIKitComponentEvents1, UIKitComponentEvents2, ....]
 * interface xEmitsType { (UIKitComponentEvents1: DefaultEmitArgs, UIKitComponentEvents2: DefaultEmitArgs }
 *
 * PrComponent (main component):
 * import { type xEmitsType, xEmits } from '@u/emits.ts'
 *
 * const emit = defineEmits<xEmitsType>()
 * const emitHandler = (event: Event) => {
 *   emit(event.type as never, event)
 * }
 * useComponentEmit(el, xEmits, emitHandler)
 *
 * For component that include additional value we will add define new componentType whit additional
 * args, structure:
 * const xEmitsArgs = [...DefaultEmitArgs, ....additional-args]
 * interface xEmitsType { (UIKitComponentEvents1: xEmitsArgs, UIKitComponentEvents2: xEmitsArgs }
 *
 * PrComponent (main component):
 * const emitHandler = (event: Event) => {
 *   emit(event.type as never, event, ....additional-args)
 * }
 *
 * For components that each emits contains its own args its better to define the args in
 * front of each UIKitComponentEvents, structure:
 * const xEmitsArgs = [...DefaultEmitArgs, ....additional-args1]
 * type AccordionEmitsType = {
 *   UIKitComponentEvents1: xEmitsArgs
 *   UIKitComponentEvents2: xEmitsArgs
 *   UIKitComponentEvents3: [...DefaultEmitArgs, ....additional-args1, ....additional-args2]
 * }
 *
 * PrComponent (main component):
 * const emitHandler = (event: Event) => {
 *   emit(event.type as never, event, ....additional-args1, ....additional-args2)
 * }
 * DefaultEmitArgs is: [event: Event]
 *
 * For custom emit args for each emit we need to change emitHandler function to accept the
 * all possible additional args so we set all additional args in emit, its work good and clean,
 * but it will sent the additional args for each emit.
 *
 * ....args: is how many arguments we will define for emits, for example:
 * we will always pass selected value in emits for accordion components cause
 * component have defineModel which will return on clicked.
 *
 * TODO: Check emit handled type and process if we use additional args for each component.
 *
 * ========================================================================
 */


/**
 * Accordion Component Emits
 * emits: beforeshow, show, shown, beforehide, hide, hidden
 * types: emit(e: 'emit', event: Event, value: unknown): void
 * ======================================================================== */

type DefaultEmitArgs = [event: Event]

export const accordionEmits = [
  'beforeshow',
  'show',
  'shown',
  'beforehide',
  'hide',
  'hidden',
] as const

type AccordionEmitArgs = [...DefaultEmitArgs, value: unknown]

export type AccordionEmitsType = {
  beforeshow: AccordionEmitArgs
  show: AccordionEmitArgs
  shown: AccordionEmitArgs
  beforehide: AccordionEmitArgs
  hide: AccordionEmitArgs
  hidden: AccordionEmitArgs
}


/**
 * Alert Component Emits
 * emits: beforehide, hide
 * types: emit(e: 'emit', event: Event): void
 * ======================================================================== */

export const alertEmits = [
  'beforehide',
  'hide',
  'hidden',
] as const

export type AlertEmitsType = {
  beforehide: DefaultEmitArgs
  hide: DefaultEmitArgs
  hidden: DefaultEmitArgs
}


/**
 * ComponentName Component Emits :New-Component-Template
 * emits: beforeshow, show, shown, beforehide, hide, hidden
 * types: emit(e: 'emit', event: Event): void
 * ======================================================================== */

export const componentEmits = [
  'beforeshow',
  'show',
  'shown',
  'beforehide',
  'hide',
  'hidden',
] as const

// type ComponentEmitArgs = [...DefaultEmitArgs, value: unknown]

export type ComponentEmitsType = {
  beforeshow: DefaultEmitArgs
  show: DefaultEmitArgs
  shown: DefaultEmitArgs
  beforehide: DefaultEmitArgs
  hide: DefaultEmitArgs
  hidden: DefaultEmitArgs
}
