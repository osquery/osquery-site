import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Heading3.css'

const Heading3 = ({ children, className }) => {
  const classes = classNames('heading3', className)

  return <h3 className={classes}>{children}</h3>
}

Heading3.propTypes = {
  children: node,
  className: string,
}

export default Heading3
