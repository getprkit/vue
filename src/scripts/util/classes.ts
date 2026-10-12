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
 * Class Types: variant
 * Child Components: PrAccordionTitle | PrAccordionContent
 * ======================================================================== */

export interface AccordionItemClassType {
  active?: boolean
  disabled?: boolean
}

export function accordionItemClasses(props: AccordionItemClassType) {
  return [
    props.active && 'uk-open',
    props.disabled && 'pr-accordion-item-disabled'
  ]
}

export interface AccordionClassType {
  variant?: 'default' | 'hover' | 'line'
}

const accordionVariantMap = {
  default: 'uk-accordion-default',
  hover: 'pr-accordion-hover',
  line: 'pr-accordion-line',
} as const

export function accordionClasses(props: AccordionClassType) {
  return accordionVariantMap[props.variant!]
}
