import React, { Component } from 'react'
import showdown from 'showdown'
import { withRouter } from 'react-router'

import BlogPost from 'components/BlogPost'
import blogPosts from 'data/blog/'
import H1SuperHeading from 'components/text/H1SuperHeading'
import Heading1 from 'components/text/Heading1'
import SectionBreak from 'components/SectionBreak'
import Tab from 'components/Tab'
import './BlogIndex.css'

const baseClass = 'blog-index'

class BlogIndex extends Component {
  constructor(props) {
    super(props)

    this.converter = new showdown.Converter()
  }

  onToggleBlogType = blogType => () => this.props.history.push(`/blog/${blogType}`)

  render() {
    const { blogType } = this.props
    const { converter, onToggleBlogType } = this
    const activeBlogPosts = blogPosts.filter(post => post.attributes.type === blogType)

    return (
      <div className={baseClass}>
        <div className={`${baseClass}__header`}>
          <H1SuperHeading>facebook/osquery</H1SuperHeading>

          <Heading1>The Osquery Blog</Heading1>
        </div>

        <div className={`${baseClass}__tab-wrapper`}>
          <Tab
            active={blogType === 'official-news'}
            className={`${baseClass}__tab`}
            onClick={onToggleBlogType('official-news')}
            text="Official News"
          />

          <Tab
            active={blogType === 'community-articles'}
            className={`${baseClass}__tab`}
            onClick={onToggleBlogType('community-articles')}
            text="Community Articles"
          />
        </div>

        {activeBlogPosts.map((blogPost, idx) => {
          const { attributes, body } = blogPost
          const html = converter.makeHtml(body)
          const isLastPost = idx === activeBlogPosts.length - 1

          return [
            <BlogPost {...attributes} html={html} key={`blog-post-${idx}`} />,
            !isLastPost && <SectionBreak key={`blog-section-${idx}`} />,
          ]
        })}
      </div>
    )
  }
}

export default withRouter(BlogIndex)
