import React, { Component } from 'react'
import classNames from 'classnames'
import { bool, func, node, string } from 'prop-types'

import Button from 'components/Button'
import './Pill.css'

const baseClass = 'pill'

class Pill extends Component {
  static propTypes = {
    active: bool,
    children: node,
    className: string,
    onClick: func,
  }

  render() {
    const { active, children, className, onClick } = this.props
    const classes = classNames(baseClass, className, { [`${baseClass}--active`]: active })

    return (
      <Button className={classes} onClick={onClick}>
        {children}
      </Button>
    )
  }
}

export default Pill
