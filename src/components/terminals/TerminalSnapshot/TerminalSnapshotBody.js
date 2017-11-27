import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalSnapshot.css'

const baseClass = 'terminal-snapshot'

const TerminalSnapshotBody = ({ children, className }) => {
  const wrapperClassName = classnames(`${baseClass}__body`, className)

  return <div className={wrapperClassName}>{children}</div>
}

TerminalSnapshotBody.propTypes = {
  children: node,
  className: string,
}

export default TerminalSnapshotBody
