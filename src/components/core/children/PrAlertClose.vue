<script setup lang="ts">
import { devComputed } from '@u/env.ts'
import { type AlertClosePropsType, alertCloseDefaults } from '@u/props'
import { alertCloseClasses } from '@u/classes'
import { useComponentClose } from '@cc/useComponentClose.ts'

/**
 * PrAlertClose
 * Child component of: PrAlert
 * will create the close button/icon section for alert component.
 * ========================================================================
 * */

/**
 * Props:
 *
 * Close Props:
 * close?: boolean
 * closeIcon?: boolean | string(customIconName | ex: icon-fa-duotone-plus)
 * closeIconRatio?: number
 * closeStrokeRatio?: number
 * closeText?: string
 *
 * Class Props:
 * closeVariant?: 'default' | 'pill' | 'pill-hover' | 'pill-solid'
 * closeCircle?: boolean
 * closePosition?: 'default' | 'top' |'corner' | 'end'
 *
 * Defaults:
 * close: true
 * closeIcon: 'component-default-alert-close'
 * closeIconRatio: 0.5
 * ========================================================================
 */

const props = withDefaults(defineProps<AlertClosePropsType>(), alertCloseDefaults)

/**
 * CSS Classes:
 * uk-alert-close-pill | uk-alert-close-pill-hover | uk-alert-close-pill-solid
 * uk-alert-close-circle | uk-alert-close-top uk-alert-close-corner
 * uk-alert-close-end | uk-alert-close
 * ========================================================================
 */

const alertCloseClass = devComputed(() => alertCloseClasses(props))

/**
 * Close:
 * Default Icon: component-default-alert-close
 * ========================================================================
 */

useComponentClose(props)
</script>

<template>
  <a v-if="close" class="uk-alert-close" :class="alertCloseClass" href="" ref="closeEl"><slot /></a>
</template>
