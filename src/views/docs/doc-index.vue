<script setup lang="ts">
import { useDarkModeStore } from '@vd/stores/darkMode.ts'
import Sidebar from '@vd/doc-sidebar.vue'

const darkMode = useDarkModeStore()
</script>

<template>
  <sidebar />

  <div class="uk-section" :class="darkMode.sectionMode()">
    <router-view />
    <div class="uk-height-viewport"></div>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: 'roboto mono';
  src: url('@f/roboto-mono/roboto-mono.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
}

@font-face {
  font-family: 'roboto mono';
  src: url('@f/roboto-mono/roboto-mono-ital.woff2') format('woff2');
  font-style: italic;
  font-weight: 100 900;
  font-variation-settings: 'ital' 100;
}

:root {
  --global-line-height: 1.5;
}

.pr-doc .pr-heading-fragment {
  position: relative;
}

.pr-heading-fragment > a {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, calc(-50% + 1px));
  margin-left: -40px;
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  box-sizing: border-box;
  width: 40px;
  opacity: 0;
  transition: 0.25s ease-in-out;
}

.pr-heading-fragment > a::before {
  content: '#';
}

.pr-heading-fragment:hover > a {
  opacity: 1;
}

.pr-doc-pre {
  overflow: auto;
  padding: 0;
  border: 0;
  background: none;
  tab-size: 4;
  border-radius: 2px;
  font-family: 'roboto mono';
  font-size: 13px;
  line-height: 1.5;
  padding: 25px;
  border-radius: 8px;
}

.pr-doc > .pr-doc-pre {
  margin-top: var(--global-medium-margin);
  margin-bottom: var(--global-medium-margin);
}

.pr-doc-pre code {
  font-family: 'roboto mono';
  font-size: 13px;
  line-height: 1.5;
}

.pr-doc-nav {
  left: calc(100% + 60px);
  top: 0;
  position: absolute;
  width: 200px;
}

.pr-doc-nav .uk-nav li.uk-active > a {
  position: relative;
}

.pr-doc-nav .uk-nav li.uk-active > a::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -25px;
  width: 15px;
  border-top: 2px solid #1e87f0;
}

.pr-doc-tab {
  margin-left: -10px;
}

.pr-doc-tab,
.pr-doc-switcher {
  margin-bottom: 0;
}

.pr-doc-tab > * > a {
  padding: 9px 20px;
  line-height: 20px;
  font-size: 0.75rem;
  font-weight: 450;
}

.pr-doc-tab-item .uk-svg {
  fill: none;
}

.pr-doc-tab::before {
  content: none;
}

.pr-doc-tab > * > a {
  border-bottom: 0;
}

.pr-doc-tab > .uk-active > a {
  border-color: transparent;
  position: relative;
}

.pr-doc-tab > * > a::before {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
}

.pr-doc-tab > .uk-active > a::before {
  background-color: var(--global-primary-background);
}

.pr-doc-switcher {
  border: var(--global-border-width) solid var(--global-border);
  border-radius: 8px;
}

.pr-doc-switcher > div:first-child {
  padding: 60px;
}

.pr-doc-label {
  line-height: 1.6;
}

.pr-doc-note {
  padding: 35px 35px 35px 55px;
  border: 1px solid var(--global-primary-background);
  border-radius: 8px;
  background: var(--global-white-color);
  margin: var(--global-medium-margin) 0;
}

.pr-doc-note-title {
  display: block;
  margin-bottom: var(--global-small-margin);
  position: relative;
  font-weight: 700;
}

.pr-doc-note-title svg {
  position: absolute;
  left: -30px;
  top: 2px;
  fill: none;
  color: var(--global-primary-background);
}

/** Markdown */
.pr-doc :not(pre) > code,
.pr-doc :not(pre) > kbd,
.pr-doc :not(pre) > samp {
  font-family: 'roboto mono', monospace;
  font-size: 13px;
}

.pr-doc :not(pre) td code:has(+ strong) {
  padding-right: 0;
}

.pr-doc :not(pre) td code + strong:has(> code) + code {
  padding-left: 0;
}

.pr-doc :not(pre) td code + strong > code {
  padding: 0;
}

.uk-section:not(.uk-section-secondary) .pr-doc-pre {
  background: var(--global-muted-background);
}

.pr-shiki-26q00h {
  color: #cf222e;
}

.pr-shiki-nu9zfz {
  color: #6639ba;
}

.pr-shiki-l2202y {
  color: #0a3069;
}

.pr-shiki-24ljh3 {
  color: #953800;
}

.pr-doc [class*='pr-tag-component-'] {
  color: var(--global-danger-background);
}

.pr-shiki-l0gdu9 {
  color: #63a35c;
}

.pr-shiki-2y9ghr {
  color: #6639ba;
}

.pr-shiki-yh2ys2 {
  color: #6639ba;
}

.pr-shiki-5ep9om {
  color: #1f2328;
}

.pr-shiki-1cxcxs {
  color: #0a3069;
}

.pr-shiki-1xptx7 {
  color: #0550ae;
}

.uk-section-secondary .pr-doc {
  .pr-doc-pre {
    background: #22272e;
    color: #adbac7;
  }

  :not(pre) > code,
  :not(pre) > kbd,
  :not(pre) > samp {
    color: #8ddb8c;
  }

  .pr-doc-note {
    background: var(--global-secondary-background);
  }

  .pr-shiki-26q00h {
    color: #ff7b72;
  }

  .pr-shiki-nu9zfz {
    color: #d2a8ff;
  }

  .pr-shiki-l2202y {
    color: #a5d6ff;
  }

  .pr-shiki-24ljh3 {
    color: #ffa657;
  }

  .pr-shiki-l0gdu9,
  .pr-shiki-2y9ghr {
    color: #8ddb8c;
  }

  .pr-shiki-5ep9om {
    color: #f0f6fc;
  }

  .pr-shiki-1cxcxs {
    color: #a5d6ff;
  }

  .pr-shiki-1xptx7 {
    color: #79c0ff;
  }
}
</style>
