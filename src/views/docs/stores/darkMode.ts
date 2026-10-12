import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('lightMode', () => {
  const light = ref(localStorage.getItem('lightMode') ?? 'uk-light')

  function changeMode() {
    if (light.value === 'uk-light') {
      light.value = 'uk-dark'
    } else light.value = 'uk-light'

    localStorage.setItem('lightMode', light.value)
  }

  function sectionMode() {
    return light.value === 'uk-dark' ? 'uk-section-secondary' : 'uk-section-default'
  }

  return { light, changeMode, sectionMode }
})
