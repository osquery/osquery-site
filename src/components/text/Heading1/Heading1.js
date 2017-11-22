import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Heading1.css'

const Heading1 = ({ children, className }) => {
  const classes = classNames('heading1', className)

  return <h1 className={classes}>{children}</h1>
}

Heading1.propTypes = {
  children: node,
  className: string,
}

export default Heading1
