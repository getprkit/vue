import type { UserConfig, PluginOption, AliasOptions, Plugin } from 'vite'
// TODO: must change in future
import { markdown } from './markdown.ts'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import compileIcons from '../build/icons.ts'
import { dynamicIcon } from './dynamic-icons-plugin.ts'
import { defaultIconStyle } from '../util/config.ts'

interface ViteConfig {
  command: 'serve' | 'build'
}

export function setIcons(defaultIcons: string) {
  return Promise.resolve(compileIcons('src', defaultIcons))
}

// vue vite js plugin
// TODO: .md Must move to docs project (another library)
export const vueVite = vue({
  include: [/\.vue$/, /\.md$/],
})

// vue i18n plugin
export const vueI18nVite = vueI18n({
  // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
  // compositionOnly: false,

  include: 'lang/**.json',
})

// we use dynamicIcon plugin to watch added icons in the vue files
// that is not necessary in the build mode
// TODO: markdown must move to docs project (another library)
export async function pluginsFunc(
  isDev = false,
  plugins?: Plugin | PluginOption[],
): Promise<PluginOption[]> {
  await setIcons(defaultIconStyle)

  const p = [vueVite, markdown, vueJsx(), vueDevTools(), vueI18nVite, plugins]

  if (isDev) {
    p.push(dynamicIcon())
  }

  return p
}

export default async function viteConfig({ command = 'serve' }: ViteConfig): Promise<UserConfig> {
  const vitePlugins = await pluginsFunc(command === 'serve')

  return {
    plugins: vitePlugins,
    resolve: {
      alias,
    },
  }
}

// we use alias for preventing to write full path in our app
// each alias must add to the tsconfig.path file
export const alias: AliasOptions = {
  '@': '/src',
  '@t': '/src/.temp', // .temp folder
  '@c': '/src/components/core', // components
  '@cc': '/src/components/core/composables', // component composables
  '@cch': '/src/components/core/children', // component children
  '@v': '/src/views', // views
  '@vd': '/src/views/docs', // views/documentation
  '@f': '/src/fonts', // fonts,
  '@i': '/src/images', // images,
  '@s': '/src/stores', // stores,
  '@sc': '/src/scripts', // scripts,
  '@u': '/src/scripts/util', // utils,
  '@l': '/lang', // locales
}
