/**
 * UIKit JavaScript Components Types
 * ========================================================================
 *
 * We can't use the main UIKit types: @types/uikit as extends for
 * xPropsType in props.ts, and we don't know why.
 * instead we defined them here and use them as extend in
 * xPropsType in props.ts until we fix problems we define UIKit
 * types here and use them in props.ts as extends for xPropsType.
 *
 * TODO: Fix why we can't use UIKit define props directly: @types/uikit => DONE
 *       as extends for xPropsType in props.ts.
 *
 * When we are using UIKit JavaScript Components, they have methods, so if we want to
 * access and use methods we need to first access UIkit JavaScript Component. for this
 * First We define apiRef prop Second Use it in main component when calling UIkit
 * JavaScript Component in onMounted.
 * ex:
 * props.ts:
 * import type { AccordionApi } from '@u/types.ts'
 * export interface AccordionPropsType {
 *   apiRef?: ApiRef<AccordionApi>
 * }
 *
 * PrAccordion.vue (main component):
 * onMounted(() => {
 *   const getAccordion = accordion(el.value, { ...props, active: getActive() })
 *   props.apiRef?.(getAccordion)
 * })
 *
 * using:
 * import type { AccordionApi } from '@u/types'
 * const accordionApi = ref<AccordionApi>()
 * <PrAccordion :api-ref="(api) => (AccordionApi = api)" />
 *
 * AccordionApi are predefined from UIkit JavaScript Component, so we don't need to
 * defined them again.
 *
 * So near to all UIKit JavaScript Component Contains a prop named: apiRef with type ApiRef<AccordionApi>.
 *
 * apiRef prop will rended when defined in using component, so it will not access and hold any UIkit JavaScript
 * Component data until we call it when using component.
 *
 * Structure:
 * props.ts:
 * import type { XApi } from '@u/types.ts'
 * export interface XPropsType {
 *   apiRef?: ApiRef<XApi>
 * }
 *
 * PrComponent.vue (main component):
 * onMounted(() => {
 *   const getX = x(el.value, props || { ...props, ....additional-args})
 *   props.apiRef?.(getX)
 * })
 *
 * using:
 * import type { XApi } from '@u/types'
 * const xApi = ref<XApi>()
 * <PrX :api-ref="(api) => (XApi = api)" />
 *
 * For manually initialize a component we must first define templateRef for a node then
 * we will pas it to [componentName] function and the HTML/CSS part structure also will
 * define in doc pages and exist also in UIkit docs: https://getuikit.com/docs/introduction
 * structure:
 * import { x } from '@u/util.ts'
 * const xEl = useTemplateRef('xEl')
 * onMounted(() => {
 *   const xApi = x(xEl.value, { options } || 'primary-option')
 *   xApi.[methodName || api](....)
 * })
 * <element ref="xEl">....</element>
 *
 * If we want to access the initialized JavaScript component call the [componentName] function
 * without setting the option argument:
 * import { x } from '@u/util.ts'
 * onMounted(() => {
 *   const initializedApi = x(xEl.value)
 *   initializedApi.[methodName || api](....)
 * })
 * <initialized>....</initialized>
 *
 * There is other way to access the JavaScript Component Api and it is when using the PrX component
 * we can defined templateRef for PrX and access to the element then passing the element to [componentName]
 * function without any option to access it, Structure:
 * const accordionEl = useTemplateRef('accordionEl')
 * onMounted(() => {
 *   const xApi = x(accordionEl.value?.$el)
 *   xApi.[methodName || api](....)
 * })
 * Accordion to Using Root DOM Node In Vue: https://vuejs.org/api/component-instance.html#el for consistency
 * it is recommend to not use accordionEl.value?.$el for accessing the component element.
 *
 * We also define other types here.
 *
 * ========================================================================
 */

/**
 * Imports
 * ======================================================================== */

import type { MaybeRef, TemplateRef } from 'vue';
import type { IconStyles } from '@u/config'

/**
 * Generic|Custom Types
 * ======================================================================== */

// set UIkit JavaScript Component type in ComponentPropsType.
export type ApiRef<T> = (componentApi: T) => void

// for accepting UIkit JavaScript Component elements, will use in UIkit JavaScript Function and methods.
export type ElementTarget = object | HTMLElement | string | null;

// for UIkit.update function, there is no type for it, so we define our type
// null element will trigger document.body update, type also accept custom event with string
export type UpdateApi = (element?: ElementTarget, type?: string | Event) => void

/**
 * Icon Types
 * ======================================================================== */

// base icon types.
export type IconType = string | boolean | undefined

// for suggest available icon styles and also accept any string (for custom icons).
export type IconName = `icon-${IconStyles}-` | `component-${IconStyles}-` | (string & {})

// for component that include icons, will accept component added icons.
export type DefaultIcon<K extends string = never> = boolean | K | IconName | undefined

// base icon props type, for component which include icon
export interface BaseIconPropsType<T = DefaultIcon> {
  /** The icon selector, false to disable and boolean for select from another prop. */
  icon?: boolean | T
  /** The icon size ratio. */
  iconRatio?: number
  /** The icon stroke size ratio. */
  strokeRatio?: number
}

// base close props type, for component which include close
export interface BaseClosePropsType<T = DefaultIcon> {
  /** Whether the alert can be closed */
  close?: boolean
  /** The close icon selector, false to disable. */
  closeIcon?: T
  /** The icon size ratio. */
  closeIconRatio?: number
  /** The icon stroke size ratio. */
  closeStrokeRatio?: number
  /** Set text after close icon, if close icon be false, only text will shown */
  closeText?: string
}

/**
 * Composable Component Types
 * ======================================================================== */

// useComponentEmit
export type UseComponentEmit = (
  el: TemplateRef<HTMLElement>,
  componentEmits: readonly string[],
  handler: EventListener
 ) => void

// useComponentIcon
export type UseComponentIcon = <
  P extends BaseIconPropsType,
  K extends keyof P = never
>(
  props: P,
  getIcon: (icon: P['icon'], iconKey?: P[K]) => IconType,
  iconKey?: K,
  refEl?: string,
) => {
  iconEl: TemplateRef<HTMLElement>
  iconName: MaybeRef<IconType>
}

// useComponentClose
export type UseComponentClose = <
  P extends BaseClosePropsType
>(
  props: P,
  refEl?: string,
) => {
  closeEl: TemplateRef<HTMLElement>
  closeIconName: MaybeRef<IconType>
}


/**
 * UIKit Types
 * ======================================================================== */

import type {
  // UIkit component Api
  UIkitElementBase,
  UIkitAccordionElement,
  UIkitAlertElement,
  UIkitCountdownElement,
  UIkitDropElement,
  UIkitDropdownElement,
  UIkitLightboxElement,
  UIkitModalElement,
  UIkitNavElement,
  UIkitNotificationElement,
  UIkitOffcanvasElement,
  UIkitScrollElement,
  UIkitSliderElement,
  UIkitSlideshowElement,
  UIkitSvgElement,
  UIkitSwitcherElement,
  UIkitTabElement,
  UIkitToggleElement,
  UIkitTooltipElement,

  // UIkit component options
  UIkitAccordionOptions,
  UIkitAlertOptions,
  UIkitCountdownOptions,
  UIkitCoverOptions,
  UIkitDropOptions,
  UIkitDropdownOptions,
  UIkitDropnavOptions,
  UIkitFilterOptions,
  UIkitFormCustomOptions,
  UIkitGridOptions,
  UIkitHeightViewportOptions,
  UIkitHeightMatchOptions,
  UIkitHeightPlaceholderOptions,
  UIkitIconOptions,
  UIkitImgOptions,
  UIkitInverseOptions,
  UIkitLeaderOptions,
  UIkitLightboxOptions,
  UIkitMarginOptions,
  UIkitModalOptions,
  UIkitNavOptions,
  UIkitNavbarOptions,
  UIkitNotificationOptions,
  UIkitOffcanvasOptions,
  UIkitParallaxOptions,
  UIkitScrollOptions,
  UIkitScrollspyOptions,
  UIkitScrollspyNavOptions,
  UIkitSliderOptions,
  UIkitSlideshowOptions,
  UIkitSortableOptions,
  UIkitStickyOptions,
  UIkitSvgOptions,
  UIkitSwitcherOptions,
  UIkitTabOptions,
  UIkitToggleOptions,
  UIkitTooltipOptions,
  UIkitUploadOptions,
  UIkitVideoOptions,

  // UIkit component functions
  Icon,
} from 'prkit'

/** UIkit Component Methods */

// access the type of UIkit JavaScript Component Method for each UIkit JavaScript Component.
type ComponentMethod<M extends (...args: never[]) => unknown> = (
  el: ElementTarget,
  ...args: Parameters<M>
) => ReturnType<M>

type ComponentProp<P> = (el: ElementTarget) => P

// Accordion

/**
 * Toggles the content pane.
 * @param index Accordion pane to toggle. 0 based index.
 * @param animate Suppress opening animation by passing false.
 */
type MethodAccordionToggle = ComponentMethod<UIkitAccordionElement['toggle']>

// Alert

/** Closes and removes the Alert. */
type MethodAlertClose = ComponentMethod<UIkitAlertElement['close']>

// Countdown

/** Starts the countdown. */
type MethodCountdownStart = ComponentMethod<UIkitCountdownElement['start']>

/** Stops the countdown. */
type MethodCountdownStop = ComponentMethod<UIkitCountdownElement['stop']>

// Drop

/**
 * Hides the drop.
 * @param delay Delay hiding the drop.
 */
type MethodDropHide = ComponentMethod<UIkitDropElement['hide']>

/** Shows the drop. */
type MethodDropShow = ComponentMethod<UIkitDropElement['show']>

// Dropdown

/**
 * Hides the dropdown.
 * @param delay Delay hiding the Dropdown.
 */
type MethodDropdownHide = ComponentMethod<UIkitDropdownElement['hide']>

/** Shows the dropdown. */
type MethodDropdownShow = ComponentMethod<UIkitDropdownElement['show']>

// Lightbox

/** Hides the Lightbox. */
type MethodLightboxHide = ComponentMethod<UIkitLightboxElement['hide']>

/**
 * Shows the Lightbox and item.
 * @param index Lightbox item to show. 0 based index.
 */
type MethodLightboxShow = ComponentMethod<UIkitLightboxElement['show']>

// Modal

/** Hides the Modal. */
type MethodModalHide = ComponentMethod<UIkitModalElement['hide']>

/** Shows the Modal. */
type MethodModalShow = ComponentMethod<UIkitModalElement['show']>

// Nav

/**
 * Toggles the content pane.
 * @param index Nav pane to toggle. 0 based index.
 * @param animate Suppress opening animation by passing false.
 */
type MethodNavToggle = ComponentMethod<UIkitNavElement['toggle']>

// Notification

/**
 * Closes the notification.
 * @param immediate Transition the notification out.
 */
type MethodNotificationClose = ComponentMethod<UIkitNotificationElement['close']>

// Offcanvas

/** Hides the Offcanvas. */
type MethodOffcanvasHide = ComponentMethod<UIkitOffcanvasElement['hide']>

/** Shows the Offcanvas. */
type MethodOffcanvasShow = ComponentMethod<UIkitOffcanvasElement['show']>

// Scroll

/**
 * Scroll to the given element.
 * @param el The element to scroll to.
 */
type MethodScrollScrollTo = ComponentMethod<UIkitScrollElement['scrollTo']>

// Slider

/**
 * Shows the slider item.
 * @param index The item to show. (zero-based).
 */
type MethodSliderShow = ComponentMethod<UIkitSliderElement['show']>

/** Starts the slider autoplay. */
type MethodSliderStartAutoplay = ComponentMethod<UIkitSliderElement['startAutoplay']>

/** Stops the slider autoplay. */
type MethodSliderStopAutoplay = ComponentMethod<UIkitSliderElement['stopAutoplay']>

// Slideshow

/**
 * Shows the slideshow item.
 * @param index The item to show. 0 based index.
 */
type MethodSlideshowShow = ComponentMethod<UIkitSlideshowElement['show']>

/** Starts the slideshow autoplay. */
type MethodSlideshowStartAutoplay = ComponentMethod<UIkitSlideshowElement['startAutoplay']>

/** Stops the slideshow autoplay. */
type MethodSlideshowStopAutoplay = ComponentMethod<UIkitSlideshowElement['stopAutoplay']>

// Svg

/** A JavaScript Promise that will resolve with the added SVG Node. */
type PropSvgSvg = ComponentProp<UIkitSvgElement['svg']>

// Switcher

/**
 * Shows the Switcher item with given index.
 * @param index Switcher item to show. 0 based index.
 */
type MethodSwitcherShow = ComponentMethod<UIkitSwitcherElement['show']>

// Tab

/**
 * Shows the Tab item with the given index.
 * @param index Tab item to show. 0 based index.
 */
type MethodTabShow = ComponentMethod<UIkitTabElement['show']>

// Toggle

/** Toggles the Toggle's target. */
type MethodToggleToggle = ComponentMethod<UIkitToggleElement['toggle']>

// Tooltip

/** Hides the Tooltip. */
type MethodTooltipHide = ComponentMethod<UIkitTooltipElement['hide']>

/** Shows the Tooltip. */
type MethodTooltipShow = ComponentMethod<UIkitTooltipElement['show']>


export type {
  // UIkit component Api
  UIkitAccordionElement as AccordionApi,
  UIkitAlertElement as AlertApi,
  UIkitCountdownElement as CountdownApi,
  UIkitElementBase as CoverApi,
  UIkitDropElement as DropApi,
  UIkitElementBase as DropnavApi,
  UIkitDropdownElement as DropdownApi,
  UIkitElementBase as FilterApi,
  UIkitElementBase as FormApi,
  UIkitElementBase as GridApi,
  UIkitElementBase as HeightViewportApi,
  UIkitElementBase as HeightMatchApi,
  UIkitElementBase as HeightPlaceholderApi,
  UIkitElementBase as ImageApi,
  UIkitElementBase as InverseApi,
  UIkitElementBase as LeaderApi,
  UIkitLightboxElement as LightboxApi,
  UIkitElementBase as MarginApi,
  UIkitModalElement as ModalApi,
  UIkitNavElement as NavApi,
  UIkitElementBase as NavbarApi,
  UIkitNotificationElement as NotificationApi,
  UIkitOffcanvasElement as OffcanvasApi,
  UIkitElementBase as ParallaxApi,
  UIkitScrollElement as ScrollApi,
  UIkitElementBase as ScrollspyApi,
  UIkitElementBase as ScrollspyNavApi,
  UIkitSliderElement as SliderApi,
  UIkitSlideshowElement as SlideshowApi,
  UIkitElementBase as SortableApi,
  UIkitElementBase as StickyApi,
  UIkitSvgElement as SvgApi,
  UIkitSwitcherElement as SwitcherApi,
  UIkitTabElement as TabApi,
  UIkitToggleElement as ToggleApi,
  UIkitTooltipElement as TooltipApi,
  UIkitElementBase as UploadApi,
  UIkitElementBase as VideoApi,

  // UIkit component options
  UIkitAccordionOptions as OptionsAccordion,
  UIkitAlertOptions as OptionsAlert,
  UIkitCountdownOptions as OptionsCountdown,
  UIkitCoverOptions as OptionsCover,
  UIkitDropOptions as OptionsDrop,
  UIkitDropdownOptions as OptionsDropdown,
  UIkitDropnavOptions as OptionsDropnav,
  UIkitFilterOptions as OptionsFilter,
  UIkitFormCustomOptions as OptionsForm,
  UIkitGridOptions as OptionsGrid,
  UIkitHeightViewportOptions as OptionsHeightViewport,
  UIkitHeightMatchOptions as OptionsHeightMatch,
  UIkitHeightPlaceholderOptions as OptionsHeightPlaceholder,
  UIkitIconOptions as OptionsIcon,
  UIkitImgOptions as OptionsImage,
  UIkitInverseOptions as OptionsInverse,
  UIkitLeaderOptions as OptionsLeader,
  UIkitLightboxOptions as OptionsLightbox,
  UIkitMarginOptions as OptionsMargin,
  UIkitModalOptions as OptionsModal,
  UIkitNavOptions as OptionsNav,
  UIkitNavbarOptions as OptionsNavbar,
  UIkitNotificationOptions as OptionsNotification,
  UIkitOffcanvasOptions as OptionsOffcanvas,
  UIkitParallaxOptions as OptionsParallax,
  UIkitScrollOptions as OptionsScroll,
  UIkitScrollspyOptions as OptionsScrollspy,
  UIkitScrollspyNavOptions as OptionsScrollspyNav,
  UIkitSliderOptions as OptionsSlider,
  UIkitSlideshowOptions as OptionsSlideshow,
  UIkitSortableOptions as OptionsSortable,
  UIkitStickyOptions as OptionsSticky,
  UIkitSvgOptions as OptionsSvg,
  UIkitSwitcherOptions as OptionsSwitcher,
  UIkitTabOptions as OptionsTab,
  UIkitToggleOptions as OptionsToggle,
  UIkitTooltipOptions as OptionsTooltip,
  UIkitUploadOptions as OptionsUpload,
  UIkitVideoOptions as OptionsVideo,

  // UIkit component functions
  Icon as IconFunction,

  // UIkit component methods
  MethodAccordionToggle,
  MethodAlertClose,
  MethodCountdownStart,
  MethodCountdownStop,
  MethodDropHide,
  MethodDropShow,
  MethodDropdownHide,
  MethodDropdownShow,
  MethodLightboxHide,
  MethodLightboxShow,
  MethodModalHide,
  MethodModalShow,
  MethodNavToggle,
  MethodNotificationClose,
  MethodOffcanvasHide,
  MethodOffcanvasShow,
  MethodScrollScrollTo,
  MethodSliderShow,
  MethodSliderStartAutoplay,
  MethodSliderStopAutoplay,
  MethodSlideshowShow,
  MethodSlideshowStartAutoplay,
  MethodSlideshowStopAutoplay,
  PropSvgSvg,
  MethodSwitcherShow,
  MethodTabShow,
  MethodToggleToggle,
  MethodTooltipHide,
  MethodTooltipShow,
}
