import React, { Component } from 'react'
import classNames from 'classnames'
import { shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import Icon from 'components/Icon'
import Pill from 'components/Pill'
import './GlobalNav.css'

const baseClass = 'global-nav'

class GlobalNav extends Component {
  static propTypes = {
    className: string,
    location: shape({
      pathname: string.isRequired,
    }),
  }

  render() {
    const { className } = this.props
    const { pathname } = this.props.location
    const navClasses = classNames(baseClass, className)
    const pillClass = `${baseClass}__link`

    return (
      <nav className={navClasses}>
        <Pill active={pathname === '/'} className={pillClass} to="/">
          Home
        </Pill>

        <Pill active={pathname === '/schema'} className={pillClass} to="/schema">
          Schema
        </Pill>

        <Pill active={pathname === '/blog'} className={pillClass} to="/blog">
          Blog
        </Pill>

        <Pill className={pillClass} to="https://osquery.readthedocs.io/en/stable/">
          Docs
        </Pill>

        <Pill className={pillClass} to="https://github.com/facebook/osquery">
          <Icon className={`${baseClass}__github-mark`} name="githubMark" />
          Github
        </Pill>

        <Pill active={pathname === '/downloads'} className={pillClass} to="/downloads">
          Downloads
        </Pill>
      </nav>
    )
  }
}

export default withRouter(GlobalNav)
