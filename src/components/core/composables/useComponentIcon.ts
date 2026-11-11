/**
 * Icon Composable
 * ========================================================================
 *
 * Some of UIKit/PrKit component contains icons in itself. for rendering the icon
 * inside component we are using useComposableIcon. its keep our code clean and avoid duplication.
 *
 * We can use PrIcon component for this, but we will not because of
 * vue suggestion: Avoid Unnecessary Component Abstractions refer to:
 * https://vuejs.org/guide/best-practices/performance.html#avoid-unnecessary-component-abstractions
 *
 * The process can be done in two way:
 * 1. if component includes additional icons types or conditional icon compile.
 * 2. component accept icon from props directly without any style or condition for icon.
 *
 * Process of solution one:
 * first we define HTML element to render icon inside the main component.
 * like:
 * <span ref="iconEl" />
 * then we define structure for component inside util.ts
 * like:
 * import type { DefaultIcon } from '@u/types.ts'
 * const accordionIconMap = {
 *   default: 'component-default-accordion-default',
 *   plus: 'component-default-accordion-plus',
 *   chevron: 'component-default-accordion-chevron',
 *   circle: 'component-default-accordion-circle',
 * } as const
 * type AccordionIconType = DefaultIcon<keyof typeof accordionIconMap>
 * export function getAccordionIcon(icon: AccordionIconType) {
 *   return accordionIconMap[icon as keyof typeof accordionIconMap] ?? icon
 * }
 * then we define icon props for component.
 * like:
 * import type { AccordionIconType } from '@u/util.ts'
 * type AccordionIconPropsType = BaseIconPropsType<AccordionIconType>
 * interface AccordionPropsType extends AccordionIconPropsType
 * at last we need to call useComponentIcon in component:
 * like: const { icon, iconName } = useComponentIcon(props, getAccordionIcon)
 * now we can call icon in props and use specific types (icon style types will suggest as well also):
 * <PrAccordion icon="false | plus | icon-fa-regular-chevron-down" :icon-ratio="1.5" :stroke-ratio="2" />
 *
 * If component render icon from another props, we need to define iconKey in getXIcon and pass
 * it when using useComponentIcon(props, getXIcon, iconKey) also need to add a condition with true value
 * in getXIcon function and at last set icon to true when using the PrX component. alert is the on of
 * example:
 * const { iconName } = useComponentIcon(props, getAlertIcon, 'variant')
 * export const alertIconMap = {
 *   default: 'component-default-alert-default',
 *   muted: 'component-default-alert-muted',
 *   ...
 * } as const
 * export type AlertIconType = DefaultIcon<keyof typeof alertIconMap>
 * export function getAlertIcon(icon: AlertIconType, iconKey?: string) {
 *   if (icon === true) {
 *     return alertIconMap[iconKey as keyof typeof alertIconMap]
 *   }
 *   return alertIconMap[icon as keyof typeof alertIconMap] ?? icon
 * }
 * then for usage: <PrAlert variant="muted" icon>....</PrAlert>
 *
 * Process of solution two:
 * first we define HTML element to render icon inside the main component.
 * like:
 * <span ref="iconEl" />
 * then we define icon props for component with extends component props from
 * BaseIconPropsType in props.ts.
 * interface NavPropsType extends BaseIconPropsType
 * at last we need to call useComponentIcon in component:
 * const getNavIcon = () => props.icon
 * like: const { iconEl, iconName } = useComponentIcon(props, getNavIcon)
 * now we can call icon in props and use specific types (icon style types will suggest as well also):
 * <PrNav icon="icon-fa-regular-chevron-down | any-icon-styles" :icon-ratio="1.5" :stroke-ratio="2" />
 *
 * BaseIconPropsType itself is: { icon?: DefaultIcon, iconRatio?: number, strokeRatio?: number }
 * DefaultIcon is: IconName | boolean | undefined
 * IconName also will help us with icon style types.
 *
 * if you want to addition compile and props or prevent some controls from icon part of component
 * you can define new type for component props with adding it directly in to ComponentNamePropsType:
 * ex: type AccordionPropsType { icon?: AccordionIconType || DefaultIcon }
 * so we can not change icon ratio and stroke ratio when remove the props.
 *
 * size of rendered icon is 24 * 24 so icon-ratio value will be Multiplied to it.
 * stroke-width of rendered icon is defined stroke width in svg files so stroke-ratio value will be Multiplied to it.
 *
 * Structure:
 * util.ts (if use conditional icon compile):
 * const xIconMap = { style1: 'component-default-x-style1', style2: 'component-default-x-style2', ... } as const
 * type xIconType = DefaultIcon<keyof typeof xIconMap> || or custom type if we not using default styles
 * export function getXIcon(icon: xIconType) {
 *  ...any additional conditions
 *   return xIconMap[icon as keyof typeof xIconMap] ?? icon
 * }
 *
 * props.ts:
 * if use conditional icon compile:
 * import type { xIconType } from '@u/util.ts'
 * type xIconPropsType = BaseIconPropsType<xIconType>
 * interface xPropsType extends xIconPropsType
 * or if not:
 * interface xPropsType extends BaseIconPropsType
 * or remove some controls like ratio or stroke:
 * interface xPropsType {
 *   icon?: DefaultIcon
 * }
 *
 * PrComponent (main component):
 * <span ref="iconEl" />
 * if using conditional icon compile:
 * import { getXIconName } from '@u/util.ts'
 * const { iconEl, iconName } = useComponentIcon(props, getXIconName)
 * or if not:
 * const getXIconName = () => props.icon
 * const { iconEl, iconName } = useComponentIcon(props, getXIconName)
 *
 * using the component:
 * <PrComponent icon="icon1|..." :icon-ratio="number(* 24)" :stroke-ratio="number(* strokeWidthAttr)" />
 *
 * ========================================================================
 */

import { onMounted, unref, useTemplateRef } from 'vue'
import { devComputed, devPropsWatch, isDev } from '@u/env.ts'
import type { BaseIconPropsType, UseComponentIcon } from '@/scripts/util/types'
import { icon } from '@u/util.ts'

export const useComponentIcon: UseComponentIcon = (props, getIcon, iconKey, refEl = 'iconEl') => {
  const iconEl = useTemplateRef<HTMLElement>(refEl)

  const iconName = devComputed(() =>
    props.icon ? getIcon(props.icon, iconKey && props[iconKey]) : false,
  )

  function updateIcon() {
    const name = unref(iconName)
    if (!name) return

    icon(iconEl.value, {
      icon: name as string,
      ratio: props.iconRatio,
      strokeRatio: props.strokeRatio,
    })
  }

  onMounted(() => {
    updateIcon()

    if (isDev) {
      devPropsWatch<BaseIconPropsType>(
        props,
        () => {
          updateIcon()
        },
        { only: ['icon', 'iconRatio', 'strokeRatio'] },
      )
    }
  })

  return {
    iconEl,
    iconName,
  }
}
