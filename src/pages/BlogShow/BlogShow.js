import React, { Component } from 'react'
import forEach from 'lodash.foreach'
import { withRouter } from 'react-router'

import BlogPost from 'components/BlogPost'
import blogPosts from 'data/blog/'
import NotFound from 'pages/NotFound'
import images from '../../data/blog/posts/images'
import './BlogShow.css'

const baseClass = 'blog-show'

class BlogShow extends Component {
  constructor(props) {
    super(props)

    this.converter = null

    this.state = {
      blogPost: undefined,
      blogTitle: props.match.params.blog_title,
    }
  }

  async componentDidMount() {
    const { blogTitle } = this.state

    const blogPost = blogPosts.find(post => post.attributes.slugifiedTitle === blogTitle)

    if (blogPost) {
      const showdown = await import('showdown')
      this.converter = new showdown.default.Converter({ tables: true })
    }

    this.setState({ blogPost })
  }

  get htmlWithImages() {
    const { body } = this.state.blogPost

    if (!this.converter) {
      return 'Loading...'
    }

    let html = this.converter.makeHtml(body)

    forEach(images, (path, name) => {
      html = html.replace(`img src="${name}"`, `img src="${path}"`)
    })

    return html
  }

  render() {
    const { blogPost } = this.state

    if (!blogPost) {
      return <NotFound />
    }

    const { attributes } = blogPost

    return (
      <div className={baseClass}>
        <BlogPost {...attributes} html={this.htmlWithImages} />
      </div>
    )
  }
}

export default withRouter(BlogShow)
