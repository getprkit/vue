<!-- language=ts
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { type AlertApi } from '@u/types'
import { alert, icon } from '@u/util'
import PrAlert from '@c/PrAlert.vue'
import PrAlertIcon from '@cch/PrAlertIcon.vue'
import PrAlertClose from '@cch/PrAlertClose.vue'
import DocNavigation from '@vd/doc-navigation.vue'

const alertEl = useTemplateRef<HTMLElement>('alertEl')
const alertApi = ref<AlertApi>()

function showAlert(event: Event) {
  window.alert(`Alert hidden`)
}

onMounted(() => {
  const alertApi = alert(alertEl.value)

  // using icon Component Api to set icons for alert icon and close icon
  const iconEl = alertEl.value?.querySelector<HTMLElement>('.uk-alert-icon')
  iconEl && icon(iconEl, {
    icon: 'component-default-alert-primary',
  })

  const closeIconEl = alertEl.value?.querySelector<HTMLElement>('.uk-alert-close')
  closeIconEl && icon(closeIconEl, {
    icon: 'component-default-alert-close',
    ratio: 0.5,
  })
})
</script>
-->

# Alert

<p class="uk-text-lead">Display default, muted, primary, info, success, warning and error messages.</p>

## Usage

To use this component, wrap your content with the `PrAlert` component.

```vue
<PrAlert>....</PrAlert>
```

```vue example
<template>
  <PrAlert>Your account details have been saved. You can update them at any time.</PrAlert>
  <PrAlert variant="primary">
    <h5 class="uk-text-semibold">Profile Updated</h5>
    <p class="uk-margin-small-top">
      Your profile details are up to date. You can change them whenever you need.
    </p>
  </PrAlert>
</template>
```

---

## Style modifiers

There are several style modifiers available. Just set the variant prop to one of the available styles `variant="styleName"` to apply a different look.

| Variant   | Description                                            |
| --------- | ------------------------------------------------------ |
| `default` | Indicates a general message.                           |
| `muted`   | Default alert style, Indicates less prominent message. |
| `primary` | Give the message a prominent styling.                  |
| `info`    | Indicates a message containing a information.          |
| `success` | Indicates success or a positive message.               |
| `warning` | Indicates a message containing a warning.              |
| `danger`  | Indicates an important or error message.               |

```vue
<PrAlert variant="primary">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="default">
    Your profile details have been saved. Your latest changes are now visible.
  </PrAlert>
  <PrAlert>Your notification preferences have been saved. You can change them any time.</PrAlert>
  <PrAlert variant="primary">
    A new workspace feature is available. Open settings to explore what is new.
  </PrAlert>
  <PrAlert variant="info">
    Your order has shipped. You can follow delivery progress in your order history.
  </PrAlert>
  <PrAlert variant="success">
    Your email address is verified. You can now receive updates at this address.
  </PrAlert>
  <PrAlert variant="warning">
    Your plan renews soon. Check billing details before the next payment date.
  </PrAlert>
  <PrAlert variant="danger">
    We could not complete your payment. Please check your payment method.
  </PrAlert>
</template>
```

---

## Bordered

Set the `bordered` prop to display alert with a border. When combined with the `variant` prop, the border color automatically matches the selected variant.

```vue
<PrAlert bordered>....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="default" bordered>
    Your profile details are up to date. You can change them whenever you need.
  </PrAlert>
  <PrAlert bordered>
    Your account preferences have been saved. You can change them at any time.
  </PrAlert>
  <PrAlert variant="primary" bordered>
    A new dashboard layout is available. Explore the updated navigation and tools.
  </PrAlert>
  <PrAlert variant="info" bordered>
    Account features will be unavailable tonight during scheduled maintenance.
  </PrAlert>
  <PrAlert variant="success" bordered>
    Your payment was processed successfully. A receipt is on its way to your inbox.
  </PrAlert>
  <PrAlert variant="warning" bordered>
    Your subscription renews in five days. Review your plan before the billing date.
  </PrAlert>
  <PrAlert variant="danger" bordered>
    Your payment could not be processed. Please update your billing details.
  </PrAlert>
</template>
```

---

## Icon modifiers

There are several icon modifiers available. Just set the `icon` prop to one of the available options `icon="iconName"` to change the alert icon. Learn more about [Component Icons](icon.md).

| Icon          | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `default`     | Adds an message icon.                                             |
| `muted`       | Adds an sleep icon.                                               |
| `primary`     | Adds an classify icon.                                            |
| `info`        | Adds an announcement icon.                                        |
| `success`     | Adds an celebrate icon.                                           |
| `warning`     | Adds an flash icon.                                               |
| `danger`      | Adds an report icon.                                              |
| `custom-icon` | e.g. `icon-fa-regular-bell` or `component-fa-solid-alert-primary` |
| `true`        | Adds the default icon for the selected `variant`.                 |
| `false`       | Without icon, default prop.                                       |

```vue
<PrAlert icon>....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="default" icon bordered>
    Your profile is ready to review. You can update details in account settings.
  </PrAlert>
  <PrAlert bordered icon>
    Preferences have been saved. Changes will apply next time you sign in.
  </PrAlert>
  <PrAlert variant="primary" icon bordered>
    A new feature is available. Explore the updated tools and settings.
  </PrAlert>
  <PrAlert variant="info" icon bordered>
    Your order is confirmed. We will send an update when it is ready to ship.
  </PrAlert>
  <PrAlert variant="success" icon bordered>
    Your account is verified. You can now access all available features.
  </PrAlert>
  <PrAlert variant="warning" icon bordered>
    Your subscription renews soon. Review your plan and billing details.
  </PrAlert>
  <PrAlert variant="danger" icon bordered>
    We could not verify your payment. Please check your billing details.
  </PrAlert>
</template>
```

---

## Icon box

Use the `icon-box` prop on an alert to display alert icon inside a box. The box color automatically matches the selected `variant`.

```vue
<PrAlert icon icon-box>....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="muted" icon icon-box bordered>
    Your preferences updated. Choose which account updates you receive.
  </PrAlert>
  <PrAlert variant="primary" icon icon-box bordered>
    A new feature is ready. Open your workspace to see the changes.
  </PrAlert>
  <PrAlert variant="info" icon icon-box bordered>
    <p>A new delivery option is available. Review the choices before confirming.</p>
  </PrAlert>
  <PrAlert variant="success" icon icon-box bordered>
    Your payment is complete. You can find transaction in your billing history.
  </PrAlert>
  <PrAlert variant="warning" icon icon-box bordered>
    Your subscription renews soon. Make sure your payment are still valid.
  </PrAlert>
  <PrAlert variant="danger" icon icon-box bordered>
    Your payment was declined. Try another method or contact bank for help.
  </PrAlert>
</template>
```

---

## Icon Ratio and Stroke Ratio

You can set the `:icon-ratio="2"` props to the `PrAlert` component to double icon size – or any other number to adjust its size. You can also set the `:stroke-ratio="2"` props to double icon stroke - or any other number to adjust its thickness. the default value for alert `icon-ratio` is: `1`.

```vue
<PrAlert icon :icon-ratio="2" :stroke-ratio="2">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="success" icon :icon-ratio="1.5" bordered>
    Your payment is complete. A receipt are available in your billing history.
  </PrAlert>
  <PrAlert variant="success" icon :icon-ratio="1.5" :stroke-ratio="1.5" bordered>
    Your payment is complete. A receipt are available in your billing history.
  </PrAlert>
</template>
```

**NOTE** Alternatively, if you want decrease the `icon-ratio` or `stroke-ratio` you can add number between `0.1` to `0.9` to decrease the size/thickness of icons. Also `icon-ratio` will only work if `stroke-width` is defined in the svg icon.

---

## Close button

To disable close button and its functionality, set the `:close="false"` prop to alert component. Learn more about how [Use Close component](close.md).

```vue
<PrAlert :close="false">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="danger" :close="false">
    Your account could not be verified. Please review your details and try again.
  </PrAlert>
</template>
```

---

## Close Style

To change the close button style, set the `close-variant="styleName"` prop to the alert component. The close button colors automatically match the selected `variant`.

| close variant | Description                    |
| ------------- | ------------------------------ |
| `default`     | Default close style.           |
| `pill`        | Indicates pill style.          |
| `pill-hover`  | Indicates pill style on hover. |
| `pill-solid`  | Indicates solid pill style.    |

```vue
<PrAlert close-variant="pill">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="primary" close-variant="pill-hover" bordered>
    A new workspace feature is available. Open the dashboard to explore it.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill" bordered>
    A new workspace feature is available. Open the dashboard to explore it.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill-solid" bordered>
    A new workspace feature is available. Open the dashboard to explore it.
  </PrAlert>
</template>
```

---

## Close position

You can change the position of close button with the `close-position="positionName"` prop.

| close position | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `top`          | Positions the close button on the top-end edge of the alert.   |
| `corner`       | Positions the close button on the top-end corner of the alert. |
| `end`          | Positions the close button on the end border of the alert.     |

```vue
<PrAlert close-position="position">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="primary" close-variant="pill-solid" close-position="top" bordered>
    Your email address is verified. You can now receive account notifications.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill-solid" close-position="corner" bordered>
    Your email address is verified. You can now receive account notifications.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill-solid" close-position="end" bordered>
    Your email address is verified. You can now receive account notifications.
  </PrAlert>
</template>
```

---

## Close icon ratio and stroke ratio

You can set the `:close-icon-ratio="2"` props to the `PrAlert` component to double close icon size – or any other number to adjust its size. You can also set the `:close-stroke-ratio="2"` props to double icon stroke - or any other number to adjust its thickness. the default value for alert `icon-ratio` is: `1`.

```vue
<PrAlert :close-icon-ratio="0.7" :close-stroke-ratio="2">....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="primary" close-variant="pill-solid" :close-icon-ratio="0.7" bordered>
    Your subscription has been renewed. Your plan and features remain active.
  </PrAlert>
  <PrAlert
    variant="primary"
    close-variant="pill-solid"
    :close-icon-ratio="0.7"
    :close-stroke-ratio="2"
    bordered
  >
    Your subscription has been renewed. Your plan and features remain active.
  </PrAlert>
</template>
```

---

## Close Icon Animation

Set the `close-icon-animation` prop to add a rotation animation to the close icon.

```vue
<PrAlert close-icon-animation>....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="success" icon close-icon-animation bordered>
    Your payment is complete. You can use your receipt for future reference.
  </PrAlert>
</template>
```

---

## Close circle

For changing the border radius of close button to circle, add `close-circle` prop to alert component.

```vue
<PrAlert close-circle>....</PrAlert>
```

```vue example
<template>
  <PrAlert variant="primary" close-variant="pill-hover" close-circle bordered>
    Your email address is confirmed. You can use it for account notifications.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill" close-circle bordered>
    Your email address is confirmed. You can use it for account notifications.
  </PrAlert>
  <PrAlert variant="primary" close-variant="pill-solid" close-circle bordered>
    Your email address is confirmed. You can use it for account notifications.
  </PrAlert>
</template>
```

---

## Slot and child components

The Alert component consists of a child components for alert icon and alert close. If you need more control on slots or customize contents you can follow this structure. The child components will accept same related `props` like parent `PrAlert` component.

| Component      | Description                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PrAlertIcon`  | Defines and styles the icon for alert and has prop: `icon` which change the icon style, `icon-ratio` will adjust icon size and `stroke-ratio` to adjust icon thickness .                                                                                                                                                                                                                                  |
| `PrAlertClose` | Defines and styles the close button for alert and has props: `close` which disable button, `close-icon` which change the icon style, `close-icon-ratio` will adjust icon size, `close-stroke-ratio` ti adjust icon thickness, `close-variant` will change the style of close button, `close-circle` will modify close border radius to circle and `close-position` will change the close button position. |

```html
<PrAlert :close="false">
  <PrAlertClose />
  <PrAlertIcon />
  ....
</PrAlert>
```

```vue example
<template>
  <PrAlert variant="success" :close="false">
    <PrAlertClose :close-icon="false" close-variant="pill-solid">Close</PrAlertClose>
    <PrAlertIcon icon="success" />
    <p>Your account is verified. You can now access the features.</p>
  </PrAlert>
</template>
```

**NOTE** Note that when using alert child components you must always set `:close="false"` prop for alert component.

---

## Component Props

Any of these props can be applied to the component. you can also pass all properties as props with v-bind object without an argument (v-bind instead of :prop-name).

| Prop                       | Value                                                                                                                             | Default                   | Description                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| **`variant`**              | `default`,<br /> `muted`,<br /> `primary`,<br /> `success`,<br /> `warning`,<br /> `danger`                                       | `muted`                   | Style selector for component.                                                        |
| **`bordered`**             | Boolean                                                                                                                           | `false`                   | Border style for component.                                                          |
| **`icon`**                 | Boolean, <br /> `default`,<br /> `muted`,<br /> `primary`,<br /> `success`,<br /> `warning`,<br /> `danger`, <br /> `custom-icon` | `default`                 | Icon style selector for component.                                                   |
| **`icon-box`**             | Boolean                                                                                                                           | `false`                   | Display alert icon inside a box.                                                     |
| **`icon-ratio`**           | Number                                                                                                                            | `1`                       | The icon size ratio.                                                                 |
| **`stroke-ratio`**         | Number                                                                                                                            | `svg defined (if exists)` | The icon stroke ratio.                                                               |
| **`close`**                | Boolean                                                                                                                           | `true`                    | Disable/Enable close button.                                                         |
| **`close-variant`**        | `default`,<br /> `pill`,<br /> `pill-hover`,<br /> `pill-solid`                                                                   | `default`                 | Style selector for close button.                                                     |
| **`close-position`**       | `default`,<br /> `top`,<br /> `corner`,<br /> `end`                                                                               | `default`                 | Change the position of close button.                                                 |
| **`close-icon`**           | `custom-icon`                                                                                                                     | `component-default-alert` | Icon style selector for close button.                                                |
| **`close-iconRatio`**      | Number                                                                                                                            | `1`                       | The close icon size ratio.                                                           |
| **`close-stroke-ratio`**   | Number                                                                                                                            | `svg defined (if exists)` | The close icon stroke ratio.                                                         |
| **`close-text`**           | String                                                                                                                            | `undefined`               | Displays text next to the close icon. Set `close-icon` to `false` to show text only. |
| **`close-circle`**         | Boolean                                                                                                                           | `false`                   | Modify close border radius to circle.                                                |
| **`close-icon-animation`** | Boolean                                                                                                                           | `false`                   | Add rotate animation to close icon.                                                  |
| **`api-ref`**              | (el: AlertApi) => void                                                                                                            | `undefined`               | Access the component api.                                                            |
| `animation`                | Boolean, String                                                                                                                   | `true`                    | Space-separated names of animations.                                                 |
| `duration`                 | Number                                                                                                                            | `150`                     | Animation duration in milliseconds.                                                  |
| `selClose`                 | CSS selector                                                                                                                      | `.uk-alert-close`         | The close trigger element.                                                           |

---

## Emits

The following `emits` will be triggered on elements with the component state changes:

```vue
<PrAlert @hide="(event) => alert('....')">....</PrAlert>
```

| Emit          | Type      | Description                                                                                    |
| ------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `@beforehide` | `(event)` | Fires before an item is hidden. Can prevent hiding by calling `preventDefault()` on the event. |
| `@hide`       | `(event)` | Fires after an item's hide animation has started.                                              |
| `@hidden`     | `(event)` | Fires after an item is hidden.                                                                 |

```vue example
<template>
  <PrAlert variant="primary" @hidden="showAlert">
    <p>A dashboard update is available. Review the latest changes to your workspace.</p>
  </PrAlert>
</template>

<script setup lang="ts">
function showAlert(event: Event) {
  window.alert(`Alert hidden`)
}
</script>
```

---

## Methods

The following methods are available for the component. Learn more about how [Use Component Methods](learn.md#use-component-methods).

### Close

```js
alertApi.close(animate)
```

Closes and removes the Alert.

| Name      | Type    | Default | Description                                  |
| --------- | ------- | ------- | -------------------------------------------- |
| `animate` | boolean | true    | Suppress closing animation by passing false. |

```vue example
<template>
  <a @click="alertApi.close(0)">Close Alert</a>
  <PrAlert variant="primary" :close="false" :api-ref="(api) => (alertApi = api)">
    <p>Your account settings are updated. You can continue with your new preferences.</p>
  </PrAlert>
</template>

<script setup lang="ts">
import { AlertApi } from '@u/types'

const alertApi = ref<AlertApi>()
</script>
```

---

## Manual Initialization

Learn more about [Manually Initialization Components](learn.md#manually-initialization-component).

### HTML/CSS Structure

| Class                       | Description                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `uk-alert`                  | Applies base style to the alert.                                                      |
| `uk-alert-default`          | Applies general style to the alert.                                                   |
| `uk-alert-muted`            | Applies less prominent style to the alert.                                            |
| `uk-alert-primary`          | Applies prominent style to the alert.                                                 |
| `uk-alert-info`             | Applies informational style to the alert.                                             |
| `uk-alert-success`          | Applies positive style to the alert.                                                  |
| `uk-alert-warning`          | Applies warning style to the alert.                                                   |
| `uk-alert-danger`           | Applies important or error style to the alert.                                        |
| `uk-alert-bordered`         | Display alert with a border, the color automatically matches the alert style.         |
| `uk-alert-icon`             | Style the icon for alert.                                                             |
| `uk-alert-icon-box`         | Display alert icon inside a box, The box color automatically matches the alert style. |
| `uk-alert-close`            | Styles alert close button.                                                            |
| `uk-alert-close-pill`       | Display pill style for close button.                                                  |
| `uk-alert-close-pill-hover` | Display pill style on hover for close button.                                         |
| `uk-alert-close-pill-solid` | Display solid pill style for close button.                                            |
| `uk-alert-close-circle`     | Changing border radius of close button to circle.                                     |
| `uk-alert-close-top`        | Positions close button on the top-end edge of the alert.                              |
| `uk-alert-close-corner`     | Positions close button on the top-end corner of the alert.                            |
| `uk-alert-close-end`        | Positions close button on the end border of the alert.                                |

```html
<div class="uk-alert-primary uk-alert-bordered">
  <a href="" class="uk-alert-close uk-alert-pill"></a>
  <span class="uk-alert-icon" />
  ....
</div>
```

### HTML attribute Initialization

Initialize the alert using the `uk-*` or `data-uk-*` attributes without writing any JavaScript:

| Attribute  | Description                                          |
| ---------- | ---------------------------------------------------- |
| `uk-alert` | Apply alert JavaScript component to a block element. |
| `uk-icon`  | Apply icon component to a `<span>` or `<a>` element  |

```html example
<div class="uk-alert-primary" uk-alert>
  <a href="" class="uk-alert-close" uk-icon="icon: component-default-alert-close; ratio: 0.5" />
  <span class="uk-alert-icon" uk-icon="component-default-alert-primary" />
  Your account updated. You can review profile details and preferences.
</div>
```

### JavaScript Initialization

```ts
import { alert } from '@u/util'

const alertApi = alert(alertEl.value)
```

Initialize the alert manually using its JavaScript function:

```vue example
<template>
  <div class="uk-alert-primary uk-alert-bordered" ref="alertEl">
    <a href="" class="uk-alert-close uk-alert-pill" />
    <span class="uk-alert-icon" />
    Your account updated. You can review profile details and preferences.
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { alert, icon } from '@u/util'

const alertEl = useTemplateRef<HTMLElement>('alertEl')

onMounted(() => {
  const alertApi = alert(alertEl.value)

  // using icon Component Api to set icons for alert icon and close icon
  const iconEl = alertEl.value?.querySelector<HTMLElement>('.uk-alert-icon')
  iconEl &&
    icon(iconEl, {
      icon: 'component-default-alert-primary',
    })

  const closeIconEl = alertEl.value?.querySelector<HTMLElement>('.uk-alert-close')
  closeIconEl &&
    icon(iconEl, {
      icon: 'component-default-alert-close',
      ratio: 0.5,
    })
})
</script>
```

---

## CSS variables

The following CSS variables can be used to customize the alert. The values shown are the default values. Learn more about [Changing Component CSS Variables](learn.md#css-variables).

<!-- prettier-ignore -->
```css
.uk-alert {
  --alert-margin-vertical:                             var(--global-margin);
  --alert-padding:                                     var(--global-small-gutter);

  --alert-border-width:                                var(--global-border-width);
  --alert-border-color:                                transparent;
  --alert-border-radius:                               var(--global-border-radius-default);

  --alert-gap:                                         var(--global-small-gutter);

  --alert-close-border-radius:                         var(--global-border-radius-default);

  --alert-close-opacity:                               0.2;
  --alert-close-hover-opacity:                         0.5;
  --alert-close-active-opacity:                        0.8;
  --alert-close-background-opacity:                    0.2;
  --alert-close-background-hover-opacity:              0.4;
  --alert-close-background-active-opacity:             0.6;

  --alert-close-min-height:                            32px;
  --alert-close-min-width:                             var(--alert-close-min-height);
  --alert-close-padding:                               var(--global-xxsmall-gutter);

  --alert-close-top:                                   ~'min(((var(--alert-padding) / 2) - (var(--alert-close-margin-base-top) / 2)), 7px)';
  --alert-close-inline-end:                            0;

  --alert-close-margin-base-top:                       5px;
  --alert-close-margin-base-inline-end:                10px;
  --alert-close-margin-top:                            calc(var(--alert-close-margin-base-top) - var(--alert-padding));
  --alert-close-margin-inline-end:                     calc(var(--alert-close-margin-base-inline-end) - var(--alert-padding));

  --alert-close-end-margin-inline-end:                 calc((var(--alert-padding) + var(--alert-close-min-width)) * -1);
  --alert-close-end-x:                                 ~'translateX(calc((50% - var(--alert-close-min-height)) * var(--uk-dir-sign)))';

  --alert-close-top-y:                                 translateY(-50%);
  --alert-close-top-margin-top:                        calc(var(--alert-padding) * -1);

  --alert-close-corner-top:                            6px;
  --alert-close-corner-inline-end:                     var(--alert-close-corner-top);

  --alert-icon-box-padding:                            5px;
  --alert-icon-box-icon-padding:                       8px;

  --alert-icon-box-close-margin-base-top:              5px;
  --alert-icon-box-close-margin-base-inline-end:       5px;
  --alert-icon-box-close-margin-top:                   calc(var(--alert-icon-box-close-margin-base-top) - var(--alert-icon-box-padding));
  --alert-icon-box-close-margin-inline-end:            calc(var(--alert-icon-box-close-margin-base-inline-end) - var(--alert-icon-box-padding));
  --alert-icon-box-close-margin-bottom:                var(--alert-icon-box-close-margin-base-inline-end);
  --alert-icon-box-close-top:                          ~'min(var(--alert-icon-box-padding), 6px)';

  --alert-icon-box-border-radius:                      var(--global-border-radius-default);

  --alert-icon-box-close-end-margin-inline-end:        calc((var(--alert-icon-box-padding) + var(--alert-close-min-width)) * -1);
  --alert-icon-box-close-end-x:                        ~'translateX(calc((50% - var(--alert-close-min-height)) * var(--uk-dir-sign)))';

  --alert-icon-box-close-top-margin-top:               calc(var(--alert-icon-box-padding) * -1);

  --alert-icon-box-close-corner-top:                   6px;
  --alert-icon-box-close-corner-inline-end:            var(--alert-icon-box-close-corner-top);

  --alert-default-background:                          var(--global-default-color);
  --alert-default-color:                               var(--global-muted-color-700);

  --alert-muted-background:                            var(--global-muted-color);
  --alert-muted-color:                                 var(--global-muted-color-700);

  --alert-primary-background:                          var(--global-primary-color-100);
  --alert-primary-color:                               var(--global-primary-color-700);

  --alert-info-background:                             var(--global-info-color-100);
  --alert-info-color:                                  var(--global-info-color-700);

  --alert-success-background:                          var(--global-success-color-100);
  --alert-success-color:                               var(--global-success-color-700);

  --alert-warning-background:                          var(--global-warning-color-100);
  --alert-warning-color:                               var(--global-warning-color-700);

  --alert-danger-background:                           var(--global-danger-color-100);
  --alert-danger-color:                                var(--global-danger-color-700);

  --alert-bordered-border-color-default:               var(--global-border);
  --alert-bordered-border-color-muted:                 var(--global-border);
  --alert-bordered-border-color-primary:               var(--global-primary-color-200);
  --alert-bordered-border-color-info:                  var(--global-info-color-200);
  --alert-bordered-border-color-success:               var(--global-success-color-200);
  --alert-bordered-border-color-warning:               var(--global-warning-color-200);
  --alert-bordered-border-color-danger:                var(--global-danger-color-200);

  --alert-icon-box-color:                              var(--global-default-color);

  --alert-icon-box-background-default:                 var(--global-muted-color-500);
  --alert-icon-box-background-muted:                   var(--global-muted-color-500);
  --alert-icon-box-background-primary:                 var(--global-primary-color);
  --alert-icon-box-background-info:                    var(--global-info-color);
  --alert-icon-box-background-success:                 var(--global-success-color);
  --alert-icon-box-background-warning:                 var(--global-warning-color);
  --alert-icon-box-background-danger:                  var(--global-danger-color);

  --alert-close-pill-background-default:               var(--global-muted-color-300);
  --alert-close-pill-background-muted:                 var(--global-muted-color-300);
  --alert-close-pill-background-primary:               var(--global-primary-color-300);
  --alert-close-pill-background-info:                  var(--global-info-color-300);
  --alert-close-pill-background-success:               var(--global-success-color-300);
  --alert-close-pill-background-warning:               var(--global-warning-color-300);
  --alert-close-pill-background-danger:                var(--global-danger-color-300);

  --alert-close-pill-solid-background:                 var(--global-default-color);

  --alert-close-pill-solid-outline-width:              var(--global-border-width);
  --alert-close-pill-solid-border-width:               3px;
  --alert-close-pill-solid-border-color:               var(--global-border);
  --alert-close-pill-solid-hover-border-color:         var(--global-default-color);

  /* Inverse */
  --inverse-alert-close-opacity:                       0.4;
  --inverse-alert-close-hover-opacity:                 0.7;
  --inverse-alert-close-active-opacity:                1;
  --inverse-alert-close-background-opacity:            0.1;
  --inverse-alert-close-background-hover-opacity:      0.3;
  --inverse-alert-close-background-active-opacity:     0.5;

  --inverse-alert-default-background:                  var(--inverse-global-default-color);
  --inverse-alert-default-color:                       var(--global-muted-color-300);

  --inverse-alert-muted-background:                    var(--inverse-global-muted-color);
  --inverse-alert-muted-color:                         var(--global-muted-color-300);

  --inverse-alert-primary-background:                  rgb(from var(--global-primary-color-900) r g b / 0.2);
  --inverse-alert-primary-color:                       var(--global-primary-color-300);

  --inverse-alert-info-background:                     rgb(from var(--global-info-color-900) r g b / 0.2);
  --inverse-alert-info-color:                          var(--global-info-color-300);

  --inverse-alert-success-background:                  rgb(from var(--global-success-color-900) r g b / 0.2);
  --inverse-alert-success-color:                       var(--global-success-color-300);

  --inverse-alert-warning-background:                  rgb(from var(--global-warning-color-900) r g b / 0.2);
  --inverse-alert-warning-color:                       var(--global-warning-color-300);

  --inverse-alert-danger-background:                   rgb(from var(--global-danger-color-900) r g b / 0.2);
  --inverse-alert-danger-color:                        var(--global-danger-color-300);

  --inverse-alert-bordered-border-color-default:       var(--inverse-global-border);
  --inverse-alert-bordered-border-color-muted:         var(--inverse-global-border);
  --inverse-alert-bordered-border-color-primary:       var(--global-primary-color-900);
  --inverse-alert-bordered-border-color-info:          var(--global-info-color-900);
  --inverse-alert-bordered-border-color-success:       var(--global-success-color-900);
  --inverse-alert-bordered-border-color-warning:       var(--global-warning-color-900);
  --inverse-alert-bordered-border-color-danger:        var(--global-danger-color-900);

  --inverse-alert-close-pill-background-default:       var(--global-muted-color-500);
  --inverse-alert-close-pill-background-muted:         var(--global-muted-color-500);
  --inverse-alert-close-pill-background-primary:       var(--global-primary-color-700);
  --inverse-alert-close-pill-background-info:          var(--global-info-color-700);
  --inverse-alert-close-pill-background-success:       var(--global-success-color-700);
  --inverse-alert-close-pill-background-warning:       var(--global-warning-color-700);
  --inverse-alert-close-pill-background-danger:        var(--global-danger-color-700);

  --inverse-alert-close-pill-solid-background:         var(--inverse-global-default-color);

  --inverse-alert-close-pill-solid-border-color:       var(--inverse-global-border);

  --inverse-alert-close-pill-solid-hover-border-color: var(--inverse-global-default-color);

  --inverse-alert-icon-box-background-default:         var(--global-muted-color-600);
  --inverse-alert-icon-box-background-muted:           var(--global-muted-color-600);
  --inverse-alert-icon-box-background-primary:         var(--global-primary-color-600);
  --inverse-alert-icon-box-background-info:            var(--global-info-color-600);
  --inverse-alert-icon-box-background-success:         var(--global-success-color-600);
  --inverse-alert-icon-box-background-warning:         var(--global-warning-color-600);
  --inverse-alert-icon-box-background-danger:          var(--global-danger-color-600);
}
```

<DocNavigation />
