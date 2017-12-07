import React, { Component } from 'react'
import classnames from 'classnames'
import MediaQuery from 'react-responsive'
import { object, shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import ClickOutside from 'components/ClickOutside'
import HamburgerMenu from 'components/HamburgerMenu'
import Icon from 'components/Icon'
import Pill from 'components/Pill'
import './ResponsiveNav.css'

const baseClass = 'responsive-nav'
const mobileWidth = 800

class ResponsiveNav extends Component {
  static propTypes = {
    className: string,
    history: object.isRequired,
    location: shape({
      pathname: string.isRequired,
    }),
  }

  state = {
    open: false,
  }

  closeNav = () => {
    this.setState({ open: false })
  }

  handleClick = path => {
    const { closeNav } = this
    const { history } = this.props

    return () => {
      closeNav()

      if (path.startsWith('https://')) {
        global.window.location = path

        return false
      }

      history.push(path)
    }
  }

  openNav = () => {
    this.setState({ open: true })
  }

  setDOMNode = DOMNode => {
    this.DOMNode = DOMNode
  }

  renderNav = () => {
    const { handleClick } = this
    const { pathname } = this.props.location
    const pillClass = `${baseClass}__link`

    return (
      <nav className={baseClass}>
        <Pill active={pathname === '/'} className={pillClass} onClick={handleClick('/')}>
          Home
        </Pill>

        <Pill
          active={pathname.startsWith('/schema')}
          className={pillClass}
          onClick={handleClick('/schema')}
        >
          Schema
        </Pill>

        <Pill
          active={pathname.startsWith('/blog')}
          className={pillClass}
          onClick={handleClick('/blog')}
        >
          Blog
        </Pill>

        <Pill
          className={pillClass}
          onClick={handleClick('https://osquery.readthedocs.io/en/stable/')}
        >
          Docs
        </Pill>

        <Pill className={pillClass} onClick={handleClick('https://github.com/facebook/osquery')}>
          <Icon className={`${baseClass}__github-mark`} name="githubMark" />
          Github
        </Pill>

        <Pill
          active={pathname.startsWith('/downloads')}
          className={pillClass}
          onClick={handleClick('/downloads')}
        >
          Downloads
        </Pill>
      </nav>
    )
  }

  renderNavButton = () => {
    const { openNav } = this

    return <HamburgerMenu onClick={openNav} />
  }

  render() {
    const { open } = this.state
    const { renderNav, renderNavButton, setDOMNode } = this
    const { className } = this.props
    const navClasses = classnames(`${baseClass}__wrapper`, className)

    return (
      <div className={navClasses} ref={setDOMNode}>
        <MediaQuery maxWidth={mobileWidth}>
          {!open && renderNavButton()}

          {open && renderNav()}
        </MediaQuery>

        <MediaQuery minWidth={mobileWidth + 1}>{renderNav()}</MediaQuery>
      </div>
    )
  }
}

const nav = ClickOutside(ResponsiveNav, {
  getDOMNode: component => {
    return component.DOMNode
  },
  onOutsideClick: component => {
    return () => {
      component.setState({ open: false })
    }
  },
})

export default withRouter(nav)
