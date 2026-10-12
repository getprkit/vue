/**
 * Props
 * ========================================================================
 *
 * Vue support exported type-based declaration for props refer to
 * https://vuejs.org/guide/typescript/composition-api#typing-component-props
 * so We use type-based declaration define for props, and it also keeps our
 * main component clean, and we can manage all props at one file and import
 * them at main component.
 *
 * Component props itself has four part:
 * 1. xPropsType: the main props of component (PrKit Props).
 * 2. xClassType: will return CSS class of main component (extended into xPropsType).
 * 3. UIKitXOptions: UIKit JavaScript Component options (just useable for
 *    components that has UIKit JavaScript Component - extended into xPropsType)
 *    ex: interface xPropsType extends UIkitXOptions, xClassType { ... }
 * 4. xIconPropType || BaseIconPropsType: Icon props of component (if component
 *    contain icons - extended into xPropsType).
 *
 * Component which contains icons in their template always extends
 * BaseIconPropsType which contain types: {icon?: DefaultIcon, iconRatio?: number, strokeWidth?: number}
 * For those components that has additional icon type/style or conditional icon compile we
 * import type { XIconType } from '@u/util.ts'
 * define icon types like: BaseIconPropsType<XIconType>
 * XIconType is additional icon styles that defined in util.ts for rendering custom icon styles/types.
 * If you want to addition compile and props or prevent some controls from icon part of component
 * you can define new type for component props with adding it directly in to XPropsType:
 * structure: type XPropsType { icon?: XIconType || DefaultIcon }
 * so we can not change icon ratio and stroke ratio when remove the props.
 *
 * refer to ApiRef description in types.ts file (line: 60 to 115) every
 * main component prop types that has UIkit JavaScript Component (xPropsType)
 * must have props with this define: apiRef?: ApiRep<XApi>. So we can access
 * the component api and use UIKit JavaScript methods of that component.
 * When we define apiRef props it can be accessed from parent like this:
 * import type { XApi } from '@u/types'
 * const xApi = ref<XApi>()
 * <PrAccordion :api-ref="(api) => (xApi = api)" />
 * then we have access the api with: xApi.[methodName || api](....)
 *
 * Also, some of component props has default value, so same as props we define them
 * here after defining props and import them when defining component props (the defaultValue
 * type must be: satisfies Partial<xPropsType>)
 * for example:
 * const xDefaults = { ... props default values } satisfies Partial<xPropsType>
 * and use it like:
 * const props = withDefaults(defineProps<xPropsType>(), xDefaults) in component
 *
 * For usage of props we need to import all UIKit JavaScript Component types and
 * all Component Class Types.
 *
 * Structure:
 * interface xPropsType
 *   extends UIkitXOptions, xClassType,
 *   [if component contains icon: xIconPropsType || BaseIconPropsType] {
 *   ... props of state of component
 * }
 * const xDefaults = { ... props default values } satisfies Partial<xPropsType>
 * usage in component:
 * const props = withDefaults(defineProps<xPropsType>(), xDefaults)
 *
 * If we want to use one of UIKit Component Options in our component we have not accessed to
 * default value of UIKit JavaScript Component, so we need to define the default value in xDefaults
 * for example: in accordion component we need to check the component is collapsible or not in
 * template: <a @click="selected = collapsible ? null : item.value)"> so for accessing the default
 * value of UIKit JavaScript Component options we need to define the default value of collapsible
 * if we not define the value will be undefined and will receive the default value when we pass it to
 * UIKit JavaScript Component ([componentName](el, props)).
 *
 * ========================================================================
 */


/**
 * Imports
 * ======================================================================== */

import type {
  DefaultIcon,
  ApiRef,
  OptionsAccordion,
  AccordionApi,
  OptionsIcon,
} from '@u/types.ts'

import type { AccordionIconType } from '@u/util.ts'

import type { AccordionClassType } from '@u/classes'


/**
 * Base Types
 * ======================================================================== */

export interface BaseIconPropsType<T = DefaultIcon> {
  /** Icon Type of item - each T has its own defined style from component */
  icon?: T
  /** The icon size */
  iconRatio?: number
  /** The icon stroke size */
  strokeRatio?: number
}


/**
 * Accordion Prop Types
 * Props: active, animation, collapsible, content, duration, multiple, targets,
 *        toggle, transition, offset, variant, apiRef, tag, list, icon, iconRatio,
 *        strokeRatio
 * Child Components: PrAccordionItem | PrAccordionTitle | PrAccordionContent
 * ======================================================================== */

export interface AccordionItemType {
  /** Model value when opened/clicked/selected */
  value?: unknown
  /** Title/header of an item */
  title: unknown
  /** Hidden part of item that will show when item opened */
  content: unknown
  /** Disable item and preventing it from opening */
  disabled?: boolean
}

export interface AccordionItemPropsType {
  /** Render tag of elements */
  tag?: 'li' | 'div',
  /** Specify item should be opened initially */
  active?: boolean
  /** Disable item and preventing it from opening */
  disabled?: boolean
}

export const accordionItemDefaults = {
  tag: 'li',
} satisfies Partial<AccordionItemPropsType>

export type AccordionTitlePropsType = BaseIconPropsType<AccordionIconType>

export const accordionTitleDefaults = {
  icon: 'default',
  iconRatio: 0.7,
} satisfies Partial<AccordionTitlePropsType>

export interface AccordionPropsType
  extends OptionsAccordion, AccordionTitlePropsType, AccordionClassType {
  /** Equal to element ref of component for accessing component element from parent */
  apiRef?: ApiRef<AccordionApi>
  /** Render tag of elements: ul-li | div-div */
  tag?: 'ul' | 'div'
  /** List of array to render with default structure */
  list?: AccordionItemType[]
}

export const accordionDefaults = {
  tag: 'ul',
  variant: 'default',
  icon: 'default',
  iconRatio: 0.7,
  collapsible: true
} satisfies Partial<AccordionPropsType>


/**
 * Icon Prop Types
 * Props: icon, ratio, tag
 * ======================================================================== */

export interface IconPropsType extends OptionsIcon {
  tag?: 'span' | string
}

export const IconDefaults: Partial<IconPropsType> = {
  tag: 'span',
}
