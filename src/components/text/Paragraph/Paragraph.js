import React from 'react'
import classNames from 'classnames'
import { bool, node, string } from 'prop-types'

import './Paragraph.css'

const baseClass = 'paragraph'

const Paragraph = ({ children, className, highlight }) => {
  const classes = classNames(baseClass, className, {
    [`${baseClass}--highlight`]: highlight,
  })

  return <p className={classes}>{children}</p>
}

Paragraph.propTypes = {
  children: node,
  className: string,
  highlight: bool,
}

export default Paragraph
