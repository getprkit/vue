// TODO: Must review and change in future, also must move in to Doc library.
// TODO: uk-* pr-tag-component must change to pr-* in future.
// FIXME: Must review and change in future, also must move in to Doc library.

import MarkdownItShiki from '@shikijs/markdown-exit'
import type { PluginSimple as MarkdownItPlugin } from 'markdown-exit'
import Markdown from 'unplugin-vue-markdown/vite'
import { transformerStyleToClass } from '@shikijs/transformers'
import type { ShikiTransformer } from 'shiki'

const formatCode = (code: string): string =>
  code.replace(/^((?:  )+)/gm, (indent: string) => '\t'.repeat(indent.length / 2))

const setPreClass = (html: string): string =>
  html.replace(/<pre\b[^>]*>/, '<pre class="pr-doc-pre">')

const addCodeId = (html: string, id: string): string =>
  html.replace(/<code\b(?![^>]*\bid=)([^>]*)>/, `<code id="${id}"$1>`)

const prComponentTransformer: ShikiTransformer = {
  name: 'pr-component',
  span(node) {
    const text = node.children
      .filter((child) => child.type === 'text')
      .map((child) => child.value)
      .join('')

    // if (!/^Pr[A-Z]/.test(text) && !/(?:^|[\s<"'])uk-[\w-]+(?=$|[\s="'/>])/.test(text)) {
    if (!/^\s*(?:Pr[A-Z]\w*|uk-[\w-]+)\s*$/.test(text)) {
      return
    }

    this.addClassToHast(node, `pr-tag-component-${text.replace(/-/g, '').toLowerCase()}`)
  },
}

export const markdown = Markdown({
  markdownOptions: {
    html: true,
    linkify: true,
  },

  markdownSetup: async (md) => {
    md.use(
      (await MarkdownItShiki({
        themes: {
          light: 'github-light',
          dark: 'github-dark-dimmed',
        },
        defaultColor: false,
        transformers: [
          transformerStyleToClass({
            classPrefix: 'pr-shiki-',
          }),
          prComponentTransformer,
        ],
      })) as unknown as MarkdownItPlugin,
    )

    const fence = md.renderer.rules.fence

    if (fence) {
      md.renderer.rules.fence = async (...args) => {
        const [tokens, idx, options, env, self] = args
        const token = tokens[idx]!

        const [language, mode] = token.info.trim().split(/\s+/)

        const originalInfo = token.info
        const originalContent = token.content

        try {
          if (language && ['vue', 'html'].includes(language) && mode === 'example') {
            env.prExampleIndex = (env.prExampleIndex ?? 0) + 1

            const id = `code-example-${env.prExampleIndex}`

            const code = formatCode(token.content)

            const previewSource = code.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '').trim()

            const template = previewSource.match(
              /^<template(?:\s[^>]*)?>([\s\S]*?)<\/template\s*>$/i,
            )

            const preview = (template?.[1] ?? previewSource).trim()

            token.info = language
            token.content = code

            const highlighted = await fence(tokens, idx, options, env, self)

            const setPreClass = (html: string): string =>
              html.replace(/<pre\b[^>]*>/, '<pre class="pr-doc-pre">')

            const markup = addCodeId(setPreClass(highlighted), id)

            return `
              <div class="uk-position-relative uk-margin-medium">
                <ul class="pr-doc-tab" uk-tab="swiping: false">
                  <li><a href="">Preview</a></li>
                  <li><a href="">Markup</a></li>
                </ul>

                <div class="uk-switcher pr-doc-switcher">
                  <div>
                    ${preview}
                  </div>

                  <div>
                    ${markup}
                  </div>
                </div>

                <div class="uk-position-top-right uk-margin-small-top">
                  <ul class="uk-iconnav">
                    <li class="pr-doc-tab-item">
                      <a
                        href=""
                        class="js-codepen"
                        uk-tooltip="Edit on Codepen"
                        rel="#${id}"
                        aria-label="Edit on Codepen"
                      >
                        <img
                          class="uk-icon"
                          src="../../../images/core/ming/cute/icons/codepen.svg"
                          height="20"
                          width="20"
                          uk-svg
                          hidden
                        >
                      </a>
                    </li>

                    <li class="pr-doc-tab-item">
                      <a
                        href=""
                        class="pr-markdown-copy"
                        uk-tooltip="Copy to Clipboard"
                        rel="#${id}"
                        role="button"
                        aria-label="Copy to Clipboard"
                      >
                        <img
                          class="uk-icon"
                          src="../../../images/core/ming/cute/icons/copy.svg"
                          uk-svg
                          height="20"
                          width="20"
                          hidden
                        >
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              `
          }

          token.content = formatCode(token.content)

          const result = await fence(tokens, idx, options, env, self)

          return setPreClass(result)
        } finally {
          token.info = originalInfo
          token.content = originalContent
        }
      }
    }

    // for heading fragments
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx]!

      if (token.tag !== 'h2' && token.tag !== 'h3') {
        return self.renderToken(tokens, idx, options)
      }

      const title = tokens[idx + 1]?.content ?? ''
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      const className = token.tag === 'h2' ? 'uk-h3' : 'uk-h4'

      return `<${token.tag} id="${id}" class="${className} pr-heading-fragment">`
    }

    md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
      const token = tokens[idx]!

      if (token.tag !== 'h2' && token.tag !== 'h3') {
        return self.renderToken(tokens, idx, options)
      }

      const title = tokens[idx - 1]?.content ?? ''
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      return `<a href="#${id}" uk-scroll="offset: 20"></a></${token.tag}>`
    }

    md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
      const inline = tokens[idx + 1]

      if (inline?.type === 'inline' && /^\*\*NOTE\*\*(?:\s|$)/i.test(inline.content.trimStart())) {
        return '<p class="pr-doc-note">'
      }

      return self.renderToken(tokens, idx, options)
    }

    md.renderer.rules.strong_open = (tokens, idx, options, env, self) => {
      const next = tokens[idx + 1]

      if (next?.type === 'text' && next.content.trim().toLowerCase() === 'note') {
        return '<span class="pr-doc-note-title"><img class="uk-icon" src="../../../images/core/ming/cute/icons/warning.svg" height="20" width="20" uk-svg hidden>'
      }

      return self.renderToken(tokens, idx, options)
    }

    md.renderer.rules.strong_close = (tokens, idx) => {
      const prev = tokens[idx - 1]

      if (prev?.type === 'text' && prev.content.trim().toLowerCase() === 'note') {
        return '</span>'
      }

      return '</strong>'
    }

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx]!

      const href = token.attrGet('href')

      if (href) {
        token.attrSet('href', href.replace(/\.md(?=#|$)/, ''))
      }

      return self.renderToken(tokens, idx, options)
    }

    // for add margin-large to hr tag - ---|***
    md.renderer.rules.hr = () => '<hr class="uk-margin-large">'

    // for add styles to .md tables
    md.renderer.rules.table_open = () =>
      '<div class="uk-overflow-auto"><table class="uk-table uk-table-divider">'

    md.renderer.rules.table_close = () => '</table></div>'
  },

  wrapperClasses: 'pr-doc uk-container uk-container-xsmall uk-position-relative',
})
