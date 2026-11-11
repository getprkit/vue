/**
 * Utilities
 * ========================================================================
 *
 * We define all UIKit JavaScript Component and related methods
 * and other functions here.
 *
 * For example UIKit accordion component has JavaScript component and
 * for preventing using UIKit component like: <ul uk-accordion=>...</ul> we
 * will use all UIKit JavaScript component instead of uk-* in HTML tag. it
 * will help us to make our finale HTML output clean from any uk-* HTML attribute.
 *
 * The process is We define a function that is the same [componentName]() and
 * accept any templateRef, Node, CSS selector, jQuery object or HTMLElement and
 * options (component props or options defined in oject) as UIKit JavaScript
 * options or primary option of component. for component without addition params
 * we will pass option directly ex: accordion(el, options) but sometimes we need
 * to change some props value before we sending it to the UIkit JavaScript Component
 * so we use it like: accordion(el, { ...props, active: getActive() })
 *
 * How we pass props to UIkit JavaScript Component?
 * when we want to use the options as props for our component (ex: PrAccordion)
 * it returns some value as vue default value refer to: https://vuejs.org/guide/components/props.html#boolean
 * or some value as undefined value, and for boolean value it will replace the
 * UIKit JavaScript Component value and for undefined value UIkit will remove
 * them, but because we use props and its readonly UIkit cannot delete the
 * undefined value and JavaScript Component compile will be broke for both boolean
 * and undefined value which changed by vue. for example When we're trying to call
 * the UIKit JavaScript Function if UIkit component default options be like:
 * { active = false, animation = true, duration = 200 }
 * and our Vue component default be:
 * { active = false }
 * then we pass our props to UIkit JavaScript Component like:
 * v-bind = { active = true }
 * accordion(el, props)
 * the final option will be:
 * { active = true, animation = false, duration = undefined },
 * then calling UIkit JavaScript Component with accordion(el, props) will
 * be broke. because we not define animation and duration in Vue component
 * props and so vue will change the all boolean props to false if
 * you not defining it and will set other props to undefined, so when we
 * pass it to the UIkit JavaScript Component it will be broke.
 * For fixing that we need to do 2 thing:
 * 1. define all UIKit boolean function like: boolean extends infer T ? T : never
 * and change all UIKit type option from boolean to UIkitBoolean. vue can't change
 * this boolean to false, and also we don't have problem when we using boolean
 * value at calling component (it will accept just boolean)
 * 2. we add feature to forked UIkit library in prkit/uikit#prkit:
 * https://github.com/prfardin/uikit/tree/feature/normalize-undefined-data and we
 * change the state.js to unmute readonly props in safe mode and delete the undefined
 * values as well.
 * TODO: If we want to remove added feature to fork, we must unmuted props and send exactly options
 *       when using the [componentNamed]() function in PrComponent. so we must check in the feature
 *       is costly for us or not, because it's related to another TODO which saying sending all props
 *       to UIkit JavaScript Component will hold the all props in the UIkit JavaScript Component data.
 *
 * Refer to configs.ts line 54 to 128 components which contains icons in their template must follow this
 * structure:
 * import type { IconNames } from '@u/types.ts'
 * const xIconMap = { style1: 'component-default-x-style1', style2: 'component-default-x-style2', ... } as const
 * type xIconType = DefaultIcon<keyof typeof xIconMap> || or custom type if we not using default styles
 * export function getXIcon(icon: xIconType) {
 *  ....any additional conditions
 *   return xIconMap[icon as keyof typeof xIconMap] ?? icon
 * }
 * , ....if there is need to access additional props for conditions:
 * export function getXIcon(icon: xIconType, iconKey?: string) {
 *   if(iconKey === valueOfCondition) {
 *     ....example of additional prop icon compile:
 *     return xIconMap[iconKey as keyof typeof xIconMap]
 *   }
 *  ....any additional conditions
 *   return xIconMap[icon as keyof typeof xIconMap] ?? icon
 * }
 *
 * Also, most of UIKit JavaScript Components has some methods to change state
 * of component programmatically, so we define those methods here too. Structure is:
 * Main UIKit JavaScript Component (recommended for performance):
 * import { componentName as uikitComponentName } from 'uikit'
 * const [componentName] = uikitComponentName
 *
 * Main UIKit JavaScript Component for component with addition params or conditional operations:
 * import { componentName as uikitComponentName } from 'uikit'
 * const [componentName] = (el: ElementTarget, options: ComponentNamePropsType, ....relatedArgs) => {
 *   return [uikitComponentName](el, { ...options, ....relatedArgs })
 * }
 * it will be to clean if we define the types and import it:
 * const [componentName]: ComponentNameType = (el, options, ....relatedArgs) => {
 *   return [uikitComponentName](el, { ...options, ....relatedArgs })
 * }
 *
 * Structure For Methods:
 * Recommended for performance:
 * const componentNameMethodName: MethodComponentNameMethodName = (
 *   el, ...args: the UIKit arguments for methods
 * ) => [uikitComponentName](el).methodName(...args)
 *
 * For methods with addition params or conditional operations:
 * const componentNameMethodName: MethodComponentNameMethodName = (
 *   el, ...args: the UIKit arguments for methods
 * ) => {
 *   ....any additional conditions
 *   [uikitComponentName](el).methodName(...args)
 * }
 *
 * In UIkit if we want to access initialized JavaScript Component we can call the same
 * function with omit the option parameter e.g. [uikitComponentName](Element) will
 * return same component and we have access to initialized component.
 * Example:
 * ....now we have access to initialized accordion component.
 * const accordionApi = accordion(initialized-element)
 *
 * ========================================================================
 */

// New component template error fix
// TODO: Must remove when creating component work done.
import type { MethodAccordionToggle as MethodComponentToggle } from '@u/types.ts'
import { accordion as uikitComponent, grid as uikitGrid, } from 'prkit'
export const grid = uikitGrid

/**
 * Types
 * ======================================================================== */

// methods and options
import type {
  UpdateApi,
  DefaultIcon,
  MethodAccordionToggle,
  MethodAlertClose,
} from '@u/types.ts'

// UIkit JavaScript Components and utils
import UIkit, {
  util as uikitUtil,
  icon as uikitIcon,
  accordion as uikitAccordion,
  alert as uikitAlert,
} from 'prkit'

// TODO: Must move to icon component part when icon JavaScript Component added
import { type IconFunction } from '@u/types'
export const icon: IconFunction = uikitIcon


/**
 * Miscellaneous functions and configs
 * ======================================================================== */

export type ComponentInit<O, R = unknown> = (element: HTMLElement, options: O) => R

export type SetComponents = <O, R>(
  root: HTMLElement,
  selector: string,
  component: ComponentInit<O, R>,
  options: O,
) => R[]

export const setComponents: SetComponents = (root, selector, component, options) =>
  Array.from(root.querySelectorAll<HTMLElement>(selector), (element) =>
    component(element, options),
  )


// ========================================================================
// UIkit JavaScript Components and related methods
// ========================================================================

/**
 * UIkit utilities
 * More here: https://github.com/uikit/uikit-site/blob/feature/js-utils/docs/pages/javascript-utilities.md
 * TODO: check usable UIkit utils and add them here.
 * ======================================================================== */

// add UIkit event listener with UIkit util on, will return default
// function with action off
export const utilOn = uikitUtil.on

// remove UIkit event listener with UIkit util on, return void
export const utilOff = uikitUtil.off

// Calls the update hook on components registered on the element itself, its parents and children.
export const utilUpdate = UIkit.update as UpdateApi


/**
 * Accordion
 * ======================================================================== */

/** Javascript Component */

export const accordion = uikitAccordion

/** Methods */

export const accordionToggle: MethodAccordionToggle = (
  el, index, animate
) => accordion(el).toggle(index, animate)

/** Icons */

export const accordionIconMap = {
  default: 'component-default-accordion-default',
  plus: 'component-default-accordion-plus',
  chevron: 'component-default-accordion-chevron',
  circle: 'component-default-accordion-circle',
} as const

export type AccordionIconType = DefaultIcon<keyof typeof accordionIconMap>

export function getAccordionIcon(icon: AccordionIconType) {
  return accordionIconMap[icon as keyof typeof accordionIconMap] ?? icon
}

/** Miscellaneous */


/**
 * Alert
 * ======================================================================== */

/** Javascript Component */

export const alert = uikitAlert

/** Methods */

export const alertClose: MethodAlertClose = (el) => alert(el).close()

/** Icons */

export const alertIconMap = {
  default: 'component-default-alert-default',
  muted: 'component-default-alert-muted',
  primary: 'component-default-alert-primary',
  success: 'component-default-alert-success',
  info: 'component-default-alert-info',
  warning: 'component-default-alert-warning',
  danger: 'component-default-alert-danger',
} as const

export type AlertIconType = DefaultIcon<keyof typeof alertIconMap>

export function getAlertIcon(icon: AlertIconType, iconKey?: string) {
  if (icon === true) {
    return alertIconMap[iconKey as keyof typeof alertIconMap]
  }
  return alertIconMap[icon as keyof typeof alertIconMap] ?? icon
}

/** Miscellaneous */


/**
 * ComponentName :New-Component-Template
 * ======================================================================== */

/** Javascript Component */

export const component = uikitComponent

/** Methods */

export const methodName: MethodComponentToggle = (
  el, index, animate
) => component(el).toggle(index, animate)

/** Icons */

export const componentIconMap = {
  default: 'component-default-accordion-default',
  plus: 'component-default-accordion-plus',
  chevron: 'component-default-accordion-chevron',
  circle: 'component-default-accordion-circle',
} as const

export type ComponentIconType = DefaultIcon<keyof typeof componentIconMap>

export function getComponentIcon(icon: ComponentIconType) {
  return componentIconMap[icon as keyof typeof componentIconMap] ?? icon
}

/** Miscellaneous */

