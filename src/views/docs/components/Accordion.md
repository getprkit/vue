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
const accordionApi = ref<AccordionApi>()
const selected = ref()
const selectedItem = ref(3)

const faqList = [
  {
    value: 1,
    title: 'General Questions',
    content: 'Find answers to common questions about using your account, managing your settings, and getting started with the available features.',
  },
  {
    value: 2,
    title: 'Account Help',
    content: 'Learn how to manage your personal information, update your preferences, and resolve common issues with your account.',
  },
  {
    value: 3,
    title: 'Customer Support',
    content: 'Explore helpful resources, find answers to frequently asked questions, and learn how to get assistance when you need it.',
  },
]

const accountList = [
  {
    value: 1,
    title: 'Update Email Address',
    content: 'You can change your email address from your account settings. A verification link will be sent to your new address to confirm the change.',
  },
  {
    value: 2,
    title: 'Reset Account Password',
    content: 'Select Forgot Password on the sign-in page and follow the instructions sent to your registered email address to create a new password.',
  },
  {
    value: 3,
    title: 'Delete Your Account',
    content: 'You can permanently delete your account from the account settings page. Download any personal information you want to keep before continuing.',
  },
]

const supportList = [
  {
    value: 1,
    title: 'Contact Customer Support',
    content: 'You can contact the support team through the Help Center. Include a description of your issue and any relevant details to help resolve it.',
  },
  {
    value: 2,
    title: 'Browse Help Center Articles',
    content: 'Visit the Help Center to browse setup instructions, common questions, and troubleshooting guides for different features and services.',
  },
  {
    value: 3,
    title: 'Track Support Requests',
    content: 'You can review your previous support requests from the Help Center. Updates and replies will also be sent to your registered email address.',
  },
]

const billingList = [
  {
    value: 1,
    title: 'Available Payment Methods',
    content: 'You can pay using supported credit and debit cards. Available payment methods may vary depending on your billing location and currency.',
  },
  {
    value: 2,
    title: 'Download Your Invoices',
    content: 'All your invoices are available in the billing section. You can view, download, or print a copy whenever you need one.',
  },
  {
    value: 3,
    title: 'Update Billing Information',
    content: 'You can change your billing address and payment details from the billing settings page. Updated information will be used for future invoices.',
  },
]

const shippingList = [
  {
    value: 1,
    title: 'Order Tracking',
    content: 'Once your order has shipped, you will receive a tracking link by email. You can also check the latest delivery status in your order history.',
  },
  {
    value: 2,
    title: 'Delivery Address',
    content: 'You can update your delivery address before your order is shipped. Contact customer support if you need to make changes after placing an order.',
  },
  {
    value: 3,
    title: 'Shipping Delays',
    content: 'If your package has not arrived on time, check the tracking information for updates. Contact the support team if the delivery status does not change.',
  },
]

const subscriptionList = [
  {
    value: 1,
    title: 'Cancel Your Subscription',
    content: 'You can cancel your subscription at any time from the subscription settings page. Your access will remain available until the current billing period ends.',
  },
  {
    value: 2,
    title: 'Change Your Subscription Plan',
    content: 'You can upgrade or downgrade your subscription from the billing settings. Any changes and additional charges will be displayed before confirmation.',
  },
  {
    value: 3,
    title: 'Manage Automatic Renewal',
    content: 'Your subscription renews automatically at the end of each billing period. You can turn off automatic renewal from your account settings.',
  },
]

const privacyList = [
  {
    value: 1,
    title: 'Manage Profile Visibility',
    content: 'You can control who sees your profile information from the privacy settings. Choose the visibility options that best match your preferences.',
  },
  {
    value: 2,
    title: 'Download Personal Data',
    content: 'You can request a copy of your personal data from your account settings. You will receive an email when your download is ready.',
  },
  {
    value: 3,
    title: 'Update Cookie Preferences',
    content: 'You can review and update your cookie preferences at any time through the privacy settings page, including optional analytics cookies.',
  },
]

const notificationList = [
  {
    value: 1,
    title: 'Manage Email Notifications',
    content: 'Choose which updates you want to receive by email. You can enable or disable individual notification types from your notification settings.',
  },
  {
    value: 2,
    title: 'Enable Push Notifications',
    content: 'Allow notifications in your device settings to receive important updates. You can manage notification permissions separately for each device.',
  },
  {
    value: 3,
    title: 'Troubleshoot Notification Issues',
    content: 'Check your notification preferences and device permissions first. Also make sure your email address is correct and your account is verified.',
  },
]

const profileList = [
  {
    value: 1,
    title: 'Profile Picture',
    content: 'Select your current profile picture from the profile settings and choose a new image from your device. Save your changes when finished.',
  },
  {
    value: 2,
    title: 'Display Name',
    content: 'You can update your display name from the profile editor. Your new name will appear across your account wherever your profile is shown.',
  },
  {
    value: 3,
    title: 'Personal Bio',
    content: 'Add a short description to your profile to tell others a little about yourself. You can edit or remove this information at any time.',
  },
]

const teamList = [
  {
    value: 1,
    title: 'Invite New Team Members',
    content: 'Enter the email address of the person you want to invite from your team settings. They will receive an invitation to join your workspace.',
  },
  {
    value: 2,
    title: 'Manage Member Permissions',
    content: 'Workspace administrators can change member roles from the team management page. Available permissions depend on the role assigned to each member.',
  },
  {
    value: 3,
    title: 'Remove Existing Members',
    content: 'Select a member from the team list and choose Remove. They will lose access to the workspace once the change has been applied.',
  },
]

const apiList = [
  {
    value: 1,
    title: 'Create API Keys',
    content: 'Generate a new API key from the developer settings. Copy the key when it is displayed and store it somewhere secure.',
  },
  {
    value: 2,
    title: 'Revoke API Keys',
    content: 'You can revoke an API key from the API settings page. Applications using that key will no longer be able to authenticate.',
  },
  {
    value: 3,
    title: 'API Documentation',
    content: 'Explore available endpoints, request parameters, response formats, and authentication methods in the documentation before building your integration.',
  },
]

const ordersList = [
  {
    value: 1,
    title: 'View Your Order History',
    content: 'Find all your previous purchases in the Orders section of your account. Select an order to view its details and current status.',
  },
  {
    value: 2,
    title: 'Update an Existing Order',
    content: 'Some order details can be changed before processing begins. Contact customer support as soon as possible to request an update.',
  },
  {
    value: 3,
    title: 'Download Order Receipts',
    content: 'You can download a receipt from the order details page. A copy may also be available in the confirmation email sent after your purchase.',
  },
]

function showAlert(event: Event, modelValue?: unknown) {
  alert(`Item ${modelValue} shown`)
}

onMounted(() => {
  const accordionApi = accordion(accordionEl.value)

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

# Accordion

<p class="uk-text-lead">Create a list of items that can be shown individually by clicking an item's header.</p>

## Usage

The Accordion component consists of a main container with the `PrAccordion` component, and list
items with a value, title and content for each accordion item.

```vue
<PrAccordion :list="accordionList" />
```

| Prop   | Type                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| `list` | Array<{ `value: unknown`, `title: unknown`, `content: unknown`, `disabled: Boolean`}> |

```vue example
<template>
  <PrAccordion :list="faqList" />
</template>

<script setup lang="ts">
const faqList = [
  {
    value: 1,
    title: 'General Questions',
    content:
      'Find answers to common questions about using your account, managing your settings, and getting the most out of the available features.',
  },
  {
    value: 2,
    title: 'Getting Started with Your Account',
    content:
      'Create an account, complete your profile, and explore the available features. You can update your preferences whenever you need.',
  },
  {
    value: 3,
    title: 'Where can I get help if I have a problem?',
    content:
      'Visit the Help Center to browse useful guides and troubleshooting tips, or contact the support team for further assistance.',
  },
]
</script>
```

---

## Style modifiers

There are several style modifiers available. Just set the variant prop to one of the available styles `variant="styleName"` to apply a different look.

| Variant   | Description              |
| --------- | ------------------------ |
| `default` | Default accordion style. |
| `pill`    | Indicates pill style.    |
| `line`    | Indicates line style.    |

```vue
<PrAccordion variant="pill" />
```

```vue example
<template>
  <h4>Default Style</h4>
  <PrAccordion :list="accountList" variant="default" />
  <hr />
  <h4>Line Style</h4>
  <PrAccordion :list="accountList" variant="line" />
  <hr />
  <h4>Pill Style</h4>
  <PrAccordion :list="accountList" variant="pill" />
</template>

<script setup lang="ts">
const accountList = [
  {
    value: 1,
    title: 'Email Address',
    content:
      'You can update your email address from your account settings. A verification link will be sent to your new email address.',
  },
  {
    value: 2,
    title: 'Password Reset',
    content:
      'Select Forgot Password on the sign-in page and follow the instructions sent to your registered email address to create a new password.',
  },
  {
    value: 3,
    title: 'Can I permanently delete my account?',
    content:
      'You can permanently delete your account from the account settings page. Make sure to download any information you want to keep before proceeding.',
  },
]
</script>
```

---

## Bordered

Set the `bordered` prop to display accordion and its items with border.

```vue
<PrAccordion bordered />
```

```vue example
<template>
  <PrAccordion :list="supportList" variant="pill" bordered />
</template>

<script setup lang="ts">
const supportList = [
  {
    value: 1,
    title: 'Contact Customer Support',
    content:
      'You can contact the support team through the Help Center. Include a description of your issue and any relevant details to help resolve it.',
  },
  {
    value: 2,
    title: 'Browse Help Center Articles',
    content:
      'Visit the Help Center to browse setup instructions, common questions, and troubleshooting guides for different features and services.',
  },
  {
    value: 3,
    title: 'Track Support Requests',
    content:
      'You can review your previous support requests from the Help Center. Updates and replies will also be sent to your registered email address.',
  },
]
</script>
```

---

## Icon modifiers

There are several icon modifiers available. Just set the `icon` prop to one of the available options `icon="iconName"` to change the accordion icon. Learn more about [Component Icons](icon.md).

| Icon          | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| `default`     | Default icon.                                                          |
| `chevron`     | Indicates chevron Icon.                                                |
| `plus`        | Indicates plus icon. just like `default` icon with different animation |
| `circle`      | Indicates circle icon.                                                 |
| `custom-icon` | e.g. `icon-fa-regular-add` or `component-fa-solid-accordion-circle`    |
| `false`       | Without icon, type is `boolean`.                                       |

```vue
<PrAccordion icon="circle" />
```

```vue example
<template>
  <PrAccordion :list="billingList" icon="default" />
  <hr />
  <PrAccordion :list="billingList" icon="chevron" />
  <hr />
  <PrAccordion :list="billingList" icon="plus" />
  <hr />
  <PrAccordion :list="billingList" icon="circle" :icon-ratio="0.54" />
  <hr />
  <PrAccordion :list="billingList" :icon="false" />
</template>

<script setup lang="ts">
const billingList = [
  {
    value: 1,
    title: 'Payment Methods',
    content:
      'You can pay using supported credit and debit cards. Available payment methods may vary depending on your billing location and currency.',
  },
  {
    value: 2,
    title: 'Invoices and Receipts',
    content:
      'All your invoices are available in the billing section. You can view, download, or print a copy whenever you need one.',
  },
  {
    value: 3,
    title: 'How can I update my billing information?',
    content:
      'You can change your billing address and payment details from the billing settings page. Updated information will be used for future invoices.',
  },
]
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
  <PrAccordion :list="shippingList" icon="default" :icon-ratio="1" />
  <hr />
  <PrAccordion :list="shippingList" icon="default" :icon-ratio="1" :stroke-ratio="2.5" />
</template>

<script setup lang="ts">
const shippingList = [
  {
    value: 1,
    title: 'Order Tracking',
    content:
      'Once your order has shipped, you will receive a tracking link by email. You can also check the latest delivery status in your order history.',
  },
  {
    value: 2,
    title: 'Delivery Address',
    content:
      'You can update the delivery address before your order is shipped. Contact customer support if you need to make changes afterward.',
  },
  {
    value: 3,
    title: 'What should I do if my package is delayed?',
    content:
      'Check the tracking information for the latest delivery updates. If there has been no progress for several days, contact the support team.',
  },
]
</script>
```

**NOTE** Alternatively, if you want decrease the `icon-ratio` or `stroke-ratio` you can set number between `0.1` to `0.9` to decrease the size/thickness of icons. Also `icon-ratio` will only work if `stroke-width` is defined in the svg icon.

---

## Accordion v-model

`v-model` can be used on a `PrAccordion` Component to return clicked item value that is defined in `list` prop.

```vue
<PrAccordion v-model="selected" />
```

```vue example
<template>
  <h4>Selected Item: {{ selected }}</h4>
  <PrAccordion :list="subscriptionList" v-model="selected" />
</template>

<script setup lang="ts">
const selected = ref()

const subscriptionList = [
  {
    value: 1,
    title: 'Cancel Subscription',
    content:
      'You can cancel your subscription at any time from the subscription settings page. Your access will remain available until the current billing period ends.',
  },
  {
    value: 2,
    title: 'Change Your Plan',
    content:
      'You can upgrade or downgrade your plan from the billing settings. Any changes to your subscription will be displayed before you confirm.',
  },
  {
    value: 3,
    title: 'Does my subscription renew automatically?',
    content:
      'Your subscription renews automatically at the end of each billing period. You can turn off automatic renewal from your account settings.',
  },
]
</script>
```

**Note** The `v-model` value will return clicked item value for now and will not change with state of the `PrAccordion` component. it will change in future release.

---

## Set open items

To specify which items should be opened initially, set the `active="index"` prop to the `PrAccordion` component, e.g. `:active="1"` to show the second element (the index is zero-based).

```vue
<PrAccordion :active="1" />
```

```vue example
<template>
  <PrAccordion :list="privacyList" :active="1" />
</template>

<script setup lang="ts">
const privacyList = [
  {
    value: 1,
    title: 'Profile Visibility',
    content:
      'You can control who sees your profile information from the privacy settings. Choose the visibility options that best match your preferences.',
  },
  {
    value: 2,
    title: 'Personal Data',
    content:
      'You can request a copy of your personal data from your account settings. We will send you an email when your download is ready.',
  },
  {
    value: 3,
    title: 'How do I manage my cookie preferences?',
    content:
      'You can review and update your cookie preferences at any time through the privacy settings page, including optional cookies used for analytics.',
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
  <PrAccordion :list="notificationList" v-model="selectedItem" />
</template>

<script setup lang="ts">
const selectedItem = ref(3)

const notificationList = [
  {
    value: 1,
    title: 'Email Notifications',
    content:
      'Choose which updates you want to receive by email. You can turn individual notification types on or off from your notification settings.',
  },
  {
    value: 2,
    title: 'Push Notifications on Multiple Devices',
    content:
      'You can receive notifications on multiple devices. Make sure you are signed in and have allowed notifications in each device settings.',
  },
  {
    value: 3,
    title: 'Why am I not receiving notifications?',
    content:
      'Check your notification preferences and device permissions first. Also make sure your email address is correct and your account is verified.',
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
  <PrAccordion :list="profileList" :collapsible="false" />
</template>

<script setup lang="ts">
const profileList = [
  {
    value: 1,
    title: 'Profile Picture',
    content:
      'Select your current profile picture from the profile settings and choose a new image from your device. Save your changes when finished.',
  },
  {
    value: 2,
    title: 'About Me',
    content:
      'Add a short description to your profile to tell others a little about yourself. You can edit or remove this information at any time.',
  },
  {
    value: 3,
    title: 'Can I change my display name?',
    content:
      'Yes, you can update your display name from the profile editor. The new name will appear across your account wherever your profile is shown.',
  },
]
</script>
```

**Note** The default active item when `:collapsible="false"` is `1` so if you define `v-model` when `:collapsible="false"` the `v-model` value will not get the default value until an item is clicked or you define the `v-model` ref value.

---

## Multiple open items

To display multiple content sections at the same time without one collapsing when the other one is opened, set the `multiple` prop to the `PrAccordion` component.

```vue
<PrAccordion multiple />
```

```vue example
<template>
  <PrAccordion :list="teamList" :active="0" multiple />
</template>

<script setup lang="ts">
const teamList = [
  {
    value: 1,
    title: 'Team Invitations',
    content:
      'Enter the email address of the person you want to invite from your team settings. They will receive an invitation to join your workspace.',
  },
  {
    value: 2,
    title: 'Member Roles and Permissions',
    content:
      'Workspace administrators can change member roles from the team management page. Available permissions depend on the role assigned to each member.',
  },
  {
    value: 3,
    title: 'How can I remove a member from my team?',
    content:
      'Select a member from the team list and choose Remove. They will lose access to the workspace once the change has been applied.',
  },
]
</script>
```

**Note** If `multiple` prop set to true, the `v-model` value will return the last clicked item value. it will improve to multiple value when `multiple` is true in future release.

---

## Slot and child components

The Accordion component consists of a child components for each accordion item. If you need more control on slots or customize contents you can follow this structure. The child components will accept same related `props` like parent `PrAccordion` component.

| Component            | Description                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PrAccordionItem`    | Defines and styles the toggle for each accordion item and content and has prop: `tag` that define the rendered html tag for component, `disabled` will disable the item and `active` will set the item to open. |
| `PrAccordionTitle`   | Defines and styles the toggle for each accordion item. Use `<a>` elements and has prop: `icon`, `icon-ratio` and `stroke-ratio`.                                                                                |
| `PrAccordionContent` | Defines the content part for each accordion item.                                                                                                                                                               |

```html
<PrAccordion>
  <PrAccordionItem>
    <PrAccordionTitle>....</PrAccordionTitle>
    <PrAccordionContent>....</PrAccordionContent>
  </PrAccordionItem>
</PrAccordion>
```

```vue example
<template>
  <PrAccordion>
    <PrAccordionItem>
      <PrAccordionTitle :stroke-ratio="2.5">Enable Two-Factor Authentication</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Add another layer of protection to your account by enabling two-factor authentication.
          Follow the setup instructions to connect an authenticator app.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem active>
      <PrAccordionTitle icon="chevron" :stroke-ratio="2.5">Review Active Sessions</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Your security settings show the devices and sessions currently connected to your account.
          Sign out of any session you do not recognize.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem>
      <PrAccordionTitle icon="plus" :stroke-ratio="2.5">
        Report Suspicious Activity
      </PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Change your password immediately if you notice unusual activity. Review your active
          sessions and contact support if anything looks unfamiliar.
        </p>
      </PrAccordionContent>
    </PrAccordionItem>
    <PrAccordionItem>
      <PrAccordionTitle icon="circle" :icon-ratio="0.65">Manage Trusted Devices</PrAccordionTitle>
      <PrAccordionContent>
        <p>
          Review the devices you have marked as trusted and remove any you no longer use. You may
          need to verify your identity when signing in from a new device.
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

| Prop               | Value                                                                                        | Default                   | Description                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| **`list`**         | Array                                                                                        | `undefined`               | List of array items to render in accordion.                         |
| **`variant`**      | `default`,<br /> `line`,<br /> `pill`                                                        | `default`                 | Style selector for component.                                       |
| **`bordered`**     | Boolean                                                                                      | `false`                   | Style selector for component.                                       |
| **`icon`**         | `default`,<br /> `chevron`,<br /> `plus`,<br /> `circle`,<br /> `false`,<br /> `custom-icon` | `default`                 | Icon style selector for component.                                  |
| **`icon-ratio`**   | Number                                                                                       | `0.7`                     | The icon size ratio.                                                |
| **`stroke-ratio`** | Number                                                                                       | `svg defined (if exists)` | The icon stroke ratio.                                              |
| **`v-model`**      | Ref                                                                                          | `undefined`               | Selected (clicked) value of item.                                   |
| **`api-ref`**      | (el: AccordionApi) => void                                                                   | `undefined`               | Access the component api.                                           |
| **`tag`**          | `ul`, `div`                                                                                  | `ul`                      | define the rendered html tag for component. (ul-li or div-div)      |
| `active`           | Number                                                                                       | `false`                   | Index of the element to open initially.                             |
| `animation`        | Boolean                                                                                      | `true`                    | Reveal item directly or with a transition.                          |
| `collapsible`      | Boolean                                                                                      | `true`                    | Allow all items to be closed.                                       |
| `content`          | String                                                                                       | `> .uk-accordion-content` | The content selector, which selects the accordion content elements. |
| `duration`         | Number                                                                                       | `200`                     | Animation duration in milliseconds.                                 |
| `multiple`         | Boolean                                                                                      | `false`                   | Allow multiple open items.                                          |
| `targets`          | String                                                                                       | `> *`                     | CSS selector of the element(s) to toggle.                           |
| `toggle`           | String                                                                                       | `> .uk-accordion-title`   | The toggle selector, which toggles accordion items.                 |
| `transition`       | String                                                                                       | `ease`                    | The transition.                                                     |
| `offset`           | Number                                                                                       | `0`                       | Pixel offset added to scroll top.                                   |

---

## Emits

The following `emits` will be triggered on elements with the component state changes:

```vue
<PrAccordion @shown="(event, index) => alert('....')" />
```

| Emit          | Type                          | Description                                                                                    |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `@beforeshow` | `(event, `**`modelValue`**`)` | Fires before an item is shown. Can prevent showing by calling `preventDefault()` on the event. |
| `@show`       | `(event, `**`modelValue`**`)` | Fires after an item is shown.                                                                  |
| `@shown`      | `(event, `**`modelValue`**`)` | Fires after the item's show animation has been completed.                                      |
| `@beforehide` | `(event, `**`modelValue`**`)` | Fires before an item is hidden. Can prevent hiding by calling `preventDefault()` on the event. |
| `@hide`       | `(event, `**`modelValue`**`)` | Fires after an item's hide animation has started.                                              |
| `@hidden`     | `(event, `**`modelValue`**`)` | Fires after an item is hidden.                                                                 |

```vue example
<template>
  <PrAccordion :list="apiList" @shown="showAlert" />
</template>

<script setup lang="ts">
function showAlert(event: Event, modelValue?: unknown) {
  alert(`Item ${modelValue} shown`)
}

const apiList = [
  {
    value: 1,
    title: 'API Keys',
    content:
      'Generate a new API key from the developer settings. Copy the key when it is displayed and store it somewhere secure.',
  },
  {
    value: 2,
    title: 'Revoke an API Key',
    content:
      'You can revoke an API key from the API settings page. Applications using that key will no longer be able to authenticate.',
  },
  {
    value: 3,
    title: 'Where can I find the API documentation?',
    content:
      'The API documentation covers available endpoints, request parameters, response formats, and authentication details to help you get started.',
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
  <PrAccordion :list="ordersList" :api-ref="(api) => (accordionApi = api)" />
</template>

<script setup lang="ts">
import { AccordionApi } from '@u/types'

const accordionApi = ref<AccordionApi>()

const ordersList = [
  {
    value: 1,
    title: 'Order History',
    content:
      'Find all your previous purchases in the Orders section of your account. Select an order to view its details and current status.',
  },
  {
    value: 2,
    title: 'Modify an Existing Order',
    content:
      'Some order details can be changed before processing begins. Contact customer support as soon as possible to request an update.',
  },
  {
    value: 3,
    title: 'Can I download a receipt for my order?',
    content:
      'You can download a receipt from the order details page. A copy may also be available in the confirmation email sent after your purchase.',
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
| `uk-accordion`               | Apply base style to the accordion.                                         |
| `uk-accordion-default`       | Apply default style to the accordion.                                      |
| `uk-accordion-pill`          | Apply pill style to the accordion.                                         |
| `uk-accordion-line`          | Apply line style to the accordion.                                         |
| `uk-accordion-title`         | Defines and styles the toggle for each accordion item. Use `<a>` elements. |
| `uk-accordion-content`       | Defines the content part for each accordion item.                          |
| `uk-accordion-icon`          | Style the icon for each accordion item.                                    |
| `uk-accordion-item-disabled` | Style and disable the accordion item.                                      |
| `uk-open`                    | Specify which items should be opened initially.                            |

```html
<ul class="uk-accordion uk-accordion-pill">
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
<ul class="uk-accordion-pill" uk-accordion>
  <li>
    <a class="uk-accordion-title">
      Start a Product Return
      <span
        class="uk-accordion-icon"
        uk-icon="icon: component-default-accordion-plus; ratio: 0.9; stroke-ratio: 2"
      ></span>
    </a>
    <div class="uk-accordion-content">
      <p>
        Open your order history and select the item you want to return. Follow the instructions
        provided to submit your return request.
      </p>
    </div>
  </li>
  <li>
    <a class="uk-accordion-title">
      Check Your Refund Status
      <span
        class="uk-accordion-icon"
        uk-icon="icon: component-default-accordion-plus; ratio: 0.9; stroke-ratio: 2"
      ></span>
    </a>
    <div class="uk-accordion-content">
      <p>
        Refunds are processed after the returned item has been received and reviewed. Processing
        times may vary depending on your payment provider.
      </p>
    </div>
  </li>
  <li>
    <a class="uk-accordion-title">
      Request a Product Exchange
      <span
        class="uk-accordion-icon"
        uk-icon="icon: component-default-accordion-plus; ratio: 0.9; stroke-ratio: 2"
      ></span>
    </a>
    <div class="uk-accordion-content">
      <p>
        Exchange options depend on the item and its availability. Start a return request or contact
        customer support to check the available options.
      </p>
    </div>
  </li>
</ul>
```

### JavaScript Initialization

```ts
import { accordion } from '@u/util'

const accordionApi = accordion(accordionEl.value)
```

Initialize the accordion manually using its JavaScript function:

```vue example
<template>
  <ul class="uk-accordion-pill" ref="accordionEl">
    <li>
      <a class="uk-accordion-title">
        Create Workspace
        <span class="uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          Open the workspace menu and select Create Workspace. Enter a name for your new workspace
          and invite team members whenever you are ready.
        </p>
      </div>
    </li>
    <li>
      <a class="uk-accordion-title">
        Switch Workspaces
        <span class="uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          You can belong to multiple workspaces and switch between them using the workspace
          selector. Your projects and settings remain separate.
        </p>
      </div>
    </li>
    <li>
      <a class="uk-accordion-title">
        Rename Workspace
        <span class="uk-accordion-icon" />
      </a>
      <div class="uk-accordion-content">
        <p>
          Workspace administrators can update the workspace name from its settings page. The new
          name will be visible to all workspace members.
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { accordion, icon } from '@u/util'

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
    ?.querySelectorAll<HTMLElement>('.uk-accordion-icon')
    .forEach((el) => icon(el, options))
})
</script>
```

---

## CSS variables

The following CSS variables can be used to customize the accordion. The values shown are the default values. Learn more about [Changing Component CSS Variables](learn.md#css-variables).

<!-- prettier-ignore -->
```css
.uk-accordion {

  --accordion-title-gap:                           15px;
  --accordion-title-font-size:                     var(--global-medium-font-size);
  --accordion-title-line-height:                   1.4;
  --accordion-title-color:                         var(--global-color-emphasis);

  --accordion-icon-color:                          var(--global-color);

  --accordion-disabled-title-color:                var(--global-color-muted);
  --accordion-disabled-icon-color:                 var(--global-color-muted);

  --accordion-title-padding-vertical:              var(--global-xsmall-gutter);
  --accordion-title-padding-horizontal:            0;

  --accordion-content-padding-vertical:            var(--global-xsmall-gutter);

  --accordion-bordered-border-color:               var(--global-border);
  --accordion-bordered-border-width:               var(--global-border-width);

  --accordion-bordered-padding-vertical:           var(--accordion-title-padding-vertical);
  --accordion-bordered-padding-horizontal:         var(--global-small-gutter);

  --accordion-default-title-hover-color:           var(--global-color);

  --accordion-pill-title-background:               var(--global-default-color);
  --accordion-pill-title-hover-background:         var(--global-muted-color);

  --accordion-pill-title-border-radius:            var(--global-border-radius-default);
  --accordion-pill-padding-vertical:               var(--accordion-title-padding-vertical);
  --accordion-pill-padding-horizontal:             var(--global-small-gutter);

  --accordion-line-border-color:                   var(--global-border);
  --accordion-line-border-width:                   var(--global-border-width);

  --accordion-icon-circle-active-color:            var(--global-primary-color);
  --accordion-icon-circle-opacity:                 var(--global-icon-tertiary-color-opacity);
  --accordion-icon-circle-active-opacity:          1;

  /* Inverse */
  --inverse-accordion-title-color:                 var(--inverse-global-color-emphasis);
  --inverse-accordion-icon-color:                  var(--inverse-global-color);

  --inverse-accordion-disabled-title-color:        var(--inverse-global-color-muted);
  --inverse-accordion-disabled-icon-color:         var(--inverse-global-color-muted);

  --inverse-accordion-bordered-border-color:       var(--inverse-global-border);

  --inverse-accordion-default-title-hover-color:   var(--inverse-global-color);

  --inverse-accordion-pill-title-background:       var(--inverse-global-default-color);
  --inverse-accordion-pill-title-hover-background: var(--inverse-global-muted-color);
  --inverse-accordion-pill-icon-color:             var(--inverse-accordion-icon-color);

  --inverse-accordion-line-icon-color:             var(--inverse-accordion-icon-color);
  --inverse-accordion-line-border-color:           var(--inverse-global-border);

  --inverse-accordion-icon-circle-active-color:    var(--inverse-global-primary-color);
}
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
