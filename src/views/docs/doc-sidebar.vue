<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDarkModeStore } from '@vd/stores/darkMode.ts'
import { docLinks } from '@vd/doc-configs.ts'

const route = useRoute()

const darkMode = useDarkModeStore()
</script>

<template>
  <!-- Just For Docs - will remove in future and move to docs project -->
  <div
    class="uk-width-medium uk-position-fixed uk-position-left uk-overflow-auto uk-height-viewport"
    style="border-right: 1px solid #e7e7e1"
  >
    <div class="uk-padding" :class="darkMode.light === 'uk-dark' && 'uk-light'">
      <h3 class="uk-margin-medium-bottom">
        Documentation
        <a class="uk-link uk-link-text" @click="darkMode.changeMode()">
          <span uk-icon="icon-huge-sharp-sun-01" v-if="darkMode.light === 'uk-light'"></span>
          <span uk-icon="icon-huge-sharp-moon" v-if="darkMode.light === 'uk-dark'"></span>
        </a>
      </h3>
      <ul class="uk-nav uk-nav-default uk-margin-top" v-for="(value, key) in docLinks" :key>
        <li class="uk-nav-header">{{ key }}</li>
        <li class="uk-nav-divider"></li>
        <RouterLink
          v-for="([link], index) in value"
          :to="`/docs/${link.replace(/\s+/g, '-').toLowerCase()}`"
          v-bind="$props"
          v-slot="{ navigate }"
          custom
          :key="index"
        >
          <li @click="navigate" :class="route.name === link ? 'uk-active' : ''">
            <a :href="`/docs/${link.replace(/\s+/g, '-').toLowerCase()}`">{{ link }}</a>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>
