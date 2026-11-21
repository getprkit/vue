<script setup lang="ts">
import type { UIkitIconOptions as OptionsIcon } from 'prkit'
import { icon } from 'prkit'
import { useTemplateRef, onMounted, watchEffect } from 'vue'

const props = defineProps<OptionsIcon>()

const el = useTemplateRef<HTMLElement>('el')

function setIcon() {
  return icon(el.value, props)
}

onMounted(() => {
  watchEffect(setIcon)
})
</script>

<template>
  <span ref="el" />
</template>
