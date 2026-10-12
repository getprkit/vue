<script setup lang="ts">
import { on } from '@/scripts/util/util'
import PrIcon from '@c/PrIcon.vue'
import { accordion } from 'uikit'
import { onMounted, useTemplateRef } from 'vue'

const accordionEl = useTemplateRef('accordionEl')

onMounted(() => {
  const accordinoApi = accordion(accordionEl.value)

  on(accordionEl.value, 'show', (event, index, test) => {
    console.log(event)
    console.log(index)
    console.log(test)
  })
})
</script>

<template>
  <div class="uk-container uk-container-xsmall">
    <ul class="pr-accordion-hover" ref="accordionEl">
      <li>
        <a class="uk-accordion-title">
          Accordion Item 1
          <span class="pr-accordion-icon uk-accordion-icon" />
        </a>
        <div class="uk-accordion-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
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
    <h1>Icon</h1>
    <PrIcon icon="component-fa-duotone-accordion-circle" :ratio="2" :stroke-ratio="2" />
    <div class="uk-text-center">
      <PrIcon icon="icon-fa-duotoneli-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-duotoneso-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-duotoneth-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-light-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-regular-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharp-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-solid-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-th-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpduotone-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpduotoneli-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpduotoneso-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpduotoneth-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpli-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpso-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-fa-sharpth-add" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-huge-bulk-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-bulk-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-duotone-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-duotone-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-regular-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-regular-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-rounded-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-rounded-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-sharp-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-sharp-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solid-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solid-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solidro-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solidro-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solidsh-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-solidsh-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-twotone-add-01" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-twotone-add-02" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-duotoneso-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-duotoneth-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-huge-light-add" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-ming-cute-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-cutefi-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-cuteli-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-duotone-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-light-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-regular-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-sharp-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-solid-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ming-twotone-add" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-solar-bold-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-solar-bolddu-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-solar-broken-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-solar-linear-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-solar-linedu-add" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-solar-outline-add" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-uni-line-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-uni-mono-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-uni-solid-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-uni-thin-plus" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-ph-bold-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ph-duotone-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ph-light-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ph-regular-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ph-solid-plus" :ratio="2" :stroke-ratio="2" />
      <PrIcon icon="icon-ph-thin-plus" :ratio="2" :stroke-ratio="2" />
    </div>
    <div class="uk-text-center">
      <PrIcon icon="icon-isocons-duotonetop-123" :ratio="10" :stroke-ratio="2" />
    </div>
  </div>
</template>
