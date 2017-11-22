import React from 'react'
import classNames from 'classnames'
import { node, string } from 'prop-types'

import './H1SuperHeading.css'

const H1SuperHeading = ({ children, className }) => {
  const classes = classNames('h1-super-heading', className)

  return <p className={classes}>{children}</p>
}

H1SuperHeading.propTypes = {
  children: node,
  className: string,
}

export default H1SuperHeading
