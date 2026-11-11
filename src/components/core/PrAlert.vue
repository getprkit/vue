<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { isDev, devComputed, devPropsWatch } from '@u/env.ts'
import { type AlertPropsType, alertDefaults } from '@u/props'
import { type AlertEmitsType, alertEmits } from '@u/emits.ts'
import { alert, getAlertIcon } from '@u/util'
import { useComponentEmit } from '@cc/useComponentEmit.ts'
import { alertCloseClasses, alertClasses } from '@u/classes'
import { useComponentIcon } from '@cc/useComponentIcon.ts'
import { useComponentClose } from '@cc/useComponentClose.ts'

/**
 * PrAlert
 * Display default, muted, primary, info, success, warning and error messages.
 * ========================================================================
 * */

/**
 * Props:
 *
 * UIKit Component props (options):
 * animation?: boolean | string
 * duration?: number
 * selClose?: string
 *
 * Icon Props:
 * icon?: boolean | default | muted | primary | success | warning | danger
 *        string(customIconName | ex: icon-fa-duotone-plus)
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
 * variant?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
 * bordered?: boolean
 * iconBox?: boolean
 * closeVariant?: 'default' | 'pill' | 'pill-hover' | 'pill-solid'
 * closeCircle?: boolean
 * closePosition?: 'default' | 'top' |'corner' | 'end'
 *
 * Component Props:
 * apiRef?: ApiRef<AccordionApi>
 *
 * Defaults:
 * variant: 'muted'
 * close: true
 * closeIcon: 'component-default-alert-close'
 * closeIconRatio: 0.5
 * iconRatio: 1
 * ========================================================================
 */

const props = withDefaults(defineProps<AlertPropsType>(), alertDefaults)

/**
 * Component Template Refs
 * el
 * ========================================================================
 */

const el = useTemplateRef<HTMLElement>('el')

/**
 * Emits:
 * emits: beforehide | hide
 * types: emit(e: 'emit', event: Event): void
 * ========================================================================
 */

const emit = defineEmits<AlertEmitsType>()

const emitHandler = (event: Event) => {
  emit(event.type as never, event)
}

useComponentEmit(el, alertEmits, emitHandler)

/**
 * CSS Classes:
 * uk-alert-default | uk-alert-muted | uk-alert-primary | uk-alert-success
 * uk-alert-warning | uk-alert-danger | uk-alert-bordered | uk-alert-icon-box
 * Child CSS classes:
 * uk-alert-icon | uk-alert-close | uk-alert-close-pill | uk-alert-close-pill-hover
 * uk-alert-close-pill-solid | uk-alert-close-circle | uk-alert-close-top
 * uk-alert-close-corner | uk-alert-close-end
 * ========================================================================
 */

const alertCloseClass = devComputed(() => alertCloseClasses(props))
const alertClass = devComputed(() => alertClasses(props))

/**
 * Icons:
 * boolean | default | muted | primary | success | warning | danger
 * string(customIconName | ex: icon-fa-duotone-plus)
 * default: false
 * ========================================================================
 */

const { iconName } = useComponentIcon(props, getAlertIcon, 'variant')

/**
 * Close:
 * Default Icon: component-default-alert-close
 * ========================================================================
 */

useComponentClose(props)

/**
 * Component-specific Logic:
 * alert(): UIKit JavaScript Component
 * alertApi & apiRef: For accessing alert api from parent.
 * devPropsWatch(): watch props change and update the JavaScript Component and icon changes
 * ========================================================================
 */

onMounted(() => {
  const alertApi = alert(el.value, props)
  props.apiRef?.(alertApi)

  if (isDev) {
    devPropsWatch(
      props,
      () => {
        alert(el.value, props)
      },
      { exclude: ['apiRef'] },
    )
  }
})
</script>

<template>
  <div class="uk-alert" :class="alertClass" ref="el">
    <a v-if="close" class="uk-alert-close" :class="alertCloseClass" href="" ref="closeEl">
      {{ closeText }}
    </a>
    <span v-if="iconName" class="uk-alert-icon" ref="iconEl" />
    <slot />
  </div>
</template>
