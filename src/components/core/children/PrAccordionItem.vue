<script setup lang="ts">
import { accordionItemClasses } from '@/scripts/util/classes'
import { type AccordionItemPropsType, accordionItemDefaults } from '@u/props'

/**
 * PrAccordionItem
 * Child component of: PrAccordion.
 * will create the parent accordion item for PrAccordionTitle and
 * PrAccordionContent component.
 * ========================================================================
 * */

/**
 * Props
 *
 * Component Props:
 * tag?: 'ul' | 'div'
 *
 * Class Props:
 * active?: boolean
 * disabled?: boolean
 *
 * Defaults:
 * tag: 'li'
 * ========================================================================
 */

const props = withDefaults(defineProps<AccordionItemPropsType>(), accordionItemDefaults)

/**
 * CSS Classes:
 * uk-open | uk-accordion-item-disabled
 * ========================================================================
 */

const accordionClass = accordionItemClasses(props)
</script>

<template>
  <component :is="tag" :class="accordionClass">
    <slot />
  </component>
</template>
