<!-- language=ts
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
// JavaScript Component Api
// import { type AccordionApi } from '@u/types'
// JavaScript Component
// import { accordion } from '@u/util'
// Main Component Import
// import PrAccordion from '@c/PrAccordion.vue'
// ...Child component imports
import DocNavigation from '@vd/doc-navigation.vue'

// For component that contains emits
// function showAlert(event: Event, index: number) {
//   alert(`Item ${index} shown`)
// }

// For usage of JavaScript Component
// const accordionEl = useTemplateRef<HTMLElement>('accordionEl')
// const accordionApi = ref<AccordionApi>()
//
// onMounted(() => {
//   accordion(accordionEl.value)
// })
</script>
-->

# Accordion

<p class="uk-text-lead">....Component Description</p>

## Usage

The component usages and contains description `PrAccordion`.

```vue
<PrAccordion />
```

| Prop                | Type                      |
| ------------------- | ------------------------- |
| `componentMainProp` | component main prop type. |

```vue example
<template>
  <PrAccordion />
</template>

<script setup lang="ts">
// ....
</script>
```

---

## Style modifiers

There are several style modifiers available. Just set the variant prop to one of the available styles `variant="styleName"` to apply a different look.

| Variant   | Description              |
| --------- | ------------------------ |
| `default` | Default accordion style. |
| `style1`  | Indicates style1 style.  |
| `....`    | Indicates .... style.    |

```vue
<PrAccordion variant="hover" />
```

```vue example
<template>
  <h4>Default Style</h4>
  <PrAccordion variant="default" />
  <hr />
  <h4>Style1 Style</h4>
  <PrAccordion variant="style1" />
  <hr />
  <h4>.... Style</h4>
  <PrAccordion variant="...." />
</template>

<script setup lang="ts">
// ....
</script>
```

---

## Icon modifiers

There are several icon modifiers available. Just set the `icon` prop to one of the available options `icon="iconName"` to change the accordion icon. Learn more about [Component Icons](icon.md).

| Icon          | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| `default`     | Default icon.                                                             |
| `style1`      | Indicates style1 Icon.                                                    |
| `....`        | Indicates .... Icon.                                                      |
| `custom-icon` | e.g. `component-ming-twotone-accordion-circle` or `icon-ming-twotone-add` |
| `false`       | Without icon, type is `boolean`.                                          |

```vue
<PrAccordion icon="circle" />
```

```vue example
<template>
  <PrAccordion icon="default" />
  <hr />
  <PrAccordion icon="style1" />
  <hr />
  <PrAccordion icon="...." />
  <hr />
  <PrAccordion :icon="false" />
</template>

<script setup lang="ts">
// ....
</script>
```

**Note** The `custom-icon` not contains any animation like other icon styles.

---

## Icon Ratio and Stroke Ratio

You can set the `:icon-ratio="2"` props to the `PrAccordion` component to double icon size – or any other number to adjust its size. You can also set the `:stroke-ratio="2"` props to double icon stroke - or any other number to adjust its thickness. the default value for alert `icon-ratio` is: `1`.

```vue
<PrAccordion :icon-ratio="2" :stroke-ratio="2" />
```

```vue example
<template>
  <PrAccordion icon="default" :icon-ratio="1" />
  <hr />
  <PrAccordion icon="default" :icon-ratio="1" :stroke-ratio="2.5" />
</template>

<script setup lang="ts">
// ....
</script>
```

**NOTE** Alternatively, if you want decrease the `icon-ratio` or `stroke-ratio` you can add number between `0.1` to `0.9` to decrease the size/thickness of icons. Also `icon-ratio` will only work if `stroke-width` is defined in the svg icon.

---

## Each component props/options description and examples

---

## Slot and child components

The Accordion component consists of a child components for each accordion item. If you need more control on slots or customize contents you can follow this structure. The child components will accept same related `props` like parent `PrAccordion` component.

| Component            | Description                                                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PrAccordionItem`    | Defines and styles the toggle for each accordion item and content and has prop `tag` that define the rendered html tag for component, `disabled` will disable the item and `active` will set the item to open. |
| `PrAccordionTitle`   | Defines and styles the toggle for each accordion item. Use `<a>` elements and has prop `icon`, `icon-ratio` and `stroke-ratio`.                                                                                |
| `PrAccordionContent` | Defines the content part for each accordion item.                                                                                                                                                              |
| `....`               | Description of defines and styles of .... . write accepted props also.                                                                                                                                         |

```html
<PrAccordion>
  <PrChildComponent1>
    <PrChildComponent2>...</PrChildComponent2>
    ....
  </PrChildComponent1>
</PrAccordion>
```

```vue example
<template>
  <PrAccordion>
    <PrChildComponent1>
      <PrChildComponent2 props>....</PrChildComponent2>
      ....
    </PrChildComponent1>
  </PrAccordion>
</template>
```

**Note** If you are using the child component with slot you cannot anymore access `v-model` and must handling it manually. also set the `list` will not render any item.

---

## Component Props

Any of these props can be applied to the component. you can also pass all properties as props with v-bind object without an argument (v-bind instead of :prop-name).

| Prop                     | Value                                                                                        | Default                   | Description                         |
| ------------------------ | -------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------- |
| **`main-prop`**          | Array                                                                                        | `default-value`           | Main prop description.              |
| **`variant`**            | `default`,<br /> `line`,<br /> `hover`                                                       | `default`                 | Style selector for component        |
| **`icon`**               | `default`,<br /> `chevron`,<br /> `plus`,<br /> `circle`,<br /> `false`,<br /> `custom-icon` | `default`                 | Icon style selector for component   |
| **`icon-ratio`**         | Number                                                                                       | `0.7`                     | The icon size ratio.                |
| **`stroke-ratio`**       | Number                                                                                       | `svg defined (if exists)` | The icon stroke ratio.              |
| **`v-model`**            | Ref                                                                                          | `undefined`               | Selected (clicked) value of item    |
| **`api-ref`**            | (el: AccordionApi) => void                                                                   | `undefined`               | Access the component api            |
| **`component-prop-1`**   | `ul`, `div`                                                                                  | `default-value`           | Component prop 2 description.       |
| **`....`**               | `ul`, `div`                                                                                  | `default-value`           | Component prop 1 description.       |
| `uikit-component-props1` | Type                                                                                         | `default-value`           | UIkit component props1 description. |
| `uikit-component-props2` | Type                                                                                         | `default-value`           | UIkit component props1 description. |

---

## Emits

The following `emits` will be triggered on elements with the component state changes:

```vue
<PrAccordion @shown="(event, index) => alert('...')" />
```

| Emit          | Type             | Description                                                                                    |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `@beforeshow` | `(event, index)` | Fires before an item is shown. Can prevent showing by calling `preventDefault()` on the event. |
| `@show`       | `(event, index)` | Fires after an item is shown.                                                                  |
| `@shown`      | `(event, index)` | Fires after the item's show animation has been completed.                                      |
| `@beforehide` | `(event, index)` | Fires before an item is hidden. Can prevent hiding by calling `preventDefault()` on the event. |
| `@hide`       | `(event, index)` | Fires after an item's hide animation has started.                                              |
| `@hidden`     | `(event, index)` | Fires after an item is hidden.                                                                 |

```vue example
<template>
  <PrAccordion @shown="showAlert" />
</template>

<script setup lang="ts">
function showAlert(event: Event, index: number) {
  alert(`Item ${index} shown`)
}
</script>
```

---

## Methods

The following methods are available for the component. Learn more about how [Use Component Methods](learn.md#use-component-methods).

### Method1

```js
accordionApi.method1(....)
```

Method1 description.

| Name          | Type | Default      | Description                  |
| ------------- | ---- | ------------ | ---------------------------- |
| `methodArgs1` | Type | defaultValue | Method arg 1 description.    |
| `....`        | Type | defaultValue | Method arg .... description. |

```vue example
<template>
  <a @click="accordionApi.method(call)">....</a>
  <PrAccordion :api-ref="(api) => (accordionApi = api)" />
</template>

<script setup lang="ts">
import { AccordionApi } from '@u/types'

const accordionApi = ref<AccordionApi>()
</script>
```

---

## Manual Initialization

Learn more about [Manually Initialization Components](learn.md#manually-initialization-component).

### HTML/CSS Structure

| Class                        | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `uk-accordion`               | Apply base style to the accordion.                                         |
| `uk-accordion-default`       | Apply default style to the accordion.                                      |
| `uk-accordion-pill`          | Apply pill style to the accordion.                                         |
| `uk-accordion-line`          | Apply line style to the accordion.                                         |
| `uk-accordion-title`         | Defines and styles the toggle for each accordion item. Use `<a>` elements. |
| `uk-accordion-content`       | Defines the content part for each accordion item.                          |
| `uk-accordion-icon`          | Style the default icon for each accordion item.                            |
| `uk-accordion-icon`          | Style the `PrKit` icon for each accordion item.                            |
| `uk-accordion-item-disabled` | Style and disable the accordion item.                                      |
| `uk-open`                    | Specify which items should be opened initially.                            |
| `.....`                      | Apply line style to the accordion.                                         |

```html
<ul class="uk-accordion-pill">
  <li>
    <a class="uk-accordion-title">
      ....
      <span class="uk-accordion-icon" />
    </a>
    <div class="uk-accordion-content">....</div>
  </li>
</ul>
```

### HTML attribute Initialization

Initialize the accordion using the `uk-*` or `data-uk-*` attributes without writing any JavaScript:

| Attribute      | Description                                              |
| -------------- | -------------------------------------------------------- |
| `uk-accordion` | Apply accordion JavaScript component to a block element. |
| `uk-icon`      | Apply icon component to a `<span>` or `<a>` element.     |

```html example
<div class="uk-accordion-class1 uk-accordion-class1" uk-accordion>....HTML and CSS structure.</div>
```

### JavaScript Initialization

```ts
import { accordion } from '@u/util'

const accordionApi = accordion(accordionEl.value)
```

Initialize the accordion manually using its JavaScript function:

```vue example
<template>
  <div class="uk-accordion-class1 uk-accordion-class1" ref="accordionEl">
    ....HTML and CSS structure.
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { accordion } from '@u/util'

const accordionEl = useTemplateRef<HTMLElement>('accordionEl')

onMounted(() => {
  const accordionApi = accordion(accordionEl.value)
})
</script>
```

---

## CSS variables

The following CSS variables can be used to customize the accordion. The values shown are the default values. Learn more about [Changing Component CSS Variables](learn.md#css-variables).

<!-- prettier-ignore -->
```css
.uk-accordion {
  --accordion-default-item-margin-top:             var(--global-margin);
  --accordion-default-title-hover-color:           var(--global-color);
  --accordion-default-content-margin-top:          var(--global-margin);

  --accordion-pill-title-line-height:              1;
  --accordion-pill-title-background:               var(--global-default-color);
  --accordion-pill-title-hover-background:         var(--global-muted-color);

  /* Inverse */
  --inverse-accordion-title-color:                 var(--inverse-global-color-emphasis);
  --inverse-accordion-icon-color:                  var(--inverse-global-color);

  --inverse-accordion-disabled-title-color:        var(--inverse-global-color-muted);
  --inverse-accordion-disabled-icon-color:         var(--inverse-global-color-muted);
}
```

---

## Accessibility

UIkit Accessibility descriptions.

<DocNavigation />
