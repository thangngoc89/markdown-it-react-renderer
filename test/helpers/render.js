import { mdReact } from '../../src/index'
import { renderToStaticMarkup } from 'react-dom/server'

const render = (text, options) => {
  return renderToStaticMarkup(mdReact(options)(text))
}

export default render
