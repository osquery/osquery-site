import React, { Component } from 'react'
import showdown from 'showdown'
import { withRouter } from 'react-router'

import BlogPost from 'components/BlogPost'
import blogPosts from 'data/blog/'
import NotFound from 'pages/NotFound'
import './BlogShow.css'

const baseClass = 'blog-show'

class BlogShow extends Component {
  constructor(props) {
    super(props)

    this.converter = new showdown.Converter()

    this.state = {
      blogPost: undefined,
      blogTitle: props.match.params.blog_title,
    }
  }

  componentDidMount() {
    const { blogTitle } = this.state

    const blogPost = blogPosts.find(post => post.attributes.slugifiedTitle === blogTitle)

    this.setState({ blogPost })
  }

  render() {
    const { blogPost } = this.state

    if (!blogPost) return <NotFound />

    const { attributes, body } = blogPost
    const { converter } = this
    const html = converter.makeHtml(body)

    return (
      <div className={baseClass}>
        <BlogPost {...attributes} html={html} />
      </div>
    )
  }
}

export default withRouter(BlogShow)
