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
 * Component props itself has five part:
 * 1. xPropsType: the main props of component (PrKit Props).
 * 2. xClassType: will return CSS class of main component (extended into xPropsType).
 * 3. UIKitXOptions: UIKit JavaScript Component options (just useable for
 *    components that has UIKit JavaScript Component - extended into xPropsType)
 *    ex: interface xPropsType extends UIkitXOptions, xClassType { ... }
 * 4. xIconPropType || BaseIconPropsType: Icon props of component (if component
 *    contain icons - extended into xPropsType).
 * 4. xClosePropType || BaseClosePropsType: Close props of component (if component
 *    contain close - extended into xPropsType).
 *
 * Component which contains icons in their template always extends
 * BaseIconPropsType which contain types: { icon?: DefaultIcon, iconRatio?: number, strokeWidth?: number }
 * For those components that has additional icon type/style or conditional icon compile we
 * import type { XIconType } from '@u/util.ts'
 * define icon types like: BaseIconPropsType<XIconType>
 * XIconType is additional icon styles that defined in util.ts for rendering custom icon styles/types.
 * If you want to addition compile and props or prevent some controls from icon part of component
 * you can define new type for component props with adding it directly in to XPropsType:
 * structure: type XPropsType { icon?: XIconType || DefaultIcon }
 * so we can not change icon ratio and stroke ratio when remove the props.
 *
 * Component which contains close in their template always extends
 * BaseClosePropsType which contain types: { close?: boolean, closeIcon?: T, closeIconRatio?: number, closeStrokeRatio?: number, closeText?: string }
 * If you want to addition compile and props or prevent some controls from close part of component
 * you can define new type for component props with adding it directly in to XPropsType:
 * structure: type XPropsType { close?: boolean, closeIcon?: XIconType || DefaultIcon }
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

// New component template error fix
// TODO: Must remove when creating component props work done.
import type { OptionsAccordion as OptionsComponent, AccordionApi as ComponentApi } from '@u/types.ts'
import type { AccordionIconType as ComponentIconType } from '@u/util.ts'
import type { AccordionClassType as ComponentClassType } from '@u/classes'

/**
 * Imports
 * ======================================================================== */

import type {
  BaseIconPropsType,
  BaseClosePropsType,
  ApiRef,
  OptionsAccordion,
  AccordionApi,
  OptionsAlert,
  AlertApi,
} from '@u/types.ts'

import type { AccordionIconType, AlertIconType } from '@u/util.ts'

import type { AccordionClassType, AlertCloseClassType, AlertClassType } from '@u/classes'


/**
 * Base Types
 * ======================================================================== */


/**
 * Accordion Prop Types
 * Props: apiRef, tag, list, variant, bordered, icon, iconRatio, strokeRatio,
 *        active, animation, collapsible, content, duration, multiple,
 *        targets, toggle, transition, offset
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
  tag?: 'li' | 'div'
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
  /** Set with UIkit JavaScript Component returned value to access component
   * methods and data */
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
  collapsible: true,
} satisfies Partial<AccordionPropsType>


/**
 * Alert Prop Types
 * Props: apiRef, variant, bordered, iconBox, close, closeIcon, closeIconRatio
 *        closeStrokeRatio, closeVariant, closeCircle, closePosition, closeText
 *        icon, iconRatio, strokeRatio, animation, duration, sel-close
 * Child Components: PrAlertIcon | PrAlertClose
 * ======================================================================== */

export type AlertClosePropsType = AlertCloseClassType & BaseClosePropsType

export const alertCloseDefaults = {
  close: true,
  closeIcon: 'component-default-alert-close',
  closeIconRatio: 0.5,
} satisfies Partial<AlertClosePropsType>

export type AlertIconPropsType = BaseIconPropsType<AlertIconType>

export interface AlertPropsType
  extends OptionsAlert, BaseIconPropsType, AlertClosePropsType, AlertClassType {
  /** Set with UIkit JavaScript Component returned value to access component
   * methods and data */
  apiRef?: ApiRef<AlertApi>
}

export const alertDefaults = {
  variant: 'muted',
  close: true,
  closeIcon: 'component-default-alert-close',
  closeIconRatio: 0.5,
} satisfies Partial<AlertPropsType>


/**
 * ComponentName Prop Types :New-Component-Template
 * Props: variant, apiRef, tag, icon, iconRatio, strokeRatio, active, animation
 * Child Components: PrComponentChild1 | PrComponentChild2
 * ======================================================================== */

export interface ComponentChildPropsType {
  /** Render tag of elements */
  tag?: 'li' | 'div'
}

export const componentChildDefaults = {
  tag: 'li',
} satisfies Partial<ComponentChildPropsType>

export type ComponentIconPropsType = BaseIconPropsType<ComponentIconType>

export interface ComponentPropsType
  extends OptionsComponent, ComponentIconPropsType, ComponentClassType {
  /** Will set with UIkit JavaScript Component returned value to access component
   * methods and data */
  apiRef?: ApiRef<ComponentApi>
  tag?: 'ul' | 'div'
}

export const componentDefaults = {
  tag: 'ul',
  variant: 'default',
  icon: 'default',
  iconRatio: 0.7,
} satisfies Partial<ComponentPropsType>
