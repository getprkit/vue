<!-- language=ts
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { type AccordionApi } from '@u/types'
import { accordion, icon } from '@u/util'
import PrAccordion from '@c/PrAccordion.vue'
import PrAccordionContent from '@/components/core/children/PrAccordionContent.vue'
import PrAccordionTitle from '@/components/core/children/PrAccordionTitle.vue'
import PrAccordionItem from '@cch/PrAccordionItem.vue'
import DocNavigation from '@vd/doc-navigation.vue'

const accordionEl = useTemplateRef<HTMLElement>('accordionEl')
const selected = ref()
const selectedItem = ref(3)
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

function showAlert(event: Event, index: number) {
  alert(`Item ${index} shown`)
}

onMounted(() => {
  accordion(accordionEl.value)

  const options = {
    icon: 'component-default-accordion-plus',
    ratio: 0.9,
    strokeRatio: 2,
  }

  accordionEl.value
  ?.querySelectorAll<HTMLElement>('.pr-accordion-icon')
  .forEach((el) => icon(el, options))
})
</script>
-->

# Accordion

<p class="uk-text-lead">Create a list of items that can be shown individually by clicking an item's header.</p>

## Usage

The Accordion component consists of a main container with the `PrAccordion` component, and list
items and a value, title and content for each accordion item.

```vue
<PrAccordion :list="accordionList" />
```

| Prop   | Type                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| `list` | Array<{ `value: unknown`, `title: unknown`, `content: unknown`, `disabled: Boolean`}> |

```vue example
<template>
  <PrAccordion :list="accordionList" />
</template>

<script setup lang="ts">
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

---

## Styles

There are several style modifiers available. Just add one of the style with prop `variant="styleName"` to apply a different look.

| Variant   | Description                                |
| --------- | ------------------------------------------ |
| `default` | Default accordion style (The UIKit Style). |
| `hover`   | Indicates hover style.                     |
| `line`    | Indicates line style.                      |

```vue
<PrAccordion variant="hover" />
```

```vue example
<template>
  <h4>Default Style</h4>
  <PrAccordion :list="accordionList" variant="default" />
  <hr />
  <h4>Line Style</h4>
  <PrAccordion :list="accordionList" variant="line" />
  <hr />
  <h4>Hover Style</h4>
  <PrAccordion :list="accordionList" variant="hover" />
</template>

<script setup lang="ts">
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

---

## Icon Styles

There are several icon style modifiers available. Just add one of the style with prop `icon="styleName"` to apply a different icon look and animation.

| Icon          | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| `default`     | Default icon style (The UIKit Style).                                        |
| `chevron`     | Indicates chevron Icon style.                                                |
| `plus`        | Indicates plus Icon style. just like `default` icon with different animation |
| `circle`      | Indicates circle Icon style.                                                 |
| `custom-icon` | e.g. `icon-ming-twotone-add`                                                 |
| `false`       | Without icon, type is `boolean`.                                             |

```vue
<PrAccordion icon="circle" />
```

```vue example
<template>
  <PrAccordion :list="accordionList" icon="default" />
  <hr />
  <PrAccordion :list="accordionList" icon="chevron" />
  <hr />
  <PrAccordion :list="accordionList" icon="plus" />
  <hr />
  <PrAccordion :list="accordionList" icon="circle" :icon-ratio="0.54" />
  <hr />
  <PrAccordion :list="accordionList" icon="none" />
</template>

<script setup lang="ts">
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

**Note** The `custom-icon` not contains any animation like other icon styles.

---

## Icon Ratio and Stroke Ratio

You can add the `:icon-ratio="2"` props to the `PrAccordion` component to double icon size – or any other number and you can add the `:stroke-ratio="2"` props to double icon stroke or any other number, depending on how big/thickness you want your icon to be. the default value for `icon-ratio` is: `0.7`.

```vue
<PrAccordion :icon-ratio="2" :stroke-ratio="2" />
```

```vue example
<template>
  <PrAccordion :list="accordionList" icon="default" :icon-ratio="1" />
  <hr />
  <PrAccordion :list="accordionList" icon="default" :icon-ratio="1" :stroke-ratio="2.5" />
</template>

<script setup lang="ts">
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

**NOTE** Alternatively, if you want decrease the `icon-ratio` or `stroke-ratio` you can add number between `0.1` to `0.9` to decrease the size/thickness of icons. Also `icon-ratio` will only work if `stroke-width` is defined in the svg icon.

---

## Accordion v-model

`v-model` can be used on a `PrAccordion` Component to return clicked item value that is defined in `list` prop.

```vue
<PrAccordion v-model="selected" />
```

```vue example
<template>
  <h4>Selected Item: {{ selected }}</h4>
  <PrAccordion :list="accordionList" v-model="selected" />
</template>

<script setup lang="ts">
const selected = ref()

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

**Note** The `v-model` value will return clicked item value for now and will not change with state of the `PrAccordion` component. it will change in future release.

---

## Set open items

To specify which items should be opened initially, add the `active="index"` prop to the `PrAccordion` component, e.g. `:active="1"` to show the second element (the index is zero-based).

```vue
<PrAccordion :active="1" />
```

```vue example
<template>
  <PrAccordion :list="accordionList" :active="1" />
</template>

<script setup lang="ts">
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

Alternatively, you can open a item by set the `ref` value of `v-model` prop to the `PrAccordion` component, this is the value from `list` prop items and its not the index of the list items. Note that this will overwrite the `active` props.

```vue
<template>
  <PrAccordion v-model="selectedItem" />
</template>

<script>
const selectedItem = ref(3)
</script>
```

```vue example
<template>
  <PrAccordion :list="accordionList" v-model="selectedItem" />
</template>

<script setup lang="ts">
const selectedItem = ref(3)

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

---

## No collapsing

By default, all accordion items can be collapsed. To prevent this behavior and always maintain one open item, add the `:collapsible="false"` prop to the component.

```vue
<PrAccordion :collapsible="false" />
```

```vue example
<template>
  <PrAccordion :list="accordionList" :collapsible="false" />
</template>

<script setup lang="ts">
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

**Note** The default active item when `:collapsible="false"` is `1` so if you define `v-model` when `:collapsible="false"` the `v-model` value will not get the default value until an item is clicked or you define the `v-model` ref value.

---

## Multiple open items

To display multiple content sections at the same time without one collapsing when the other one is opened, add the `multiple` prop to the `PrAccordion` component.

```vue
<PrAccordion multiple />
```

```vue example
<template>
  <PrAccordion :list="accordionList" :active="0" multiple />
</template>

<script setup lang="ts">
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

**Note** If `multiple` prop set to true, the `v-model` value will return the last clicked item value. it will improve to multiple value when `multiple` is true in future release.

---

## Slot and child components

The Accordion component consists of a child components for each accordion item. If you need more control on slots or customize contents you can follow this structure. The child components will accept same related `props` like parent `PrAccordion` component.

| Component            | Description                                                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PrAccordionItem`    | Defines and styles the toggle for each accordion item and content and has prop `tag` that define the rendered html tag for component, `disabled` will disable the item and `active` will set the item to open. |
| `PrAccordionTitle`   | Defines and styles the toggle for each accordion item. Use `<a>` elements and has prop `icon`, `icon-ratio` and `stroke-ratio`.                                                                                |
| `PrAccordionContent` | Defines the content part for each accordion item.                                                                                                                                                              |

```html
<PrAccordion>
  <PrAccordionItem>
    <PrAccordionTitle>...</PrAccordionTitle>
    <PrAccordionContent>...</PrAccordionContent>
  </PrAccordionItem>
</PrAccordion>
```

```vue example
<template>
  <PrAccordion>
    <PrAccordionItem>
      <PrAccordionTitle :stroke-ratio="2.5">Accordion Item 1</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem active>
      <PrAccordionTitle icon="chevron" :stroke-ratio="2.5">Accordion Item 2</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor reprehenderit.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem>
      <PrAccordionTitle icon="plus" :stroke-ratio="2.5">Accordion Item 3</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor reprehenderit.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem>
      <PrAccordionTitle icon="circle" :icon-ratio="0.65">Accordion Item 4</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor reprehenderit.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
  </PrAccordion>
</template>
```

**Note** If you are using the child component with slot you cannot anymore access `v-model` and must handling it manually. also set the `list` will not render any item.

---

## Component Props

Any of these props can be applied to the component. you can also pass all properties as props with v-bind object without an argument (v-bind instead of :prop-name).

| Prop               | Value                                                                                       | Default                   | Description                                                         |
| ------------------ | ------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| **`list`**         | Array                                                                                       | `undefined`               | List of array items to render in accordion                          |
| **`variant`**      | `default`,<br /> `line`,<br /> `hover`                                                      | `default`                 | Style selector for component                                        |
| **`icon`**         | `default`,<br /> `chevron`,<br /> `plus`,<br /> `circle`,<br /> `none`,<br /> `custom-icon` | `default`                 | Icon style selector for component                                   |
| **`icon-ratio`**   | Number                                                                                      | `0.7`                     | The icon size ratio.                                                |
| **`stroke-ratio`** | Number                                                                                      | `svg defined (if exists)` | The icon stroke ratio.                                              |
| **`v-model`**      | Ref                                                                                         | `undefined`               | Selected (clicked) value of item                                    |
| **`api-ref`**      | (el: AccordionApi) => void                                                                  | `undefined`               | Access the component api                                            |
| **`tag`**          | `ul`, `div`                                                                                 | `ul`                      | define the rendered html tag for component. (ul-li or div-div)      |
| `active`           | Number                                                                                      | `false`                   | Index of the element to open initially.                             |
| `animation`        | Boolean                                                                                     | `true`                    | Reveal item directly or with a transition.                          |
| `collapsible`      | Boolean                                                                                     | `true`                    | Allow all items to be closed.                                       |
| `content`          | String                                                                                      | `> .uk-accordion-content` | The content selector, which selects the accordion content elements. |
| `duration`         | Number                                                                                      | `200`                     | Animation duration in milliseconds.                                 |
| `multiple`         | Boolean                                                                                     | `false`                   | Allow multiple open items.                                          |
| `targets`          | String                                                                                      | `> *`                     | CSS selector of the element(s) to toggle.                           |
| `toggle`           | String                                                                                      | `> .uk-accordion-title`   | The toggle selector, which toggles accordion items.                 |
| `transition`       | String                                                                                      | `ease`                    | The transition                                                      |
| `offset`           | Number                                                                                      | `0`                       | Pixel offset added to scroll top.                                   |

---

## Emits

The following `emits` will be triggered on elements with the component state changes:

```js
<PrAccordion @shown="(event, index) => alert('...')" />
```

| Emit          | Type                                 | Description                                                                                    |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `@beforeshow` | `(event, index, `**`modelValue`**`)` | Fires before an item is shown. Can prevent showing by calling `preventDefault()` on the event. |
| `@show`       | `(event, index, `**`modelValue`**`)` | Fires after an item is shown.                                                                  |
| `@shown`      | `(event, index, `**`modelValue`**`)` | Fires after the item's show animation has been completed.                                      |
| `@beforehide` | `(event, index, `**`modelValue`**`)` | Fires before an item is hidden. Can prevent hiding by calling `preventDefault()` on the event. |
| `@hide`       | `(event, index, `**`modelValue`**`)` | Fires after an item's hide animation has started.                                              |
| `@hidden`     | `(event, index, `**`modelValue`**`)` | Fires after an item is hidden.                                                                 |

```vue example
<template>
  <PrAccordion :list="accordionList" @shown="showAlert" />
</template>

<script setup lang="ts">
function showAlert(event: Event, index: number, modelValue?: unknown) {
  alert(`Item ${index} shown`)
}

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

---

## Methods

The following methods are available for the component. Learn more about how [Use Component Methods](learn.md#use-component-methods).

### Toggle

```js
accordionApi.toggle(index, animate)
```

Toggles the content pane.

| Name      | Type                 | Default | Description                                  |
| --------- | -------------------- | ------- | -------------------------------------------- |
| `index`   | String, Number, Node | 0       | Accordion pane to toggle. 0 based index.     |
| `animate` | Boolean              | true    | Suppress opening animation by passing false. |

```vue example
<template>
  <a @click="accordionApi.toggle(1, true)">Toggle Accordion Item 2</a>
  <PrAccordion :list="accordionList" :api-ref="(api) => (accordionApi = api)" />
</template>

<script setup lang="ts">
import { AccordionApi } from '@u/types'

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
</script>
```

---

## Manual Initialization

Learn more about [Manually Initialization Components](learn.md#manually-initialization-component).

### HTML/CSS Structure

| Class                        | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `uk-accordion-default`       | Apply default style to the accordion.                                      |
| `pr-accordion-hover`         | Apply hover style to the accordion.                                        |
| `pr-accordion-line`          | Apply line style to the accordion.                                         |
| `uk-accordion-title`         | Defines and styles the toggle for each accordion item. Use `<a>` elements. |
| `uk-accordion-content`       | Defines the content part for each accordion item.                          |
| `uk-accordion-icon`          | Style the default icon for each accordion item.                            |
| `pr-accordion-icon`          | Style the `PrKit` icon for each accordion item.                            |
| `pr-accordion-item-disabled` | Style and disable the accordion item.                                      |
| `uk-open`                    | Specify which items should be opened initially.                            |

```html
<ul class="pr-accordion-hover">
  <li>
    <a class="uk-accordion-title">
      ...
      <span class="pr-accordion-icon uk-accordion-icon" />
    </a>
    <div class="uk-accordion-content">...</div>
  </li>
</ul>
```

### Api

```ts
import { accordion } from '@u/util'

const accordionApi = accordion(accordionEl.value)
```

### Initialization

```vue example
<template>
  <ul class="pr-accordion-hover" ref="accordionEl">
    <li>
      <a class="uk-accordion-title">
        Accordion Item 1
        <span class="pr-accordion-icon uk-accordion-icon" />
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
        <span class="pr-accordion-icon uk-accordion-icon" />
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
        <span class="pr-accordion-icon uk-accordion-icon" />
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

  // using icon Component Api to set icons for each item of accordion
  accordionEl.value
    ?.querySelectorAll<HTMLElement>('.pr-accordion-icon')
    .forEach((el) => icon(el, options))
})
</script>
```

---

## Accessibility

The `PrAccordion` component adheres to the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) and automatically sets the appropriate WAI-ARIA roles, states and properties.

- The _titles_ have an ID, the `button` role, the `aria-expanded` state and the `aria-controls` property set to the ID of the respective content.
- The _contents_ have an ID, the `region` role and the `aria-labelledby` property set to the ID of the respective title.

### Keyboard interaction

The Accordion component can be accessed through the keyboard using the following keys.

- The <kbd>tab</kbd> or <kbd>shift+tab</kbd> keys navigate through accordion titles.
- The <kbd>enter</kbd> or <kbd>space</kbd> key toggles the content of the focused title.

<DocNavigation />
