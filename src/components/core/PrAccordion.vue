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
 * PrAccordion
 * Create a list of items that can be shown individually by clicking an item's header.
 * includes default (UIKit), line and hover style, default (UIKit), chevron, plus and
 * circle icon styles, and an item disabling property. can render with array list and
 * child slot. also can compile as ul-li tang or div-div tag.
 *
 * TODO: Check for is useful to add icon-text property to render text in icon placement.
 * ========================================================================
 *
 * The PrKit component(here as accordion) structure is based on UIKit component structure + some defined
 * style/ide from PrKit to make accordion component more usable. we explain the component and styles and
 * other property in the first comment of component.
 *
 * We follow this structure(here as accordion) for most component.
 *
 * If components which has JavaScript UIKit Component like Accordion:
 * We define [componentName](el.value, props) e.g. accordion(el.value, { ...props, active: getActive() }))
 * and useComponentEmit(with const accordionEmits in @u/emits).
 *
 * For UIKit JavaScript Component:
 * we need to define apiRef prop for accessing the current componentApi.
 *
 * For component which contains icon:
 * we define getAccordionIcon(getXIcon) and useComponentIcon.
 *
 * For component that has some of UIKit classes + some of PrKit classes:
 * we use accordionClasses(xClasses).
 *
 * For defining props:
 * we use AccordionPropsType(xPropsType) and accordionDefaults(xDefaults).
 *
 * For just run a code in development mode:
 * we use isDev, it will be treeshaking bye VITE and will remove in production build.
 *
 * For improving the performance in production build:
 * we use devComputed so values are reactive in development but remain non-reactive
 * in production build (ex: classes, icon name and icon ratio). we will not use devComputed
 * in components which classes need to be reactive.
 * FIXME: this is because the vue not update the component when we changing
 *        the props that related to component classes, so we add this part to improving the
 *        development experience, this way must remove in future with vue update or finding a
 *        new solution. maybe in feature plan classes need to be reactive with sate of props so
 *        we we need to remove it but we don't need it now.
 *
 * For improving development experience and development-time behavior:
 * we use devPropsWatch to watch some props change in development but
 * not in production build. must be surrounded with if(isDev).
 *
 * So final import for components is like:
 * isDev: imported when The component include section of code that will be run just in development
 * mode and will be treeshaking in production build.
 *
 * devComputed: imported when a value should be reactive in development mode but non-reactive
 * in the production build.
 * FIXME: will change in future with finding new solution or vue/vite release an update
 *        to fix this updating the script part of component. maybe in feature plan classes
 *        need to be reactive with sate of props and we need to remove devComputed from
 *        xClasses but we don't need it now.
 *
 * devPropsWatch: imported when props will watch changes in development mode but not in production
 * build and for treeshaking must be surrounded with if(isDev). Do not use devPropsWatch for
 * behavior that is required in production.
 *
 * AccordionPropsType(xPropsType): imported when the component contains props.
 *
 * accordionDefaults(xDefaults): imported when the component has default props.
 *
 * [componentName](el, props) e.g. accordion(el, props): imported when the component contains UIKit JavaScript Component.
 *
 * useComponentEmit|AccordionEmitsType(xEmitsType)|accordionEmits(xEmits):
 * useComponentEmit imported when UIKit JavaScript events need to be forwarded as
 * Vue emits, AccordionEmitsType(xEmitsType) defines the TypeScript signatures for those Vue
 * emits and accordionEmits(xEmits) contains the runtime list of UIKit JavaScript events.
 *
 * useComponentIcon: imported when component contains icon.
 *
 * getAccordionIcon(getXIcon): imported when component has multiple style for icon or
 * conditional icon compile.
 *
 * accordionClasses(xClasses): imported when component contains multiple styles and other things
 * that connected to CSS class names.
 *
 * We try our best to get the best performance and must lean production build and keep our code
 * clean and reusable. our goal is also keep components to have the best performance and lean
 * production build.
 *
 * ========================================================================
 * */

/**
 * Props:
 *
 * UIKit Component props (options):
 * active?: number
 * animation?: boolean
 * collapsible?: boolean
 * content?: string
 * duration?: number
 * multiple?: boolean
 * targets?: string
 * toggle?: string
 * transition?: string
 * offset?: number
 *
 * Icon Props:
 * icon: default | plus | chevron | circle | false | string(customIconName | ex: icon-fa-duotone-plus)
 * iconRatio: number
 * strokeRatio: number
 *
 * Class Props:
 * variant?: 'default' | 'hover' | 'line'
 * bordered?: boolean
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
 * collapsible: true
 * ========================================================================
 *
 * We define props for components with this structure:
 * const props = withDefaults(defineProps<xPropsType>(), xDefaults)
 *
 * xPropsType contains:
 * 1. UIKit JavaScript Component Props (if exists). structure: UIKitXOptions
 * 2. CSS Classes of components (UIKit classes and PrKit Classes for that component). structure: xClassType
 * 3. Component-specific props used for conditional rendering and other component logic. structure:
 * interface xPropsType extends
 *   UIkitXOptions, xClassType, BaseIconPropsType {
 *   ...component-specific-props
 * }
 * 4. Icon props of component (if component contain icons). structure: BaseIconPropsType
 *
 * xPropsType will extend the types from UIKitXOptions and xClassType. It should also avoid type
 * duplication when types are shared. for example AccordionPropsType also extend
 * AccordionTitlePropsType because it is used by PrAccordionTitle.vue component props.
 *
 * If we want access the component api from parent we define and use apiRef prop. Most usage is when we
 * have UIKit JavaScript Component, and we want to access the JavaScript Component from parent
 * to use UIKit methods of component or any existing component api. The process is first we define
 * apiRef prop
 * like: apiRef?: ApiRef<AccordionApi>
 * then use it in component when calling UIkit JavaScript Component in onMounted like:
 * onMounted(() => {
 *   const accordionApi = accordion(el.value, { ...props, active: getActive() })
 *   props.apiRef?.(accordionApi)
 * })
 * at last we can use it like:
 * import type { AccordionApi } from '@u/types'
 * const accordionApi = ref<AccordionApi>()
 * <PrX :api-ref="(api) => (AccordionApi = api)" />
 *
 * the structure is:
 * props.ts
 * import type { XApi } from '@u/types.ts'
 * export interface xPropsType {
 *   apiRef?: ApiRef<XApi>
 * }
 * XApi are predefined so we just need to import them.
 *
 * PrComponent (main component):
 * onMounted(() => {
 *   const xApi = x(el.value, props)
 *   props.apiRef?.(xApi)
 * })
 *
 * using:
 * import type { XApi } from '@u/types'
 * const xApi = ref<XApi>()
 * <PrX :api-ref="(api) => (xApi = api)" />
 *
 * If component has additional arguments that need to be merged with option we use xApi like this:
 * const xApi = x(el.value, { ...props, ...additional-args })
 *
 * Note that near to all of UIkit Javascript Component will be run in onMounted so we usually
 * use UIkit JavaScript Component and apiRef in onMounted.
 *
 * If it's not too important to access the UIkit JavaScript Component from parent we will keep
 * our component clean and more lean, and we will not define prop apiRef and const xApi. so we
 * will not define props apiRef and will not use xApi and props.apiRef?.(xApi) in onMounted.
 *
 * For components that use UIKit JavaScript Options in their script or template, for accessing
 * the default value of UIKit Component Option we need to define it in xDefaults. for
 * example: accordion need to access collapsible value in the template like:
 * ...(selected = selected === item.value && collapsible ? null : item.value) so we need to
 * define collapse default value in accordionDefaults to access its value in accordion script
 * or template. it will always return undefined if we not define default value and will get
 * default value from UIKit when we want to set the UIKit JavaScript Component with
 * [componentName](el, props) e.g. accordion(el, props).
 *
 * Note that we are when we are using [componentName](el, props) in PrComponent we are passing
 * all props to UIkit JavaScript Component, even those that not include in the UIkit JavaScript
 * Component, so the UIkit JavaScript Component will hold all props data in to the JavaScript
 * component, its bad for memory, or maybe other things. For fixing that we need to specify the
 * which options pass to the UIkit JavaScript Component like:
 * [componentName](el, { option1: props.option1, option2: props.option2, }) but we are not
 * doing this right now. So we need to check in future to fix it or its not to costly.
 * TODO: Check if we need to send exactly options that needed for UIkit JavaScript Component
 *       or not. if we need to specify the exact options we can also remove the state.js
 *       feature from forked UIkit library:
 *       prkit/uikit#prkit: https://github.com/prfardin/uikit/tree/feature/normalize-undefined-data
 *
 * For components that not contains defaults we will not define xDefaults and structure is:
 * const props = defineProps<xPropsType>()
 *
 * ========================================================================
 */

const props = withDefaults(defineProps<AccordionPropsType>(), accordionDefaults)

/**
 * Component Template Refs:
 * el
 * ========================================================================
 *
 * If we have operation on main element component or other element of component we define
 * them here. Most of time for component that contains UIkit JavaScript Component we need
 * to access to main element of component and pass it to UIkit JavaScript Component
 * function. So for accessing the main element of component template ref el and pass it to
 * UIkit JavaScript Component function.
 * for example:
 * const el = useTemplateRef<HTMLElement>('el')
 * onMounted(() => {
 *   accordion(el.value, { ...props, active: getActive() })
 * })
 * <component :is="tag" ref="el">....</component>
 *
 * Structure:
 * const el = useTemplateRef<HTMLElement>('el')
 * onMounted(() => {
 *   accordion(el.value, props || { props, ....additional-args })
 * })
 * <tag-of-html-that-javascript-component-will-be-applied-on ref="el">....</tag>
 *
 * template ref may be use for other things so if we don't need it in nowhere we will
 * not using this section.
 *
 * ========================================================================
 */

const el = useTemplateRef<HTMLElement>('el')

/**
 * Emits:
 * emits: beforeshow | show | shown | beforehide | hide | hidden
 * types: emit(e: 'emit', event: Event, value: unknown): void
 * ========================================================================
 *
 * We Define emits for components with this structure:
 * PrComponent (main component):
 * const emit = defineEmits<xEmitsType>()
 * const emitHandler = (event: Event) => {
 *   emit(event.type as any, event, ...if any other argument defined)
 * }
 * useComponentEmit(el, xEmits, emitHandler)
 *
 * emits.ts:
 * const xEmits = [ emits1, emits2, .... ] as const
 * interface xEmitsType {
 *   emits1: DefaultEmitArgs
 *   emits2: DefaultEmitArgs
 *   ....
 * }
 * for component that include additional args we define and use xEmitArgs:
 * type xEmitArgs = [...DefaultEmitArgs, ....additional-args]
 * interface xEmitsType {
 *   emits1: xEmitArgs
 *   emits2: xEmitArgs
 *   ....
 * }
 *
 * If each emits contains its own args its better to define the args in front of each
 * custom emit key.
 *
 * xEmits contains all UIKit JavaScript Component events that defined as vue emits type in emits.ts
 * for example accordionEmits is like:
 * const accordionEmits = [ 'beforeshow', 'show', 'shown', 'beforehide', 'hide', 'hidden' ] as const
 *
 * xEmitsType is the vue emits defined as pure type annotations. for example:
 * type AccordionEmitArgs = [...DefaultEmitArgs, value: unknown]
 * interface AccordionEmitsType {
 *   beforeshow: AccordionEmitArgs
 *   show: AccordionEmitArgs
 *   shown: AccordionEmitArgs
 *   beforehide: AccordionEmitArgs
 *   hide: AccordionEmitArgs
 *   hidden: AccordionEmitArgs
 * }
 *
 * emitHandler is same for most components but if emits pass additional argument
 * we must add it to emit handled also. for example accordion also pass additional arg in
 * emit:
 * const emitHandler = (event: Event) => {
 *   emit(event.type as any, event, ...additional arguments goes here)
 * }
 *
 * For components that not contains UIKit JavaScript Components we will not use this structure,
 * and we will use the simple way of vue for defining emit. most time we will not use emit if
 * there is no event.
 *
 * ========================================================================
 */

const emit = defineEmits<AccordionEmitsType>()

const emitHandler = (event: Event) => {
  emit(event.type as never, event, selected.value)
}

useComponentEmit(el, accordionEmits, emitHandler)

/**
 * CSS Classes:
 * uk-accordion-default | uk-accordion-hover | uk-accordion-line
 * Child CSS classes:
 * uk-accordion-title | uk-accordion-content | uk-accordion-icon | uk-accordion-icon | uk-accordion-item-disabled
 * ========================================================================
 *
 * We Define CSS classes for components if they have multiple classes with this structure:
 * const xClass = devComputed(() => xClasses(props))
 * <div|component :class="xClass">....</div|component>
 *
 * If component contains multiple appearance/style/mode that is connected to CSS classes like
 * accordion variant (default: uk-accordion-default | hover: uk-accordion-hover | line: uk-accordion-line)
 * for must lean production build and best performance we will use this way.
 *
 * The xClasses function receive props that point to xClassType and for each of xClassType key we
 * must define x[xClassTypeKey]Map. for example accordionClassType is like:
 * interface AccordionClassType {
 *   variant?: 'default' | 'hover' | 'line'
 * }
 *
 * const accordionVariantMap = {
 *   default: 'uk-accordion-default',
 *   hover: 'uk-accordion-hover',
 *   line: 'uk-accordion-line',
 * } as const
 *
 * function accordionClasses(props: AccordionClassType) {
 *   return accordionVariantMap[props.variant!]
 * }
 *
 * If component contains multiple xClassTypeKey the structure for component in classes.ts will be:
 * interface xClassType {
 *   class1?: value1 | value2
 *   class2?: value1 | value2
 *   ...
 * }
 *
 * const xClass1Map = {
 *   value1: 'css-class-1',
 *   value2: 'css-class-2',
 *   ...
 * } as const
 *
 * xClass2Map = {
 *   value1: 'css-class-1',
 *   value2: 'css-class-2',
 *   ...
 * } as const
 *
 * function xClasses(props: xClassType) {
 *   return [
 *     xClass1Map[props.class1!],
 *     xClass2Map[props.class2!],
 *     ...
 *   ]
 * }
 *
 * We also use devComputed because we want props that converts to class name just be reactive in
 * development mod, and it will be static at production build.
 * FIXME: Maybe we need to remove the devComputed in future to all classes be reactive and can be
 *        change with sate of props or something else, but we don't need it now.
 *
 * xPropsType extends xClassType so class-related props are available directly through props.
 *
 * If there is no classes for component we will not use this section for component.
 *
 * ========================================================================
 */

const accordionClass = devComputed(() => accordionClasses(props))

/**
 * Icons:
 * default | plus | chevron | circle | false | string(customIconName | ex: icon-fa-duotone-plus)
 * Default: default
 * ========================================================================
 *
 * We Define icons for components with this structure:
 * const { iconName } = useComponentIcon(props, getXIcon, iconKey, refEl = 'iconEl')
 * <span v-if="iconName" ref="iconEl" />
 *
 * useComponentIcon will receive 4 argument:
 * 1. props: it will use BaseIconPropsType: icon, iconRatio and strokeRatio defined
 * in props to access props in icon render function.
 * structure of defining icon props is:
 * import type { xIconType } from '@u/util.ts'
 * type xIconPropsType = BaseIconPropsType<xIconType>
 * interface xPropsType extends xIconPropsType
 *
 * BaseIconPropsType itself is: { icon?: DefaultIcon, iconRatio?: number, strokeRatio?: number }
 * DefaultIcon is: IconName | false | undefined
 * IconName also will help us with icon style types.
 *
 * 2. getXIcon: its conditional rendering for structure of icon name. sometimes needed because
 * we want to define our icon style for component, and sometimes we just pass the props default
 * icon name or props defined icon name. if we have multiple style/type or condition rendering icon name we need
 * to define getXIcon. structure of getXIcon is like:
 * const xIconMap = { style1: 'component-default-x-style1', style2: 'component-default-x-style2', ... } as const
 * type xIconType = DefaultIcon<keyof typeof xIconMap> || or custom type if we not using default styles
 * export function getXIcon(icon: xIconType) {
 *  ...any additional conditions
 *   return xIconMap[icon as keyof typeof xIconMap] ?? icon
 * }
 * most component will follow the same role as getXIcon if they have multiple icon
 * style/type or conditional icon render.
 *
 * 3. iconKey: when you want select icon based on another props you will set icon key
 * equal to that prop and set the icon prop to true, then you need to specify a condition
 * in getXIcon function. for example alert icon return icon from variant prop of alert so defined
 * process for alert will be:
 * PrAlert.vue:
 * const { iconName } = useComponentIcon(props, getAlertIcon, 'variant')
 *
 * util.ts:
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
 *
 * then for usage: <PrAlert variant="muted" icon>....</PrAlert>
 *
 * 4. if you want to change iconEl you need to specify this argument.
 *
 * if components dos'nt have multiple icon style/type or conditional icon rendering they will use
 * this structure (best for performance - Use the direct resolver for simple icons):
 * in props.ts:
 * interface xPropsType extends BaseIconPropsType
 *
 * in PrComponent (main component):
 * const getXIcon = () => props.icon
 * const { iconName } = useComponentIcon(props, getXIcon)
 * <span v-if="iconName" ref="iconEl" />
 *
 * Use getXIconName only when the component needs icon mapping or conditional icon resolution.
 *
 * If we want to addition compile and props or prevent some controls from icon part of component
 * we can define new type for component props with adding it directly in to ComponentNamePropsType:
 * structure:
 * type xPropsType { icon?: xIconType || DefaultIcon}
 * so we can not change icon ratio and stroke ratio with props (limited).
 *
 * If component contain icons we use the one of the structure above. otherwise, this section
 * is not needed.
 *
 * ========================================================================
 */

const { iconName } = useComponentIcon(props, getAccordionIcon)

/**
 * Component-specific Logic:
 * itemTag: For set component main and child tag.
 * selected/getActive(): if accordion use array list to render items set selected
 * value of item onClick.
 * accordion(): UIKit JavaScript Component
 * accordionApi & apiRef: For accessing accordion api from parent.
 * devPropsWatch(): watch props change and update the JavaScript Component and icon changes
 *
 * TODO: Change the v-model return value from single item to multiple item and change the v-model
 *       value with the state of accordion not onClick.
 * ========================================================================
 *
 * If component use UIKit JavaScript Components we initialize the component in onMounted
 * with this structure:
 * onMounted(() => {
 *   const getComponentName = [componentName](el.value, props)
 *   props.apiRef?.(getComponentName)
 * })
 * for components that need to be change props parameters we need unmute props
 * before sending to JavaScript Component:
 * onMounted(() => {
 *   const getComponentName = [componentName](el.value, {props, ....additional-args})
 *   props.apiRef?.(getComponentName)
 * })
 *
 * For components that not need to be accessing component api from parent we will remove
 * const getComponentName and props.apiRef?.(getComponentName)
 *
 * The [componentName] is function which defined in util.ts and will render UIKit JavaScript Component
 * into element (like UIKit HTML attribute uk-componentName).
 *
 * The structure of [componentName] function is (util.ts):
 * import { componentName as uikitComponentName } from 'uikit'
 * export const [componentName] = uikitComponentName
 * for JavaScript component with condition rendering on arguments before accessing
 * the UIkit JavaScript Component we will use this structure:
 * export function [componentName](el: ElementTarget, options: xPropsType) {
 *   return uikitComponentName(el, { ...options, ....additional-args })
 * }
 *
 * Note that when we are using api-ref with component, if component unmounted with parent
 * component xApi ref also will be clean and destroyed but if component unmount and parent
 * component exists we must also clean xApi ref to not hold the component api data. For that
 * we can clean xApi ref like: xApi.value = null
 * TODO: Check if we need to always clean apiRef in components when on beforeUnMounted or not.
 *       We need to work to see we get bug or not.
 *
 * When we pass props directly in UIkit JavaScript Component UIkit will remove the
 * props with undefined value but props is readonly and cannot be deleted so we fork
 * the UIkit library and add feature with changing the state.js to broke the reactivity
 * in safe mode and delete the undefined props value as well. forked library:
 * prkit/uikit#prkit: https://github.com/prfardin/uikit/tree/feature/normalize-undefined-data
 *
 * We use devPropsWatch to watch props change and recompile the UIKit JavaScript Component.
 * the structure of devPropsWatch is:
 * if (isDev) {
 *   devPropsWatch(
 *     props,
 *     () => {
 *       const getComponentName = [componentName](el.value, props)
 *       or with additional arguments:
 *       const getComponentName = [componentName](el.value, {props, ....additional-args})
 *       or when component don't need accessing component api from parent:
 *       [componentName](el.value, props) || [componentName](el.value, {props, ....additional-args})
 *     },
 *     { exclude: [...do not recompile component when these items changed] },
 *     { only: [...update component when just these items changed] },
 *   )
 * }
 *
 * Why do we use devPropsWatch? Some prop changes, such as the active accordion item, are not
 * automatically synchronized with the initialized UIKit component, so we recompile the component
 * when those props change during development. it will just happened in development mode
 * (because of isDev) and we don't need it at production build.
 *
 *
 * For most UIKit JavaScript Component we will use [componentName](el, props) and devPropsWatch
 * but for rest of them which not include UIkit JavaScript Component we will prevent to
 * using these methods.
 *
 * The remaining logic is component-specific and should not be treated as a reusable pattern for
 * other components.
 *
 * ========================================================================
 */

const itemTag = props.tag === 'ul' ? 'li' : 'div'

const selected = defineModel<unknown>()

function getActive() {
  return selected.value != null && props.list
    ? props.list.findIndex((item) => item.value == selected.value)
    : props.active
}

onMounted(() => {
  const accordionApi = accordion(el.value, { ...props, active: getActive() })
  props.apiRef?.(accordionApi)

  if (isDev) {
    devPropsWatch(
      props,
      () => {
        const accordionApi = accordion(el.value, { ...props, active: getActive() })
        props.apiRef?.(accordionApi)
      },
      { exclude: ['modelValue', 'apiRef'] },
    )
  }
})
</script>

<template>
  <component :class="accordionClass" :is="tag" ref="el">
    <template v-if="list">
      <template v-for="(item, key) in list" :key>
        <component :is="itemTag" :class="{ 'uk-accordion-item-disabled': item.disabled }">
          <a
            class="uk-accordion-title"
            href=""
            @click="
              !item.disabled &&
              (selected = selected === item.value && collapsible ? null : item.value)
            "
          >
            {{ item.title }}
            <span v-if="iconName" class="uk-accordion-icon" ref="iconEl" />
          </a>
          <div class="uk-accordion-content">
            <p>{{ item.content }}</p>
          </div>
        </component>
      </template>
    </template>
    <slot v-else />
  </component>
</template>
