import React from 'react'
import classNames from 'classnames'
import { string } from 'prop-types'

import './LabelText.css'

const LabelText = ({ children, className }) => {
  const classes = classNames('label-text', className)

  return <span className={classes}>{children}</span>
}

LabelText.propTypes = {
  children: string.isRequired,
  className: string,
}

export default LabelText
