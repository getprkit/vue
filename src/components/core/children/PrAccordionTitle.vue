<script setup lang="ts">
import { accordionTitleDefaults, type AccordionTitlePropsType } from '@u/props'
import { useComponentIcon } from '@cc/useComponentIcon.ts'
import { getAccordionIcon } from '@u/util.ts'

/**
 * PrAccordionTitle
 * Child component of: PrAccordion | PrAccordionItem.
 * will create the title section for accordion item titles.
 * ========================================================================
 * */

/**
 * Props
 *
 * Class Props:
 * icon?: default | plus | chevron | circle | false | string(customIcon | ex: icon-fa-duotone-plus)
 * iconRatio?: number
 * strokeRatio?: number
 *
 * Defaults:
 * icon: 'default'
 * iconRatio: 0.7
 * ========================================================================
 */

const props = withDefaults(defineProps<AccordionTitlePropsType>(), accordionTitleDefaults)

/**
 * Icons:
 * default | plus | chevron | circle | false | string(customIcon | ex: icon-fa-duotone-plus)
 * ========================================================================
 */

const { iconName } = useComponentIcon(props, getAccordionIcon)

/**
 * CSS Classes:
 * uk-accordion-title | pr-accordion-icon | uk-accordion-icon
 * ========================================================================
 */
</script>

<template>
  <a class="uk-accordion-title" href="">
    <slot />
    <span v-if="iconName" class="pr-accordion-icon uk-accordion-icon" ref="iconEl" />
  </a>
</template>
