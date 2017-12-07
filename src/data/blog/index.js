import frontMatter from 'front-matter'

const webpackMarkdownLoader = require.context('!raw-loader!./posts', false, /\.md$/)
const markdownFiles = webpackMarkdownLoader.keys().map(filename => {
  const text = webpackMarkdownLoader(filename)

  return frontMatter(text)
})

export default markdownFiles
