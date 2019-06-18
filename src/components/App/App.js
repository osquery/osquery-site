import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import Footer from 'components/Footer'
import Logo from 'components/Logo'
import pageTitles from 'helpers/page_titles'
import ResponsiveNav from 'components/navs/ResponsiveNav'
import './App.css'

const baseClass = 'app'

class App extends Component {
  static propTypes = {
    history: shape({
      location: shape({
        pathname: string,
      }).isRequired,
    }),
  }

  componentWillMount() {
    const { pathname } = this.props.history.location
    this.insertPageTitle(pathname)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location
    const nextPathname = nextProps.location.pathname

    if (nextPathname !== pathname) this.insertPageTitle(nextPathname)
  }

  insertPageTitle = pathname => {
    if (pathname.match(/downloads/)) return (document.title = pageTitles.downloads)

    if (pathname.match(/blog\/community-articles/))
      return (document.title = pageTitles.blog.communityArticles)

    if (pathname.match(/blog\/official-news/))
      return (document.title = pageTitles.blog.officialNews)

    if (pathname.match(/blog/)) return (document.title = pageTitles.blog.default)

    if (pathname.match(/schema/)) return (document.title = pageTitles.schema)

    document.title = pageTitles.home
  }

  render() {
    const { children } = this.props

    return (
      <div className={baseClass}>
        <header className={`${baseClass}__header`}>
          <Link className={`${baseClass}__home-link`} to={`${process.env.PUBLIC_URL}/`}>
            <Logo className={`${baseClass}__logo`} />
          </Link>

          <ResponsiveNav className={`${baseClass}__nav`} />
        </header>

        <div className={`${baseClass}__main`}>{children}</div>

        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
