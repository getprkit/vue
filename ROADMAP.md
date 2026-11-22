# Roadmap

## Current Focus

We are currently focusing on adding all components with styles, icon and documents in same worktree, then we will separate them to icon and doc library and then we will focus on `TODO` list and other plans.

We are making all project (CSS framework and vue components and starter kit) in one project and will separate them to our vision at last.

Components are collection of UIKit components (with additional property and style) + some usable component that not exists in UIKit library (we can find other usable components name in library like shadcn or shuriken-ui)

We write all css classes with `uk-` prefix so it easier to write the new classes with `pr-` prefix and better to apply style, at last we can change all of them, even those belongs to uikit with our prefix, and we want to set our prefix to all classes and javascript at last. We comment the new component added in .less files with Pr[ComponentName] and Comment new CSS added .less files in hooks with PrNew.

- We define all Uikit components in vue, but in documents if a document can be defined as css component we must mark down the code as a css also. (vue and css together)
- Add default icons to project, when it adds we can change all icon set with changing the default icon name attribute
- Add Solar-Icon-Set outline to icons set: the different between regular set is outline wrote as path fillable and outline is wrote as a path line with ability to change line-stroke
- Check aria-label html attribute and read the docs
- add uk-overflow-auto to utils and commit the type

## Long-term Vision

Our goal is for this library to be a collection of HTML-CSS-JavaScript/Vue/React components and starter kit for HTML/Nuxt/Next with set of ready-to-use pages and premium themes, we also have a plan to add structure for started kits to config the base api and requests with something like MVC model or anything, the plan is users can config the base api, set login api and login page also set api for predefined pages, we don't have plan for premium version, it can be page builder, premium icons, premium themes or anything else, we will working on it after components and starter kits ends.

- PrKIt and Vue: Ui CSS framework with components based on PrKit
- Nuxt Starter based on PrKit Vue and have everything for start a front project
- we need also document pages for PrKit and PrKit Vue and Nuxt `Starter Kit`

## Research

Refer to this page: https://vuejs.org/guide/best-practices/performance.html we are trying our best to get best optimize for PrKit components library and PrKit Starter Kit.

We will prevent to use components in components for example a main component that's contains child component like: accordion has accordion-title and accordion-content we will create the child components, but we will not use child component in structure of main component, we just create them to get used in component slot, and we notice that instead of using components in a v-for use it with pure CSS and Methods that's available in project refer to https://vuejs.org/guide/best-practices/performance.html#avoid-unnecessary-component-abstractions. we will make document guide for 3 mode of using component: 1. component itself that's accept content and option with props, 2. component with child component that is useable for main component for custom slot etc. 3. component just with available methods and CSS style. we are trying to get the best performance for or components.

## Icons

- [Font Awesome (fa) - 7.3.1](https://fontawesome.com) should update to last version
- [Hugeicons (huge) - 4375](https://hugeicons.com) should update to last version
- [Iconoir (iconoir) - 7.12.1](https://iconoir.com)
- [Ionicons (ion) - 8.0.13](https://ionic.io/ionicons)
- [Isocons (isocons) - 2.1](https://isocons.app)
- [Lucide (lucide) - 1.48.0](https://lucide.dev)
- [Magicoon (magi) - 1.3](https://magicoon.com)
- [Material Design (md) - --](http://google.github.io/material-design-icons)
- [Mingcute (ming) - 2.97](https://www.mingcute.com)
- [Phosphoricons (ph) - 2.1.0](https://phosphoricons.com)
- [Solar Icons (solar) - 2.3.2](https://solar-icons.vercel.app)
- [Unicons (uni) - without version](https://iconscout.com/unicons)

## TODO

- [ ] we need make this project separate to 4 npm libraries:
  - icons libraries: _placed at **src/images/core**_
  - core theme components: _placed at **src/components/** or **src/components/core**_ (the ui framework)
  - documents: _placed at **src/views/docs**_
  - starter kit: _ready-to-use pages: including all pre-build pages and layouts, vite build, vite build scripts and etc_
- [ ] design it for **Nuxt** (starter kit)
- [ ] we need add a setting.css file for customizing the style of the main css like: changing global and main colors, changing fonts and changing default icons

- [ ] add [https://nuqtaicons.com/icons](https://nuqtaicons.com/icons) icons
- [ ] add mx-icons to project
- [ ] add icon versions to icon-libraries
- [ ] add isocons component icons
- [ ] add streamlinehq icons
- [ ] add [Zappicon](https://ui8.net/zappicon/products/zappicon-library---22000-icons) icons
- [ ] add [Magi E-commerce](https://ui8.net/seyfdesigner/products/magicoon---6500-e-commerce-and-shopping-icons-set) icons
- [ ] add [Magi 2G](https://ui8.net/seyfdesigner/products/magicoon-2g---essential-ui-icons-set) icons
- [ ] add [Iconstica](https://ui8.net/iconstica/products/iconstica-icon-pack) icons
- [ ] add [Haicon](https://ui8.net/keffi-studio/products/haicon-v20---iconset) icons
- [ ] add [WithIcons](https://withicons.com/) icons
- [ ] add [Icoonia](se components in components for example a main comp-8000-ultimate-vector-icon) icons
- [ ] add [Uxercon](https://ui8.net/uxercon/products) icons
- [ ] add [Orbicon](https://ui8.net/wonderland/products/wonder-icon-set) icons
- [ ] add [Craft Icons Pro](https://ui8.net/eusha/products/craft-icons---pro-icon-pack) icons
- [ ] add [Angleicons](https://ui8.net/gala-yask/products/angleicons-ui-icon-set) icons
- [ ] add [Roundicons](https://roundicons.com/icon-packs/accent-duo-tone-icons/) icons
- [ ] add Material Symbol icons

- [ ] Create all vue component from `uikit` `shurikenui` `shadcn`
- [ ] Create document hub for `PrKit` and `Vue`
- [ ] Create page layouts and sidebar examples (`Theme`)
- [ ] Create document hub for `Theme`
- [ ] Create starter kit for `Nuxt`
- [ ] Migrate to modern CSS rgb
- [ ] Fix accordion-circle icon for line-circle icon styles
- [ ] Change import UIkit library in app.ts from full library to specific components for lean final production build file.
- [ ] check oklch color is good to replace it with rgb in css/less files?
- [ ] check if we need to our define hooks in less files or not! we have uikit hooks, but we need to check its useful to define hooks for new component/classes or not.
- [ ] change all css margin-right/left, position-right/left, padding-right/left to margin-inline-start/end, inset-inline-start/end, padding-inline-start/end in uikit and our .less files also.
- [ ] check if its good to add ability import icons as <use> tag instead of importing them directly when using uikit icons or any icons. its good for caching, and browser will load them once, will reduce the html page size, and other things but has some limits with css and other things. also will not show until browser load the svg file, so we need handle it with height and width for svg tag.
      – [ ] check for adding color pattern with oklch
- [ ] check is good to move variables from :root in .uk-component for every component, for now they all load in :root and its not too user friendly.
- [ ] change divider css to column-rule property
- [ ] add tag render for components which use `<a>` tag: like add button tag and default is `<a>` tag
- [ ] child `_component.vue` sample
- [ ] add font weight vars
- [ ] round color palettes
- [ ] fix svg-fill method or change the process
- [ ] add alert cover: close or @click method
- [ ] add minimal theme and current them is default theme (platform theme / website time)
- [ ] make uikit javascript component accept string animate like alert
- [ ] check, rewrite and clean github actions
- [ ] add prkit/core `remove attribute feature`
- [ ] check get component function to add in util.ts
- [ ] add docs about core utils.ts
- [ ] check dot-nav colors
- [ ] check for adding hard-colors to alert
- [ ] check modal-close color
- [ ] add directional reading to less file (remove top-bottom and replace with inline, must check if its good to add)
- [ ] make icons to accept texts (e.g. accordion)
- [ ] define multiple color palettes (persian and tailwind)
- [ ] add text-secondary color
- [ ] check for adding lightbox inverse color
- [ ] check, rewrite and clean github workflows
