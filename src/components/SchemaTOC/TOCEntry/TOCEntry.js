import React from 'react'
import classnames from 'classnames'
import { bool, func, string } from 'prop-types'

import './TOCEntry.css'

const baseClass = 'toc-entry'

const TOCEntry = ({ active, children, entry, index, onClick }) => {
  const liClasses = classnames(baseClass, { [`${baseClass}--active`]: active })

  return (
    <li className={liClasses} data-index={index} id={`toc-entry-${entry}`}>
      <a className={`${baseClass}__link`} href={`#${entry}`} onClick={onClick}>
        {children}
      </a>
    </li>
  )
}

TOCEntry.propTypes = {
  active: bool,
  children: string.isRequired,
  entry: string.isRequired,
  onClick: func.isRequired,
}

export default TOCEntry
