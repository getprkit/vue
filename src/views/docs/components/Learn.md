<!-- language=ts
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { type AccordionApi } from '@u/types'
import { accordion, icon } from '@u/util'
import PrAccordion from '@c/PrAccordion.vue'
import DocNavigation from '@vd/doc-navigation.vue'

const accordionEl = useTemplateRef<HTMLElement>('accordionEl')
const accordionApi = ref<AccordionApi>()
const accordionList = [
  {
    value: 1,
    title: 'Accordion Item 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    value: 2,
    title: 'Accordion Item 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    value: 3,
    title: 'Accordion Item 3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

onMounted(() => {
  accordion(accordionEl.value)

  const options = {
    icon: 'component-default-accordion-plus',
    ratio: 0.9,
    strokeRatio: 2,
  }

  accordionEl.value
    ?.querySelectorAll<HTMLElement>('.uk-accordion-icon')
    .forEach((el) => icon(el, options))
})

</script>
 -->

# Learn

**Future doc**: Write about how use component and utilities.

---

## Component Usage

**Future doc**: Write about how use components.

---

## Component configuration and defaults

**Future doc**: Config about how set component default props and configs.

---

## Manually initialization component

Components can be built manually using their predefined CSS classes and HTML elements. Interactive components can be initialized in two ways: by adding `uk-*` or `data-uk-*` attributes to HTML elements, or by calling their UIkit JavaScript component functions.

For `CSS/HTML` part we define all classes and structure in related component doc page in manual-initialization section (e.g. [Accordion Component Manual Initialization](accordion.md#manual-initialization)).

```html
<div class="uk-alert uk-alert-primary uk-alert-bordered">
  <a href="" class="uk-alert-close" />
  <span class="uk-alert-icon" />
  ....
</div>
```

```vue example
<template>
  <div class="uk-alert uk-alert-primary uk-alert-bordered">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
  </div>
</template>
```

You can initialize interactive UIkit components by adding `uk-*` or `data-uk-*` attributes to your HTML elements without writing a single line of JavaScript.

```html
<div class="uk-alert-primary uk-alert-bordered" uk-alert>
  <a href="" class="uk-alert-close" uk-icon="icon: component-default-alert-close" />
  <span class="uk-alert-icon" uk-icon="component-default-alert-primary" />
  ....
</div>

<ul class="uk-accordion-hover" uk-accordion="multiple: true">....</div>
```

```html example
<div class="uk-alert-primary uk-alert-bordered" uk-alert>
  <a href="" class="uk-alert-close" uk-icon="icon: component-default-alert-close; ratio: 0.5" />
  <span class="uk-alert-icon" uk-icon="component-default-alert-primary" />
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
</div>
```

**Note** When initializing interactive UIkit components using `uk-*` or `data-uk-*` attributes, or via JavaScript, the component's main CSS class is automatically added to the element. For example, initializing an element with `uk-alert` automatically adds the `uk-alert` class to it.

You can also initialize components manually via JavaScript and apply them to elements in your document. JavaScript component functions accept `element` and `options` arguments. The `element` argument can be a `Node`, selector, jQuery object, or `HTMLElement`. In Vue, you can pass `templateRef.value` after the component has mounted. The initialized component is returned as its component API. JavaScript functional components (e.g. `Notification`) do not require the `element` argument.

```js
import { accordion, notification } from '@u/util'

// passing a selector/HTMLElement and an options object.
const accordionApi = accordion('.uk-accordion', { collapse: false, duration: 300 })

// with template ref
const accordionEl = useTemplateRef('accordionEl')
const accordionApi = accordion(accordionEl.value, { collapse: false, duration: 300 })

// functional components should omit the 'element' argument.
const notificationApi = notification('MyMessage', 'danger')
```

**Note** The `options` argument is an object that accept options that listed in each component doc page in component-props section (not the **`bold`** ones) (e.g. [Accordion Component Props](accordion.md#component-props)) and must be in their camel-cased representation, e.g. `show-on-up` becomes `showOnUp`.

The following source is complete example of manually initializing a component using templateRef target:

```vue example
<template>
  <ul class="uk-accordion-pill" ref="accordionEl">
    <li>
      <a class="uk-accordion-title">
        Accordion Item 1
        <span class="uk-accordion-icon uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
    </li>
    <li>
      <a class="uk-accordion-title">
        Accordion Item 2
        <span class="uk-accordion-icon uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor reprehenderit.
        </p>
      </div>
    </li>
    <li>
      <a class="uk-accordion-title">
        Accordion Item 2
        <span class="uk-accordion-icon uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor reprehenderit.
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { accordion } from '@u/util'

const accordionEl = useTemplateRef<HTMLElement>('accordionEl')

onMounted(() => {
  const accordionApi = accordion(accordionEl.value)

  const options = {
    icon: 'component-default-accordion-plus',
    ratio: 0.9,
    strokeRatio: 2,
  }

  // using icon JavaScript Component to set icons for each item of accordion
  accordionEl.value
    ?.querySelectorAll<HTMLElement>('.uk-accordion-icon')
    .forEach((el) => icon(el, options))
})
</script>
```

**Note** Using `get[ComponentName](selector)` with CSS/Element selectors will always return the first occurrence only! If you need to access all instances do [query](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) the elements first. Then apply the getter to each element separately - `get[ComponentName](element)`.

After initialization, you can get your JavaScript component by calling the same initialization function, omitting the `options` parameter.

```js
// accordion is now the prior initialized components
const accordionApi = accordion('.uk-accordion')

// with template ref
const accordionEl = useTemplateRef('accordionEl')
const accordionApi = accordion(accordionEl.value)
```

Accessing your components with same initialization or initializing it programmatically gives you the possibility to invoke their methods directly.

```js
// get initialized component and access to methods
const accordionApi = accordion(ElementTarget)
accordionApi.toggle()

// initialize the new component can use methods
const accordionApi = accordion(ElementTarget, { collapse: false, duration: 300 })
accordionApi.toggle()
```

When manually initialize a component the component emits become events. Each component triggers DOM events that you can react to. For example when a Modal is shown or a Scrollspy element becomes visible. You can access the events with `utilOn` with passing the `selector/element` or use `addEventListener` on initialized component. `utilOn` also accept multiple event with `' '` separator.

```js
// with `utilOn`
import { utilOn } from '@u/util'

const onShow = () => {
  // do something
}

// also can use any Node, HTMLElement or templateRef instead of selector
utilOn(ElementTarget, 'show', onShow)

// also can accept multiple event
utilOn(ElementTarget, 'show hide', onShow)

// initialize the new component also can use addEventListener
const accordionApi = accordion(ElementTarget)
accordionApi.addEventListener('show', onShow)
```

When you register an event with `utilOn` or `addEventListener` usually you need to remove the event before unMounting the component. To remove an event listener registered with `utilOn`, use `utilOn` default return function or `utilOff` with the same target, event type, and listener function and to remove an registered event listener with `addEventListener`, use `removeEventListener` with same target, event type, and listener function.

```js
import { utilOn, utilOff } from '@u/util'

const onShow = () => {
  // do something
}

// remove event with `utilOn` default return function
const offEvent = utilOn(ElementTarget, 'show', onShow)
// the event will be remove
offEvent()

// remove event with `utilOff`, also accept multiple event
utilOff(ElementTarget, 'show', onShow)

// remove event which added with addEventListener
const accordionApi = accordion(ElementTarget)
accordionApi.removeEventListener('show', onShow)
```

The component's documentation page lists its events as emits (e.g. [Accordion Emits](accordion.md#emits)). events will not receive **`bold`** arguments exist in the component emit lists.

**Note** `utilOff` will just remove the event listener that registered with the same target, event and listener.

If you need to make sure a component is properly destroyed, for example upon removal from the DOM, you can call its `$destroy` function. the `$destroy` function remove JavaScript component from element target.

```js
// destroys the component. For example unbind its event listeners.
componentApi.$destroy()

// also destroys the component, but also removes the element from the DOM.
componentApi.$destroy(true)

// example
const accordionApi = accordion(ElementTarget)
accordionApi.$destroy()
```

**Note** Components often trigger events with the same name (e.g. 'show'). Usually events [bubble through the DOM](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#Event_bubbling_and_capture). For consistency use `ref` or `useTemplateRef` for selecting the HTML element or check the event target, to ensure the event was triggered by the desired component.

Sometimes, components like Height or Tab are hidden in the markup. This may happen when used in combination with the Switcher, Modal or Dropdown. Once they become visible, often they need to adjust or fix their height and other dimensions.

UIkit offers several ways of updating a component. Omitting the `type` parameter will trigger an `update` event.

```js
import { utilUpdate } from '@u/util'

// calls the update hook on components registered on the element itself, its parents and children.
utilUpdate((ElementTarget = document.body), (type = 'update'))

// updates the component itself.
componentApi.$emit((type = 'update'))

// example
const accordionApi = accordion(ElementTarget)
accordionApi.$emit()
```

---

## Use component methods

If component contains `methods` which listed in component documentation page (e.g. [Accordion Component Methods](accordion.md#methods)) you can use them by accessing the component api and calling the method name with `componentApi.methodName()`. For accessing the `component api` you need to set `api-ref` props in component. All component which contains methods accept the `api-ref` prop and the type is: `(el: [ComponentName]Api) => void` e.g. `(el: AccordionApi) => void`

```vue
<template>
  <PrAccordion :api-ref="(api) => (accordionApi = api)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accordionApi = ref()
</script>
```

So with the component api you can use component `methods` by calling the method name with `componentApi.methodName()` (e.g. `accordion.toggle(2)`).

```js
accordionApi.toggle(1, false)
```

The following example is the final usage of using the component methods.

```vue example
<template>
  <a @click="accordionApi.toggle(1, false)">Toggle Accordion Item 2</a>
  <PrAccordion :list="accordionList" :api-ref="(api) => (accordionApi = api)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accordionApi = ref()

const accordionList = [
  {
    value: 1,
    title: 'Accordion Item 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    value: 2,
    title: 'Accordion Item 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    value: 3,
    title: 'Accordion Item 3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]
</script>
```

If you need component api `type` you can use `ref<ComponentApi>()` e.g. `ref<AccordionApi>()` for accessing component api types.

```js
import { AccordionApi } from '@u/types'

const accordionApi = ref<AccordionApi>()
```

You can also access the component api and methods by getting the component element target, without any `api-ref` prop. First you need to define `templateRef` for component then use `JavaScript Components` to access the `component api`. For accessing the `JavaScript Component` you need to omit the option argument to get `component api`, otherwise a new `JavaScript Component` will created.

```vue
<template>
  <PrAccordion ref="accordionEl" />
</template>

<script setup lang="ts">
import { accordion } from '@u/util'

const accordionEl = useTemplateRef('accordionEl')

// use JavaScript Functional Components without any additional args
// you have now access to component api and methods.
const accordionApi = accordion(accordionEl.value?.$el)
</script>
```

**Note** Refer to [Using Root DOM Node In Vue](https://vuejs.org/api/component-instance.html#el) for consistency it is recommend to use `api-ref` prop solution.

You can also call component `method` directly with using `[componentName][MethodName](el)` function.

```js
import { accordionToggle } from '@u/util'

accordionToggle(accordionEl, 1, false)
```

---

## Use component props

**Future doc**: Write about how use component props.

---

## Use component emits

**Future doc**: Write about how use component emits.

when using `emits` (as event) manually with component api which listed in component documentation page (e.g. [Accordion Emits](accordion.md#emits)), it will not receive **`bold`** arguments exist in the component emit lists.

---

## PrKit api and utils

**Future doc**: Write about existing api and utils.

---

## Icons & Component Icons

**Future doc**: Write about how use icons and component icons.

write about icon styles and custom icons.

---

## CSS variables

**Future doc**: Write about how to use css variables and change component css variables.

The rest of CSS Variables which not exists in the list of Component documentation page (e.g. [Accordion Css Variables](accordion.md#css-varialbes)) are component default variables or global variables that connected to component, and most of times doesn't need to be change or may change as custom or global CSS variables.

Write all CSS `color variables`.

Write about how to write custom Component `CSS/Style`.

Write about how use `hook-*-variables` for each component to override component variables without duplication.

<DocNavigation />
