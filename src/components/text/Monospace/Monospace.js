import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Monospace.css'

const Monospace = ({ children, className }) => {
  const classes = classNames('monospace', className)

  return <span className={classes}>{children}</span>
}

Monospace.propTypes = {
  children: node,
  className: string,
}

export default Monospace
