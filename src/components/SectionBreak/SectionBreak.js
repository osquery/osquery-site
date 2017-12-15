import React from 'react'
import classnames from 'classnames'

import './SectionBreak.css'

const baseClass = 'section-break'

const SectionBreak = ({ fullScreen }) => {
  const classes = classnames(baseClass, { [`${baseClass}--full-screen`]: fullScreen })

  return <div className={classes} />
}

export default SectionBreak
