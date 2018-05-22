import React from 'react'
import classnames from 'classnames'
import { bool, func, shape, string } from 'prop-types'

import './TOCEntry.css'

const baseClass = 'toc-entry'

const TOCEntry = ({ active, children, index, onClick, table }) => {
  const liClasses = classnames(baseClass, { [`${baseClass}--active`]: active })

  return (
    <li className={liClasses} data-index={index} id={`${baseClass}-${table.name}`}>
      <a className={`${baseClass}__link`} href={`#${table.name}`} onClick={onClick}>
        {children}
      </a>

      {table.new && (
        <span>
          <span>{` `}</span>
          <span className={`${baseClass}__new-indicator`}>new</span>
        </span>
      )}
    </li>
  )
}

TOCEntry.propTypes = {
  active: bool,
  children: string.isRequired,
  onClick: func.isRequired,
  table: shape({
    name: string,
    new: bool,
  }).isRequired,
}

export default TOCEntry
