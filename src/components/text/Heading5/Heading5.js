import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Heading5.css'

const Heading5 = ({ children, className }) => {
  const classes = classNames('heading5', className)

  return <h5 className={classes}>{children}</h5>
}

Heading5.propTypes = {
  children: node,
  className: string,
}

export default Heading5
