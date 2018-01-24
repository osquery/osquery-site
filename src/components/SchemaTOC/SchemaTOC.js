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

  preventBodyScroll = () => document.body.classList.add('noscroll')
  allowBodyScroll = () => document.body.classList.remove('noscroll')

  componentDidMount() {
    this.toc.addEventListener('mouseenter', this.preventBodyScroll)
    this.toc.addEventListener('mouseleave', this.allowBodyScroll)
  }

  componentWillUnmount() {
    this.toc.removeEventListener('mouseenter', this.preventBodyScroll)
    this.toc.removeEventListener('mouseleave', this.allowBodyScroll)
  }

  render() {
    const { handleClick } = this
    const { activeEntry, entries } = this.props

    return (
      <ol className={baseClass} id={`${baseClass}__list`} ref={el => (this.toc = el)}>
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
