/**
 * Close Composable
 * ========================================================================
 *
 * Some of UIKit/PrKit component contains close in itself. for rendering the close icon
 * inside component and close functionality for closing (destroying) the component
 * we are using useComposableClose. its keep our code clean and avoid duplication.
 *
 * We can use PrClose component for this, but we will not because of
 * vue suggestion: Avoid Unnecessary Component Abstractions refer to:
 * https://vuejs.org/guide/best-practices/performance.html#avoid-unnecessary-component-abstractions
 *
 * The process is:
 * first we define HTML element to render icon inside the main component.
 * like:
 * <a href="" class="uk-componentName-close" ref="closeEl" />
 * then we define icon props for component with extends component props from
 * BaseClosePropsType in props.ts.
 * interface NavPropsType extends BaseClosePropsType
 * then we need to call useComponentClose in component:
 * like: const { closeEl, closeIconName } = useComponentClose(props, refEl = 'closeEl')
 * at last we need to set component default props for specific close icon:
 * like: const navDefaults = { close: true, closeIcon: 'component-default-nav-close', closeIconRatio: 0.5 }
 * now we can call icon in props and use specific types (icon style types will suggest as well also):
 * <PrNav :close="boolean" closeIcon="icon-fa-regular-chevron-down | any-icon-styles" :close-icon-ratio="1.5" :close-stroke-ratio="2" />
 *
 * BaseClosePropsType itself is: { close?: boolean, closeIcon?: DefaultIcon, closeIconRatio?: number, closeStrokeRatio?: number, closeText?: string }
 * DefaultIcon is: IconName | boolean | undefined
 * IconName also will help us with icon style types.
 *
 * if you want to addition compile and props or prevent some controls from icon part of component
 * you can define new type for component props with adding it directly in to ComponentNamePropsType:
 * ex: type AlertPropsType { closeIcon?: AlertCloseIconType || DefaultIcon }
 * so we can not change close icon ratio and close stroke ratio when remove the props.
 *
 * size of rendered icon is 24 * 24 so icon-ratio value will be Multiplied to it.
 * close-stroke-width of rendered icon is defined stroke width in svg files so stroke-ratio value will be Multiplied to it.
 *
 * Structure:
 * props.ts:
 * interface xPropsType extends BaseClosePropsType
 * or remove some controls like ratio or stroke:
 * interface xPropsType {
 *   closeIcon?: DefaultIcon
 * }
 * export const xDefaults = {
 *   close: true,
 *   closeIcon: 'component-default-x-close',
 *   closeIconRatio: 0.5,
 * } satisfies Partial<XPropsType>
 *
 * PrComponent (main component):
 * <a href="" class="uk-x-close" ref="closeEl" />
 * const { closeEl, closeIconName } = useComponentClose(props, refEl = 'closeEl')
 *
 * using the component:
 * <PrComponent :close="boolean" close-icon="icon1|..." :close-icon-ratio="number(* 24)" :close-stroke-ratio="number(* strokeWidthAttr)" />
 *
 * ========================================================================
 */

import { onMounted, unref, useTemplateRef } from 'vue'
import { devComputed, devPropsWatch, isDev } from '@u/env.ts'
import type { BaseClosePropsType, UseComponentClose } from '@/scripts/util/types'
import { icon } from '@u/util.ts'

export const useComponentClose: UseComponentClose = (props, refEl = 'closeEl') => {
  const closeEl = useTemplateRef<HTMLElement>(refEl)

  const closeIconName = devComputed(() => props.closeIcon || false)

  function updateIcon() {
    const name = unref(closeIconName)
    if (!name) return

    icon(closeEl.value, {
      icon: name as string,
      ratio: props.closeIconRatio,
      strokeRatio: props.closeStrokeRatio,
    })
  }

  onMounted(() => {
    updateIcon()

    if (isDev) {
      devPropsWatch<BaseClosePropsType>(
        props,
        () => {
          updateIcon()
        },
        { only: ['closeIcon', 'closeIconRatio', 'closeStrokeRatio'] },
      )
    }
  })

  return {
    closeEl,
    closeIconName,
  }
}
