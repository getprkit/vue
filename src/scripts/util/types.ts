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
 * TODO: Fix why we can't use UIKit define props directly: @types/uikit
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
  UIkitFunction,
  UIkitElement,
  UIkitElementBase,
  UIkitIconElement,
  UIkitAlign,
  UIkitCssSelector,
  UIkitClickHoverMode,
  UIkitPosition,
  UIkitStretch,
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
} from 'prkit'

type UIkitBoolean = boolean extends infer T ? T : never

interface UIkitAccordionOptions {
  /** Index of the element to open initially. */
  active?: number
  /** Reveal item directly or with a transition. */
  animation?: UIkitBoolean
  /** Allow all items to be closed. */
  collapsible?: UIkitBoolean
  /** The content selector, which selects the accordion content elements. */
  content?: string
  /** Animation duration in milliseconds. */
  duration?: number
  /** Allow multiple open items. */
  multiple?: UIkitBoolean
  /** CSS selector of the element(s) to toggle. */
  targets?: string
  /** The toggle selector, which toggles accordion items. */
  toggle?: string
  /** The transition to use when revealing items. Use keyword for easing functions. */
  transition?: string
  /** Pixel offset added to scroll top. */
  offset?: number
}

interface UIkitAlertOptions {
  /** Fade out or hide directly. */
  animation?: UIkitBoolean | string
  /** Animation duration in milliseconds. */
  duration?: number
  /** The close trigger element. */
  selClose?: UIkitCssSelector
}

interface UIkitCountdownOptions {
  /** Any string parsable by Date.parse. */
  date?: string | Date | UIkitBoolean | number
  /** Reload page after countdown expires. Initially expired countdowns won't reload the page. */
  reload?: UIkitBoolean
}

interface UIkitCoverOptions {
  /** Tries to automute the iframe's video. */
  automute?: UIkitBoolean
  /** The element's width. */
  width?: number
  /** The element's height. */
  height?: number
}

interface UIkitDropOptionsBase {
  /** CSS selector for the element to be used as toggle. By default, the preceding element. */
  toggle?: UIkitCssSelector
  /** Drop position. */
  pos?: UIkitPosition
  /** Stretch drop on both (true) or given axis (x, y). */
  stretch?: UIkitStretch
  /** Comma-separated list of drop trigger behavior modes (click, hover). */
  mode?: UIkitClickHoverMode
  /** Delay time in hover mode before a drop is shown in ms. */
  delayShow?: number
  /** Delay time in hover mode before a drop is hidden in ms. */
  delayHide?: number
  /** Disable dynamic positioning while scrolling by setting this option to false. */
  autoUpdate?: UIkitBoolean
  /** The area the drop can't exceed causing it to flip and shift. By default, the nearest scrolling ancestor. */
  boundary?: UIkitCssSelector
  /** The area on the x-axis the drop can't exceed causing it to flip and shift. */
  boundaryX?: UIkitCssSelector
  /** The area on the y-axis the drop can't exceed causing it to flip and shift. */
  boundaryY?: UIkitCssSelector
  /** The element the drop is positioned to (true for window). */
  target?: UIkitBoolean | UIkitCssSelector
  /** The element's X axis the drop is positioned to (true for window). */
  targetX?: UIkitBoolean | UIkitCssSelector
  /** The element's Y axis the drop is positioned to (true for window). */
  targetY?: UIkitBoolean | UIkitCssSelector
  /** Position inside its target. */
  inset?: UIkitBoolean
  /** Flip the drop along the main axis if it overflows the boundary. */
  flip?: UIkitBoolean | string
  /** Shift the drop along the cross-axis if it overflows the boundary. */
  shift?: UIkitBoolean
  /** The drop offset. */
  offset?: number
  /** Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /** Use animation when closing the drop. */
  animateOut?: UIkitBoolean
  /** Allow background scrolling while dropdown is opened. */
  bgScroll?: UIkitBoolean
  /** Close the dropdown on scrolling a parent scroll container. */
  closeOnScroll?: UIkitBoolean
  /** The animation duration. */
  duration?: number
  /** Define a target container via a selector to specify where the drop should be appended in the DOM. */
  container?: UIkitElement | UIkitBoolean
  /** Undocumented. */
  'boundary-align'?: UIkitBoolean | undefined
}

type UIkitDropOptions = UIkitDropOptionsBase

type UIkitDropdownOptions = UIkitDropOptionsBase;

interface UIkitDropnavOptions extends Pick<
  UIkitDropOptionsBase,
  | 'stretch'
  | 'mode'
  | 'delayShow'
  | 'delayHide'
  | 'boundary'
  | 'target'
  | 'targetX'
  | 'targetY'
  | 'offset'
  | 'animation'
  | 'animateOut'
  | 'bgScroll'
  | 'closeOnScroll'
  | 'duration'
  | 'container'
> {
  /** Dropdown alignment (left, right, center). */
  align?: UIkitAlign
  /**	Enable or disable dropbar behavior. */
  dropbar?: UIkitBoolean
  /** If set, dropbar will be inserted after the anchor element. */
  dropbarAnchor?: UIkitCssSelector | undefined
}

interface UIkitFilterOptions {
  /** The targeted list on which to apply the filter to. */
  target?: string
  /** A selector for the initially active filter controls. */
  selActive?: string | UIkitBoolean
  /** Animation mode (slide, fade, delayed-fade or false). */
  animation?: 'slide' | 'fade' | 'delayed-fade' | false
  /** Animation duration in milliseconds. */
  duration?: number
}

interface UIkitFormOptions {
  /** Value display target. */
  target?: UIkitCssSelector | UIkitBoolean
}

interface UIkitGridOptions {
  /** This class is added to items that break into the next row, typically to create margin to the previous row. */
  margin?: string
  /** This class is added to the first element in each row. */
  firstcolumn?: string
  /** Enables masonry layout for this grid. */
  masonry?: string | UIkitBoolean
  /** Parallax translation value. The value can be in vh, % and px. Falsy disables the parallax effect (default). */
  parallax?: number
  /** Start offset. The value can be in vh, % and px. It supports basic mathematics operands + and -. The default value of 0 means that the grid's top border and viewport's bottom border intersect. */
  parallaxStart?: string
  /** End offset. The value can be in vh, % and px. It supports basic mathematics operands + and -. The default value of 0 means that the grid's bottom border and the viewport's top border intersect. */
  parallaxEnd?: string
  /** With parallax enabled, all columns will reach the bottom at the same time. */
  parallaxJustify?: UIkitBoolean
}

interface UIkitHeightViewportOptions {
  /** Subtracts the element's (true) or given element's (CSS Selector) offset top from its height. */
  offsetTop?: UIkitBoolean | UIkitCssSelector
  /** Subtracts the height (true) of the sibling that immediately follows the element, the given percentage (Number), Pixel (px) value from element's own height or the given element's height. */
  offsetBottom?: UIkitBoolean | number | UIkitCssSelector
  /** Expands the element's height to make a short page fill the viewport. */
  expand?: UIkitBoolean
  /** Sets a minimum height. Useful if all children are positioned absolutely. */
  min?: number
  /** The CSS property to set. (min-height, height, max-height) */
  property?: string
}

interface UIkitHeightMatchOptions {
  /** Elements that should match. */
  target?: string
  /**
   * By default only items in the same row will be matched. For example, once grid columns extend to a width of 100%,
   * their heights will no longer be matched. This makes sense, for example, if they stack vertically in narrower viewports.
   */
  row?: UIkitBoolean
}

interface UIkitHeightPlaceholderOptions {
  /** Elements that should match. */
  target?: string;
}

interface UIkitIconOptions {
  /** The icon to display. */
  icon?: string
  /** The icon size ratio. */
  ratio?: number
  /** The icon stroke size ratio. */
  strokeRatio?: number
}

type UIkitIcon = UIkitFunction<UIkitIconOptions, UIkitIconElement, Promise<SVGElement>>

interface UIkitImageOptions {
  /**	The image's src attribute. */
  dataSrc?: string
  /** Undocumented. */
  dataSrcset?: string | UIkitBoolean
  /** The image's sources. This option is used for background images only. The source attributes are passed in key: value; format for a single source. For multiple sources in JSON format. */
  sources?: string
  /** Enable lazy/eager loading. Set to eager for images within the first visible viewport. */
  loading?: 'lazy' | 'eager'
  /** The margin is added to the viewport's bounding box, before computing an intersection with the image. The value must be in px or % units. */
  margin?: string
  /** Undocumented. */
  sizes?: string | UIkitBoolean
  /** Undocumented. */
  width?: string | UIkitBoolean
  /** Undocumented. */
  height?: string | UIkitBoolean
  /** Undocumented. */
  offsetTop?: string
  /** Undocumented. */
  offsetLeft?: string | number
  /** A list of targets whose bounding boxes will be used to compute an intersection with the image. Defaults to the image itself. */
  target?: string | UIkitBoolean
}

interface UIkitInverseOptions {
  /** A list of targets that will be checked. */
  target?: UIkitCssSelector
  /** A selector that needs to match for a color to be set, otherwise the color is removed. If omitted, color will always be set. */
  selActive?: UIkitCssSelector
}

interface UIkitLeaderOptions {
  /**	Optional fill character. */
  fill?: string
  /** Condition for the space filling - a width as integer (e.g. 640) or a breakpoint (e.g. @s, @m, @l, @xl) or any valid media query (e.g. (min-width: 900px)). */
  media?: UIkitBoolean | number | string
}

interface UIkitLightboxOptionsBase {
  /** Lightbox animation mode (slide, fade or scale). */
  animation?: string
  /** Lightbox autoplays. */
  autoplay?: UIkitBoolean
  /** The delay between switching slides in autoplay mode. */
  autoplayInterval?: number
  /** Pause autoplay mode on hover. */
  pauseOnHover?: UIkitBoolean
  /** Lightbox videos autoplay. A value of inline will autoplay the video, make it muted and without controls. */
  videoAutoplay?: UIkitBoolean
  /** Lightbox shows counter. */
  counter?: UIkitBoolean
  /** Lightbox navigation (dotnav, thumbnav). */
  nav?: 'dotnav' | 'thumbnav' | UIkitBoolean
  /** Lightbox shows slidenav controls. */
  slidenav?: UIkitBoolean
  /** The initial item to show. (zero-based). */
  index?: number
  /**	Delay time before controls fade out in ms. Setting 0 will prevent hiding controls. */
  delayControls?: number
}

interface UIkitLightboxOptions extends UIkitLightboxOptionsBase {
  /** Toggle selector - opens the Lightbox Panel upon click. */
  toggle?: UIkitCssSelector
}

interface UIkitMarginOptions {
  /** This class is added to items that break into the next row, typically to create a margin for the previous row. */
  margin?: string
  /** This class is added to the first element in each row. */
  firstColumn?: string
}

interface UIkitModalOptions {
  /** Close the modal when the Esc key is pressed. */
  escClose?: UIkitBoolean
  /** Close the modal when the background is clicked. */
  bgClose?: UIkitBoolean
  /** Stack modals, when more than one is open. By default, the previous modal will be hidden. */
  stack?: UIkitBoolean
  /** Define a target container via a selector to specify where the modal should be appended in the DOM. Setting it to false will prevent this behavior. */
  container?: UIkitElement | UIkitBoolean
  /** Class to add to <html> when modal is active */
  clsPage?: string
  /** Class of the element to be considered the panel of the modal. */
  clsPanel?: string
  /** CSS selector for all elements that should trigger the closing of the modal */
  selClose?: string
}

interface UIkitNavOptions {
  /** The element(s) to toggle. */
  targets?: UIkitCssSelector
  /** The toggle element(s). */
  toggle?: UIkitCssSelector
  /** The content element(s). */
  content?: UIkitCssSelector
  /** Allow all items to be closed. */
  collapsible?: UIkitBoolean
  /** Allow multiple open items. */
  multiple?: UIkitBoolean
  /** The transition to use. */
  transition?: string
  /** Space-separated names of animations. Comma-separated for animation out. */
  animation?: string | UIkitBoolean
  /** The animation duration in milliseconds. */
  duration?: number
}

interface UIkitNavbarOptions {
  /** Dropdown alignment (left, right, center). */
  align?: UIkitAlign
  /**	Enable or disable dropbar behavior. */
  dropbar?: UIkitBoolean
  /** If set, dropbar will be inserted after the anchor element. */
  dropbarAnchor?: UIkitCssSelector
  /** The dropbar transparent mode (behind, remove). */
  dropbarTransparentMode?: 'behind' | 'remove' | UIkitBoolean
  /** Stretch dropdown on both (true) or given axis (x, y). */
  stretch?: UIkitStretch
  /** Comma-separated list of dropdown trigger behavior modes (click, hover). */
  mode?: UIkitClickHoverMode
  /** Delay time in hover mode before a dropdown is shown in ms */
  delayShow?: number
  /** Delay time in hover mode before a dropdown is hidden in ms. */
  delayHide?: number
  /** The area the dropdown can't exceed causing it to flip and shift. By default, the nearest scrolling ancestor. */
  boundary?: UIkitCssSelector
  /** The element the dropdown is positioned to (true for window). */
  target?: UIkitCssSelector | UIkitBoolean
  /** The element's X axis the drop is positioned to (true for window). */
  targetX?: UIkitBoolean | UIkitCssSelector
  /** The element's Y axis the drop is positioned to (true for window). */
  targetY?: UIkitBoolean | UIkitCssSelector
  /** The dropdown offset. */
  offset?: number
  /** Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /** Use animation when closing the drop. */
  animateOut?: UIkitBoolean
  /** Allow background scrolling while dropdown is opened. */
  bgScroll?: UIkitBoolean
  /** Close the dropdown on scrolling a parent scroll container. */
  closeOnScroll?: UIkitBoolean
  /** The animation duration. */
  duration?: number
  /** Define a target container via a selector to specify where the drop should be appended in the DOM. */
  container?: UIkitElement | UIkitBoolean
  /** Undocumented. */
  'boundary-align'?: UIkitBoolean
}

interface UIkitNotificationOptions {
  /**	Notification message to show. */
  message?: string
  /** Notification status color. */
  status?: string | 'primary' | 'success' | 'warning' | 'danger'
  /** Visibility duration until a notification disappears. If set to 0, notification will not hide automatically. */
  timeout?: number
  /** Useful, if you want to close all notifications in a specific group. */
  group?: string
  /** Display corner. */
  pos?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

interface UIkitOffcanvasOptions {
  /** Off-canvas animation mode (slide, reveal, push or none). */
  mode?: 'slide' | 'reveal' | 'push' | 'none'
  /** Flip off-canvas to the right side. */
  flip?: UIkitBoolean
  /** Display the off-canvas together with an overlay. */
  overlay?: UIkitBoolean
  /** Close the off-canvas when the Esc key is pressed. */
  escClose?: UIkitBoolean
  /** Close the off-canvas when the background is clicked. */
  bgClose?: UIkitBoolean
  /** Define a target container via a selector to specify where the off-canvas should be appended in the DOM. Setting it to false will prevent this behavior. */
  container?: UIkitElement | UIkitBoolean
}

interface UIkitParallaxOptions {
  /** Animation easing during scrolling */
  easing?: number
  /** Element dimension reference for animation duration. */
  target?: UIkitCssSelector
  /** Start offset. The value can be in vh, % and px. It supports basic mathematics operands + and -. The default value of 0 means that the target's top border and viewport's bottom border intersect. */
  start?: number | string
  /** End offset. The value can be in vh, % and px. It supports basic mathematics operands + and -. The default value of 0 means that the target's bottom border and the viewport's top border intersect. */
  end?: number | string
  /** Condition for the active status - a width as integer (e.g. 640) or a breakpoint (e.g. @s, @m, @l, @xl) or any valid media query (e.g. (min-width: 900px)). */
  media?: UIkitBoolean | number | string
}

interface UIkitScrollOptions {
  /** Offset added to scroll top. */
  offset?: number
}

interface UIkitScrollspyOptionsBase {
  /** Class to toggle when the element enters/leaves viewport. */
  cls?: string
  /**	Target to apply the scrollspy to. Defaults to the element itself. */
  target?: UIkitBoolean | UIkitCssSelector
}

interface UIkitScrollspyOptions extends UIkitScrollspyOptionsBase {
  /** Hides the element while out of view. */
  hidden?: UIkitBoolean
  /** The margin is added to the viewport's bounding box, before computing an intersection with the element. The value must be in px or % units. */
  margin?: string
  /** Applies the cls class every time the element is in view. */
  repeat?: UIkitBoolean
  /** Delay time in ms. */
  delay?: number
  /** Undocumented. */
  'offset-top'?: number
  /** Undocumented. */
  'offset-left'?: number
}

interface UIkitScrollspyNavOptions extends UIkitScrollspyOptionsBase {
  /** Target to apply the class to. Defaults to the element itself. */
  closest?: UIkitBoolean | UIkitCssSelector
  /** Adds the Scroll component to its links. */
  scroll?: UIkitBoolean
  /** Offset added to scroll top. */
  offset?: number
  /** Undocumented. */
  overflow?: UIkitBoolean
}

interface UIkitSliderOptions {
  /** Slider autoplays. */
  autoplay?: UIkitBoolean
  /** The delay between switching slides in autoplay mode. */
  autoplayInterval?: number
  /** Center the active slide. */
  center?: UIkitBoolean
  /** Enable pointer dragging. */
  draggable?: UIkitBoolean
  /** The animation easing (CSS timing functions or cubic-bezier). */
  easing?: string
  /** Disable infinite sliding. */
  finite?: UIkitBoolean
  /** Slider item to show. 0 based index. */
  index?: number
  /** Slider item/items to apply the transition active class to (all, first). */
  active?: string
  /** Pause autoplay mode on hover. */
  pauseOnHover?: UIkitBoolean
  /** Slide in sets. */
  sets?: UIkitBoolean
  /** The animation velocity (pixel/ms). */
  velocity?: number
}

interface UIkitSlideshowOptions {
  /** Slideshow animation mode (slide, fade, scale, pull or push). */
  animation?: 'slide' | 'fade' | 'scale' | 'pull' | 'push'
  /** Slideshow autoplays. */
  autoplay?: UIkitBoolean
  /**	The delay between switching slides in autoplay mode. */
  autoplayInterval?: number
  /**	Enable pointer dragging. */
  draggable?: UIkitBoolean
  /** The animation easing (CSS timing functions or cubic-bezier). */
  easing?: string
  /** Disable infinite sliding. */
  finite?: UIkitBoolean
  /** Pause autoplay mode on hover. */
  pauseOnHover?: UIkitBoolean
  /**	Slideshow item to show. 0 based index. */
  index?: number
  /** The animation velocity (pixel/ms). */
  velocity?: number
  /** The ratio. (false prevents height adjustment) */
  ratio?: string | number
  /** The minimum height. */
  minHeight?: UIkitBoolean | number
  /** The maximum height. */
  maxHeight?: UIkitBoolean | number
}

interface UIkitSortableOptions {
  /** The group. */
  group?: string
  /** Animation mode (slide, false). */
  animation?: UIkitBoolean | string
  /** Animation duration in milliseconds. */
  duration?: number
  /** Mouse move threshold before dragging starts. */
  threshold?: number
  /** The item class. */
  clsItem?: string
  /** The placeholder class. */
  clsPlaceholder?: string
  /** The ghost class. */
  clsDrag?: string
  /** The body's dragging class. */
  clsDragState?: string
  /** The list's class. */
  clsBase?: string
  /**	Disable dragging on elements with this class. */
  clsNoDrag?: string
  /** The empty list class. */
  clsEmpty?: string
  /** The ghost's custom class. */
  clsCustom?: string
  /** The handle selector. */
  handle?: string
}

interface UIkitStickyOptions {
  /** The position the element should be stuck to. */
  position?: 'top' | 'bottom'
  /**
   * Start offset. The value can be in vh, % and px. It supports basic mathematics operands + and -.
   * The default value of 0 means that the element's top border and viewport's top border intersect.
   * A CSS Selector will set the start to the selected element's bottom border and the element's top border.
   */
  start?: number | string
  /**
   * End offset. The value can be in vh, % and px. It supports basic mathematics operands + and -.
   * A value of 0 means that the element's top border and viewport's top border intersect, which would cause the
   * element not to be sticky at all if the start is also set to 0. A CSS Selector will set the end to the selected
   * element's bottom and the element's bottom border. false will make the element stick until the end of the page.
   * true selects the parent element.
   */
  end?: UIkitBoolean | number | string
  /**	The offset the Sticky should be fixed to. The value can be in vh, % and px. It supports basic mathematics operands + and -. */
  offset?: number | string
  /** The offset the Sticky should be fixed to if the element overflows the viewport. The value can be in vh, % and px. It supports basic mathematics operands + and -. */
  overflowEnd?: number
  /** Flip the Sticky's position option if the element overflows the viewport and disable overflow scrolling. */
  overflowFlip?: UIkitBoolean
  /** The animation to use when the element becomes sticky. */
  animation?: string | UIkitBoolean
  /** The active class. */
  clsActive?: string
  /** The inactive class. */
  clsInactive?: string
  /** Only show sticky element when scrolling up. */
  showOnUp?: UIkitBoolean
  /** Condition for the active status - a width as integer (e.g. 640) or a breakpoint (e.g. @s, @m, @l, @xl) or any valid media query (e.g. (min-width: 900px)). */
  media?: number | string | UIkitBoolean
  /**
   * Initially make sure that the Sticky element is not over a referenced element via the page's location hash.
   * The offset is defined by how far the element will be above the referenced element. false will disable this behavior.
   */
  targetOffset?: UIkitBoolean | number
  /** Undocumented. */
  'show-on-up'?: UIkitBoolean
  /** Undocumented. */
  'width-element'?: string | UIkitBoolean
}

interface UIkitSvgOptions {
  /**	The SVG source URL. If a location hash is present, only the <symbol> of the SVG with the given ID is shown. */
  src?: string
  /** Animate all elements with the stroke attribute in the SVG. */
  strokeAnimation?: UIkitBoolean
}

interface UIkitSwitcherOptions {
  /**	Related items container. By default succeeding elements with class 'uk-switcher'. */
  connect?: UIkitCssSelector
  /** Select the clickable elements which trigger content switching. */
  toggle?: UIkitCssSelector
  /** Related nav container. By default, nav items are found in related items container only. */
  itemNav?: UIkitCssSelector
  /**	Active index on init. Providing a negative number indicates a position starting from the end of the set. */
  active?: number
  /**	Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /** The animation duration. */
  duration?: number
  /** Use swiping. */
  swiping?: UIkitBoolean
  /**	Selection follows focus automatically. */
  followFocus?: UIkitBoolean
}

interface UIkitTabOptions {
  /** Related item's container. By default, this is the next element with the 'uk-switcher' class. */
  connect?: UIkitCssSelector
  /** The toggle selector, which triggers content switching on click. */
  toggle?: UIkitCssSelector
  /** Active index on init. Providing a negative number indicates a position starting from the end of the set. */
  active?: number
  /** Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /**	The animation duration. */
  duration?: number
  /**	Use swiping. */
  swiping?: UIkitBoolean
  /** 	When to switch to horizontal mode - a width as integer (e.g. 640) or a breakpoint (e.g. @s, @m, @l, @xl) or any valid media query (e.g. (min-width: 900px)). */
  media?: number | string
}

interface UIkitToggleOptions {
  /** CSS selector of the element(s) to toggle. */
  target?: UIkitElement
  /** Comma-separated list of trigger behaviour modes. (hover, click, media) */
  mode?: string
  /** The class that is being toggled. Defaults to the hidden attribute. */
  cls?: string
  /**	In media mode, the breakpoint that triggers the toggle - a width as integer (e.g. 640) or a breakpoint (e.g. @s, @m, @l, @xl) or any valid media query (e.g. (min-width: 900px)). */
  media?: number | string
  /**	Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /** Animation duration in milliseconds. */
  duration?: number
  /** Toggle the targets successively. */
  queued?: UIkitBoolean
}

interface UIkitTooltipOptions {
  /** Tooltip text. */
  title?: string
  /**	Tooltip position. */
  pos?:
    'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right'
  /** Tooltip offset. */
  offset?: number | UIkitBoolean
  /**	Space-separated names of animations. Comma-separated for animation out. */
  animation?: string
  /**	The animation duration. */
  duration?: number
  /** The show delay. */
  delay?: number
  /** The active class. */
  cls?: string
  /** Define a target container via a selector to specify where the tooltip should be appended in the DOM. */
  container?: UIkitElement
}

interface UIkitUploadOptions {
  /**	The request url. */
  url?: string
  /** Allow multiple files to be uploaded. */
  multiple?: UIkitBoolean
  /** The name parameter. */
  name?: string
  /** Additional parameters. */
  params?: object
  /** File name filter. (eg. *.png). */
  allow?: string | UIkitBoolean
  /** File MIME type filter. (eg. image/*) */
  mime?: string | UIkitBoolean
  /**	Number of files that will be uploaded simultaneously. */
  concurrent?: number
  /**	The expected response data type (xml, json, script, or html) */
  type?: string
  /**	The request method */
  method?: string
  /** Invalid MIME type message. */
  invalidMime?: string
  /** Invalid name message. */
  invalidName?: string
  /** The class used when dragging. */
  clsDragover?: string
  /** The abort callback. */
  abort?: object
  /** The beforeAll callback. */
  beforeAll?: object
  /**	The beforeSend callback. */
  beforeSend?: object
  /**	The complete callback. */
  complete?: object
  /** The completeAll callback. */
  completeAll?: object
  /** The error callback. */
  error?: object
  /** The load callback. */
  load?: object
  /** The loadEnd callback. */
  loadEnd?: object
  /** The loadStart callback. */
  loadStart?: object
  /** The progress callback. */
  progress?: object
  /**	The fail callback. If the name or MIME type is invalid. */
  fail?: object
}

interface UIkitVideoOptions {
  /**	The video automatically plays/pauses as it's visible/hidden on the page. Additionally, the video can play when its in the viewport or hovered with the mouse (inview, hover). */
  autoplay?: UIkitBoolean | string
  /** Automatically mute YouTube or Vimeo videos */
  automute?: UIkitBoolean
}


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
  UIkitFormOptions as OptionsForm,
  UIkitGridOptions as OptionsGrid,
  UIkitHeightViewportOptions as OptionsHeightViewport,
  UIkitHeightMatchOptions as OptionsHeightMatch,
  UIkitHeightPlaceholderOptions as OptionsHeightPlaceholder,
  UIkitIconOptions as OptionsIcon,
  UIkitImageOptions as OptionsImage,
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
  UIkitIcon as IconFunction,

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
