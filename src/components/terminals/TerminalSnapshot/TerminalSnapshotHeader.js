import React from 'react'
import { node, string } from 'prop-types'

import Icon from 'components/Icon'
import './TerminalSnapshot.css'

const baseClass = 'terminal-snapshot'

const TerminalSnapshotHeader = ({ className, children, iconName }) => {
  return (
    <div className={`${baseClass}__header`}>
      <Icon className={`${baseClass}__icon`} name={iconName} />
      {children}
    </div>
  )
}

TerminalSnapshotHeader.propTypes = {
  children: node,
  className: string,
  iconName: string.isRequired,
}

export default TerminalSnapshotHeader
