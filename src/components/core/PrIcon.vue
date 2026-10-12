<script setup lang="ts">
import { type IconPropsType, IconDefaults } from '@u/props'
import { icon } from '@u/util'
import { useTemplateRef, onMounted, watchEffect } from 'vue'

const props = withDefaults(defineProps<IconPropsType>(), IconDefaults)

const el = useTemplateRef<HTMLElement>('el')

function setIcon() {
  return icon(el.value, props)
}

onMounted(() => {
  watchEffect(setIcon)
})
</script>

<template>
  <component :is="tag" ref="el"></component>
</template>
