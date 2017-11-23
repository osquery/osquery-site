import React, { Component } from 'react'
import classnames from 'classnames'
import { bool, func, oneOf, string } from 'prop-types'

import './Tab.css'

const baseClass = 'tab'

class Tab extends Component {
  static propTypes = {
    active: bool,
    className: string,
    onClick: func.isRequired,
    size: oneOf(['small', 'large']),
    text: string.isRequired,
  }

  static defaultProps = {
    size: 'small',
  }

  render() {
    const { active, className, onClick, size, text } = this.props
    const classes = classnames(baseClass, className, {
      [`${baseClass}--active`]: active,
      [`${baseClass}--small`]: size === 'small',
      [`${baseClass}--large`]: size === 'large',
    })

    return (
      <button className={classes} onClick={onClick}>
        {text}
      </button>
    )
  }
}

export default Tab
