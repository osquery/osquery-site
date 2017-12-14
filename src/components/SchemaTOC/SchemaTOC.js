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
      <ol className={baseClass}>
        {entries &&
          entries.map(entry => {
            return (
              <TOCEntry
                active={activeEntry === entry}
                entry={entry}
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
