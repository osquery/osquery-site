import React, { Component } from 'react'
import showdown from 'showdown'

import blogPosts from 'data/blog/'
import H1SuperHeading from 'components/text/H1SuperHeading'
import Heading1 from 'components/text/Heading1'
import SectionBreak from 'components/SectionBreak'
import './Blog.css'

const baseClass = 'blog'

class Blog extends Component {
  constructor(props) {
    super(props)

    this.converter = new showdown.Converter()
  }

  render() {
    const { converter } = this

    return (
      <div className={baseClass}>
        <div className={`${baseClass}__header`}>
          <H1SuperHeading>facebook/osquery</H1SuperHeading>
          <Heading1>The Osquery Blog</Heading1>
        </div>
        {blogPosts.map((blogPost, idx) => {
          const { attributes, body } = blogPost
          const html = converter.makeHtml(body)
          const isLastPost = idx === blogPosts.length - 1

          return (
            <div className={`${baseClass}__post`} key={`blog-${idx}`}>
              <h1>{attributes.title}</h1>

              <p className={`${baseClass}__author`}>{attributes.author}</p>

              <p className={`${baseClass}__date`}>{attributes.date.fromNow()}</p>

              <SectionBreak />

              <article dangerouslySetInnerHTML={{ __html: html }} />

              {!isLastPost && <SectionBreak />}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Blog
