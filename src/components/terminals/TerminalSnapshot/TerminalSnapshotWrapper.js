import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalSnapshot.css'

const baseClass = 'terminal-snapshot'

const TerminalSnapshotWrapper = ({ className, children, headerText }) => {
  const wrapperClassName = classnames(`${baseClass}__wrapper`, className)

  return (
    <div className={wrapperClassName}>
      {children}
      <div className={`${baseClass}__oval`} />
    </div>
  )
}

TerminalSnapshotWrapper.propTypes = {
  className: string,
  children: node,
  headerText: string,
}

export default TerminalSnapshotWrapper
