<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { isDev, devComputed, devPropsWatch } from '@u/env.ts'
import { type AccordionPropsType, accordionDefaults } from '@u/props'
import { type AccordionEmitsType, accordionEmits } from '@u/emits.ts'
import { accordion, getAccordionIcon } from '@u/util'
import { useComponentEmit } from '@cc/useComponentEmit.ts'
import { useComponentIcon } from '@cc/useComponentIcon.ts'
import { accordionClasses } from '@u/classes'

/**
 * PrComponent
 * Descriptions, Styles and main states
 * ========================================================================
 * */

/**
 * Props
 *
 * UIKit JavaScript Component props:
 *
 *
 * Icon Props:
 * icon: icon-types | string(customIconName | ex: icon-fa-duotone-plus)
 * iconRatio: number
 * strokeRatio: number
 *
 *
 * Class Props:
 *
 *
 * Component Props:
 * apiRef?: ApiRef<AccordionApi>
 *
 *
 * Defaults:
 *
 * ========================================================================
 */

// If component has no default props
// const props = defineProps<AccordionPropsType>()

const props = withDefaults(defineProps<AccordionPropsType>(), accordionDefaults)

/**
 * Component Template Refs:
 * el
 * ========================================================================
 */

const el = useTemplateRef<HTMLElement>('el')

/**
 * Emits:
 * emits: ...UIKit JavaScript Component Events
 * types: (e: 'emit', event: Event): void | (e: 'emit', event: Event, ...additional-args): void
 * ========================================================================
 */

// If component has UIKit JavaScript events:
// const emit = defineEmits<AccordionEmitsType>()

// const emitHandler = (event: Event) => {
//   emit(event.type as any, event, selected.value)
// }

// useComponentEmit(el, accordionEmits, emitHandler)

/**
 * CSS Classes:
 * ...Defined CSS UIKit and PrKit Classes for main element of component.
 * Child CSS classes:
 * ...Define CSS UIKit and PrKit Classes for child elements of component.
 * ========================================================================
 */

const accordionClass = devComputed(() => accordionClasses(props))

/**
 * Icons:
 * icon-types | string(customIconName | ex: icon-fa-duotone-plus)
 * ========================================================================
 */

// If component contains multiple icon and has conditional rendering and custom icon type
// const { iconName } = useComponentIcon(props, getAccordionIconName)

// If component contains icon and get name directly from props without any condition and custom icon type
// const xIconName = () => props.icon
// const { iconName } = useComponentIcon(props, xIconName)

/**
 * Component-specific Logic:
 * ...All other consts, functions, computed values, etc.
 * ========================================================================
 */

onMounted(() => {
  // If there is UIKit JavaScript Component
  // accordion(el.value, props)
  //
  // if (isDev) {
  //   devPropsWatch(
  //     props,
  //     () => {
  //       accordion(el.value, props)
  //     },
  //     { exclude: ['modelValue', 'refElement'] },
  //   )
  // }
})
</script>

<template>
  <div :class="accordionClass">
    <!-- If component contains icon <span v-if="iconName" ref="iconEl" /> -->
  </div>
</template>
