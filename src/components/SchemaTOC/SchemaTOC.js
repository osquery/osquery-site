import React, { Component } from 'react'
import { arrayOf, func, string } from 'prop-types'

import TOCEntry from './TOCEntry'
import './SchemaTOC.css'

const baseClass = 'schema-toc'

class SchemaTOC extends Component {
  static propTypes = {
    activeEntry: string,
    entries: arrayOf(string),
    onEntryClick: func.isRequired,
  }

  handleClick = entry => {
    const { onEntryClick } = this.props
    return () => onEntryClick(entry)
  }

  render() {
    const { handleClick } = this
    const { activeEntry, entries } = this.props

    return (
      <ol className={baseClass} id={`${baseClass}__list`}>
        {entries &&
          entries.map((entry, index) => {
            return (
              <TOCEntry
                active={activeEntry === entry}
                entry={entry}
                index={index}
                key={entry}
                onClick={handleClick(entry)}
              >
                {entry}
              </TOCEntry>
            )
          })}
      </ol>
    )
  }
}

export default SchemaTOC
