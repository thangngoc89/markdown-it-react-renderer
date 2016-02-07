import { assert } from 'chai'
import { describe, it } from 'mocha'
import React from 'react'
import update from 'react-addons-update'
import render from './helpers/render'

function linkCallback (tag, props, children) {
  if (tag === 'a') {
    props = update(props, {
      className: { $set: 'link-class' },
      href: { $apply: h => h.replace('SOME_URL', 'http://real-url.com') }
    })
  }
  return React.createElement(tag, props, children)
}

function firstLevelCallback (tag, props, children, level) {
  if (level === 1) {
    props = update(props, {
      className: { $set: 'first-level-class' }
    })
  }

  return React.createElement(tag, props, children)
}

// Markdown-React

describe('Markdown-React options tests', () => {
  it('should render tags with custom props', () => {
    assert.equal(
      render('Here is [some link with class](SOME_URL).', { onIterate: linkCallback }),
      '<span><p>Here is <a href="http://real-url.com" class="link-class">some link with class</a>.</p></span>'
    )
  })

  it('should distinct tags depending on level', () => {
    assert.equal(
      render('This node has custom class, **but not this node**.', { onIterate: firstLevelCallback }),
      '<span><p class="first-level-class">This node has custom class, <strong>but not this node</strong>.</p></span>'
    )
  })

  it('should replace tags', () => {
    assert.equal(
      render('This text uses **“i” and “b” tags** instead of *“em” and “strong” tags*.', {tags: { 'html': 'span', 'em': 'i', 'strong': 'b' }}),
      '<span><p>This text uses <b>“i” and “b” tags</b> instead of <i>“em” and “strong” tags</i>.</p></span>'
    )
  })
})
