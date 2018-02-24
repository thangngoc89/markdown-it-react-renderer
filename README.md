# Markdown React [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Markdown to React Component converter.

This project uses Markdown parser from
[Markdown It](https://github.com/markdown-it/markdown-it)
library, but loosely supports its plugins.

## Examples

#### Basic example

```js
import MDReactComponent from 'markdown-react-js';

// ...

render() {
  return (
    <MDReactComponent text='Some text **with emphasis**.' />   
  );
}
```

or, using function instead of component:

```js
import { mdReact } from 'markdown-react-js';

// ...

render() {
  return mdReact()('Some text **with emphasis**.');
}
```

Result:

```html
<span>
  <p>
    Some text with <strong>emphasis</strong>.
  </p>
</span>
```

#### Using custom tags

```js
const TAGS = {
  html: 'span', // root node, replaced by default
  strong: 'b',
  em: 'i'
}

...

render() {
  return (
    <MDReactComponent text='Some **bold** and *italic* text.' tags={TAGS} />   
  );
}
```

Result:

```html
<span>
  <p>
    Some <b>bold</b> and <i>italic</i> text.
  </p>
</span>

```

#### Using custom component renderer

```js
function handleIterate(Tag, props, children, level) {
  if (level === 1) {
    props = {
      ...props,
      className: 'first-level-class'
    };
  }

  if (Tag === 'a') {
    props = {
      ...props,
      className: 'link-class',
      href: props.href.replace('SOME_URL', 'http://example.com')
    };
  }

  return <Tag {...props}>{children}</Tag>;
}

...

render() {
  return (
    <MDReactComponent text='[This link](SOME_URL) has it’s own style.' onIterate={handleIterate} />   
  );
}
```

Result:

```html
<span>
  <p class="first-level-class">
    <a href="http://example.com" class="link-class">This link</a> has it’s own style.
  </p>
</span>

```

# Copyright

Forked from
- [markdown-react-js](https://github.com/alexkuz/markdown-react-js)
Copyright 2015 Alexander Kuznetsov <alexkuz@gmail.com>

- Markdown-it
Copyright (c) 2014 Vitaly Puzrin <vitaly@rcdesign.ru>, Alex Kocharin <alex@kocharin.ru>

# LICENSE
MIT
