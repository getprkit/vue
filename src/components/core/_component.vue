<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { isDev, devComputed, devPropsWatch } from '@u/env.ts'
import { type AccordionPropsType, accordionDefaults } from '@u/props'
import { type AccordionEmitsType, accordionEmits } from '@u/emits.ts'
import { accordion, getAccordionIcon } from '@u/util'
import { useComponentEmit } from '@cc/useComponentEmit.ts'
import { useComponentIcon } from '@cc/useComponentIcon.ts'
// import { useComponentClose } from '@cc/useComponentClose.ts'
import { accordionClasses } from '@u/classes'

/**
 * PrAccordion
 * Create a list of items that can be shown individually by clicking an item's header.
 * includes default (UIKit), line and hover style, default (UIKit), chevron, plus and
 * circle icon styles, and an item disabling property. can render with array list and
 * child slot. also can compile as ul-li tang or div-div tag.
 * ========================================================================
 * */

/**
 * Props:
 *
 * UIKit Component props (options):
 * animation?: boolean
 * content?: string
 *
 * Icon Props:
 * icon?: default | plus | chevron | circle | false | string(customIconName | ex: icon-fa-duotone-plus)
 * iconRatio?: number
 * strokeRatio?: number
 *
 * Close Props:
 * close?: boolean
 * closeIcon?: boolean | string(customIconName | ex: icon-fa-duotone-plus)
 * closeIconRatio?: number
 * closeStrokeRatio?: number
 * closeText?: string
 *
 * Class Props:
 * variant?: 'default' | 'hover' | 'line'
 * closeVariant?: 'default' | 'pill' | 'pill-hover' | 'pill-solid'
 * closeCircle?: boolean
 * closePosition?: 'default' | 'top' |'corner' | 'end'
 *
 * Component Props:
 * apiRef?: ApiRef<AccordionApi>
 * tag?: 'ul' | 'div'
 * list?: Array<{value?: unknown, title: string, content: string, disabled?: boolean}>
 *
 * Defaults:
 * tag: 'ul'
 * variant: 'default'
 * icon: 'default'
 * iconRatio: 0.7
 * ========================================================================
 */

const props = withDefaults(defineProps<AccordionPropsType>(), accordionDefaults)

// If component has no default props
// const props = defineProps<AccordionPropsType>()

/**
 * Component Template Refs:
 * el
 * ========================================================================
 */

// If component has template ref
const el = useTemplateRef<HTMLElement>('el')

/**
 * Emits:
 * emits: beforeshow | show | shown | beforehide | hide | hidden
 * types: emit(e: 'emit', event: Event, value: unknown): void | (e: 'emit', event: Event): void
 * ========================================================================
 */

const emitHandler = (event: Event) => {
  emit(event.type as never, event, 'if there is additional args')
}

// If component has UIKit JavaScript events:
const emit = defineEmits<AccordionEmitsType>()

useComponentEmit(el, accordionEmits, emitHandler)

/**
 * CSS Classes:
 * uk-accordion-default | uk-accordion-hover | uk-accordion-line
 * Child CSS classes:
 * uk-accordion-title | uk-accordion-content | uk-accordion-icon | uk-accordion-icon | uk-accordion-item-disabled
 * ========================================================================
 */

const accordionClass = devComputed(() => accordionClasses(props))

/**
 * Icons:
 * default | plus | chevron | circle | false | string(customIconName | ex: icon-fa-duotone-plus)
 * Default: ....default icon
 * ========================================================================
 */

// If component contains multiple icon and has conditional rendering and custom icon type
const { iconName } = useComponentIcon(props, getAccordionIcon)

/**
 * Close:
 * Default Icon: component-default-alert-close
 * ========================================================================
 */

// If component contains close
// const { closeIconName } = useComponentClose(props)

/**
 * Component-specific Logic:
 * ...All other consts, functions, computed values, etc.
 * itemTag: For set component main and child tag.
 * selected/getActive(): if accordion use array list to render items set selected
 * value of item onClick.
 * accordion(): UIKit JavaScript Component
 * accordionApi & apiRef: For accessing accordion api from parent.
 * devPropsWatch(): watch props change and update the JavaScript Component and icon changes
 * ========================================================================
 */

// ...All other consts, functions, computed values, etc. goes here.

onMounted(() => {
  // If there is UIKit JavaScript Component
  const accordionApi = accordion(el.value, props)
  props.apiRef?.(accordionApi)

  if (isDev) {
    devPropsWatch(
      props,
      () => {
        const accordionApi = accordion(el.value, props)
        props.apiRef?.(accordionApi)
      },
      { exclude: ['modelValue', 'apiRef'] },
    )
  }
})
</script>

<template>
  <div :class="accordionClass" ref="el">
    <!-- If component contains close -->
    <!-- <a v-if="close && closeIconName" class="uk-alert-close" href="" ref="closeEl" /> -->
    <!-- If component contains icon -->
    <span v-if="iconName" class="uk-accordion-icon uk-accordion-icon" ref="iconEl" />
    <slot />
  </div>
</template>
