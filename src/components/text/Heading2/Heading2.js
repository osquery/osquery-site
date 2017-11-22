import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Heading2.css'

const Heading2 = ({ children, className }) => {
  const classes = classNames('heading2', className)

  return <h2 className={classes}>{children}</h2>
}

Heading2.propTypes = {
  children: node,
  className: string,
}

export default Heading2
