import React, { Component } from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalBody.css'

const baseClass = 'terminal-body'

const TerminalBody = ({ children, className }) => {
  const classNames = classnames(baseClass, className)

  return <div className={classNames}>{children}</div>
}

TerminalBody.propTypes = {
  children: node.isRequired,
  className: string,
}

export default TerminalBody
