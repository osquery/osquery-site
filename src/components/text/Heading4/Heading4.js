import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Heading4.css'

const Heading4 = ({ children, className }) => {
  const classes = classNames('heading4', className)

  return <h4 className={classes}>{children}</h4>
}

Heading4.propTypes = {
  children: node,
  className: string,
}

export default Heading4
