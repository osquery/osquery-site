import React, { Component } from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalHeader.css'

const baseClass = 'terminal-header'

const TerminalHeader = ({ children, className }) => {
  const classNames = classnames(baseClass, className)

  return <div className={classNames}>{children}</div>
}

TerminalHeader.propTypes = {
  children: node,
  className: string,
}

export default TerminalHeader
