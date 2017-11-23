import React, { Component } from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalWrapper.css'

const baseClass = 'terminal-wrapper'

const TerminalWrapper = ({ children, className }) => {
  const classNames = classnames(baseClass, className)

  return <div className={classNames}>{children}</div>
}

TerminalWrapper.propTypes = {
  children: node.isRequired,
  className: string,
}

export default TerminalWrapper
