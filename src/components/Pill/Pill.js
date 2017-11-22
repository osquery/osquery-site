import React, { Component } from 'react'
import classNames from 'classnames'
import { bool, node, string } from 'prop-types'
import { Link } from 'react-router-dom'

import './Pill.css'

const baseClass = 'pill'

class Pill extends Component {
  static propTypes = {
    active: bool,
    children: node,
    className: string,
    to: string.isRequired,
  }

  render() {
    const { active, children, className, to } = this.props
    const classes = classNames(baseClass, className, { [`${baseClass}--active`]: active })
    const hrefRegex = /^http/

    if (to.match(hrefRegex)) {
      return (
        <a className={classes} href={to}>
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }
}

export default Pill
