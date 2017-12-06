import React, { Component } from 'react'
import { arrayOf, string } from 'prop-types'

import TOCEntry from './TOCEntry'

const baseClass = 'schema-toc'

class SchemaTOC extends Component {
  static propTypes = {
    activeEntry: string,
    entries: arrayOf(string),
  }

  render() {
    const { activeEntry, entries } = this.props

    return (
      <ol className={baseClass}>
        {entries &&
          entries.map(entry => {
            return (
              <TOCEntry active={activeEntry === entry} entry={entry} key={entry}>
                {entry}
              </TOCEntry>
            )
          })}
      </ol>
    )
  }
}

export default SchemaTOC
