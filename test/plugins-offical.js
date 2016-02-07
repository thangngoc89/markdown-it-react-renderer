import { assert } from 'chai'
import { describe, it } from 'mocha'
import render from './helpers/render'

const plugins = {
  abbr: require('markdown-it-abbr'),
  container: require('markdown-it-container'),
  deflist: require('markdown-it-deflist'),
  emoji: require('markdown-it-emoji'),
  footnote: require('markdown-it-footnote'),
  ins: require('markdown-it-ins'),
  mark: require('markdown-it-mark'),
  sub: require('markdown-it-sub'),
  sup: require('markdown-it-sup')
}

describe('Markdown plugins official', () => {
  it('should work with emoji', () => {
    assert.equal(
      render(':) 8-)',
        {plugins: [plugins.emoji]}),
      '<span><p>😃 😎</p></span>'
    )
  })

  it('should work with container', () => {
    assert.equal(
      render('::: warning\n*here be dragons*\n:::',
        {plugins: [{plugin: plugins.container, args: ['warning']}]}),
      '<span><div data-info="warning"><p><em>here be dragons</em></p></div></span>'
    )
  })

  /* TODO: footnote and other plugins */
})
