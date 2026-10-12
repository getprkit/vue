<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const headings = ref()

onMounted(() => {
  const doc = document.querySelector<HTMLElement>('.pr-doc')

  headings.value = [
    ...(doc?.querySelectorAll<HTMLHeadingElement>('h2.pr-heading-fragment[id]') ?? []),
  ].map(({ id, textContent }) => ({
    id,
    title: textContent?.trim() ?? '',
  }))
})
</script>

<template>
  <div class="pr-doc-nav uk-visible@l uk-height-1-1">
    <div uk-sticky="offset: 160">
      <ul class="uk-nav uk-nav-default" uk-scrollspy-nav="closest: li; scroll: true; offset: 20">
        <li v-for="(heading, key) in headings" :key>
          <a :href="`#${heading.id}`">{{ heading.title }}</a>
        </li>
        <li class="uk-nav-divider"></li>
        <li>
          <a target="_blank" rel="noreferrer">
            <span
              class="uk-margin-xsmall-right"
              uk-icon="icon: icon-default-test-tube; ratio: 0.8"
            />
            <span class="uk-text-middle">Open test</span>
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer">
            <span class="uk-margin-xsmall-right" uk-icon="icon: icon-default-report; ratio: 0.8" />
            <span class="uk-text-middle">Report issue</span>
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer">
            <span
              class="uk-margin-xsmall-right"
              uk-icon="icon: icon-default-lifebuoy; ratio: 0.8"
            />
            <span class="uk-text-middle">Get help</span>
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer">
            <span class="uk-margin-xsmall-right" uk-icon="icon: icon-default-edit-3; ratio: 0.8" />
            <span class="uk-text-middle">Edit this page</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
