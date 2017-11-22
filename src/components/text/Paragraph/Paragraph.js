import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './Paragraph.css'

const Paragraph = ({ children, className }) => {
  const classes = classNames('paragraph', className)

  return <p className={classes}>{children}</p>
}

Paragraph.propTypes = {
  children: node,
  className: string,
}

export default Paragraph
