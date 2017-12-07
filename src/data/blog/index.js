import frontMatter from 'front-matter'
import moment from 'moment'

const webpackMarkdownLoader = require.context('!raw-loader!./posts', false, /\.md$/)
const readFilename = filename => {
  const text = webpackMarkdownLoader(filename)
  const { attributes, body } = frontMatter(text)

  return {
    attributes: {
      ...attributes,
      date: moment(attributes.date),
    },
    body,
  }
}

export default webpackMarkdownLoader
  .keys()
  .map(filename => readFilename(filename))
  .sort((a, b) => b.attributes.date - a.attributes.date)
