import React, { Component } from 'react'
import { func, node, shape, string } from 'prop-types'
import { Link } from 'react-router-dom'

import scrollTop from 'helpers/scroll_top'
import SectionBreak from 'components/SectionBreak'
import './BlogPost.css'

const baseClass = 'blog-post'

class BlogPost extends Component {
  static propTypes = {
    author: string.isRequired,
    date: shape({
      fromNow: func.isRequired,
    }).isRequired,
    html: node,
    title: string.isRequired,
  }

  render() {
    const { author, date, html, slugifiedTitle, title } = this.props
    const blogPath = `/blog/${slugifiedTitle}`

    return (
      <div className={`${baseClass}`}>
        <Link className={`${baseClass}__title-link`} onClick={scrollTop} to={blogPath}>
          <h1>{title}</h1>
        </Link>

        <p className={`${baseClass}__author`}>{author}</p>

        <p className={`${baseClass}__date`}>{date.fromNow()}</p>

        <SectionBreak />

        <article dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export default BlogPost
