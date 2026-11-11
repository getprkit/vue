/**
 * The CSS Class Generator for main and child components
 * ========================================================================
 *
 * We use this file for classes of the main and child components
 * we return main CSS class from xClassObject function to
 * main component, its receive props and return classes
 *
 * we also define xClassTypes here and extend them with
 * xPropsType in props.ts and define props as pure type annotations
 * refer to: https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
 *
 * We use xClassMap for each class style.
 * The reason for using xClassMap is more lean for production
 * build instead of using all map in componentClasses
 * so we define each style in a xClassMap and use it in
 * xClass Function.
 *
 * It's also make our components clean and make classes
 * reusable for other semi-like components.
 *
 * We also define type for each component classes.
 *
 * The CSS class its: UIKit CSS classes that defined for
 * components + PrKit CSS classes (all defined in ./src/less/default/ComponentName|*.less).
 *
 * Structure:
 * interface xClassType { class1: value1 | value2, class2: value1, value2 | class3?: boolean }
 * const xClass1Map = { value1: 'CSS class', value2: 'CSS class' }
 * const xClass2Map = { ...value1: 'CSS class', value2: 'CSS class' }
 * function xClasses(props: xClassType) {
 *   return [
 *     xClass1Map[props.class1],
 *     xClass2Map[props.class2],
 *     props.class3 && 'value'
 *   ]
 * }
 *
 * For boolean props type that will return a class we use directly in xClasses without any map.
 *
 * For component that has just one xClassMap we use return without any additional array:
 * export function xClasses(props: xClassType) {
 *   return xClassMap[props.class]
 * }
 *
 * If any of child component accept any props or class, we will define the classes and types
 * before the parent component definitions.
 *
 * ========================================================================
 */


/**
 * Accordion Class Generator
 * Class Types: variant, bordered
 * Child Components: PrAccordionTitle | PrAccordionContent
 * ======================================================================== */

export interface AccordionItemClassType {
  active?: boolean
  disabled?: boolean
}

export function accordionItemClasses(props: AccordionItemClassType) {
  return [
    props.active && 'uk-open',
    props.disabled && 'uk-accordion-item-disabled'
  ]
}

export interface AccordionClassType {
  variant?: 'default' | 'pill' | 'line'
  bordered?: boolean
}

const accordionVariantMap = {
  default: 'uk-accordion-default',
  pill: 'uk-accordion-pill',
  line: 'uk-accordion-line',
} as const

export function accordionClasses(props: AccordionClassType) {
  return [
    accordionVariantMap[props.variant!],
    props.bordered && 'uk-accordion-bordered',
  ]
}


/**
 * Alert Class Generator
 * Class Types: variant, bordered, iconBox, closeVariant, closeCircle, closePosition
 * Child Components: PrAlertIcon | PrAlertClose
 * ======================================================================== */

export interface AlertCloseClassType {
  closeVariant?: 'default' | 'pill' | 'pill-hover' | 'pill-solid'
  closeCircle?: boolean
  closePosition?: 'default' | 'top' |'corner' | 'end'
  closeIconAnimation?: boolean
}

const alertCloseVariantMap = {
  default: false,
  pill: 'uk-alert-close-pill',
  'pill-hover': 'uk-alert-close-pill-hover',
  'pill-solid': 'uk-alert-close-pill-solid',
} as const

const alertClosePositionMap = {
  default: false,
  top: 'uk-alert-close-top',
  corner: 'uk-alert-close-corner',
  end: 'uk-alert-close-end',
} as const

export function alertCloseClasses(props: AlertCloseClassType) {
  return [
    alertCloseVariantMap[props.closeVariant!],
    props.closeCircle && 'uk-alert-close-circle',
    alertClosePositionMap[props.closePosition!],
    props.closeIconAnimation && 'uk-alert-close-icon-animation',
  ]
}

export interface AlertClassType {
  variant?: 'default' | 'muted' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
  bordered?: boolean
  iconBox?: boolean
}

const alertVariantMap = {
  default: 'uk-alert-default',
  muted: 'uk-alert-muted',
  primary: 'uk-alert-primary',
  success: 'uk-alert-success',
  info: 'uk-alert-info',
  warning: 'uk-alert-warning',
  danger: 'uk-alert-danger',
} as const

export function alertClasses(props: AlertClassType) {
  return [
    alertVariantMap[props.variant!],
    props.bordered && 'uk-alert-bordered',
    props.iconBox && 'uk-alert-icon-box',
  ]
}


/**
 * ComponentName Class Generator :New-Component-Template
 * Class Types: variant
 * Child Components: PrAccordionChild1 | PrAccordionChild2
 * ======================================================================== */

export interface ComponentChildClassType {
  variant?: 'default' | 'pill' | 'line'
  disabled?: boolean
}

const componentChildVariantMap = {
  default: 'uk-accordion-default',
  pill: 'uk-accordion-pill',
  line: 'uk-accordion-line',
} as const

export function componentChildClasses(props: ComponentChildClassType) {
  return [
    componentChildVariantMap[props.variant!],
    props.disabled && 'uk-accordion-item-disabled'
  ]
}

export interface ComponentClassType {
  variant?: 'default' | 'pill' | 'line'
  disabled?: boolean
}

const componentVariantMap = {
  default: 'uk-accordion-default',
  pill: 'uk-accordion-pill',
  line: 'uk-accordion-line',
} as const

export function componentClasses(props: ComponentClassType) {
  return [
    componentVariantMap[props.variant!],
    props.disabled && 'uk-accordion-item-disabled'
  ]
}
