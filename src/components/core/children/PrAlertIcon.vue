<script setup lang="ts">
import { type AlertIconPropsType } from '@u/props'
import { getAlertIcon } from '@u/util'
import { useComponentIcon } from '@cc/useComponentIcon.ts'

/**
 * PrAlertClose
 * Child component of: PrAlert
 * will create the icon section for alert component.
 * ========================================================================
 * */

/**
 * Props:
 *
 * Icon Props:
 * icon?: boolean | default | muted | primary | success | warning | danger
 *        string(customIconName | ex: icon-fa-duotone-plus)
 * iconRatio?: number
 * strokeRatio?: number
 * ========================================================================
 */

const props = defineProps<AlertIconPropsType>()

/**
 * Icons:
 * boolean | default | muted | primary | success | warning | danger
 * string(customIconName | ex: icon-fa-duotone-plus)
 * default: false
 * ========================================================================
 */

const { iconName } = useComponentIcon(props, getAlertIcon)
</script>

<template>
  <span v-if="iconName" class="uk-alert-icon" ref="iconEl" />
</template>
